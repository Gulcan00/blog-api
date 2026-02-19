const commentRouter = require('express').Router();
const commentController = require('../controllers/commentController');

// Individual comment operations
commentRouter.get('/:id', commentController.getCommentById);
commentRouter.delete('/:id', commentController.deleteComment);

module.exports = commentRouter;