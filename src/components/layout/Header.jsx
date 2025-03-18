import { Bars3Icon, XMarkIcon, UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import AuthContext from "../../context/authContext";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

  // Get auth data from context
  const { authData, clearAuthData } = useContext(AuthContext);
  const { user, token } = authData;

    const handleLogout = () => {
        clearAuthData();
        navigate('/')
    };

    const isActivePath = (path) => {
        return location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-700";
    };

    return (
        <header className="bg-white shadow-md fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600 cursor-pointer">
                    JobFinder
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6 items-center">
                    <div className="flex space-x-6">
                        <Link
                            to="/"
                            className={`${isActivePath('/')} hover:text-blue-600 transition-colors duration-200 cursor-pointer`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            className={`${isActivePath('/jobs')} hover:text-blue-600 transition-colors duration-200 cursor-pointer`}
                        >
                            Applicants
                        </Link>
                        <Link
                            to="/about"
                            className={`${isActivePath('/about')} hover:text-blue-600 transition-colors duration-200 cursor-pointer`}
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className={`${isActivePath('/contact')} hover:text-blue-600 transition-colors duration-200 cursor-pointer`}
                        >
                            Contact
                        </Link>
                    </div>
                </nav>

                {/* Auth Links (Login/Register/Profile) */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Post a Job Button */}
                    <Link
                        to="/post-job"
                        className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer ml-4"
                    >
                        Apply for a job
                    </Link>

                    {token ? (
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/profile"
                                className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg ${isActivePath('/profile')} hover:text-blue-600 hover:border-blue-600 transition-colors duration-200`}
                            >
                                <UserIcon className="w-5 h-5 mr-2" />
                                {user?.username || "Profile"}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                            >
                                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-colors duration-200"
                            >
                                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md"
                            >
                                <UserIcon className="w-5 h-5 mr-2" />
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 cursor-pointer hover:text-blue-600 transition-colors duration-200"
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
                        className={`block py-2 ${isActivePath('/')} hover:text-blue-600 transition-colors duration-200 cursor-pointer`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/jobs"
                        className={`block py-2 ${isActivePath('/jobs')} hover:text-blue-600 transition-colors duration-200 cursor-pointer`}
                    >
                        Jobs
                    </Link>
                    <Link
                        to="/about"
                        className={`block py-2 ${isActivePath('/about')} hover:text-blue-600 transition-colors duration-200 cursor-pointer`}
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className={`block py-2 ${isActivePath('/contact')} hover:text-blue-600 transition-colors duration-200 cursor-pointer`}
                    >
                        Contact
                    </Link>
                    <Link
                        to="/post-job"
                        className="block mt-4 px-5 py-2 bg-green-600 text-white font-semibold text-center rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer"
                    >
                        Apply for a Job
                    </Link>

                    {/* Separated Auth Links for Mobile */}
                    <div className="mt-5 pt-5 border-t border-gray-200 flex flex-col gap-3">
                        {token ? (
                            <>
                                <Link
                                    to="/profile"
                                    className={`flex items-center py-2 px-4 border border-gray-300 rounded-lg ${isActivePath('/profile')} hover:text-blue-600 hover:border-blue-600 transition-colors duration-200`}
                                >
                                    <UserIcon className="w-5 h-5 mr-2" />
                                    {user?.username || "Profile"}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center py-2 px-4 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-colors duration-200"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md"
                                >
                                    <UserIcon className="w-5 h-5 mr-2" />
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
}