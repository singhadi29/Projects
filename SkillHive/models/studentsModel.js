const mongoose = require('mongoose')
const Joi = require('joi');

const studentSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 25
    },
    isEnrolled: {
        type: Boolean,
        default: false
    }
})

const Student = mongoose.model('Student', studentSchema);

function validateData(student) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        phone: Joi.string().min(10).max(15).required(),
        isEnrolled: Joi.boolean()
    }
    
    // return schema.validate(student);
    return Joi.validate(student, schema);
}

exports.Student = Student;
exports.validate = validateData;

// module.exports = {
//     Student,
//     validate: validateData
// }