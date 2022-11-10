const teacherModel = require("../models/teacherModel.js");
const bcrypt = require('bcrypt');
const studentModel = require("../models/studentModel.js");

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
 
    await bcrypt.compare(password, teacher.password, async function(err, result) {

        if (result) {
            let token = jwt.sign({
                    userId: user._id.toString(),
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 50 * 60 * 60,
                    batch: "radon",
                    organisation: "functionUp"
                },
                "MeNeSunRa-radon"
            )

            res.setHeader("Authorization", token)
            let student = await studentModel.find({teacherId:teacher._id.toString()})
            return res.status(200).send({student})

        } else {
            return res.status(401).send({ status: false, message: "Invalid password!" });
        }
    })
}

module.exports.createTeacher = createTeacher
module.exports.loginTeacher = loginTeacher