const express = require('express');
const controller = require("../controllers/auth");
const router = express.Router();

// localhost:3000/api/auth/login
router.get('/login', controller.login)

module.exports = router
