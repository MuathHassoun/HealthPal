import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
    return (
        <Layout>
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 mb-16">
                <div className="text-center py-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                        Welcome to <span className="text-blue-600">HealthPal</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Digital healthcare platform connecting patients, doctors, donors, and health advocates for better care
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/patients" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg">
                            View Patients
                        </Link>
                        <Link href="/donations" className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition font-semibold text-lg">
                            Help with Donations
                        </Link>
                        <Link href="/consultations" className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition font-semibold text-lg">
                            Book Consultation
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto px-4 mb-16">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Services</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <Link href="/patients" className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition cursor-pointer group">
                        <div className="text-5xl mb-4"></div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition">Patient Portal</h3>
                        <p className="text-gray-600 mb-4">Browse patient profiles, medical histories, and connect with healthcare professionals.</p>
                        <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition inline-block">Learn more →</span>
                    </Link>

                    <Link href="/consultations" className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition cursor-pointer group">
                        <div className="text-5xl mb-4"></div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition">Consultations</h3>
                        <p className="text-gray-600 mb-4">Schedule and manage medical consultations with qualified doctors via video, audio, or chat.</p>
                        <span className="text-purple-600 font-semibold group-hover:translate-x-1 transition inline-block">Learn more →</span>
                    </Link>

                    <Link href="/donations" className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition cursor-pointer group">
                        <div className="text-5xl mb-4"></div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition">Donations</h3>
                        <p className="text-gray-600 mb-4">Support patients in need by contributing to their treatment and recovery funds.</p>
                        <span className="text-green-600 font-semibold group-hover:translate-x-1 transition inline-block">Learn more →</span>
                    </Link>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-6xl mx-auto px-4 mb-16">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold mb-2">2,500+</div>
                            <p className="text-blue-100">Patients Registered</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">500+</div>
                            <p className="text-blue-100">Healthcare Professionals</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">$1M+</div>
                            <p className="text-blue-100">Donations Raised</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alerts Section */}
            <div className="max-w-6xl mx-auto px-4 mb-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-900">Latest Health Alerts</h2>
                    <Link href="/alerts" className="text-blue-600 font-semibold hover:text-blue-700">View All →</Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Flu Season Alert</h3>
                        <p className="text-gray-600 mb-4">The flu season is at its peak. Please follow preventive measures and get vaccinated.</p>
                        <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">High Priority</span>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-600">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Mental Health Awareness</h3>
                        <p className="text-gray-600 mb-4">Mental health is important. Schedule your consultation with our licensed counselors today.</p>
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">Medium Priority</span>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-6xl mx-auto px-4 mb-16">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white text-center">
                    <h2 className="text-4xl font-bold mb-4">Get Started Today</h2>
                    <p className="text-xl text-indigo-100 mb-8">Join thousands of people taking control of their health journey</p>
                    <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold text-lg">
                        Create Account
                    </button>
                </div>
            </div>
        </Layout>
    );
}

