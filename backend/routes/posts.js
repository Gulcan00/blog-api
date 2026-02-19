const postRouter = require('express').Router();
const postController = require('../controllers/postController');
const { authorize } = require('../middleware/auth');
const roles = require('../utils/roles-enum');

postRouter.get('/', postController.getAllPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.post('/', authorize(roles.AUTHOR), postController.createPost);
postRouter.put('/:id', authorize(roles.AUTHOR), postController.updatePost);
postRouter.delete('/:id', authorize(roles.AUTHOR), postController.deletePost);

module.exports = postRouter;