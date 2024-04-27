const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const userController = require('../Controller/userController');
const adminController=require('../Controller/adminController');
const { authenticateToken } = require('../Middleware/authMiddleware');
const verifyUserCOntroller=require('../Controller/verifyUserController')

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/user/signup',upload.single('profileImage'), userController.createUser);
router.post('/user/signin', userController.userLogin);

router.get('/user',authenticateToken, adminController.getAllUser);

router.get('/user/:id',authenticateToken, userController.getUserById);
router.put('/user/:id',authenticateToken, userController.updateUser);
router.delete('/user/:id',authenticateToken, userController.deleteUser);


router.post('/user/sendotpnumber', verifyUserCOntroller.sendMobileOTP);
router.post('/user/verifyotpnumber', verifyUserCOntroller.verifyMobileOTP);
router.post('/user/sendotpemail', verifyUserCOntroller.sendEmailOTP);
router.post('/user/verifyotpemail', verifyUserCOntroller.verifyEmailOTP);







module.exports = router;