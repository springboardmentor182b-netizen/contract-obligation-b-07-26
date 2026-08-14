const express = require("express");

const {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  markAsRead,
  markAllRead,
} = require("../controllers/notificationController");

const router = express.Router();

router.get("/", getNotifications);

router.get("/:id", getNotificationById);

router.post("/", createNotification);

router.put("/:id", updateNotification);


router.delete("/:id", deleteNotification);

router.patch("/:id/read", markAsRead);

router.patch("/read/all", markAllRead);

module.exports = router;