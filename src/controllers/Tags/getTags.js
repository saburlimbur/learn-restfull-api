import { request, response } from 'express';
import { TAGS_NAME } from '@prisma/client';
import { ResponseError } from '../../utils/ResponseError';

export const getTags = async (req = request, res = response) => {
  try {
    const result = Object.values(TAGS_NAME);

    res.status(200).json({
      success: true,
      message: 'Success get all tags',
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
