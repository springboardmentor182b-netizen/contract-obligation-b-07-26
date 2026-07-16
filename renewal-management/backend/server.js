const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});
app.get("/contracts", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Annual HR Consulting Retainer",
      status: "Upcoming",
      days: 180,
      value: 96000
    },
    {
      id: 2,
      name: "Manufacturing Supply Agreement",
      status: "Expiring",
      days: 87,
      value: 780000
    },
    {
      id: 3,
      name: "Vendor Distribution Agreement",
      status: "Upcoming",
      days: 88,
      value: 780000
    }
  ]);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});