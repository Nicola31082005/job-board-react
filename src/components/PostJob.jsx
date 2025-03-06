import { useState } from "react";
import { useNavigate } from "react-router";  // You can use this to navigate after submission

export default function PostJob() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        coverLetter: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const navigate = useNavigate(); // Used to navigate after form submission

    const handleFormData = (e) => {
        const currentValue = e.target.value;
        const currentKey = e.target.name;

        setFormData((prevFormData) => ({ ...prevFormData, [currentKey]: currentValue }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.letter) {
            setFormError("Please fill in all fields.");
            return;
        }

        const bodyData = { first_name: formData.name, last_name: formData.email }


        setFormError("");
        setIsSubmitting(true);

        // Simulate a successful submission
        fetch('https://reqres.in/api/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        })
            .then((response) => {
                setIsSubmitting(false)
                navigate('/jobs')
                return response.json()
            })

    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Apply for the Job</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        name="name"
                        onChange={(e) => handleFormData(e)}
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your full name"
                        required
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
                        onChange={(e) => handleFormData(e)}
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your email"
                        required
                    />
                </div>

                {/* Cover Letter */}
                <div>
                    <label htmlFor="coverLetter" className="block text-gray-700">Cover Letter</label>
                    <textarea
                        id="coverLetter"
                        value={formData.letter}
                        name="letter"
                        onChange={(e) => handleFormData(e)}
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Write your cover letter"
                        rows="6"
                        required
                    />
                </div>

                {/* Form Error */}
                {formError && <p className="text-red-500">{formError}</p>}

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                </div>
            </form>
        </div>
    );
}
