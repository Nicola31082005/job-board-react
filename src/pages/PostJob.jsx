import { useState } from "react";
import jobsService from "../services/jobsService";
import { useJobsContext } from "../context/JobsContext";
import { v4 as uuidv4 } from 'uuid';
import PostJobModal from "../components/common/PostJobModal";
import { useNavigate } from "react-router";

export default function PostJob() {


    const [apiError, setApiError] = useState(null);
    const { updateJobs, addOptimisticJob, jobs } = useJobsContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalApplicant, setModalApplicant] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()



    async function handleSubmit(formData) {

        const first_name = formData.get('first_name');
        const last_name = formData.get('last_name');
        const email = formData.get('email');
        const coverLetter = formData.get('coverLetter');

        if (!first_name || !last_name || !email || !coverLetter) {
            setApiError("Please fill in all fields.");
            return;
        }

        const newApplicant = {
            id: uuidv4(),
            first_name,
            last_name,
            email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(first_name + ' ' + last_name)}&background=random`,
            coverLetter,
            pending: true
        };

        addOptimisticJob(newApplicant);
        setIsSubmitting(true);

        jobsService.addApplicant(newApplicant)
            .then(createdApplicant => {
                setModalApplicant(createdApplicant);
                setIsModalOpen(true);
                updateJobs([...jobs, createdApplicant]);
                setIsSubmitting(false);
            })
            .catch(error => {
                setApiError(error.message);
                setIsSubmitting(false);
            });

    }



    return (
        <>
            <PostJobModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onContinue={() => {
                    setIsModalOpen(false);
                    navigate('/jobs')
                }}
                applicant={modalApplicant}
            />
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
                            disabled={isSubmitting}
                            className={`w-full py-3 text-white font-semibold rounded-lg transition-all ${isSubmitting
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Submitting...
                                </div>
                            ) : (
                                "Submit Application"
                            )}
                        </button>
                    </div>
                </form>


            </div>
        </>
    );
}
