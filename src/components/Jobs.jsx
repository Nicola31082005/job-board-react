import { useEffect, useState } from "react";
import JobApplicantListItem from "./JobApplicantListItem";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then(response => response.json())
            .then(data => setJobs(data.data))
    }, [])


    return (
        <div className="max-w-7xl mx-auto px-6 py-22">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Job Applicants</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => {
                    return (
                        <JobApplicantListItem
                            key={job.id}
                            id={job.id}
                            email={job.email}
                            first_name={job.first_name}
                            last_name={job.last_name}
                            avatar={job.avatar}
                        />
                    )

                })}
            </div>
        </div>
    );
}