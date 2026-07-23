const Medicine = require("../models/Medicine");

const defaultMedicines = [
  {
    name: "Aspirin Plus",
    category: "Pain Relief",
    price: 12.99,
    dosage: "500mg • 20 tablets",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    description: "Fast-acting pain relief for headaches, muscle aches, and minor discomfort.",
    reviews: [
      { author: "Maria K.", comment: "Works quickly and doesn't upset my stomach.", rating: 5 },
      { author: "Noah S.", comment: "Perfect for daily use after workouts.", rating: 4 },
    ],
  },
  {
    name: "Daily Vitamin D",
    category: "Vitamins",
    price: 18.99,
    dosage: "1000 IU • 30 softgels",
    image: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=80",
    description: "Support bone strength, immune health, and energy levels with a daily dose of Vitamin D.",
    reviews: [
      { author: "Lena P.", comment: "My energy feels more stable throughout the day.", rating: 5 },
      { author: "Omar N.", comment: "Great vitamin and easy to swallow.", rating: 4 },
    ],
  },
  {
    name: "ColdCare Syrup",
    category: "Cold & Flu",
    price: 14.5,
    dosage: "10ml • 100ml bottle",
    image: "coldCareSyrup.png",
    description: "Soothing syrup for coughs, congestion, and sore throat.",
    reviews: [
      { author: "Priya R.", comment: "Stopped my cough by morning.", rating: 5 },
      { author: "Elias M.", comment: "Nice mint flavor and easy on the throat.", rating: 5 },
    ],
  },
  {
    name: "CalmZz Relief",
    category: "Supplements",
    price: 21.75,
    dosage: "30 capsules • 1 month",
    image: "calmzz.png",
    description: "Gentle daily support for stress balance and better relaxation.",
    reviews: [
      { author: "Sara H.", comment: "Very calming and easy to take every morning.", rating: 5 },
      { author: "Adeel T.", comment: "Great addition to my evening routine.", rating: 4 },
    ],
  },
  {
    name: "OralGuard Care",
    category: "Dental",
    price: 16.25,
    dosage: "30 tablets • daily use",
    image: "oralGuard.png",
    description: "Helps support gum comfort, fresh breath, and everyday oral care.",
    reviews: [
      { author: "Nadia B.", comment: "My mouth feels fresher and healthier.", rating: 5 },
      { author: "Rizwan K.", comment: "Simple routine and noticeable comfort.", rating: 4 },
    ],
  },
  {
    name: "Syringe Care Kit",
    category: "Pain Relief",
    price: 19.99,
    dosage: "1 travel pack • 12 units",
    image: "Syringe.png",
    description: "Convenient care kit for everyday recovery and home wellness support.",
    reviews: [
      { author: "Hina F.", comment: "Perfect for keeping essential care items organized.", rating: 5 },
      { author: "Hamza Y.", comment: "Very practical and easy to carry.", rating: 4 },
    ],
  },
];

const getAllMedicines = async (req, res) => {
  try {
    let medicines = await Medicine.find({ available: true }).sort({ createdAt: 1 });

    if (!medicines.length) {
      try {
        await Medicine.insertMany(defaultMedicines.map((medicine) => ({ ...medicine, available: true })));
        medicines = await Medicine.find({ available: true }).sort({ createdAt: 1 });
      } catch (seedError) {
        medicines = defaultMedicines.map((medicine, index) => ({
          ...medicine,
          _id: `fallback-${index + 1}`,
          available: true,
        }));
      }
    } else {
      const existingNames = new Set(medicines.map((medicine) => medicine.name.toLowerCase()));
      const missingMedicines = defaultMedicines.filter((medicine) => !existingNames.has(medicine.name.toLowerCase()));

      if (missingMedicines.length) {
        const inserted = await Medicine.insertMany(
          missingMedicines.map((medicine) => ({ ...medicine, available: true }))
        );
        medicines = [...medicines, ...inserted].sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    res.status(200).json({ success: true, data: medicines });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch medicines", error: error.message });
  }
};

const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ success: false, message: "Medicine not found" });
    }
    res.status(200).json({ success: true, data: medicine });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch medicine", error: error.message });
  }
};

module.exports = { getAllMedicines, getMedicineById };
