const express = require('express');
const router = express.Router();
const redis = require('../redis');
const configs = require('../util/config')

/* GET statistics data. */
router.get('/', async (req, res) => {
  const addedTodos = await redis.getAsync('added_todos')

  res.send({
    ...configs,
    addedTodos
  });
});

module.exports = router;
