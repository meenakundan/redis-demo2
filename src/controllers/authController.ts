import { Request, Response } from 'express';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SaltRounds = 10;

const SecretKey = '942bb82561c615e0d67a27538c8e203ea60423c0508956a134e4f747d88189bd';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
  
      const user = await User.findOne({ where: { username: data.username } });
  
      if (!user) {
        res.status(200).json({ message: "Username doesn't exist" });
        return;
      }
  
      if (data.req_type === 'Login') {
        const passwordMatch = await bcrypt.compare(data.password, user.password);
  
        if (passwordMatch) {
          const token = jwt.sign({ userId: user.id, username: user.username }, SecretKey, { expiresIn: '1h' });
          res.status(200).json({ token, message: 'Login successful' });
        } else {
          res.status(200).json({ message: 'Incorrect password' });
        }
      } else {
        res.status(200).json({ message: 'Invalid req type' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
  
      const existingUser = await User.findOne({ where: { username: data.username } });
  
      if (data.req_type === 'Signin') {
        if (!existingUser) {
          const newUser = User.create({
            username: data.username,
            password: await bcrypt.hash(data.password, SaltRounds),
            email: data.email,
            mobile: data.mobile,
          });
  
          await newUser.save();
  
          res.status(201).json({ message: 'New account created' });
        } else {
          res.status(200).json({ message: 'Username already exists' });
        }
      } else {
        res.status(200).json({ message: 'Invalid req type' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
 