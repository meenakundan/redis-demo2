// src/routes/auth.ts
import express from 'express';
import { login, signin } from '../controllers/authController';

const router = express.Router();

router.post('/login_api', (req, res) => {
    const data = req.body;
  
    if (data.req_type === 'Login') {
      login(req, res);
    } else if (data.req_type === 'Signin') {
      signin(req, res);
    } else {
      res.status(400).json({ message: 'Invalid req type' });
    }
  });
  
export default router;

