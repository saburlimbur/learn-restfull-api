import { request, response } from 'express';
import database from '../../connect';
import { ResponseError } from '../../utils/ResponseError';

export const getCategoryById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const findCategory = await database.category.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        posts: true,
      },
    });

    if (!findCategory) {
      throw new ResponseError(404, `Category with id ${id} not found`);
    }

    res.status(200).json({
      succes: true,
      data: findCategory,
      message: 'Success get category by id',
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
