import { Router } from 'express';
import { createPost } from '../../controllers/Post/createPost';
import verifyToken from '../../middleware/verifyToken';
import { getPosts } from '../../controllers/Post/getPost';
import { getPostById } from '../../controllers/Post/getPostById';
import { deletePost } from './../../controllers/Post/deletePost';
import { updatePost } from '../../controllers/Post/updatePost';
import { getPostBySlug } from '../../controllers/Post/getPostBySlug';

const post_routes = new Router();

post_routes.post('/post/create', verifyToken, createPost);
post_routes.get('/posts/all', getPosts);
post_routes.get('/posts/id/:id', getPostById);
post_routes.delete('/post/delete/:id', verifyToken, deletePost);
post_routes.put('/post/update/:id', verifyToken, updatePost);
post_routes.get('/posts/slug/:slug', getPostBySlug);

export default post_routes;
