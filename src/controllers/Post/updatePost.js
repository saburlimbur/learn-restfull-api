import { request, response } from 'express';
import database from '../../connect';

export const updatePost = async (req = request, res = response) => {
  try {
    const postId = req.params.id;
    const { title, content, media, categoryId, tags } = req.body;

    const post = await database.post.findUnique({
      where: {
        id: parseInt(postId),
      },
      include: {
        tags: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post tidak ditemukan',
      });
    }

    const updatedPost = await database.post.update({
      where: {
        id: parseInt(postId),
      },
      data: {
        title,
        content,
        media,
        categoryId: parseInt(categoryId),
        tags: {
          connect: tags.map((tagId) => ({ id: tagId })),
        },
      },
      include: {
        tags: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Post berhasil diperbarui',
      data: updatedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Terjadi kesalahan saat memperbarui post: ${error.message}`,
    });
  }
};
