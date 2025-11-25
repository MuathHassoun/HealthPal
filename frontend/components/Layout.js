import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto px-4 flex items-center gap-8">
                    <h1 className="text-xl font-bold">HealthPal</h1>
                    <nav className="flex space-x-4">
                        <a href="/" className="hover:underline">Home</a>
                        <a href="/patients" className="hover:underline">Patients</a>
                        <a href="/donations" className="hover:underline">Donations</a>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-6">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4 mt-auto">
                <div className="container mx-auto px-4 text-center">
                    &copy; {new Date().getFullYear()} HealthPal. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
