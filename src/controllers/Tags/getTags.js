import { request, response } from 'express';
import database from '../../connect';
import { ResponseError } from '../../utils/ResponseError';

export const getTags = async (req = request, res = response) => {
  try {
    const result = await database.tag.findMany();

    res.status(200).json({
      success: true,
      message: 'Success get all tags',
      data: result,
    });
  } catch (error) {
    console.error(errorOut);

    const http = error instanceof ResponseError ? error.status : 500;

    res.status(http).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data',
    });
  }
};
