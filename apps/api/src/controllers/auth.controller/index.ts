import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../connection';
import { hashPassword } from '@/utils/hash.password';
import { Role } from '@prisma/client';
import { comparePassword } from '@/utils/compare.password';
import { jwtSign } from '@/utils/jwt.sign';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, email, postcode, password, role } = req.body;

    const validRoles = Object.values(Role);

    if (!validRoles.includes(role)) {
      throw {
        isExpose: true,
        status: 400,
        message: `Invalid role. Valid roles are: ${validRoles.join(', ')}`,
      };
    }

    const findUserByEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (findUserByEmail !== null) {
      throw { isExpose: true, status: 401, message: 'Email already exist' };
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        postcode,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({
      success: true,
      message: `User ${firstName} ${lastName} registered successfully`,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const findUserByEmail = await prisma.user.findFirst({
      where: { email },
    });

    // console.log(findUserByEmail);

    if (findUserByEmail === null) {
      throw { isExpose: true, status: 401, message: 'Email not found' };
    }

    const isPasswordMatch = await comparePassword(
      findUserByEmail?.password,
      password,
    );

    if (isPasswordMatch === false) {
      throw { isExpose: true, status: 401, message: 'Invalid password' };
    }
    const token = jwtSign({
      userId: findUserByEmail.id,
      userRole: findUserByEmail.role,
    });

    // console.log(token);

    res.status(200).json({
      success: true,
      message: 'Login successfully',
      data: {
        token,
        email: findUserByEmail.email,
        role: findUserByEmail.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const sessionLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { payload } = req.body;

    const findUserByUserId = await prisma.user.findFirst({
      where: { id: payload.userId },
    });

    res.status(200).json({
      success: true,
      message: 'Session login successfully',
      data: {
        token: req.headers.authorization?.split(' ')[1],
        email: findUserByUserId?.email,
        role: findUserByUserId?.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async () => {};
