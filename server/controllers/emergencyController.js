const EmergencyContact = require("../models/EmergencyContact");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch emergency contacts", error: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Emergency contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch emergency contact", error: error.message });
  }
};

module.exports = { getAllContacts, getContactById };