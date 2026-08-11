const Notification = require("../models/Notification");

// GET all notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({
      createdAt: -1,
    });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one notification
const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE notification
const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);

    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE notification
const updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(notification);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE notification
const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);

    res.json({
      message: "Notification deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// MARK ONE AS READ
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    res.json(notification);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// MARK ALL AS READ
const markAllRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {},
      {
        isRead: true,
      }
    );

    res.json({
      message: "All notifications marked as read",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  markAsRead,
  markAllRead,
};

