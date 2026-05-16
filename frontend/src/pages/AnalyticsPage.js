import StatsDashboard from "../components/StatsDashboard";

function AnalyticsPage() {

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold text-center mb-14 text-blue-700">

                Network Analytics Dashboard

            </h1>

            <StatsDashboard />

        </div>
    );
}

export default AnalyticsPage;