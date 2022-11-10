const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    }
},{timestamps:true})

module.exports = mongoose.model('Teacher', teacherSchema)