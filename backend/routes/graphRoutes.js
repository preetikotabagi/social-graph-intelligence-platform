const express = require("express");

const router = express.Router();

const Connection = require("../models/Connection");
const User = require("../models/User");


// SHORTEST PATH USING BFS

router.get("/shortest-path/:sourceId/:targetId", async (req, res) => {

    try {

        const { sourceId, targetId } = req.params;

        const connections = await Connection.find();

        const adjacencyList = {};

        connections.forEach(connection => {

            const source = connection.sourceUserId.toString();
            const target = connection.targetUserId.toString();

            if (!adjacencyList[source]) adjacencyList[source] = [];
            if (!adjacencyList[target]) adjacencyList[target] = [];

            adjacencyList[source].push(target);
            adjacencyList[target].push(source);
        });

        const queue = [[sourceId]];

        const visited = new Set();

        visited.add(sourceId);

        while (queue.length > 0) {

            const path = queue.shift();

            const node = path[path.length - 1];

            if (node === targetId) {

                const users = await User.find({
                    _id: { $in: path }
                });

                const orderedUsers = path.map(id =>
                    users.find(user => user._id.toString() === id)
                );

                return res.json({
                    shortestPath: orderedUsers.map(user => user.name)
                });
            }

            for (const neighbor of adjacencyList[node] || []) {

                if (!visited.has(neighbor)) {

                    visited.add(neighbor);

                    queue.push([...path, neighbor]);
                }
            }
        }

        res.status(404).json({
            message: "No path found"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// MUTUAL CONNECTIONS

router.get(

    "/mutual-connections/:user1/:user2",

    async (req, res) => {

        try {

            const { user1, user2 } = req.params;

            const connections =
                await Connection.find()
                    .populate("sourceUserId", "name")
                    .populate("targetUserId", "name");

            const getNeighbors = (userId) => {

                const neighbors = [];

                connections.forEach((connection) => {

                    const source =
                        connection.sourceUserId._id.toString();

                    const target =
                        connection.targetUserId._id.toString();

                    if (source === userId) {

                        neighbors.push(
                            connection.targetUserId
                        );
                    }

                    if (target === userId) {

                        neighbors.push(
                            connection.sourceUserId
                        );
                    }
                });

                return neighbors;
            };

            const neighbors1 =
                getNeighbors(user1);

            const neighbors2 =
                getNeighbors(user2);

            const mutualConnections =
                neighbors1.filter((userA) =>

                    neighbors2.some((userB) =>

                        userA._id.toString() ===
                        userB._id.toString()
                    )
                );

            const uniqueMutuals =
                [...new Map(

                    mutualConnections.map((user) =>

                        [user._id.toString(), user]
                    )

                ).values()];

            res.json({

                mutualConnections:
                    uniqueMutuals.map(
                        (user) => user.name
                    )
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });
        }
    }
);

// GRAPH STATISTICS

router.get("/stats", async (req, res) => {

    try {

        const users = await User.find();

        const connections =
            await Connection.find();

        const totalUsers =
            users.length;

        const totalConnections =
            connections.length;

        const degreeMap = {};

        users.forEach((user) => {

            degreeMap[user._id] = 0;
        });

        connections.forEach((connection) => {

            degreeMap[
                connection.sourceUserId
            ]++;

            degreeMap[
                connection.targetUserId
            ]++;
        });

        let maxConnections = 0;

        let mostConnectedUser = "";

        users.forEach((user) => {

            if (
                degreeMap[user._id] >
                maxConnections
            ) {

                maxConnections =
                    degreeMap[user._id];

                mostConnectedUser =
                    user.name;
            }
        });

        const averageConnections =
            totalUsers === 0

                ? 0

                : (
                    (2 * totalConnections)
                    / totalUsers
                ).toFixed(2);

        res.json({

            totalUsers,

            totalConnections,

            averageConnections,

            mostConnectedUser,

            maxConnections
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// FRIEND RECOMMENDATIONS

router.get(

    "/recommendations/:userId",

    async (req, res) => {

        try {

            const { userId } = req.params;

            const users =
                await User.find();

            const connections =
                await Connection.find();

            const adjacency = {};

            users.forEach((user) => {

                adjacency[user._id] = new Set();
            });

            connections.forEach((connection) => {

                const source =
                    connection.sourceUserId.toString();

                const target =
                    connection.targetUserId.toString();

                adjacency[source].add(target);

                adjacency[target].add(source);
            });

            const directConnections =
                adjacency[userId];

            const recommendationScores = {};

            directConnections.forEach((friendId) => {

                adjacency[friendId].forEach((friendOfFriend) => {

                    if (

                        friendOfFriend !== userId &&

                        !directConnections.has(
                            friendOfFriend
                        )

                    ) {

                        recommendationScores[
                            friendOfFriend
                        ] =

                            (recommendationScores[
                                friendOfFriend
                            ] || 0) + 1;
                    }
                });
            });

            const recommendations =
                Object.entries(recommendationScores)

                    .sort((a, b) => b[1] - a[1])

                    .map(([id, score]) => {

                        const user =
                            users.find(

                                (u) =>
                                    u._id.toString() === id
                            );

                        return {

                            name: user.name,

                            mutualConnections: score
                        };
                    });

            res.json({
                recommendations
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });
        }
    }
);

// GRAPH DENSITY

router.get("/density", async (req, res) => {

    try {

        const users =
            await User.find();

        const connections =
            await Connection.find();

        const V = users.length;

        const E = connections.length;

        let density = 0;

        if (V > 1) {

            density =
                (
                    (2 * E) /
                    (V * (V - 1))
                ).toFixed(4);
        }

        let interpretation = "";

        if (density > 0.7) {

            interpretation =
                "Highly Connected Network";
        }

        else if (density > 0.3) {

            interpretation =
                "Moderately Connected Network";
        }

        else {

            interpretation =
                "Sparse Network";
        }

        res.json({

            totalUsers: V,

            totalConnections: E,

            density,

            interpretation
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;