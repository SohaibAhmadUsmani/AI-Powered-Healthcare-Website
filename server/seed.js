const mongoose = require("mongoose");
require("dotenv").config();
const LabTest = require("./models/LabTest");
const EmergencyContact = require("./models/EmergencyContact");

const testsData = [
  { name: "Complete Blood Count (CBC)", price: 800, category: "Blood Test" },
  { name: "Blood Sugar (Fasting)", price: 400, category: "Blood Test" },
  { name: "Liver Function Test (LFT)", price: 1500, category: "Organ Function" },
  { name: "Kidney Function Test (KFT)", price: 1400, category: "Organ Function" },
  { name: "Lipid Profile", price: 1200, category: "Blood Test" },
  { name: "Thyroid Profile (T3, T4, TSH)", price: 1800, category: "Hormone Test" },
];

const contactsData = [
  { title: "Ambulance", number: "1122", category: "Ambulance" },
  { title: "Blood Bank", number: "051-1234567", category: "Blood Bank" },
  { title: "Nearby Hospitals", number: "051-9876543", category: "Hospital" },
  { title: "Police", number: "15", category: "Police" },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding");

    await LabTest.deleteMany();
    await LabTest.insertMany(testsData);
    console.log("Lab tests seeded successfully");

    await EmergencyContact.deleteMany();
    await EmergencyContact.insertMany(contactsData);
    console.log("Emergency contacts seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();