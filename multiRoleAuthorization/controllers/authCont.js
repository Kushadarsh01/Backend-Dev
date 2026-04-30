import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const registerUser = async(req, res) => {
    try {
        const {
            name,
            email,
            password,
            role
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400)
            .json({
                message: "Name, email, and password are required."
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
            password: hashedPassword,
            role
        });

        res.status(201)
        .json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
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

        req.session.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.status(200)
        .json({
            message: "Logged in successfully",
            user: req.session.user
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};
