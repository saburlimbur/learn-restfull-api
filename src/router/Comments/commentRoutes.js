import { Router } from 'express';
import verifyToken from '../../middleware/verifyToken';
import { createComment } from '../../controllers/Comments/createComments';

const comment_routes = new Router();

comment_routes.post('/comment/create', verifyToken, createComment);

export default comment_routes;
