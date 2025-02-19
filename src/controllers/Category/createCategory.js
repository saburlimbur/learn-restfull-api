import { request, response } from 'express';
import { categoryValidation } from '../../validation';
import database from '../../connect';
import { generateSlug } from '../../utils/CategorySlug';

export const createCategory = async (req = request, res = response) => {
  try {
    const { name } = req.body;

    const { error: errorValidation } = categoryValidation.validate({
      name,
    });

    if (errorValidation) {
      return res.status(400).json({
        message: errorValidation.details[0].message,
      });
    }

    const slug = generateSlug(name);

    const newCategory = await database.category.create({
      data: {
        name,
        slug,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Create category succesfully',
      data: newCategory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
