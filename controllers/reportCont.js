import Student from '../models/student.js';

export const getAverageGpaByDept = async(req, res) => {
    try {
        const results = await Student.aggregate([
            { $group: { _id: '$department', avgGPA: { $avg: '$gpa' } } },
            { $sort: { avgGPA: -1 } }
        ]);

        res.status(200)
        .json(results);
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const getPopularCourses = async(req, res) => {
    try {
        const results = await Student.aggregate([
            { $unwind: '$enrolledCourses' },
            { $group: { _id: '$enrolledCourses', studentCount: { $sum: 1 } } },
            { $sort: { studentCount: -1 } },
            { $limit: 5 }
        ]);

        res.status(200)
        .json(results);
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};