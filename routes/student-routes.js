const express = require('express');
const { createStudent, getAllStudents, updateStudent, deleteStudentById, findStudentById } = require('../controllers/studentcontroller');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createStudent)
router.get('/', getAllStudents)
router.put('/:id', authMiddleware, updateStudent)
router.get('/:id', findStudentById)
router.delete('/:id', authMiddleware, deleteStudentById)
module.exports = router