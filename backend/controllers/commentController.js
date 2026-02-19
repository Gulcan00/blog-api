const prisma = require('../utils/prisma-client');

// Get all comments for a specific post
const getCommentsByPostId = async (req, res) => {
  try {
    const { id } = req.params;
    
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(id) },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.status(200).json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Get a single comment by ID
const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        },
        post: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    res.status(200).json(comment);
  } catch (error) {
    console.error('Get comment error:', error);
    res.status(500).json({ error: 'Failed to fetch comment' });
  }
};

// Create a new comment on a post
const createComment = async (req, res) => {
  try {
    const { id } = req.params; // post id
    const { content } = req.body;
    
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Comment content is required' });
    }
    
    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        postId: parseInt(id),
        userId: req.user.id
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });
    
    res.status(201).json(comment);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if comment exists and belongs to user
    const existingComment = await prisma.comment.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    if (existingComment.userId !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own comments' });
    }
    
    await prisma.comment.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

module.exports = {
  getCommentsByPostId,
  getCommentById,
  createComment,
  deleteComment
};
