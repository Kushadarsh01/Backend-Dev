import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true
        },

        credits: {
            type: Number,
            required: true
        },
        
        prerequisites: [
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

const Course = mongoose.model('Course', courseSchema);

export default Course;