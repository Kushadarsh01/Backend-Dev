import mongoose from 'mongoose';

const professorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        departments: [
            {
                type: String
            }
        ]
    },
    
    {
        timestamps: true
    }
)

const Professor = mongoose.model('Professor', professorSchema);

export default Professor;