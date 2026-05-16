import { useState } from "react";
import axios from "axios";

function DeleteUser({

    users,
    fetchUsers,
    fetchConnections

}) {

    const [selectedUser, setSelectedUser] =
        useState("");

    const deleteUser = async () => {

        if (!selectedUser) {

            alert("Select a user");

            return;
        }

        try {

            await axios.delete(

                `http://localhost:5000/api/users/${selectedUser}`
            );

            alert("User deleted successfully");

            fetchUsers();

            fetchConnections();

        } catch (error) {

            console.log(error);

            alert("Error deleting user");
        }
    };

    return (

        <div className="bg-white p-6 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-2xl w-full max-w-2xl">

            <h2 className="text-2xl font-bold mb-4 text-center">

                Delete User

            </h2>

            <select
                value={selectedUser}
                onChange={(e) =>
                    setSelectedUser(e.target.value)
                }
                className="w-full border p-3 rounded-lg mb-4"
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
                onClick={deleteUser}
                className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700"
            >

                Delete User

            </button>

        </div>
    );
}

export default DeleteUser;