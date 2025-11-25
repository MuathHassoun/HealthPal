import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Donations() {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/donations")
            .then(res => res.json())
            .then(data => setDonations(data));
    }, []);

    return (
        <Layout>
            <h2 className="text-2xl font-bold mb-6">Donations</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {donations.map(donation => (
                    <div key={donation.id} className="p-6 bg-white rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-2">{donation.patientName}</h3>
                        <p>Treatment: {donation.treatment}</p>
                        <p>Raised: ${donation.amount}</p>
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                            <div className="bg-green-600 h-3 rounded-full" style={{ width: `${(donation.amount / donation.goal) * 100}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
