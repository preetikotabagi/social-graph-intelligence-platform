const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const connectionRoutes = require("./routes/connectionRoutes");
const graphRoutes = require("./routes/graphRoutes");

require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/graph", graphRoutes);

app.get("/", (req, res) => {
    res.send("Social Graph Intelligence Platform Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});