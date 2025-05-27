const express = require('express');
const router = express.Router();
const resenas = require('../data/resenas');

router.get('/resenas', (req, res) => {
  res.json(resenas);
});

module.exports = router;