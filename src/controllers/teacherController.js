const teacherModel = require("../models/teacherModel.js");
const studentModel = require("../models/studentModel.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const isValidString = function(value) { //function to check entered data is valid or not
    if (typeof value == 'undefined' || value == null) return false;
    if (typeof value == 'string' && value.trim().length === 0) return false;
    return true;
}

const createTeacher = async function(req,res){

try{

    if(Object.keys(req.body).length == 0){
        return res.status(400).send({status:false, message:'Kindly Enter Any details.'})
    }

    const {name, email, password} = req.body

    if(!isValidString(name)){
        return res.status(400).send({status:false, message:'Invalid Name'})
    }

    if(!isValidString(email)){
        return res.status(400).send({status:false, message:'Invalid Email'})
    }
    const duplicateEmail = await teacherModel.findOne({email})
    if(duplicateEmail){
        return res.status(400).send({status:false, message:'Email already exists.'})
    }

    if(!isValidString(password)){
        return res.status(400).send({status:false, message:'Invalid Password'})
    }

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
try{

    if(Object.keys(req.body).length == 0){
        return res.status(400).send({status:false, message:'Kindly Enter Any details.'})
    }

    const {email, password} = req.body

    if(!isValidString(email)){
        return res.status(400).send({status: false, message: 'Invalid Email'})
    }

    const teacher = await teacherModel.findOne({email:email})
    if(!teacher){
        return res.status(400).send({status:false, message:'Email not exists.'})
    }

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
}catch(err){
    return res.status(500).send(err.message)
}
}

module.exports.createTeacher = createTeacher
module.exports.loginTeacher = loginTeacher