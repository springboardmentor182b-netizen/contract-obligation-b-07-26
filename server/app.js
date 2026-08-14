const express = require("express");
const cors = require("cors");

const notificationRoutes = require("./routes/notificationRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const preferenceRoutes =
require("./routes/preferenceRoutes");

const app = express();

const chartRoutes = require("./routes/chartRoutes");

app.use("/api/chart", chartRoutes);

app.use(cors());
app.use(express.json());

app.use(
"/api/preferences",
preferenceRoutes
);

app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Notification API is Running 🚀",
  });
});


module.exports = app;