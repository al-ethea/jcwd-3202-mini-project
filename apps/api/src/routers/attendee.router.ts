import { applyReferral } from '@/controllers/attendee.controller';
import { jwtDecode } from '@/middlewares/jwt.decode';
import { Router } from 'express';
import authRouter from './auth.router';

const attendeeRouter = Router();

attendeeRouter.post('/apply-referral', jwtDecode, applyReferral);

export default attendeeRouter;
