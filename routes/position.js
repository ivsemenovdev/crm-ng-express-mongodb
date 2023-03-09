const express = require('express');
const controller = require("../controllers/position");
const router = express.Router();

// localhost:3000/api/position:categoryId
router.get('/:categoryId', controller.getByCategoryId);
// localhost:3000/api/position
router.post('/', controller.create);
// localhost:3000/api/position:id
router.patch('/:id', controller.update);
// localhost:3000/api/position:id
router.delete('/:id', controller.remove);

module.exports = router