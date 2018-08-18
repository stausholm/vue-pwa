const router = require('express').Router();
const User = require('../models/user-model');

router.get('/bean', (req, res) => {
  res.send({bean:'bean was requested'})
});


router.post('/register', (req, res) => {
  res.send('register page')
});

router.post('/login', (req, res) => {
  res.send('login page')
});




module.exports = router;