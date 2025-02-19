import { request, response } from 'express';
import { createUserValidation } from '../../validation';
import database from '../../connect';
import bcrypt from 'bcryptjs';

export const createUsers = async (req = request, res = response) => {
  try {
    const { username, email, phone_number, password, position } = req.body;

    const { error: errorValidation } = createUserValidation.validate({
      username,
      email,
      phone_number,
      password,
      position,
    });

    if (errorValidation) {
      return res.status(400).json({
        message: errorValidation.details[0].message,
      });
    }

    let isEmail = email.toLowerCase();

    // email yang uniq
    const isEmailUsed = await database.users.findUnique({
      where: {
        email: isEmail,
      },
    });

    if (isEmailUsed) {
      return res.status(400).json({
        data: false,
        message: 'Email sudah digunakan',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const isPasswordHash = await bcrypt.hash(password, salt);

    const result = await database.users.create({
      data: {
        username,
        email: isEmail,
        phone_number,
        password: isPasswordHash,
        position,
      },
    });

    res.status(201).json({
      success: result,
      message: 'Create user successfully!',
    });
  } catch (error) {
    console.error(error);

    if (!error.name === 'Expired Token') {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server.',
      });
    }
  }
};
