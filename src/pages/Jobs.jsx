import React, { useEffect, useState } from "react";
import { JobApplicantListItem } from "../components/common";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Get local applicants
                const localApplicants = JSON.parse(localStorage.getItem('jobApplicants') || '[]');

                // If we don't have any local applicants, fetch initial data from API
                if (localApplicants.length === 0) {
                    const response = await fetch('https://reqres.in/api/users');
                    if (!response.ok) {
                        throw new Error('Failed to fetch jobs');
                    }
                    const data = await response.json();
                    setJobs(data.data);
                    // Store initial data in localStorage
                    localStorage.setItem('jobApplicants', JSON.stringify(data.data));
                } else {
                    // Use local applicants
                    setJobs(localApplicants);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();

        // Set up localStorage change listener
        const handleStorageChange = () => {
            const updatedApplicants = JSON.parse(localStorage.getItem('jobApplicants') || '[]');
            setJobs(updatedApplicants);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-22">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-gray-200 h-48 rounded"></div>
                        ))}
                    </div>
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
                {jobs.map((job) => (
                    <JobApplicantListItem
                        key={job.id}
                        id={job.id}
                        email={job.email}
                        first_name={job.first_name}
                        last_name={job.last_name}
                        avatar={job.avatar}
                    />
                ))}
            </div>
        </div>
    );
}