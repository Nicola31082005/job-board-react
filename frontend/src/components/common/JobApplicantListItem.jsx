import { Link } from "react-router";
import React from "react";

export default function JobApplicantListItem({
    id,
    email,
    first_name,
    last_name,
    avatar,
}) {
    return (
        <Link
            to={`/jobs/${id}`}
            key={id}
            data-testid={`job-applicant-list-item`}
            className="bg-white p-6 shadow-md rounded-lg cursor-pointer"
        >
            <h3 className="text-xl font-semibold text-blue-600">{email}</h3>
            <p className="text-gray-700">{first_name}</p>
            <p className="text-gray-500">{last_name}</p>
            <img
                src={avatar}
                alt={first_name}
                className="w-32 h-32 object-cover mt-2"
            />
            <div className="mt-4">
                <button
                    to={`/jobs/${id}`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                    View Details
                </button>
            </div>
        </Link>
    );
}
