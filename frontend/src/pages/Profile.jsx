import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import useForm from "../hooks/useForm"; // Import the useForm hook
import authService from "../services/authService";
import AuthContext from "../context/authContext";


export default function Profile() {
    const { authData, setAuthDataHandler, clearAuthData } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    // Define functions BEFORE useForm call
    const validateForm = (formData) => { // Add formData parameter
        if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
            return "New passwords do not match";
        }
        if (formData.newPassword && formData.newPassword.length < 6) {
            return "New password must be at least 6 characters long";
        }
        if (!formData.currentPassword) {
            return "Current password is required to make changes";
        }
        return null;
    };

    const submitForm = async () => {
        try {
            const currentPassword = formData.currentPassword;
            const newPassword = formData.newPassword;
            const email = formData.email;
            const username = formData.username;

            let isProfileUpdated = false;

            // First, try to update profile (which also verifies the current password)
            const profileData = await authService.profileUpdate(currentPassword, email, username, authData.accessToken);
            isProfileUpdated = true;

            // Only attempt password change if new password is provided
            if (newPassword) {
                await authService.passwordChange(currentPassword, newPassword, authData.accessToken);
            }

            // If we got here, both operations succeeded
            setAuthDataHandler({
                ...authData,
                user: profileData.user
            });
            setUser(profileData.user);
            setSuccess("Profile updated successfully");
            setIsEditing(false);

            // Clear sensitive fields
            setFormData({
                ...formData,
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
            });
        } catch (err) {
            throw err; // Let useForm handle the error
        }
    };

    // Now use the functions in useForm
    const [formData, onChange, onSubmit, isSubmitting, formError, setFormError, setFormData] = useForm(
        {
            username: "",
            email: "",
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        submitForm,
        validateForm
    );

    useEffect(() => {
        if (!authData.user || !authData.accessToken) {
            navigate("/login");
            return;
        }

        setUser(authData.user);

        // Update form data with user information
        setFormData(prevData => ({
            ...prevData,
            username: authData.user.username,
            email: authData.user.email,
        }));
    }, []);

    const handleLogout = () => {
        // Clear auth data from context
        clearAuthData();
        navigate("/login");
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-32 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-600">My Profile</h2>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                >
                    Logout
                </button>
            </div>

            {formError && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
                    {formError}
                </div>
            )}

            {success && (
                <div className="bg-green-50 text-green-500 p-3 rounded-lg mb-4">
                    {success}
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={onChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    />
                </div>

                {isEditing && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Current Password
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={onChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter current password to make changes"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                New Password (Optional)
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={onChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Leave blank to keep current password"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                name="confirmNewPassword"
                                value={formData.confirmNewPassword}
                                onChange={onChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </>
                )}

                <div className="flex justify-end space-x-4 pt-4">
                    {isEditing ? (
                        <>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}