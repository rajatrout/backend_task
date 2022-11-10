const express = require('express')
const router = express.Router()

const {createTeacher, loginTeacher} = require('../controllers/teacherController.js')
const {addStudent,getStudent,updateStudent,deleteStudent} = require('../controllers/studentController.js')

router.post('/teacherRegistration', createTeacher)
router.post('/teacherLogin',loginTeacher)


router.post('/addStudent/:teacherId',addStudent)
router.get('/getStudent/:studentId',getStudent)
router.put('/updateStudent/:studentId',updateStudent)
router.delete('/deleteStudent/:studentId',deleteStudent)

module.exports = router