import React, { useEffect, useState, useContext } from "react";
import { JobApplicantListItem } from "../components/common";
import { useFetch } from "../hooks/useFetch";
import AuthContext from "../context/authContext";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authData } = useContext(AuthContext);

    // Use our API endpoint with optional auth token
    const headers = authData?.token
        ? { 'Authorization': `Bearer ${authData.token}` }
        : {};

    const [data, pending, fetchError] = useFetch('/api/job-applicants', {
        headers
    });

    // Update state when data is fetched
    useEffect(() => {
        if (data) {
            setJobs(data);
            setIsLoading(false);
        }
    }, [data]);

    // Handle fetch errors
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
                    <p className="text-gray-700 text-lg mt-4 text-center">Loading jobs...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-22">
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error loading jobs</h3>
                            <div className="mt-2 text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-22">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Job Applicants</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <JobApplicantListItem
                            key={job.id}
                            id={job.id}
                            email={job.email}
                            first_name={job.first_name}
                            last_name={job.last_name}
                            avatar={job.avatar}
                            isOwner={job.isOwner}
                        />
                    ))
                ) : (
                    <div className="col-span-3 text-center py-10">
                        <p className="text-gray-500 text-lg">No job applicants found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}