import { request, response } from 'express';
import database from '../../connect';
import { ResponseError } from '../../utils/ResponseError';

export const getPosts = async (req = request, res = response) => {
  try {
    const result = await database.post.findMany();

    res.status(200).json({
      success: true,
      message: 'Success get all posts',
      data: result,
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
