import { request, response } from 'express';
import jwt from 'jsonwebtoken';

async function verifyToken(req = request, res = response, next) {
  try {
    const verifyingHeaders = req.headers.authorization;

    if (!verifyingHeaders) {
      return res.status(401).json({
        status: false,
        message: 'Anda perlu login terlebih dahulu untuk mendapatkan token!',
      });
    }

    const token = verifyingHeaders.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: false,
        message: 'Token tidak valid atau tidak ditemukan!',
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_API_SECRET);
    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).json({
        status: false,
        message: 'Token tidak valid atau telah kedaluwarsa!',
      });
    }

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token tidak valid atau telah kedaluwarsa!',
    });
  }
}

export default verifyToken;
