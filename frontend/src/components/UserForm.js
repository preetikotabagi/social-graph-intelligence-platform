import { useState } from "react";
import axios from "axios";

function UserForm({ fetchUsers }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const createUser = async () => {

        try {

            await axios.post(
                "http://localhost:5000/api/users/create",
                {
                    name,
                    email
                }
            );

            alert("User created successfully");
            fetchUsers();

            setName("");
            setEmail("");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Error creating user"
            );
        }
    };

    return (

        <div className="bg-white p-6 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-2xl w-full max-w-2xl">

            <h2 className="text-2xl font-bold mb-4 text-center">

                Create User

            </h2>

            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
            />

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"
            />

            <button
                onClick={createUser}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
                Create User
            </button>

        </div>
    );
}

export default UserForm;