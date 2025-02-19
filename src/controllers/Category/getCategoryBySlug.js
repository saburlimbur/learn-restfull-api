import { request, response } from 'express';
import database from '../../connect';
import { ResponseError } from '../../utils/ResponseError';

export const getCategoryBySlug = async (req = request, res = response) => {
  try {
    const { slug } = req.params;
    const findCategory = await database.category.findUnique({
      where: {
        slug,
      },
      include: {
        posts: true,
      },
    });

    if (!findCategory) {
      throw new ResponseError(404, `Category with slug ${slug} not found`);
    }

    res.status(200).json({
      success: true,
      data: findCategory,
      message: 'Success get category by slug',
    });
  } catch (error) {
    console.error(error);

    const http = error instanceof ResponseError ? error.status : 500;

    res.status(http).json({
      success: false,
      message: `Terjadi kesalahan saat mengambil data: ${error.message}`,
    });
  }
};
