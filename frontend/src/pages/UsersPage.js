import { useEffect, useState } from "react";
import axios from "axios";

import UserList from "../components/UserList";

function UsersPage() {

    const [users, setUsers] = useState([]);

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

    useEffect(() => {

        fetchUsers();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold text-center mb-14 text-blue-700">

                Network Users

            </h1>

            <div className="flex justify-center">

                <div className="w-full max-w-3xl">

                    <UserList users={users} />

                </div>

            </div>

        </div>
    );
}

export default UsersPage;