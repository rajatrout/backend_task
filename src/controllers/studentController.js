const studentModel = require('../models/studentModel');


const addStudent = async function(req,res){
    
    try{
        let teacherId = req.params.teacherId

        const {studentName, subjectName, marks} = req.body

        let student = await studentModel.findOne({studentName:studentName})

        if(student){
            let index = student.subject.findIndex(x => {
                if(x.subjectName == subjectName) return true
                else return false
            })

            if(index !== -1){ 
                student.subject[index].marks+=marks
                console.log(student.subject);

                const addSub = await studentModel.findOneAndUpdate({studentName:studentName},{subject: student.subject},{new:true})
                return res.status(200).send({status: true,data:addSub})
            }else{
                const addSub = await studentModel.findOneAndUpdate({studentName:studentName},{$push:{subject:{subjectName:subjectName, marks:marks}}},{new:true})
                return res.status(200).send({status: true,data:addSub})
            }
        }

        const addStudent = await studentModel.create({teacherId:teacherId,studentName:studentName, subject:[{subjectName:subjectName, marks:marks}]})
        return res.status(201).send({status:false, data: addStudent})

    }catch(err){
        res.status(500).send({status:false, message:err.message})
    }

}


const getStudent = async function(req,res){
    try{
        const studentId = req.params.studentId

        let student = await studentModel.findById(studentId)

        if(!student){
            return res.status(404).send({status:false, message:'Student not found.'})
        }

        const getStudent = await studentModel.findOne({studentId: studentId})

        return res.status(200).send({status:true, message:getStudent})

    }catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}

// If teacher wants to update the marks of the student
const updateStudent = async function(req,res){
    try{

        const studentId = req.params.studentId
        const {studentName, subjectName, marks} = req.body
        let final={}
        if(studentName){
            final.studentName = studentName
        }
        const student = await studentModel.findOne({studentId})
        if(!student){
            return res.status(404).send({status:false, message:'Stduent not found.'})
        }

        const index = student.subject.findIndex(x => {
            if(x.subjectName == subjectName) return true
            else return false
        })
        console.log(index);
        if(index == -1){
            return res.status(404).send({status:false, message:'You need to add the subject'})
        }

        student.subject[index].marks = marks
        final.subject = student.subject

        const updateStudent = await studentModel.findOneAndUpdate({studentId},final ,{new:true})

        return res.status(200).send({status:true, data: updateStudent})
    }catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}


const deleteStudent = async function(req,res){

try{

    const studentId = req.params.studentId

    const student = await studentModel.findById(studentId)

    if(!student){
        return res.status(404).send({status: false, message:'Student not found.'})
    }
    if(student.isDeleted == true){
        return res.status(404).send({status: false, message:'Student already deleted.'})
    }

    await studentModel.findOneAndUpdate({_id:studentId},{isDeleted:false})
    return res.status(404).send({status: false, message:'Student sucessfully deleted.'})
}catch(err){
    return res.status(500).send(err.message)
}
}

module.exports.addStudent = addStudent
module.exports.getStudent = getStudent 
module.exports.updateStudent = updateStudent
module.exports.deleteStudent = deleteStudent