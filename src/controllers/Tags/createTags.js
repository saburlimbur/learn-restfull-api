import { request, response } from 'express';
import { tagsValidation } from '../../validation';
import database from '../../connect';
import { TAGS_NAME } from '@prisma/client';

const TAGS_NAME_ENUM = ['Tech', 'Philosophy', 'Music', 'Education', 'Technology', 'Innovation'];

export const createTags = async (req = request, res = response) => {
  try {
    const { tag_name } = req.body;

    if (!TAGS_NAME_ENUM.includes(tag_name)) {
      return res.status(400).json({
        success: false,
        message: `Invalid tag name. Please choose a tag name from the following: ${TAGS_NAME_ENUM.join(', ')}`,
      });
    }

    const { error: errorValidation } = tagsValidation.validate({
      tag_name,
    });

    if (errorValidation) {
      return res.status(400).json({
        message: errorValidation.details[0].message,
      });
    }

    // check jika ada tag_name yang sama
    const existingTag = await database.tags.findFirst({
      where: {
        tag_name: tag_name,
      },
    });

    if (existingTag) {
      return res.status(400).json({
        success: false,
        message: 'Tag name already exists. Please choose a different tag name.',
      });
    }

    const newTags = await database.tags.create({
      data: {
        tag_name,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Create tag succesfully',
      data: newTags,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
