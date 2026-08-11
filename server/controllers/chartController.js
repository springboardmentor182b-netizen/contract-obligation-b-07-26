const Notification = require("../models/Notification");

const getChartData = async (req, res) => {
  try {
    const data = await Notification.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getChartData,
};