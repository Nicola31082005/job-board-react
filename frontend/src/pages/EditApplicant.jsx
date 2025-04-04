import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import AuthContext from "../context/authContext";
import useForm from "../hooks/useForm";
import jobsService from "../services/jobsService";

export default function EditformData() {
    const navigate = useNavigate()
    const { authData } = useContext(AuthContext)
    const params = useParams();
    const applicantId = params.id;
    const location = useLocation();
    const applicant = location.state?.applicant


    const initialData = {
        first_name: applicant.first_name,
        last_name: applicant.last_name,
        email: applicant.email,
        coverLetter: applicant.coverLetter
    }

    // console.log(initialData);


    const handleSubmit = async () => {

        const newApplicantData = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            coverLetter: formData.coverLetter,
        }

        const updatedUser = await jobsService.editApplicant(newApplicantData, authData.accessToken, applicantId)

        navigate(`/jobs/${applicantId}`)

    }

    const [formData, onChange, onSubmit, isSubmitting, formError, setFormError, setFormData] = useForm(initialData, handleSubmit) // Option for validator function



    if (formError) return <p className="text-red-500 mt-15">{formError}</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Edit Application</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">First Name</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={onChange}
                        className="w-full p-2 border rounded-lg" required />
                </div>
                <div>
                    <label className="block text-gray-700">Last Name</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={onChange}
                        className="w-full p-2 border rounded-lg" required />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={onChange}
                        className="w-full p-2 border rounded-lg" required disabled />
                </div>
                <div>
                    <label className="block text-gray-700">Cover Letter</label>
                    <textarea name="coverLetter" value={formData.coverLetter} onChange={onChange}
                        className="w-full p-2 border rounded-lg" rows="4"></textarea>
                </div>
                <button type="submit" className="w-full px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
                    Save Changes
                </button>
            </form>
        </div>
    );
}
