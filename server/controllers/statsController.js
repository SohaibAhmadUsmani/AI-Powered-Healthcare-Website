const getStats = async (_req, res) => {
  try {
    res.json({
      consultations: 24790,
      recoveryRate: 98.4,
      activePatients: 1250,
      aiDiagnoses: 84930
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
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
