import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router";
import React from "react";
import { useFetch } from "../hooks/useFetch";
import AuthContext from "../context/authContext";
import authService from "../services/authService";

export default function JobApplicantDetails() {
    const params = useParams();
    const applicantId = params.id;
    const [applicant, setApplicant] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { authData } = useContext(AuthContext);

    // Public endpoint - no auth required
    const [data, pending, fetchError] = useFetch(`/api/job-applicants/${applicantId}`);

    // Update with API data when it arrives
    useEffect(() => {
        if (data) {
            console.log(data);
            setApplicant(data);
            setIsLoading(false);
        }
    }, [data]);

    // Handle API errors
    useEffect(() => {
        if (fetchError) {
            setError(fetchError.message);
            setIsLoading(false);
        }
    }, [fetchError]);

    // Only show delete button for authenticated users - we will assume they can delete
    // any application since we're no longer tracking ownership in the public view
    const handleDelete = async () => {
        if (!authData?.token) {
            setError("You must be logged in to delete an application");
            return;
        }

        try {
            await authService.deleteApplicant(applicantId, authData.token);
            navigate('/jobs');
        } catch (error) {
            console.error("Error deleting applicant:", error);
            setError(error.message);
        }
    };

    if (isLoading || pending) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
                    <p className="text-gray-700 text-lg mt-4 text-center">Loading applicant details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Error</h1>
                    <Link
                        to="/jobs"
                        className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                    >
                        Back to Jobs
                    </Link>
                </div>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Applicant Details</h1>
                <Link
                    to="/jobs"
                    className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                >
                    Back to Jobs
                </Link>
            </div>

            {/* Applicant Info */}
            <div className="border-b pb-4 mb-4">
                {applicant.avatar && (
                    <div className="mb-4 flex justify-center">
                        <img
                            src={applicant.avatar}
                            alt={`${applicant.first_name} ${applicant.last_name}`}
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    </div>
                )}
                <p className="text-lg"><strong>First Name:</strong> {applicant.first_name}</p>
                <p className="text-lg"><strong>Last Name:</strong> {applicant.last_name}</p>
                <p className="text-lg"><strong>Email:</strong> {applicant.email}</p>
                {applicant.coverLetter && (
                    <div className="mt-4">
                        <p className="text-lg font-semibold">Cover Letter:</p>
                        <p className="mt-2 text-gray-700 whitespace-pre-wrap">{applicant.coverLetter}</p>
                    </div>
                )}
            </div>

            {/* Action Buttons - Only show for authenticated users */}
            {authData?.token && (
                <div className="mt-6">
                    <button
                        onClick={handleDelete}
                        className="w-full px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                        Delete Application
                    </button>
                </div>
            )}
        </div>
    );
}