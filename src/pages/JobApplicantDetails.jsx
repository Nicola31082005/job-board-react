import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import React from "react";

export default function JobApplicantDetails() {

    const params = useParams()
    const userId = Number(params.id)

    const [applicant, setApplicant] = useState({})


    // Getting the applicant details from the local storage
    useEffect(() => {
        const localApplicants = JSON.parse(localStorage.getItem('jobApplicants') || '[]');
        // console.log(localApplicants);

        const applicant = localApplicants.find(applicant => applicant.id === userId);
        setApplicant(applicant)
    }, [params.id])


    return (
        <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Applicant Details</h1>

            {/* Applicant Info */}
            <div className="border-b pb-4 mb-4">
                <p className="text-lg"><strong>First Name:</strong> {applicant.first_name}</p>
                <p className="text-lg"><strong>Last Name:</strong> {applicant.last_name}</p>
                <p className="text-lg"><strong>Email:</strong> {applicant.email}</p>
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