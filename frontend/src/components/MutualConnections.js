import { useState } from "react";
import axios from "axios";

function MutualConnections({ users }) {

    const [user1, setUser1] = useState("");
    const [user2, setUser2] = useState("");

    const [mutuals, setMutuals] = useState([]);

    const fetchMutualConnections = async () => {

        try {

            const response = await axios.get(

                `http://localhost:5000/api/graph/mutual-connections/${user1}/${user2}`
            );

            setMutuals(
                response.data.mutualConnections
            );

        } catch (error) {

            console.log(error);

            alert("Error fetching mutual connections");
        }
    };

    return (

        <div className="bg-white p-6 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-2xl w-full max-w-2xl">

            <h2 className="text-2xl font-bold mb-4 text-center">

                Mutual Connections

            </h2>

            <select
                value={user1}
                onChange={(e) => setUser1(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
            >

                <option value="">
                    Select First User
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

            <select
                value={user2}
                onChange={(e) => setUser2(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
            >

                <option value="">
                    Select Second User
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
                onClick={fetchMutualConnections}
                className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700"
            >
                Find Mutual Connections
            </button>

            {
                mutuals.length > 0 && (

                    <div className="mt-5">

                        <h3 className="font-bold mb-2">

                            Mutual Connections:
                        </h3>

                        {
                            mutuals.map((name, index) => (

                                <p key={index}>
                                    • {name}
                                </p>
                            ))
                        }

                    </div>
                )
            }

        </div>
    );
}

export default MutualConnections;