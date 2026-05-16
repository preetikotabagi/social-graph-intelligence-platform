import { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";
import ConnectionForm from "../components/ConnectionForm";
import ShortestPath from "../components/ShortestPath";
import MutualConnections from "../components/MutualConnections";
import DeleteUser from "../components/DeleteUser";
import RemoveConnection from "../components/RemoveConnection";
import GraphView from "../components/GraphView";
import NavigationCards from "../components/NavigationCards";

function HomePage() {

    const [users, setUsers] = useState([]);

    const [connections, setConnections] =
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

    const fetchConnections = async () => {

        try {

            const response = await axios.get(

                "http://localhost:5000/api/connections"
            );

            setConnections(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchUsers();

        fetchConnections();

    }, []);

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 p-10">

          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl font-extrabold text-center mb-6 text-blue-700">

                Social Graph Intelligence Platform

            </h1>

            <p className="text-center text-gray-600 text-xl mb-14">

                Advanced Social Network Analysis and Graph Intelligence Dashboard

            </p>

            {/* GRAPH HERO SECTION */}

            <div className="mb-20">

                <GraphView

                    users={users}

                    connections={connections}
                />

            </div>

            {/* CORE FEATURES */}

            <div className="mb-20">

                    <h2 className="text-5xl font-bold text-center mb-12 text-gray-800">

                        Core Network Operations

                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        <UserForm
                            fetchUsers={fetchUsers}
                        />

                        <ConnectionForm
                            users={users}
                            fetchConnections={
                                fetchConnections
                            }
                        />

                        <ShortestPath
                            users={users}
                        />

                        <MutualConnections
                            users={users}
                        />

                        <DeleteUser
                            users={users}
                            fetchUsers={fetchUsers}
                            fetchConnections={
                                fetchConnections
                            }
                        />

                        <RemoveConnection
                            fetchConnections={
                                fetchConnections
                            }
                        />

                    </div>

                </div>

                {/* ADVANCED MODULES */}

                <NavigationCards />
           </div>
        </div>
    );
}

export default HomePage;