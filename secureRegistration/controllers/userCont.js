import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
};

export const createUser = async(req, res) => {
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

        if (!validatePassword(password)) {
            return res.status(400)
            .json({
                message: "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character."
            });
        }

        const exists = await User.findOne({email});

        if(exists) {
            return res.status(409)
            .json({
                message: "User already exists"
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
