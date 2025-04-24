import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const jwtDecode = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token || token === 'null') {
      throw { isExpose: true, status: 401, message: 'Token must be provided' };
    }

    const payload = jwt.verify(token, `${process.env.JWT_SECRET_KEY!}`);
    req.body.payload = payload;

    next();
  } catch (error) {
    next(error);
  }
};
