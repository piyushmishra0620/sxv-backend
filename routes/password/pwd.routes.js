const forgetpasswords = require('../../controllers/forgetPassword/forgetpassword.js')
const changepassword = require('../../controllers/changePassword/changepassword.js');
const { Router } = require('express');

const router = Router();

router.post('/forgetpwd', forgetpasswords)
router.post('/changepassword', changepassword)

module.exports = router;