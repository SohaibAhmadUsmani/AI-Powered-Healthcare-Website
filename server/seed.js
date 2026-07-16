import mongoose from 'mongoose';
import dotenv from 'dotenv';
import LabTest from './models/LabTest.js';

dotenv.config();

const testsData = [
  { name: 'Complete Blood Count (CBC)', price: 800, category: 'Blood Test' },
  { name: 'Blood Sugar (Fasting)', price: 400, category: 'Blood Test' },
  { name: 'Liver Function Test (LFT)', price: 1500, category: 'Organ Function' },
  { name: 'Kidney Function Test (KFT)', price: 1400, category: 'Organ Function' },
  { name: 'Lipid Profile', price: 1200, category: 'Blood Test' },
  { name: 'Thyroid Profile (T3, T4, TSH)', price: 1800, category: 'Hormone Test' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    await LabTest.deleteMany();
    await LabTest.insertMany(testsData);

    console.log('Lab tests seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();