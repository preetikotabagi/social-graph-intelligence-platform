const express = require("express");

const router = express.Router();

const Connection = require("../models/Connection");


// CREATE CONNECTION

router.post("/connect", async (req, res) => {

    try {

        const { sourceUserId, targetUserId } = req.body;

        if (sourceUserId === targetUserId) {

            return res.status(400).json({
                message: "User cannot connect to themselves"
            });
        }

        const existingConnection =
            await Connection.findOne({

                $or: [

                    {
                        sourceUserId,
                        targetUserId
                    },

                    {
                        sourceUserId: targetUserId,
                        targetUserId: sourceUserId
                    }
                ]
            });

        if (existingConnection) {

            return res.status(400).json({
                message: "Connection already exists"
            });
        }

        const connection = new Connection({
            sourceUserId,
            targetUserId
        });

        await connection.save();

        res.status(201).json({
            message: "Users connected successfully",
            connection
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// GET ALL CONNECTIONS

router.get("/", async (req, res) => {

    try {

        const connections = await Connection.find()
            .populate("sourceUserId", "name")
            .populate("targetUserId", "name");

        res.json(connections);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// REMOVE CONNECTION

router.delete("/:id", async (req, res) => {

    try {

        await Connection.findByIdAndDelete(
            req.params.id
        );

        res.json({

            message:
                "Connection removed successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;