import Layout from "../components/Layout";
import { useFetch, useMutation } from "../hooks/useAPI";
import { apiClient } from "../lib/apiClient";
import { useState } from "react";

export default function Consultations() {
    const { data: consultations, loading, error, refetch } = useFetch(
        () => apiClient.getConsultations(),
        []
    );
    const [showForm, setShowForm] = useState(false);
    const { execute: createConsult, loading: createLoading } = useMutation(apiClient.createConsultation.bind(apiClient));

    const handleCreateConsultation = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            await createConsult(data);
            setShowForm(false);
            refetch();
            e.target.reset();
        } catch (err) {
            console.error('Failed to create consultation:', err);
        }
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Consultations</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        {showForm ? 'Cancel' : 'Schedule Consultation'}
                    </button>
                </div>

                {showForm && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Schedule a New Consultation</h2>
                        <form onSubmit={handleCreateConsultation} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Doctor ID</label>
                                    <input
                                        type="number"
                                        name="doctor_id"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                                    <input
                                        type="number"
                                        name="patient_id"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <select
                                    name="type"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500"
                                >
                                    <option value="">Select Type</option>
                                    <option value="video">Video</option>
                                    <option value="audio">Audio</option>
                                    <option value="chat">Chat</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="datetime-local"
                                    name="date"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                <textarea
                                    name="notes"
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={createLoading}
                                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition"
                            >
                                {createLoading ? 'Scheduling...' : 'Schedule'}
                            </button>
                        </form>
                    </div>
                )}

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-700">
                            <strong>Error:</strong> {error}
                        </p>
                    </div>
                )}

                {!loading && consultations && consultations.length > 0 ? (
                    <div className="space-y-4">
                        {consultations.map((consultation) => (
                            <div
                                key={consultation.id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {consultation.type?.toUpperCase() || 'Consultation'} Consultation
                                        </h3>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            {consultation.Doctor?.User && (
                                                <p><strong>Doctor:</strong> {consultation.Doctor.User.full_name}</p>
                                            )}
                                            {consultation.Patient?.User && (
                                                <p><strong>Patient:</strong> {consultation.Patient.User.full_name}</p>
                                            )}
                                            {consultation.date && (
                                                <p><strong>Date:</strong> {new Date(consultation.date).toLocaleString()}</p>
                                            )}
                                            {consultation.notes && (
                                                <p><strong>Notes:</strong> {consultation.notes}</p>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${ consultation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : consultation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {consultation.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                            <p className="text-gray-600">No consultations scheduled yet.</p>
                        </div>
                    )
                )}
            </div>
        </Layout>
    );
}
