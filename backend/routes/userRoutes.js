const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Connection = require("../models/Connection");


// CREATE USER

router.post("/create", async (req, res) => {

    try {

        let { name, email } = req.body;

        name = name.trim();
        email = email.trim().toLowerCase();

        if (!name || !email) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const newUser = new User({
            name,
            email
        });

        await newUser.save();

        res.status(201).json(newUser);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// GET ALL USERS

router.get("/", async (req, res) => {

    try {

        const users = await User.find();

        res.json(users);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// DELETE USER

router.delete("/:id", async (req, res) => {

    try {

        const userId = req.params.id;

        await User.findByIdAndDelete(userId);

        await Connection.deleteMany({

            $or: [

                { sourceUserId: userId },

                { targetUserId: userId }
            ]
        });

        res.json({

            message:
                "User and related connections deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;