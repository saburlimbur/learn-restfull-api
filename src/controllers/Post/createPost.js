import { request, response } from 'express';
import { createPostValidation } from '../../validation';
import database from '../../connect';

export const createPost = async (req = request, res = response) => {
  try {
    const { content, media, categoryId, tags, title } = req.body;

    const { error: errorValidation } = createPostValidation.validate({
      title,
      content,
      media,
      categoryId: parseInt(categoryId),
      tags,
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

    const tagConnections = tags.map((tagName) => ({
      tag_name: tagName, // enum
    }));

    const newPost = await database.post.create({
      data: {
        title,
        content,
        media,
        author: {
          connect: {
            id: userId,
          },
        },
        category: categoryId
          ? {
              connect: {
                id: categoryId,
              },
            }
          : undefined,
        tags: {
          create: tagConnections,
        },
      },
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Create post successfully',
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
