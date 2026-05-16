import { useState } from "react";
import axios from "axios";

function ShortestPath({ users }) {

    const [sourceId, setSourceId] = useState("");
    const [targetId, setTargetId] = useState("");

    const [path, setPath] = useState([]);

    const findShortestPath = async () => {

        try {

            const response = await axios.get(

                `http://localhost:5000/api/graph/shortest-path/${sourceId}/${targetId}`
            );

            setPath(response.data.shortestPath);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "No path found"
            );
        }
    };

    return (

        <div className="bg-white p-6 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-2xl w-full max-w-2xl">

            <h2 className="text-2xl font-bold mb-4 text-center">

                Shortest Path Finder

            </h2>

            <select
                value={sourceId}
                onChange={(e) => setSourceId(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
            >

                <option value="">
                    Select Source User
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
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
            >

                <option value="">
                    Select Target User
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
                onClick={findShortestPath}
                className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
            >
                Find Shortest Path
            </button>

            {
                path.length > 0 && (

                    <div className="mt-5 text-center">

                        <p className="font-semibold text-lg">

                            {path.join(" → ")}

                        </p>

                    </div>
                )
            }

        </div>
    );
}

export default ShortestPath;