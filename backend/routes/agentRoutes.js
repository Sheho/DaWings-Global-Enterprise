const express = require('express');
const { registerDesigner, loginDesigner, getMe } = require('../controllers/agentController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', registerDesigner);
router.post('/login', loginDesigner);
router.get('/me', protect, getMe);

module.exports = router;
