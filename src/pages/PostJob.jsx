import { useState } from "react";
import { useNavigate } from "react-router";  // You can use this to navigate after submission
import jobsService from "../services/jobsService";
import { useJobsContext } from "../context/JobsContext";
import { v4 as uuidv4 } from 'uuid';

export default function PostJob() {


    const navigate = useNavigate();
    const [apiError, setApiError] = useState(null);
    const { updateJobs, addOptimisticJob, jobs, optimisticJobs } = useJobsContext();


    async function handleSubmit(formData) {
            try {
                const first_name = formData.get('first_name');
                const last_name = formData.get('last_name');
                const email = formData.get('email');
                const coverLetter = formData.get('coverLetter');

                if (!first_name || !last_name || !email || !coverLetter) {
                    setApiError("Please fill in all fields.");
                    return;
                }

                // Create a new job applicant object
                const newApplicant = {
                    id: uuidv4(),
                    first_name,
                    last_name,
                    email,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(first_name + ' ' + last_name)}&background=random`,
                    coverLetter,
                    pending: true
                };


                // Add the new applicant to the optimistic jobs list
                addOptimisticJob(newApplicant);


                const craetedApplicant = await jobsService.addApplicant(newApplicant)

                updateJobs([...jobs, craetedApplicant]);

                navigate('/jobs');

            } catch (error) {
                setApiError(error.message);
            }
        }



    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Apply for the Job</h2>
            <form action={handleSubmit} className="space-y-6">
                {/* First Name */}
                <div>
                    <label htmlFor="first_name" className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your first name"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="last_name" className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your last name"
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your email"
                    />
                </div>

                {/* Cover Letter */}
                <div>
                    <label htmlFor="coverLetter" className="block text-gray-700">Cover Letter</label>
                    <textarea
                        id="coverLetter"
                        name="coverLetter"
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Write your cover letter"
                        rows="6"
                    />
                </div>


                {/* API Error */}
                {apiError && (
                    <p className="text-red-500 bg-red-50 p-3 rounded-lg">{apiError}</p>
                )}

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
                    >
                        Submit Application
                    </button>
                </div>
            </form>


        </div>

    );
}
