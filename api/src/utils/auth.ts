import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hash: string
) => {
  return bcrypt.compare(password, hash);
};

export const signToken = (payload: { userId: string }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};
