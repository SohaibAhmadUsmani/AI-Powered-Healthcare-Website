import LabTest from '../models/LabTest.js';

export const getAllTests = async (req, res) => {
  try {
    const tests = await LabTest.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lab tests', error: error.message });
  }
};

export const getTestById = async (req, res) => {
  try {
    const test = await LabTest.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'Lab test not found' });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lab test', error: error.message });
  }
};

export const bookTest = async (req, res) => {
  try {
    const { testId, patientName, phone, date } = req.body;

    if (!testId || !patientName || !phone || !date) {
      return res.status(400).json({ message: 'testId, patientName, phone, and date are required' });
    }

    const test = await LabTest.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Lab test not found' });
    }

    res.status(201).json({
      message: 'Test booked successfully',
      booking: { testId, testName: test.name, patientName, phone, date },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book test', error: error.message });
  }
};