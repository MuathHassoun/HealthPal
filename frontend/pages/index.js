import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
    return (
        <Layout>
            <div className="text-center mt-16">
                <h1 className="text-4xl font-bold mb-4">Welcome to HealthPal</h1>
                <p className="text-lg mb-8">Digital healthcare platform for patients, donors, and doctors.</p>
                <div className="space-x-4">
                    <Link href="/patients" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">View Patients</Link>
                    <Link href="/donations" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">View Donations</Link>
                </div>
            </div>

            <div className="mt-20 grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Patients Overview</h3>
                    <p>See all registered patients and their medical conditions.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Donations Highlight</h3>
                    <p>Track ongoing donations and their progress.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Health Alerts</h3>
                    <p>Latest public health updates and emergency alerts.</p>
                </div>
            </div>
        </Layout>
    );
}
