const test = require('node:test');
const assert = require('node:assert/strict');
const Medicine = require('../models/Medicine');

test('Medicine schema creates a document with defaults', () => {
  const medicine = new Medicine({
    name: 'Aspirin Plus',
    category: 'Pain Relief',
    price: 12.99,
    dosage: '500mg • 20 tablets',
    description: 'Fast acting pain relief',
  });

  assert.equal(medicine.name, 'Aspirin Plus');
  assert.equal(medicine.category, 'Pain Relief');
  assert.equal(medicine.price, 12.99);
  assert.equal(medicine.dosage, '500mg • 20 tablets');
  assert.equal(medicine.available, true);
  assert.deepEqual(medicine.reviews, []);
});
