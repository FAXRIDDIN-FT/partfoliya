import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/main-logo.svg";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        setIsDarkMode(document.body.classList.contains('dark'));
    }, []);

    const handleTheme = () => {
        document.body.classList.toggle("dark");
        setIsDarkMode(!isDarkMode);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleLanguageDropdown = () => {
        setIsLanguageOpen(!isLanguageOpen);
    };

    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <div>
                            <img src={logo} alt=""/>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors duration-200 hover:text-red-400 ${
                                    isActive ? "text-red-500" : "text-gray-700 dark:text-gray-300"
                                }`
                            }
                        >
                            Schedule
                        </NavLink>
                        <NavLink
                            to="/movies"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors duration-200 hover:text-red-400 ${
                                    isActive ? "text-red-500" : "text-gray-700 dark:text-gray-300"
                                }`
                            }
                        >
                            Showtimes
                        </NavLink>
                        <NavLink
                            to="/tickets"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors duration-200 hover:text-red-400 ${
                                    isActive ? "text-red-500" : "text-gray-700 dark:text-gray-300"
                                }`
                            }
                        >
                            Wishlist
                        </NavLink>
                        <NavLink
                            to="/search"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors duration-200 hover:text-red-400 ${
                                    isActive ? "text-red-500" : "text-gray-700 dark:text-gray-300"
                                }`
                            }
                        >
                            Search
                        </NavLink>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <div className="relative hidden sm:block">
                            <button
                                onClick={toggleLanguageDropdown}
                                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                            >
                                <span className="text-sm font-medium">🇷🇺</span>
                                <span className="text-sm font-medium">Ru</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {isLanguageOpen && (
                                <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 transition-colors duration-200">
                                    <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                                        🇷🇺 Ru
                                    </button>
                                    <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                                        🇺🇸 En
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleTheme}
                            className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <button className="hidden sm:block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25">
                            Login
                        </button>

                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-lg ${
                                        isActive
                                            ? "text-red-500 bg-gray-100 dark:bg-gray-800"
                                            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Schedule
                            </NavLink>
                            <NavLink
                                to="/movies"
                                className={({ isActive }) =>
                                    `block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-lg ${
                                        isActive
                                            ? "text-red-500 bg-gray-100 dark:bg-gray-800"
                                            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Showtimes
                            </NavLink>
                            <NavLink
                                to="/tickets"
                                className={({ isActive }) =>
                                    `block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-lg ${
                                        isActive
                                            ? "text-red-500 bg-gray-100 dark:bg-gray-800"
                                            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                wishlist
                            </NavLink>
                            <NavLink
                                to="/search"
                                className={({ isActive }) =>
                                    `block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-lg ${
                                        isActive
                                            ? "text-red-500 bg-gray-100 dark:bg-gray-800"
                                            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Search
                            </NavLink>
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-all duration-200">
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
