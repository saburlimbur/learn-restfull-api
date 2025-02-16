import { request, response } from 'express';
import database from '../../connect';
import { ResponseError } from '../../utils/ResponseError';

export const deleteCategory = async (req = request, res = response) => {
  try {
    const { id } = await req.params;
    const checkUniqueId = await database.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!checkUniqueId) {
      throw ResponseError(404, 'Category tidak ditemukan');
    }

    await database.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      succes: true,
      data: checkUniqueId,
      message: 'Success delete category by id',
    });
  } catch (error) {
    console.error(error);

    const http = error instanceof ResponseError ? error.status : 500;

    res.status(http).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus data',
    });
  }
};
