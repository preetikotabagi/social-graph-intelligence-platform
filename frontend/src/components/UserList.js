function UserList({ users }) {

    return (

        <div className="bg-white p-6 rounded-xl shadow-lg">

            <div className="space-y-3">

                {
                    users.map((user) => (

                        <div
                            key={user._id}
                            className="border p-3 rounded-lg"
                        >
                            <p className="font-semibold">
                                {user.name}
                            </p>

                            <p className="text-gray-500 text-sm">
                                {user.email}
                            </p>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default UserList;