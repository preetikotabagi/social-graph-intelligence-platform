import { useState } from "react";
import axios from "axios";

function ConnectionForm({ users, fetchConnections }) {

    const [sourceUserId, setSourceUserId] = useState("");
    const [targetUserId, setTargetUserId] = useState("");

    const createConnection = async () => {

        try {

            await axios.post(
                "http://localhost:5000/api/connections/connect",
                {
                    sourceUserId,
                    targetUserId
                }
            );

            alert("Connection created successfully");
            fetchConnections();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Error creating connection"
            );
        }
    };

    return (

        <div className="bg-white p-6 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-2xl w-full max-w-2xl">

            <h2 className="text-2xl font-bold mb-4 text-center">

                Create Connection

            </h2>

            <select
                value={sourceUserId}
                onChange={(e) => setSourceUserId(e.target.value)}
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
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
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
                onClick={createConnection}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
            >
                Connect Users
            </button>

        </div>
    );
}

export default ConnectionForm;