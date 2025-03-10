import { Router } from 'express';
import verifyToken from '../../middleware/verifyToken';
import { createCategory } from '../../controllers/Category/createCategory';
import { getCategoryById } from '../../controllers/Category/getCategoryById';
import { getCategory } from '../../controllers/Category/getCategory';
import { deleteCategory } from '../../controllers/Category/deleteCategory';
import { getCategoryBySlug } from '../../controllers/Category/getCategoryBySlug';

const category_routes = new Router();

category_routes.post('/category/create', verifyToken, createCategory);
category_routes.get('/category/detail-id/:id', getCategoryById);
category_routes.get('/categorys', getCategory);
category_routes.delete('/category/delete/:id', verifyToken, deleteCategory);
category_routes.get('/category/detail-slug/:slug', getCategoryBySlug);

export default category_routes;
