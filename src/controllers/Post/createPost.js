import { request, response } from 'express';
import { createPostValidation } from '../../validation';
import database from '../../connect';
import { generateSlug } from './../../utils/CategorySlug';
import { TAGS_NAME } from '@prisma/client';

export const createPost = async (req = request, res = response) => {
  try {
    const { title, content, media, categoryId, tags } = req.body;

    const { error: errorValidation } = createPostValidation.validate({
      title,
      content,
      media,
      categoryId: categoryId.toString(),
      tags,
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
        message: 'User id tidak ditemukan, atau anda perlu login terlebih dahulu untuk membuat post!',
      });
    }

    const tagConnections = tags.map((tagName) => ({
      tag_name: tagName, // enum
    }));

    // check post berdasarkan slug dari title
    const existingPost = await database.post.findUnique({
      where: {
        slug: generateSlug(title),
      },
    });

    if (existingPost) {
      return res.status(400).json({
        message: 'Slug sudah ada di database',
      });
    }

    const newPost = await database.post.create({
      data: {
        title,
        content,
        media,
        author: { connect: { id: authorId } },
        category: { connect: { id: categoryId } },
        tags: {
          create: {
            tag_name: req.body.tags[0],
          },
        },
        slug: generateSlug(title),
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
