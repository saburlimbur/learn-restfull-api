import { request, response } from 'express';
import database from '../../connect';
import { ResponseError } from '../../utils/ResponseError';

export const getUserById = async (req = request, res = response) => {
  try {
    const userId = req.params.id;
    const findUser = await database.users.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        posts: true,
        comments: true,
      },
    });

    res.status(200).json({
      succes: true,
      data: findUser,
      message: 'Success get user by id',
    });
  } catch (error) {
    console.error(error);

    const http = error instanceof ResponseError ? error.status : 500;

    res.status(http).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data',
    });
  }
};
