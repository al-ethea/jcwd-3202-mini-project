import bcrypt from 'bcrypt';

export const comparePassword = async (
  hashedPassword: string,
  password: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};
