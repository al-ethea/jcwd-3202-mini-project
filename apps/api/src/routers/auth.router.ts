import {
  loginUser,
  registerUser,
  sessionLoginUser,
} from '@/controllers/auth.controller';
import { registerUserValidator } from '@/middlewares/express.validator/auth.validator';
import { errorValidatorHandler } from '@/middlewares/express.validator/error.handler';
import { jwtDecode } from '@/middlewares/jwt.decode';
import { Router } from 'express';

const authRouter = Router();

authRouter.post(
  '/register',
  registerUserValidator,
  errorValidatorHandler,
  registerUser,
);
authRouter.post('/login', loginUser);
authRouter.get('/session-login', jwtDecode, sessionLoginUser);

export default authRouter;
