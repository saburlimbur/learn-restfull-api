import { request, response } from 'express';
import database from '../../connect';
import { ResponseError } from '../../utils/ResponseError';

export const deletePost = async (req = request, res = response) => {
  try {
    const { id } = await req.params;
    const checkUniqueId = await database.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!checkUniqueId) {
      throw ResponseError(404, 'Post tidak ditemukan');
    }

    await database.post.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      succes: true,
      data: checkUniqueId,
      message: 'Success delete post by id',
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
