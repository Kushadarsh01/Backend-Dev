import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js';

export const registerUser = async(req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400)
            .json({
                message: "All fields are required."
            });
        }

        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(409)
            .json({
                message: "User already exists."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201)
        .json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const loginUser = async(req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400)
            .json({
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({email});

        if (!user) {
            return res.status(401)
            .json({
                message: "Invalid credentials."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401)
            .json({
                message: "Invalid credentials."
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshTokens.push(refreshToken);
        await user.save();

        res.status(200)
        .json({
            message: "Logged in successfully",
            accessToken,
            refreshToken
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const refreshToken = async(req, res) => {
    try {
        const {
            token
        } = req.body;

        if (!token) {
            return res.status(401)
            .json({
                message: "Refresh token is missing."
            });
        }

        const user = await User.findOne({ refreshTokens: token });

        if (!user) {
            return res.status(403)
            .json({
                message: "Invalid refresh token."
            });
        }

        jwt.verify(token, process.env.REFRESH_SECRET, (error, decoded) => {
            if (error) {
                user.refreshTokens = user.refreshTokens.filter(rt => rt !== token);
                user.save();

                return res.status(403)
                .json({
                    message: "Invalid or expired refresh token."
                });
            }

            const newAccessToken = generateAccessToken(user);

            res.status(200)
            .json({
                accessToken: newAccessToken
            });
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const logoutUser = async(req, res) => {
    try {
        const {
            token
        } = req.body;

        if (!token) {
            return res.status(400)
            .json({
                message: "Refresh token is required for logout."
            });
        }

        const user = await User.findOne({ refreshTokens: token });

        if (user) {
            user.refreshTokens = user.refreshTokens.filter(rt => rt !== token);
            await user.save();
        }

        res.status(200)
        .json({
            message: "Logged out successfully"
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};
