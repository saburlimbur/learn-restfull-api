import category_routes from './Category/categoryRoutes';
import post_routes from './Post/postRoutes';
import tag_routes from './Tags/tagRoutes';
import users_routes from './Users/usersRoutes';

const routes = [users_routes, post_routes, tag_routes, category_routes];

const router = (web) => {
  routes.forEach((route) => {
    web.use('/bsky/api/', route);
  });
};

export default router;
