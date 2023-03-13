const express = require('express');
const controller = require("../controllers/position");
const passport = require("passport");
const router = express.Router();

// localhost:3000/api/position:categoryId
router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getByCategoryId);
// localhost:3000/api/position
router.post('/', passport.authenticate('jwt', {session: false}), controller.create);
// localhost:3000/api/position:id
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update);
// localhost:3000/api/position:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);

module.exports = router