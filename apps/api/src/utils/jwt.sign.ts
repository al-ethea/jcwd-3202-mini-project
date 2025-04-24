import jwt from 'jsonwebtoken';
interface IJwtSignProps {
  userId: string;
  userRole: string;
}

export const jwtSign = ({ userId, userRole }: IJwtSignProps) => {
  return jwt.sign({ userId, userRole }, process.env.JWT_SECRET_KEY!, {
    expiresIn: '1w',
  });
};
