import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 ">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                {/* Logo & Copyright */}
                <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold text-white">JobFinder</h2>
                    <p className="text-sm mt-2">© 2025 JobFinder. All rights reserved.</p>
                </div>

                {/* Footer Links */}
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link to="/about" className="hover:text-white">
                        About
                    </Link>
                    <Link to="/contact" className="hover:text-white">
                        Contact
                    </Link>
                    <Link to="/privacy" className="hover:text-white">
                        Privacy Policy
                    </Link>
                    <Link to="/terms" className="hover:text-white">
                        Terms of Use
                    </Link>
                </div>
            </div>
        </footer>
    );
}