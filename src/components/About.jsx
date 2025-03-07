import { useNavigate } from "react-router";

export default function About() {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            {/* Background Blur Effect */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 bg-white bg-opacity-5 backdrop-blur-lg rounded-xl shadow-2xl border border-white border-opacity-20">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
                    About Us
                </h1>
                <p className="text-lg sm:text-xl opacity-90 mb-8">
                    Welcome to <span className="font-semibold">JobFinder</span>, your go-to platform for discovering and applying to the best job opportunities in tech, design, and beyond. We’re here to connect talented individuals with their dream jobs and help companies find the perfect candidates.
                </p>

                {/* Mission Section */}
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                        Our Mission
                    </h2>
                    <p className="text-lg sm:text-xl opacity-90">
                        Our mission is to simplify the job search process and empower job seekers with the tools they need to succeed. Whether you're a recent graduate or a seasoned professional, we’re here to support you every step of the way.
                    </p>
                </div>

                {/* Values Section */}
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                        Our Values
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-6 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20">
                            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                            <p className="opacity-90">
                                We believe in clear and honest communication with our users.
                            </p>
                        </div>
                        <div className="p-6 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20">
                            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                            <p className="opacity-90">
                                We’re constantly improving our platform to better serve you.
                            </p>
                        </div>
                        <div className="p-6 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20">
                            <h3 className="text-xl font-semibold mb-2">Community</h3>
                            <p className="opacity-90">
                                We foster a supportive community for job seekers and employers alike.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8">
                    <button
                        onClick={handleBackToHome}
                        className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-200 transition"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </section>
    );
}