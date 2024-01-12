const CustomApiError = require('../error/customApiError');
const student = require('../models/student')

const createStudent = async (req, res) => {
    console.log(req.user)
    try {
        const stu = await student.create(req.body);
        res.status(201).json(stu)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
const getAllStudents = async (req, res) => {
    try {
        let students = await student.find();
        students=students.sort((s1,s2)=>
            s1.name.localeCompare(s2.name))
        res.status(200).json(students)
    }
    catch (err) {
        res.status(500).json(err)
    }
}
// const updateStudent = async (req, res) => {
//     const studentId = req.params.id;
//     try {
//         await student.findByIdAndUpdate(studentId, req.body);
//         const updateStud = await student.findById(studentId)
//         res.status(200).json(updateStud)
//     }
//     catch (err) {
//         res.status(500).json(err)
//     }
// }
const updateStudent = async (req, res, next) => {
    const studentId = req.params.id;
    try {
        console.log(req.body);
        const updatedStud = await student.findByIdAndUpdate(studentId, req.body, { new: true });
        if (!updatedStud)
            next(new CustomApiError(`cannot be updated...${studentId} doesnt exist..`, 400))
        else
            res.status(200).json(updatedStud);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
const findStudentById = async (req, res) => {
    const studentId = req.params.id;
    try {
        const stu = await student.findById(studentId)
        res.status(200).json(stu)
    }
    catch (err) {
        res.status(500).json(err)
    }
}
// const deleteStudentById = async (req, res) => {
//     const studentId = req.params.id;
//     try {
//         await student.deleteOne({ _id: studentId })
//         res.status(200).json({ "message": "Deleted Successfully..." })
//     }
//     catch (err) {
//         res.status(500).json(err)
//     }
// }
const deleteStudentById = async (req, res, next) => {
    const studentId = req.params.id;
    try {
        const result = await student.deleteOne({ _id: studentId })
        if (result.deletedCount === 0)
            next(new CustomApiError(`${studentId} doesnt exist`, 400))
        else
            res.status(200).json({ "message": "Deleted Successfully..." })
    }
    catch (err) {
        res.status(500).json(err)
    }
}
module.exports = { createStudent, getAllStudents, updateStudent, deleteStudentById, findStudentById }