import { request, response } from 'express';
import { tagsValidation } from '../../validation';
import database, { PostModels } from '../../connect';

export const createTags = async (req = request, res = response) => {
  try {
    const { name } = req.body;

    const { error: errorValidation } = tagsValidation.validate({
      name,
    });

    if (errorValidation) {
      return res.status(400).json({
        message: errorValidation.details[0].message,
      });
    }

    const newTags = await database.tag.create({
      data: {
        name,
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
