import { useEffect, useState } from "react";
import axios from "axios";

function DensityPage() {

    const [densityData, setDensityData] =
        useState(null);

    const fetchDensity = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/graph/density"
            );

            setDensityData(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchDensity();

    }, []);

    if (!densityData) {

        return null;
    }

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold text-center mb-14 text-blue-700">

                Graph Density Metrics

            </h1>

            <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    <div className="bg-blue-600 text-white p-8 rounded-xl text-center">

                        <h2 className="text-2xl font-bold">

                            Total Users

                        </h2>

                        <p className="text-5xl mt-4 font-bold">

                            {densityData.totalUsers}

                        </p>

                    </div>

                    <div className="bg-green-600 text-white p-8 rounded-xl text-center">

                        <h2 className="text-2xl font-bold">

                            Total Connections

                        </h2>

                        <p className="text-5xl mt-4 font-bold">

                            {densityData.totalConnections}

                        </p>

                    </div>

                </div>

                <div className="mt-10 bg-purple-600 text-white p-10 rounded-xl text-center">

                    <h2 className="text-3xl font-bold">

                        Graph Density

                    </h2>

                    <p className="text-6xl mt-5 font-bold">

                        {densityData.density}

                    </p>

                    <p className="text-2xl mt-5">

                        {densityData.interpretation}

                    </p>

                </div>

            </div>

        </div>
    );
}

export default DensityPage;