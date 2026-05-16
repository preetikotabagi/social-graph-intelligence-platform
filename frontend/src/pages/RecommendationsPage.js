import { useEffect, useState } from "react";
import axios from "axios";

function RecommendationsPage() {

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] =
        useState("");

    const [recommendations, setRecommendations] =
        useState([]);

    const fetchUsers = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/users"
            );

            setUsers(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const fetchRecommendations = async () => {

        try {

            const response = await axios.get(

                `http://localhost:5000/api/graph/recommendations/${selectedUser}`
            );

            setRecommendations(
                response.data.recommendations
            );

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchUsers();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold text-center mb-14 text-blue-700">

                Friend Recommendations

            </h1>

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

                <select
                    value={selectedUser}
                    onChange={(e) =>
                        setSelectedUser(
                            e.target.value
                        )
                    }
                    className="w-full border p-4 rounded-lg mb-6"
                >

                    <option value="">
                        Select User
                    </option>

                    {
                        users.map((user) => (

                            <option
                                key={user._id}
                                value={user._id}
                            >
                                {user.name}
                            </option>
                        ))
                    }

                </select>

                <button
                    onClick={fetchRecommendations}
                    className="w-full bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700"
                >

                    Get Recommendations

                </button>

                <div className="mt-10 space-y-4">

                    {
                        recommendations.length > 0 ? (

                            recommendations.map(
                                (recommendation, index) => (

                                    <div
                                        key={index}
                                        className="bg-gray-100 p-5 rounded-xl"
                                    >

                                        <h2 className="text-2xl font-bold">

                                            {
                                                recommendation.name
                                            }

                                        </h2>

                                        <p className="text-gray-600 mt-2">

                                            Mutual Connections:
                                            {" "}
                                            {
                                                recommendation.mutualConnections
                                            }

                                        </p>

                                    </div>
                                )
                            )

                        ) : (

                            <div className="text-center text-gray-500 text-lg">

                                No recommendations available

                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default RecommendationsPage;