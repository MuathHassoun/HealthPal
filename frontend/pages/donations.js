import Layout from "../components/Layout";
import { useFetch } from "../hooks/useAPI";
import { apiClient } from "../lib/apiClient";

export default function Donations() {
    const { data: donations, loading, error, refetch } = useFetch(
        () => apiClient.getDonations(),
        []
    );

    const calculateProgress = (amount, goal) => {
        if (!goal || goal === 0) return 0;
        return Math.min((amount / goal) * 100, 100);
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Donations</h1>
                    <button
                        onClick={refetch}
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
                    >
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-700">
                            <strong>Error:</strong> {error}
                        </p>
                    </div>
                )}

                {!loading && donations && donations.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {donations.map((donation) => {
                            const progress = calculateProgress(donation.amount_raised || 0, donation.goal || 100);
                            return (
                                <div
                                    key={donation.id}
                                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {donation.patient_name || donation.patientName || 'Donation'}
                                    </h3>
                                    <div className="space-y-2 text-gray-600 text-sm mb-4">
                                        {donation.treatment && <p><strong>Treatment:</strong> {donation.treatment}</p>}
                                        {donation.reason && <p><strong>Reason:</strong> {donation.reason}</p>}
                                        <p><strong>Raised:</strong> ${donation.amount_raised || donation.amount || 0}</p>
                                        {donation.goal && <p><strong>Goal:</strong> ${donation.goal}</p>}
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2 text-right">{Math.round(progress)}%</p>
                                    <button className="mt-4 w-full bg-green-50 text-green-600 px-4 py-2 rounded hover:bg-green-100 transition font-semibold">
                                        Donate Now
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    !loading && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                            <p className="text-gray-600">No donations available at this time.</p>
                        </div>
                    )
                )}
            </div>
        </Layout>
    );
}
