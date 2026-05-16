import { Link } from "react-router-dom";

function NavigationCards() {

    const cards = [

        {
            title: "Network Users",
            description:
                "View all users in the social network.",
            path: "/users",
            color: "bg-blue-600"
        },

        {
            title: "Analytics Dashboard",
            description:
                "Analyze graph statistics and insights.",
            path: "/analytics",
            color: "bg-green-600"
        },

        {
            title: "Friend Recommendations",
            description:
                "Discover recommended new connections.",
            path: "/recommendations",
            color: "bg-purple-600"
        },

        {
            title: "Graph Density Metrics",
            description:
                "Measure graph connectivity strength.",
            path: "/density",
            color: "bg-orange-600"
        }
    ];

    return (

        <div className="mt-16">

            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">

                Advanced Analytics Modules

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {
                    cards.map((card, index) => (

                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-lg"
                        >

                            <h3 className="text-2xl font-bold mb-4">

                                {card.title}

                            </h3>

                            <p className="text-gray-600 mb-6">

                                {card.description}

                            </p>

                            <Link
                                to={card.path}
                            >

                                <button
                                    className={`${card.color} text-white px-6 py-3 rounded-lg hover:opacity-90`}
                                >

                                    Open Module

                                </button>

                            </Link>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default NavigationCards;