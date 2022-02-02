const express = require('express');

const router = express.Router();

const authControler = require ('../controllers/auth');

//[POST] /v1/auth/register
router.post('/register', authControler.register);

module.exports = router;