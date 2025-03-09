import { request, response } from 'express';
import database from '../../connect';
import { ResponseError } from '../../utils/ResponseError';

export const getPostBySlug = async (req = request, res = response) => {
  try {
    const { slug } = req.params;

    const findPost = await database.post.findUnique({
      where: {
        slug: slug,
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
      succes: true,
      data: findPost,
      message: 'Success get post by slug',
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
