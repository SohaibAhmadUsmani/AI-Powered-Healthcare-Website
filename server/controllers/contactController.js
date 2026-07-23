const ContactMessage = require("../models/ContactMessage");

const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "name, email, and message are required" });
    }

    const newMessage = await ContactMessage.create({ name, email, message });

    res.status(201).json({
      message: "Message sent successfully",
      contact: newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
};

module.exports = { sendMessage, getAllMessages };