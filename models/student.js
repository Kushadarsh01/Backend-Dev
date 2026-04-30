import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
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

        gpa: {
            type: Number,
            default: 0.0
        },

        city: {
            type: String,
            required: true
        },

        department: {
            type: String,
            required: true
        },

        enrolledCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            }
        ]
    },

    {
        timestamps: true
    }
)

const Student = mongoose.model('Student', studentSchema);

export default Student;