const router = require('express').Router();

const { postLoginUser } = require('./../controllers/auth.controller')

router.post('/loginUser', [], postLoginUser);

module.exports = router;