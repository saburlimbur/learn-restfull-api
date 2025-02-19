import { Router } from 'express';
import { createUsers } from '../../controllers/Users/createUsers';
import verifyToken from '../../middleware/verifyToken';
import { getUsers } from '../../controllers/Users/getUsers';
import { getUserById } from '../../controllers/Users/getUserById';
import { loginUsers } from '../../controllers/Users/loginUsers';
import { updateUser } from '../../controllers/Users/updateUser';

const users_routes = new Router();

users_routes.post('/users/create', createUsers);
users_routes.post('/users/login', loginUsers);
users_routes.get('/users', getUsers);
users_routes.get('/users/:id', verifyToken, getUserById);
users_routes.put('/users/update/:id', verifyToken, updateUser);

export default users_routes;
