const postRouter = require('express').Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const { authorize } = require('../middleware/auth');
const roles = require('../utils/roles-enum');

postRouter.get('/', postController.getAllPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.post('/', authorize(roles.AUTHOR), postController.createPost);
postRouter.put('/:id', authorize(roles.AUTHOR), postController.updatePost);
postRouter.delete('/:id', authorize(roles.AUTHOR), postController.deletePost);

// Nested comment routes
postRouter.get('/:id/comments', commentController.getCommentsByPostId);
postRouter.post('/:id/comments', commentController.createComment);

module.exports = postRouter;