import { useState } from "react";
import { useNavigate } from "react-router";  // You can use this to navigate after submission
import useForm from "../hooks/useForm";

export default function PostJob() {

    const initialFormData = {
        name: '',
        email: '',
        coverLetter: '',
    }

    const navigate = useNavigate();


    // Use useForm custom hook to handle form data
    const [formData, onChange, onSubmit, isSubmitting, formError, setFormError] = useForm(initialFormData, handleSubmit, validateForm)


    function validateForm(formData) {
        if (!formData.name || !formData.email || !formData.coverLetter) {
            return "Please fill in all fields.";
        }
    }

    function handleSubmit() {
        return new Promise((resolve) => {

        // Create a new job applicant object
        const newApplicant = {
            id: Date.now(), // Generate a unique ID
            first_name: formData.name.split(' ')[0],
            last_name: formData.name.split(' ')[1] || '',
            email: formData.email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
            coverLetter: formData.coverLetter
        };

        // Get existing applicants from localStorage
        const existingApplicants = JSON.parse(localStorage.getItem('jobApplicants') || '[]');

        // Add new applicant
        const updatedApplicants = [...existingApplicants, newApplicant];

        // Save to localStorage
        localStorage.setItem('jobApplicants', JSON.stringify(updatedApplicants));

        // Simulate API delay
        setTimeout(() => {
            navigate('/jobs');
                resolve();
            }, 1000);
        });
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Apply for the Job</h2>
            <form onSubmit={onSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-gray-700">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        name="name"
                        onChange={onChange}
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your full name"
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
