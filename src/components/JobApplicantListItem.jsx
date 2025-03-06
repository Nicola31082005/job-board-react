import { Link } from "react-router";

export default function JobApplicantListItem({
    id,
    email,
    first_name,
    last_name,
    avatar

}) {
    return (
        <div key={id} className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-blue-600">{email}</h3>
            <p className="text-gray-700">{first_name}</p>
            <p className="text-gray-500">{last_name}</p>
            <img src={avatar} alt={first_name} />
            <div className="mt-4">
                <Link
                    to={`/jobs/${id}`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}