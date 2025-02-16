import { Router } from 'express';
import { createTags } from '../../controllers/Tags/createTags';
import verifyToken from './../../middleware/verifyToken';
import { getTags } from '../../controllers/Tags/getTags';
import { deleteTag } from '../../controllers/Tags/deleteTag';

const tag_routes = new Router();

tag_routes.post('/tag/create', verifyToken, createTags);
tag_routes.get('/tags/all', verifyToken, getTags);
tag_routes.delete('/tag/delete/:id', verifyToken, deleteTag);

export default tag_routes;
