import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401)
        .json({
            message: "Access token is missing."
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_SECRET, (error, user) => {
        if (error) {
            return res.status(403)
            .json({
                message: "Invalid or expired access token."
            });
        }

        req.user = user;
        next();
    });
};
