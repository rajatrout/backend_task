const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema({
    teacherId:{
        type: ObjectId,
        ref: "Teacher",
        required: true,
        unique: true,
        trim: true,
    },
    studentName:{
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
    ],
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model('Student', studentSchema)