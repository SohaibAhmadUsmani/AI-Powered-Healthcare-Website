const express = require('express');
const router = express.Router();
const { getStats, incrementStats } = require('../controllers/statsController');

router.get('/', getStats);
router.post('/', incrementStats);

module.exports = router;
