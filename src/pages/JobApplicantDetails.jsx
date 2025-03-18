import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import React from "react";
import { useFetch } from "../hooks/useFetch";

export default function JobApplicantDetails() {
    const params = useParams();
    const userId = params.id;
    const [applicant, setApplicant] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch applicant details from API
    const [data, pending, fetchError] = useFetch(`/api/job-applicants/${userId}`);

    // Update with API data when it arrives
    useEffect(() => {
        if (data) {
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
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Error</h1>
                <p className="text-red-500">{error}</p>
                <Link
                    to="/jobs"
                    className="mt-4 inline-block px-5 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                >
                    Back to Jobs
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Applicant Details</h1>

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

            {/* Back Button */}
            <Link
                to="/jobs"
                className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
            >
                Back to Jobs
            </Link>
        </div>
    );
}