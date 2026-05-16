import CytoscapeComponent from "react-cytoscapejs";

import { useEffect, useState } from "react";

function GraphView({ users, connections }) {

    const elements = [];

    const [mounted, setMounted] =
        useState(false);

    useEffect(() => {

        setMounted(true);

    }, []);

    users.forEach((user) => {

        elements.push({

            data: {

                id: user._id,

                label: user.name
            }
        });
    });

    connections.forEach((connection) => {

        elements.push({

            data: {

                source:
                    connection.sourceUserId._id,

                target:
                    connection.targetUserId._id
            }
        });
    });


    if (!mounted) {
        return null;
    }

    return (

        <div className="w-full max-w-7xl mx-auto bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-700">

            <h2 className="text-4xl font-bold text-center mb-8 text-white">

                Social Network Visualization

            </h2>

            <div className="rounded-2xl overflow-hidden border border-gray-700">

                <CytoscapeComponent
                    key={elements.length}
                    elements={elements}

                    style={{

                        width: "100%",

                        height: "750px",

                        background: "#111827"
                    }}
                    layout={{

                        name: "grid",

                        fit: true,

                        padding: 120,

                        avoidOverlap: true
                    }}

                    zoomingEnabled={false}

                    userZoomingEnabled={false}

                    panningEnabled={false}

                    userPanningEnabled={false}

                    boxSelectionEnabled={false}

                    autoungrabify={true}

                    autolock={false}

                    stylesheet={[

                        {
                            selector: "node",

                            style: {

                                label: "data(label)",

                                width: 70,

                                height: 70,

                                "background-color": "#3b82f6",

                                color: "#ffffff",

                                "font-size": "14px",

                                "font-weight": "bold",

                                "text-valign": "center",

                                "text-halign": "center",

                                "text-outline-width": 2,

                                "text-outline-color":
                                    "#2563eb",

                                "border-width": 4,

                                "border-color":
                                    "#93c5fd"
                            }
                        },

                        {
                            selector: "edge",

                            style: {

                                width: 4,

                                "line-color": "#9ca3af",

                                "target-arrow-color":
                                    "#9ca3af",

                                "curve-style":
                                    "bezier",

                                opacity: 0.9
                            }
                        }
                    ]}
                />

            </div>

        </div>
    );
}

export default GraphView;