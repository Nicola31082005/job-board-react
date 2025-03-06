import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white shadow-md fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    JobFinder
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="text-gray-700 hover:text-blue-600">
                        Home
                    </Link>
                    <Link to="/jobs" className="text-gray-700 hover:text-blue-600">
                        Jobs
                    </Link>
                    <Link to="/about" className="text-gray-700 hover:text-blue-600">
                        About
                    </Link>
                    <Link to="/contact" className="text-gray-700 hover:text-blue-600">
                        Contact
                    </Link>
                </nav>

                {/* Post a Job Button */}
                <Link
                    to="/post-job"
                    className="hidden md:block px-5 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700"
                >
                    Post a Job
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
                    <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">
                        Home
                    </Link>
                    <Link to="/jobs" className="block py-2 text-gray-700 hover:text-blue-600">
                        Jobs
                    </Link>
                    <Link to="/about" className="block py-2 text-gray-700 hover:text-blue-600">
                        About
                    </Link>
                    <Link to="/contact" className="block py-2 text-gray-700 hover:text-blue-600">
                        Contact
                    </Link>
                    <Link
                        to="/post-job"
                        className="block mt-4 px-5 py-2 bg-blue-600 text-white font-semibold text-center rounded-full hover:bg-blue-700"
                    >
                        Post a Job
                    </Link>
                </nav>
            )}
        </header>
    );
}
