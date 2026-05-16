import { useState, useEffect } from "react";
import axios from "axios";

function RemoveConnection({

    fetchConnections

}) {

    const [connections, setConnections] =
        useState([]);

    const [selectedConnection, setSelectedConnection] =
        useState("");

    const fetchAllConnections = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/connections"
            );

            setConnections(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const removeConnection = async () => {

        if (!selectedConnection) {

            alert("Select a connection");

            return;
        }

        try {

            await axios.delete(

                `http://localhost:5000/api/connections/${selectedConnection}`
            );

            alert("Connection removed successfully");

            fetchAllConnections();

            fetchConnections();

        } catch (error) {

            console.log(error);

            alert("Error removing connection");
        }
    };

    useEffect(() => {

        fetchAllConnections();

    }, []);

    return (

        <div className="bg-white p-6 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-2xl w-full max-w-2xl">

            <h2 className="text-2xl font-bold mb-4 text-center">

                Remove Connection

            </h2>

            <select
                value={selectedConnection}
                onChange={(e) =>
                    setSelectedConnection(
                        e.target.value
                    )
                }
                className="w-full border p-3 rounded-lg mb-4"
            >

                <option value="">
                    Select Connection
                </option>

                {
                    connections.map((connection) => (

                        <option
                            key={connection._id}
                            value={connection._id}
                        >

                            {
                                connection.sourceUserId.name
                            }

                            {" ↔ "}

                            {
                                connection.targetUserId.name
                            }

                        </option>
                    ))
                }

            </select>

            <button
                onClick={removeConnection}
                className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700"
            >

                Remove Connection

            </button>

        </div>
    );
}

export default RemoveConnection;