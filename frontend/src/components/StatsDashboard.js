import { useEffect, useState } from "react";
import axios from "axios";

function StatsDashboard() {

    const [stats, setStats] = useState(null);

    const fetchStats = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/graph/stats"
            );

            setStats(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchStats();

    }, []);

    if (!stats) {

        return null;
    }

    return (

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14">

            <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg text-center">

                <h2 className="text-xl font-bold">

                    Total Users

                </h2>

                <p className="text-4xl mt-3 font-bold">

                    {stats.totalUsers}

                </p>

            </div>

            <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg text-center">

                <h2 className="text-xl font-bold">

                    Total Connections

                </h2>

                <p className="text-4xl mt-3 font-bold">

                    {stats.totalConnections}

                </p>

            </div>

            <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg text-center">

                <h2 className="text-xl font-bold">

                    Average Connections

                </h2>

                <p className="text-4xl mt-3 font-bold">

                    {stats.averageConnections}

                </p>

            </div>

            <div className="bg-orange-600 text-white p-6 rounded-xl shadow-lg text-center">

                <h2 className="text-xl font-bold">

                    Most Connected User

                </h2>

                <p className="text-2xl mt-3 font-bold">

                    {stats.mostConnectedUser}

                </p>

                <p className="mt-2">

                    {stats.maxConnections} connections

                </p>

            </div>

        </div>
    );
}

export default StatsDashboard;