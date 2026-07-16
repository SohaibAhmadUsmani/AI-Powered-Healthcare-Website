import { Stats } from '../models/Stats.js';

// Get statistics for the dashboard
export const getStats = async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (!stats) {
      stats = await Stats.create({});
    }
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
