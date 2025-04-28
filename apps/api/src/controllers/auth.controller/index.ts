import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../connection';
import { hashPassword } from '@/utils/hash.password';
import { comparePassword } from '@/utils/compare.password';
import { jwtSign } from '@/utils/jwt.sign';
import { generateReferralCode } from '@/utils/generate.referral.code';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, email, postcode, password } = req.body;
    const findUserByEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (findUserByEmail !== null) {
      throw { isExpose: true, status: 401, message: 'Email already exist' };
    }

    const hashedPassword = await hashPassword(password);

    let referralCode = generateReferralCode();
    let isUnique = false;
    while (!isUnique) {
      const existingReferral = await prisma.user.findUnique({
        where: { referralCode },
      });
      if (!existingReferral) {
        isUnique = true;
      } else {
        referralCode = generateReferralCode(); // regenerate if conflict
      }
    }
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        postcode,
        password: hashedPassword,
        role: 'ATTENDEE',
        referralCode,
        totalPoints: 0,
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

export const registerOrganizer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { companyName, address, phoneNumber } = req.body;
    const userId = req.body.payload;

    const result = prisma.$transaction(async (tx) => {
      if (!userId) {
        throw { isExpose: true, status: 401, message: 'Unauthorized' };
      }

      // Find user
      const user = await prisma.user.findFirst({
        where: { id: userId },
      });

      if (!user) {
        throw { isExpose: true, status: 404, message: 'User not found' };
      }

      // Check if already organizer
      const existingProfile = await prisma.organizerProfile.findFirst({
        where: { userId: userId },
      });

      if (existingProfile) {
        throw {
          isExpose: true,
          status: 400,
          message: 'Organizer profile already exists',
        };
      }

      // Create organizer profile
      const organizerProfile = await prisma.organizerProfile.create({
        data: {
          companyName,
          address,
          phoneNumber,
          userId,
        },
      });

      // (Optional) Update user role to ORGANIZER immediately
      return await prisma.user.update({
        where: { id: userId },
        data: {
          role: 'ORGANIZER',
        },
      });
    });

    res.status(201).json({
      success: true,
      message: 'Organizer profile created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// export const verifyEmail = async () => {};
