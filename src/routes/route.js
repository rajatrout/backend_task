const express = require('express')
const router = express.Router()

const {createTeacher, loginTeacher} = require('./controllers/teacherController.js')

router.post('/teacherRegistration', createTeacher)
router.post('/teacherLogin',loginTeacher)

module.exports = router