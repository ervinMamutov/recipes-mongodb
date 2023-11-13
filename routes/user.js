import express from 'express';

const router = express.Router();

import userControllers from '../controllers/user.js';

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.post('/logout', userControllers.logout);

export default router;
