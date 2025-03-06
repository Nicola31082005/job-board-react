import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";


export default function Home() {

    let navigate = useNavigate()


    const browseJobsClickHandler = () => {
        navigate('/jobs')
    }

    const postJobClickHandler = () => {
        navigate('/post-job')
    }

    return (

        <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
            {/* Background Blur Effect */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-6xl font-extrabold">
                    Find Your Dream Job Today
                </h1>
                <p className="mt-4 text-lg sm:text-xl opacity-90">
                    Explore thousands of job opportunities in tech, design, and more.
                </p>

                {/* Search Bar */}
                <div className="mt-6 flex items-center justify-center w-full">
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Search for jobs..."
                            className="w-full p-4 pl-12 text-gray-900 bg-white rounded-full shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-6 flex justify-center gap-4">
                    <button onClick={browseJobsClickHandler} className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
                        Browse Applicants
                    </button>
                    <button onClick={postJobClickHandler} className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-full shadow-md hover:bg-blue-800 transition">
                        Apply for a job
                    </button>
                </div>
            </div>
        </section>
    );
}