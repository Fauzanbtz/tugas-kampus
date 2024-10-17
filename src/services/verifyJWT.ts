import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET; // Secret key for signing JWT

export const verifyJWT = (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.token; // Ambil token dari cookies

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = verify(token, secret!); // Verifikasi token
    return decoded; // Mengembalikan payload yang berisi user
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
