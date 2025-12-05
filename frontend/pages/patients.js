import Layout from "../components/Layout";
import { useFetch } from "../hooks/useAPI";
import { apiClient } from "../lib/apiClient";

export default function Patients() {
    const { data: patients, loading, error, refetch } = useFetch(
        () => apiClient.getPatients(),
        []
    );

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Patients List</h1>
                    <button
                        onClick={refetch}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
                    >
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-700">
                            <strong>Error:</strong> {error}
                        </p>
                    </div>
                )}

                {!loading && patients && patients.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {patients.map((patient) => (
                            <div
                                key={patient.id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {patient.full_name || patient.name}
                                </h3>
                                <div className="space-y-2 text-gray-600 text-sm">
                                    {patient.email && <p><strong>Email:</strong> {patient.email}</p>}
                                    {patient.phone && <p><strong>Phone:</strong> {patient.phone}</p>}
                                    {patient.medical_history && <p><strong>Medical History:</strong> {patient.medical_history}</p>}
                                </div>
                                <button className="mt-4 w-full bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                            <p className="text-gray-600">No patients found. Check back later.</p>
                        </div>
                    )
                )}
            </div>
        </Layout>
    );
}


