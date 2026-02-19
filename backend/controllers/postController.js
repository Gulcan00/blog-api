const prisma = require('../prismaClient');

const getAllPosts = async (req, res) => {
    const posts = await prisma.post.findMany({
        include: { author: true },
    });
    res.status(200).json(posts);
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
        include: { author: true },
    });
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
};

const createPost = async (req, res) => {
    const { title, content } = req.body;
    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            authorId: req.user.id,
        },
    });
    res.status(201).json(newPost);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
    });
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    if (post.authorId !== req.user.id) {
        return res.status(403).json({ error: "You can only edit your own posts" });
    }
    const updatedPost = await prisma.post.update({
        where: { id: parseInt(id) },
        data: { title, content },
    });
    res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
    });
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    if (post.authorId !== req.user.id) {
        return res.status(403).json({ error: "You can only delete your own posts" });
    }
    await prisma.post.delete({
        where: { id: parseInt(id) },
    });
    res.status(204).send();
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};