import { request, response } from 'express';
import database from '../../connect';
import { createPostValidation } from '../../validation';

export const createPost = async (req = request, res = response) => {
  try {
    const { content, media } = req.body;

    const { error: errorValidation } = createPostValidation.validate({
      content,
      media,
    });

    if (errorValidation) {
      return res.status(400).json({
        message: errorValidation.details[0].message,
      });
    }

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User id tidak ditemukan, atau anda perlu login terlebih dahulu untuk membuat post!',
      });
    }

    const newPost = await database.post.create({
      data: {
        content,
        media,
        authorId: userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Create post succesfully',
      data: newPost,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
