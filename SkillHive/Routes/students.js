const express = require('express');
const {Student, validate} = require('../models/studentsModel');
const router = express.Router();

router.get('/', async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

router.get('/', async (req, res) => { // '/' denotes default URL.
    const student = await Student.findById(req.params.id)

    if (!student)
            return res.status(404).send('Requested student does not exist.');
    
    res.send(student);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body) // {error} - Destructuring.

    if (error)
        res.status(400).send(error.details[0].message);

    const student = new Student ({
        name: req.body.name,
        phone: req.body.phone,
        isEnrolled: req.body.isEnrolled
    })

    student = await student.save();
    res.send(student);
});

router.put('/:id', async (req, res) => {
    const{error} = validate(req.body)

    if (error)
        res.status(400).send(error.details[0].message);

    const student = await Student.findByIdAndUpdate(req.params.id, {name: req.body.name, phone: req.body.phone, isEnrolled: req.body.isEnrolled}, {new: true});

    if (!student)
        return res.status(404).send('student with the given id does not exist.');

    res.send(student);
});

router.delete('/:id', async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id)

    if (!student)
        return res.status(404).send('student with the given id does not exist.')

    res.send(student);
});

module.exports = router;