import React from "react";
import { useNavigate, Link } from "react-router";
import useForm from "../hooks/useForm";
import authService from "../services/authService";

// API base URL

export default function Login() {
    const [formData, onChange, onSubmit, isSubmitting, formError, setFormError] = useForm({
        email: "",
        password: "",
    }, handleSubmit);

    const navigate = useNavigate();

    function handleSubmit() {
        return new Promise(async (resolve, reject) => {
            try {
                const email = formData.email
                const password = formData.password


                const data = await authService.login({ email, password });

                // Store token and user data
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                resolve();
                // Redirect to jobs page
                navigate("/jobs");
            } catch (err) {
                reject(err);
            }
        });
    };

    return (
        <div className="max-w-md mx-auto mt-32 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                Login to your account
            </h2>

            {formError && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
                    {formError}
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="••••••••"
                    />
                </div>



                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="font-medium text-blue-600 hover:text-blue-500"
                >
                    Register here
                </Link>
            </div>
        </div>
    );
}

