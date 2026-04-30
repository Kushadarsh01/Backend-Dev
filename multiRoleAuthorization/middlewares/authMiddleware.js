import Post from '../models/postModel.js';

export const isAuthenticated = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401)
        .json({
            message: "Unauthorized: Please log in."
        });
    }
    next();
};

export const requireRole = (role) => {
    return (req, res, next) => {
        const userRole = req.session.user.role;
        
        if (userRole === 'admin') {
            return next();
        }

        if (role === 'moderator' && userRole === 'moderator') {
            return next();
        }

        return res.status(403)
        .json({
            message: "Forbidden: You don't have the required permissions."
        });
    };
};

export const isOwnerOrModerator = async(req, res, next) => {
    try {
        const {
            id
        } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404)
            .json({
                message: "Post not found."
            });
        }

        const userRole = req.session.user.role;
        const userId = req.session.user._id;

        if (userRole === 'admin' || userRole === 'moderator' || post.author.toString() === userId.toString()) {
            return next();
        }

        return res.status(403)
        .json({
            message: "Forbidden: You are not the owner or a moderator."
        });
    }
    
    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};
