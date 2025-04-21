import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../connection';
import { hashPassword } from '@/utils/hash.password';
import { Role } from '@prisma/client';

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
