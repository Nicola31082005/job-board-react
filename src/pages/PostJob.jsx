import { useState } from "react";
import { useNavigate } from "react-router";  // You can use this to navigate after submission
import useForm from "../hooks/useForm";

// API base URL
const API_BASE_URL = "http://localhost:5000";

export default function PostJob() {
    const initialFormData = {
        first_name: '',
        last_name: '',
        email: '',
        coverLetter: '',
    }

    const navigate = useNavigate();
    const [apiError, setApiError] = useState(null);

    // Use useForm custom hook to handle form data
    const [formData, onChange, onSubmit, isSubmitting, formError, setFormError] = useForm(initialFormData, handleSubmit, validateForm)

    function validateForm(formData) {
        if (!formData.first_name || !formData.last_name || !formData.email || !formData.coverLetter) {
            return "Please fill in all fields.";
        }
    }

    function handleSubmit() {
        return new Promise(async (resolve, reject) => {
            try {
                // Create a new job applicant object
                const newApplicant = {
                    id: Date.now(), // Generate a unique ID
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.first_name + ' ' + formData.last_name)}&background=random`,
                    coverLetter: formData.coverLetter
                };

                console.log(newApplicant);

                // Submit to API
                const response = await fetch(`${API_BASE_URL}/api/job-applicants`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newApplicant),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to submit application');
                }

                // Navigate to jobs page after successful submission
                setTimeout(() => {
                    navigate('/jobs');
                    resolve();
                }, 1000);
            } catch (error) {
                setApiError(error.message);
                reject(error);
            }
        });
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Apply for the Job</h2>
            <form onSubmit={onSubmit} className="space-y-6">
                {/* First Name */}
                <div>
                    <label htmlFor="first_name" className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        value={formData.first_name}
                        name="first_name"
                        onChange={onChange}
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
                        value={formData.last_name}
                        name="last_name"
                        onChange={onChange}
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
                        value={formData.email}
                        name="email"
                        onChange={onChange}
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your email"
                    />
                </div>

                {/* Cover Letter */}
                <div>
                    <label htmlFor="coverLetter" className="block text-gray-700">Cover Letter</label>
                    <textarea
                        id="coverLetter"
                        value={formData.coverLetter}
                        name="coverLetter"
                        onChange={onChange}
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Write your cover letter"
                        rows="6"
                    />
                </div>

                {/* Form Error */}
                {formError && (
                    <p className="text-red-500 bg-red-50 p-3 rounded-lg">{formError}</p>
                )}

                {/* API Error */}
                {apiError && (
                    <p className="text-red-500 bg-red-50 p-3 rounded-lg">{apiError}</p>
                )}

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                </div>
            </form>
        </div>
    );
}
