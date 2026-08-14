const Notification = require("../models/Notification");

const getDashboardStats = async (req, res) => {
  try {
    const totalNotifications = await Notification.countDocuments();

    const unread = await Notification.countDocuments({
      isRead: false,
    });

    const success = await Notification.countDocuments({
      status: "Success",
    });

    const warning = await Notification.countDocuments({
      status: "Warning",
    });

    const critical = await Notification.countDocuments({
      status: "Critical",
    });

    const info = await Notification.countDocuments({
      status: "Info",
    });

    res.status(200).json({
      totalNotifications,
      unread,
      success,
      warning,
      critical,
      info,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};