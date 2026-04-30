import Post from '../models/postModel.js';

export const createPost = async(req, res) => {
    try {
        const {
            title,
            content
        } = req.body;

        if (!title || !content) {
            return res.status(400)
            .json({
                message: "Title and content are required."
            });
        }

        const newPost = await Post.create({
            title,
            content,
            author: req.session.user._id
        });

        res.status(201)
        .json({
            post: newPost
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const updatePost = async(req, res) => {
    try {
        const {
            id
        } = req.params;

        const {
            title,
            content
        } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content },
            { returnDocument: 'after' }
        );

        res.status(200)
        .json({
            message: "Post updated",
            post: updatedPost
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const deletePost = async(req, res) => {
    try {
        const {
            id
        } = req.params;

        await Post.findByIdAndDelete(id);

        res.status(200)
        .json({
            message: "Post deleted successfully"
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};
