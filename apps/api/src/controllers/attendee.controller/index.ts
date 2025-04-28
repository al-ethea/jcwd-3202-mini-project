// use referral code
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../connection';
import { addMonths } from '@/utils/calculate.expiration.date';
import { generateDiscountCode } from '@/utils/generate.discount.code';

export const applyReferral = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { referralCode } = req.body;
    const userId = req.body.payload;

    prisma.$transaction(async (tx) => {
      
      const user = await prisma.user.findFirst({
        where: { id: userId },
        include: {
          referredTo: true, // check if already referred
        },
      });
  
      if (!user) {
        throw { isExpose: true, status: 404, message: 'User not found' };
      }
  
      if (user.referredTo?.length > 0) {
        throw {
          isExpose: true,
          status: 400,
          message: 'You already used a referral code.',
        };
      }
  
      const referrer = await prisma.user.findFirst({
        where: { referralCode },
      });
  
      if (!referrer) {
        throw { isExpose: true, status: 400, message: 'Referral code not found' };
      }
  
      if (referrer.id === user.id) {
        throw {
          isExpose: true,
          status: 400,
          message: 'You cannot use your own referral code.',
        };
      }
      // create PointsHistory for referrer
      const pointsHistory = await prisma.pointsHistory.create({
        data: {
          amount: 10000,
          expirationDate: addMonths(new Date(), 3),
        },
      });
  
      await prisma.referral.create({
        data: {
          discountCode: generateDiscountCode(),
          referralGiverUserId: referrer.id,
          referredUserId: user.id,
          pointsHistoryId: pointsHistory.id,
        },
      });
      // update referrer totalPoints
      await prisma.user.update({
        where: { id: referrer.id },
        data: {
          totalPoints: { increment: 10000 },
        },
      });
    })

    res.status(200).json({
      success: true,
      message: 'Referral code applied successfully.',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const registerEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // get user referral if they hve
    // find event
    // 1. Apply 10% discount if they have a referral discount
    // 2. Apply points if user wants to
    // 3. Create Registration
    res.status(200).json({
      success: true,
      message: 'Registered successfully.',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
