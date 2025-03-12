const express = require('express');
const router = express.Router();

const redis = require('../redis')

/* GET statistics data. */
router.get('/', async (req, res) => {
  const addedTodos = await redis.getAsync('added_todos')

  res.send({
    "added_todos": addedTodos ? parseInt(addedTodos) : 0
  });
});

module.exports = router;
