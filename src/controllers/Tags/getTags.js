import { request, response } from 'express';
import { ResponseError } from '../../utils/ResponseError';
import database from '../../connect';

export const getTags = async (req = request, res = response) => {
  try {
    const tags = await database.tags.findMany();

    const result = tags.map((tag) => ({
      tag_name: tag.tag_name,
    }));

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
