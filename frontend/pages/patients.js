// pages/patients.js
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

export default function Patients() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/patients")
            .then((res) => res.json())
            .then((data) => setPatients(data));
    }, []);

    return (
        <Layout>
            <h2>Patients List</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {patients.map((patient) => (
                    <li key={patient.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        {patient.name} - {patient.condition}
                    </li>
                ))}
            </ul>
        </Layout>
    );
}


