import { Router } from 'express';
import { createPost } from '../../controllers/Post/createPost';
import verifyToken from '../../middleware/verifyToken';
import { getPosts } from '../../controllers/Post/getPost';
import { getPostById } from '../../controllers/Post/getPostById';

const post_routes = new Router();

post_routes.post('/post/create', verifyToken, createPost);
post_routes.get('/posts/all', getPosts);
post_routes.get('/post/:id', verifyToken, getPostById);

export default post_routes;
