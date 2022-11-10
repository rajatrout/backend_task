const express = require('express')
const router = express.Router()

const {createTeacher, loginTeacher} = require('../controllers/teacherController.js')
const {addStudent,getStudent,updateStudent,deleteStudent} = require('../controllers/studentController.js')
const {authentication,authorization} = require('../middleware/auth.js')

router.post('/teacherRegistration', createTeacher)
router.post('/teacherLogin',loginTeacher)


router.post('/addStudent/:teacherId',addStudent)
router.get('/getStudent/:studentId',authentication,getStudent)
router.put('/updateStudent/:teacherId/:studentId',authentication,authorization,updateStudent)
router.delete('/deleteStudent/:teacherId/:studentId',authentication,authorization,deleteStudent)

module.exports = router