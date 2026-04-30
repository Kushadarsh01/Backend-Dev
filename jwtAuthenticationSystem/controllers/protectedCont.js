import User from '../models/userModel.js';

export const getProtectedData = async(req, res) => {
    try {
        const userId = req.user.id;
        
        const userProfile = await User.findById(userId).select('-password -refreshTokens');

        if (!userProfile) {
            return res.status(404)
            .json({
                message: "User profile not found."
            });
        }

        res.status(200)
        .json({
            message: "Welcome to your secure profile",
            profile: userProfile,
            accountStatus: "Active",
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};
