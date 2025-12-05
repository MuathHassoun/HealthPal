import Layout from "../components/Layout";
import { useFetch } from "../hooks/useAPI";
import { apiClient } from "../lib/apiClient";

export default function Alerts() {
    const { data: alerts, loading, error, refetch } = useFetch(
        () => apiClient.getAlerts(),
        []
    );

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high':
                return 'bg-red-100 text-red-800 border-red-300';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'low':
                return 'bg-green-100 text-green-800 border-green-300';
            default:
                return 'bg-blue-100 text-blue-800 border-blue-300';
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Health Alerts</h1>
                    <button
                        onClick={refetch}
                        disabled={loading}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition"
                    >
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-700">
                            <strong>Error:</strong> {error}
                        </p>
                    </div>
                )}

                {!loading && alerts && alerts.length > 0 ? (
                    <div className="space-y-4">
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                className={`border-l-4 rounded-lg shadow-md p-6 bg-white transition hover:shadow-lg`}
                                style={{
                                    borderLeftColor: alert.priority === 'high' ? '#dc2626' : alert.priority === 'medium' ? '#f59e0b' : '#10b981',
                                }}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {alert.title || alert.message}
                                        </h3>
                                        <p className="text-gray-600 mb-3">
                                            {alert.description || alert.content}
                                        </p>
                                        {alert.affected_area && (
                                            <p className="text-sm text-gray-500">
                                                <strong>Location:</strong> {alert.affected_area}
                                            </p>
                                        )}
                                        {alert.date && (
                                            <p className="text-sm text-gray-500 mt-2">
                                                <strong>Date:</strong> {new Date(alert.date).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-4 border ${getPriorityColor(alert.priority)}`}>
                                        {alert.priority || 'Normal'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                            <p className="text-gray-600">No health alerts at this time.</p>
                        </div>
                    )
                )}
            </div>
        </Layout>
    );
}
