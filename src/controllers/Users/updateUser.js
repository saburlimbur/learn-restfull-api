import { request, response } from 'express';
import database from '../../connect';
import { createUserValidation } from '../../validation';

export const updateUser = async (req = request, res = response) => {
  try {
    const userId = req.userId;
    const { username, email, phone_number, password } = req.body;

    const user = await database.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Anda tidak berhak mengupdate data ini',
      });
    }

    let isEmail = email?.toLowerCase();

    if (isEmail && isEmail !== user.email) {
      const findUser = await database.users.findUnique({
        where: { email: isEmail },
      });

      if (findUser) {
        return res.status(400).json({
          success: false,
          message: 'Email sudah digunakan, silakan gunakan email lain.',
        });
      }
    }

    if (password) {
      const { error: errorValidation } = createUserValidation.validate({
        password,
        username,
        email: isEmail || user.email,
        phone_number,
      });

      if (errorValidation) {
        return res.status(400).json({
          success: false,
          message: errorValidation.details[0].message,
        });
      }
    }

    // update
    const result = await database.users.update({
      where: { id: userId },
      data: {
        username,
        email: isEmail,
        phone_number,
        password,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Data berhasil diperbarui',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat update data',
    });
  }
};
