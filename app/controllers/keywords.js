const express = require('express');
const query = require('../mongoMedel/query');
const Keyword = require('../mongoMedel/keyword');

const router = express.Router();

router.post('/', async (req, res) => {
  const { start, keywords } = req.body;

  // create a new user if does not exist
  const create = await query.keywords.create(start, keywords);
  // count the number of the user
  const count = await query.keywords.count();

  const respond = res.json(await query.keywords.respond());

  // run when there is an error (username exists)
  const onError = error => res.status(409).json({ message: error.message });

  // check username duplication
  Keyword.find({})
    .then(create)
    .then(count)
    .then(respond)
    .catch(onError);
});

router.get('/', async (req, res, next) => {
  const { keywords } = req.query;

  await query.keywords.aggregate(keywords)
    .then(result => res.send(result))
    .catch(err => next(err));
});

module.exports = router;
