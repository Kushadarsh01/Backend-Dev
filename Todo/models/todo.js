import mongoose, { model } from 'mongoose';

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        default: false
    }
},

{
    timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;