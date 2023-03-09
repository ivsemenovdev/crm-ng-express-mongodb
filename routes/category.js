const express = require('express');
const controller = require("../controllers/category");
const router = express.Router();

// localhost:3000/api/category
router.get('/', controller.getAll);
// localhost:3000/api/category:id
router.get('/:id', controller.getById);
// localhost:3000/api/category:id
router.delete('/:id', controller.remove);
// localhost:3000/api/category
router.post('/', controller.create);
// localhost:3000/api/category:id
router.post('/:id', controller.update);

module.exports = router