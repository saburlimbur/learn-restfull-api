import { request, response } from 'express';
import database from '../../connect';
import { ResponseError } from '../../utils/ResponseError';

export const getPostById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
      throw new ResponseError(400, 'Invalid ID format');
    }

    const findPost = await database.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        comments: true,
        category: true,
        tags: true,
      },
    });

    if (!findPost) {
      throw new ResponseError(404, 'Post tidak ditemukan');
    }

    res.status(200).json({
      success: true,
      data: findPost,
      message: 'Success get post by id',
    });
  } catch (error) {
    console.error(error);

    const http = error instanceof ResponseError ? error.status : 500;

    res.status(http).json({
      success: false,
      message: `Terjadi kesalahan saat mengambil data ${error.message}`,
    });
  }
};
