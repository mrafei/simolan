const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express', dbName: process.env.DB_NAME });
});

module.exports = router;
