import { Router } from 'express';
import { createTags } from '../../controllers/Tags/createTags';
import verifyToken from './../../middleware/verifyToken';
import { getTags } from '../../controllers/Tags/getTags';

const tag_routes = new Router();

tag_routes.post('/tag/create', verifyToken, createTags);
tag_routes.get('/tags/all', verifyToken, getTags);

export default tag_routes;
