import { request, response } from 'express';
import { createCommentValidation } from '../../validation';
import database from '../../connect';

export const createComment = async (req = request, res = response) => {
  try {
    const { content, postId } = req.body;

    const { error: errorValidation } = createCommentValidation.validate({
      content,
    });

    if (errorValidation) {
      return res.status(400).json({
        message: errorValidation.details[0].message,
      });
    }

    const authorId = req.authorId;

    if (!authorId) {
      return res.status(401).json({
        success: false,
        message: 'Anda perlu login terlebih dahulu untuk membuat komentar!',
      });
    }

    const post = await database.post.findUnique({
      where: {
        id: parseInt(postId),
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post tidak ditemukan!',
      });
    }

    const newComment = await database.comment.create({
      data: {
        content,
        postId: parseInt(postId),
        authorId: authorId,
      },
      include: {
        author: true,
        post: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Create comment succesfully',
      data: newComment,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
