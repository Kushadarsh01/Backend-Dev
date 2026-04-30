import Student from '../models/student.js';

export const createStudent = async(req, res) => {
    try {
        const {
            name,
            email,
            city,
            department
        } = req.body;

        if (!name || !email || !city || !department) {
            return res.status(400)
            .json({
                message: "All fields are required."
            });
        }

        const exists = await Student.findOne({email});

        if(exists) {
            return res.status(400)
            .json({
                message: "Student already exists"
            });
        }

        const newStudent = await Student.create({
            name,
            email,
            city,
            department
        });

        res.status(201)
        .json({
            id: newStudent._id,
            name: newStudent.name,
            email: newStudent.email,
            department: newStudent.department
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const filterStudents = async(req, res) => {
    try {
        const {
            minGpa,
            maxGpa,
            minCourses,
            top
        } = req.query;

        let query = {};

        if (minGpa && maxGpa) {
            query.gpa = { $gte: parseFloat(minGpa), $lte: parseFloat(maxGpa) };
        }

        if (minCourses) {
            query[`enrolledCourses.${minCourses}`] = { $exists: true }; 
        }

        let dbQuery = Student.find(query);

        if (top) {
            dbQuery = dbQuery.sort({ gpa: -1 }).limit(parseInt(top));
        }

        const students = await dbQuery.exec();

        res.status(200)
        .json(students);
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const getStudentByEmail = async(req, res) => {
    try {
        const {
            email
        } = req.params;

        if (!email) {
            return res.status(400)
            .json({
                message: "Email parameter is required."
            });
        }

        const student = await Student.findOne({email});

        if (!student) {
            return res.status(404)
            .json({
                message: "Student not found."
            });
        }

        res.status(200)
        .json(student);
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const updateStudentGpa = async(req, res) => {
    try {
        const {
            email
        } = req.params;

        const {
            gpa
        } = req.body;

        if (gpa === undefined) {
            return res.status(400)
            .json({
                message: "GPA is required."
            });
        }

        const student = await Student.findOneAndUpdate(
            { email },
            { $set: { gpa } },
            { returnDocument: 'after' }
        );

        if (!student) {
            return res.status(404)
            .json({
                message: "Student not found."
            });
        }

        res.status(200)
        .json({
            message: "Student GPA updated successfully."
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const deleteStudent = async(req, res) => {
    try {
        const {
            email
        } = req.params;

        const result = await Student.findOneAndDelete({email});

        if (!result) {
            return res.status(404)
            .json({
                message: "Student not found."
            });
        }

        res.status(200)
        .json({
            message: "Student deleted successfully."
        });
    }

    catch (error) {
        res.status(500)
        .json({
            message: error.message
        });
    }
};

export const getStudentsByCityCount = async(req, res) => {
    try {
        const results = await Student.aggregate([
            { $group: { _id: '$city', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
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