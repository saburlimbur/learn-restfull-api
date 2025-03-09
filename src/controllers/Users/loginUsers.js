import { request, response } from 'express';
import database from '../../connect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginUserValidation } from '../../validation';

export const loginUsers = async (req = request, res = response) => {
  try {
    const { username, email, password } = req.body;

    const { error: errorValidation } = loginUserValidation.validate({
      username,
      email,
      password,
    });

    if (errorValidation) {
      return res.status(400).json({
        message: errorValidation.details[0].message,
      });
    }

    if (!username && !email) {
      return res.status(400).json({
        success: false,
        message: 'Masukan email atau username untuk login',
      });
    }

    let user = null; // default null

    if (email) {
      let isEmail = email.toLowerCase();
      user = await database.users.findUnique({
        where: {
          email: isEmail,
        },
      });
    } else if (username) {
      user = await database.users.findFirst({
        where: {
          username: username,
        },
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Pengguna tidak ditemukan. Pastikan email atau username benar.',
      });
    }

    const findPassword = await bcrypt.compare(password, user.password);

    if (!findPassword) {
      return res.status(401).json({
        data: false,
        message: 'Password yang dimasukkan salah',
      });
    }

    // jwt
    const jwtKey = process.env.JWT_API_SECRET;
    const token = await jwt.sign(
      {
        authorId: user.id,
      },
      jwtKey,
      {
        expiresIn: '1d',
      }
    );

    res.status(200).json({
      success: true,
      message: 'Login successfully',
      result: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          position: user.position,
        },
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
