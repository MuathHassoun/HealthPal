import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold flex items-center gap-2 hover:opacity-90 transition">
                        <span></span> HealthPal
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/" className="hover:text-blue-100 transition font-medium">Home</Link>
                        <Link href="/patients" className="hover:text-blue-100 transition font-medium">Patients</Link>
                        <Link href="/consultations" className="hover:text-blue-100 transition font-medium">Consultations</Link>
                        <Link href="/alerts" className="hover:text-blue-100 transition font-medium">Alerts</Link>
                        <Link href="/donations" className="hover:text-blue-100 transition font-medium">Donations</Link>
                    </nav>
                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-xl">☰</button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-6">
                        <div>
                            <h3 className="text-white font-semibold mb-3">HealthPal</h3>
                            <p className="text-sm">Digital healthcare platform connecting patients, doctors, and donors.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/patients" className="hover:text-white transition">Patients</Link></li>
                                <li><Link href="/consultations" className="hover:text-white transition">Consultations</Link></li>
                                <li><Link href="/donations" className="hover:text-white transition">Donations</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Resources</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/alerts" className="hover:text-white transition">Health Alerts</Link></li>
                                <li><a href="#" className="hover:text-white transition">Support</a></li>
                                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                                <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-6 text-center text-sm">
                        &copy; {new Date().getFullYear()} HealthPal. All rights reserved. | Made with ❤️ for healthcare
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
