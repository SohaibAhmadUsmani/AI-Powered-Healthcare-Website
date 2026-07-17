const { Stats } = require('../models/Stats');

// Get statistics for the dashboard
const getStats = async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (!stats) {
      stats = await Stats.create({});
    }
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const incrementStats = async (req, res) => {
  try {
    res.json({ success: true, message: "Stats updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update stats" });
  }
};

module.exports = { getStats, incrementStats };
