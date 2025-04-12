import express from 'express';
import { loginAdmin, registerAdmin, logoutAdmin } from '../controller/admin_controller.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin); // 🆕 Add this

export default router;
