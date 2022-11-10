const teacherModel = require("../models/teacherModel.js");
const studentModel = require("../models/studentModel.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createTeacher = async function(req,res){

try{

    const {name, email, password} = req.body

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    req.body.password = hash;

    const teacher = await teacherModel.create(req.body)
    return res.status(201).send({data:teacher })
}catch(err){
    return res.status(500).send(err.message)
}
}


const loginTeacher = async function(req,res){
    const {email, password} = req.body

    const teacher = await teacherModel.findOne({email:email})

    let ans = await bcrypt.compare(password, teacher.password)
    console.log(ans)
 
    await bcrypt.compare(password, teacher.password, async function(err, result) {

        if (result) {
            let token = jwt.sign({
                    teacherId: teacher._id.toString(),
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 50 * 60 * 60,
                    batch: "radon",
                    organisation: "functionUp"
                },
                "rajat"
            )

            res.setHeader("Authorization", token)
            let student = await studentModel.find({teacherId:teacher._id.toString()})
            return res.status(200).send({teacher,student})

        } else {
            return res.status(401).send({ status: false, message: "Invalid password!" });
        }
    })
}

module.exports.createTeacher = createTeacher
module.exports.loginTeacher = loginTeacher