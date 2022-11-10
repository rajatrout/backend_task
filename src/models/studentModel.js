const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    subject:[
        {
            subjectName:{
                type: String
            },
            marks:{
                type:Number
            }
        }
    ]
},{timestamps:true})

module.exports = mongoose.model('Student', studentSchema)