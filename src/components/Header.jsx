import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation } from "react-router";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActivePath = (path) => {
        return location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-700";
    };

    return (
        <header className="bg-white shadow-md fixed top-0 w-full z-50 ">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    JobFinder
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6">
                    <Link
                        to="/"
                        className={`${isActivePath('/')} hover:text-blue-600 transition-colors duration-200`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/jobs"
                        className={`${isActivePath('/jobs')} hover:text-blue-600 transition-colors duration-200`}
                    >
                        Applicants
                    </Link>
                    <Link
                        to="/about"
                        className={`${isActivePath('/about')} hover:text-blue-600 transition-colors duration-200`}
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className={`${isActivePath('/contact')} hover:text-blue-600 transition-colors duration-200`}
                    >
                        Contact
                    </Link>
                </nav>

                {/* Post a Job Button */}
                <Link
                    to="/post-job"
                    className="hidden md:block px-5 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-200"
                >
                    Apply for a job
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <nav className="md:hidden bg-white border-t p-4">
                    <Link
                        to="/"
                        className={`block py-2 ${isActivePath('/')} hover:text-blue-600 transition-colors duration-200`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/jobs"
                        className={`block py-2 ${isActivePath('/jobs')} hover:text-blue-600 transition-colors duration-200`}
                    >
                        Jobs
                    </Link>
                    <Link
                        to="/about"
                        className={`block py-2 ${isActivePath('/about')} hover:text-blue-600 transition-colors duration-200`}
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className={`block py-2 ${isActivePath('/contact')} hover:text-blue-600 transition-colors duration-200`}
                    >
                        Contact
                    </Link>
                    <Link
                        to="/post-job"
                        className="block mt-4 px-5 py-2 bg-blue-600 text-white font-semibold text-center rounded-full hover:bg-blue-700 transition-colors duration-200"
                    >
                        Post a Job
                    </Link>
                </nav>
            )}
        </header>
    );
}