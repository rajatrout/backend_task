const studentModel = require('../models/studentModel');


const addSubject = async function(req,res){
    
    try{
        // if (Object.keys(req.body).length == 0) {
        //     return res
        //       .status(400)
        //       .send({
        //         status: false,
        //         message: "No details given. Kindly enter some.",
        //       });
        // }
        const studentId = req.params.studentId
        const {subjectName, marks} = req.body

        let student = await studentModel.findById(studentId)

        if(!student){
            return res.status(404).send({status:false, message:'Student not found.'})
        }

        let index = student.subject.findIndex(x => {
            if(x.subjectName == subjectName) return true
            else return false
        })

        const subjectToBeUpdated = {subjectName:subjectName, marks: student.subject[index].marks + marks}

        // const a = student.subject[index] = 

        // if(index !== -1){ 
        //     const addSub = await subjectModel.findOneAndUpdate({studentId:studentId},{subject[index]:},{new:true})
        //     return res.status(200).send({status: true,data:addSub})
        // }

        const addSub = await subjectModel.findOneAndUpdate({studentId:studentId},{$push:{subject:req.body}})
        return res.status(201).send({status:false, data: addSub})

    }catch(err){
        res.status(500).send({status:false, message:err.message})
    }

}


const getSubjet = async function(req,res){
    try{
        const studentId = req.params.studentId

        let student = await studentModel.findById(studentId)

        if(!student){
            return res.status(404).send({status:false, message:'Student not found.'})
        }

        const getStudent = await studentModel.find({studentId: studentId})

        return res.status(200).send({status:true, message:getStudent})

    }catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}


const updateSubject = async function(req,res){
    try{
        if (Object.keys(req.body).length == 0) {
            return res
              .status(400)
              .send({
                status: false,
                message: "No details given. Kindly enter some.",
              });
        }

        // const {studentId}
    }catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}