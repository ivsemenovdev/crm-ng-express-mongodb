const express = require('express');
const controller = require('../controllers/order');
const passport = require('passport');
const router = express.Router();

// localhost:3000/api/order/
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
// localhost:3000/api/order/
router.post('/', passport.authenticate('jwt', {session: false}), controller.create);

module.exports = router
