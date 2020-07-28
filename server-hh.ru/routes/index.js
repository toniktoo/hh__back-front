const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res
    .send({ response: 'Hello. This a backend for my app(headhunter api)' })
    .status(200);
});

module.exports = router;
