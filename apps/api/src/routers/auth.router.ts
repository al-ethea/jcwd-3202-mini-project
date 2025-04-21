import { registerUser } from '@/controllers/auth.controller';
import { registerUserValidator } from '@/middlewares/express.validator/auth.validator';
import { errorValidatorHandler } from '@/middlewares/express.validator/error.handler';
import { Router } from 'express';

const authRouter = Router();

authRouter.post(
  '/register',
  registerUserValidator,
  errorValidatorHandler,
  registerUser,
);

export default authRouter;
