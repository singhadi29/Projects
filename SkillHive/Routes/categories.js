const express = require('express');
const {Category, validate} = require('../models/categoriesModel');
const router = express.Router();

// const categories = [
//     {id: 1, name: 'Web'},
//     {id: 2, name: 'Mobile'},
//     {id: 3, name: 'Photography'},
//     {id: 4, name: 'DSA'}
// ]

router.get('/', async (req, res) => {
    let categories = await Category.find();
    res.send(categories);
});

router.get('/', async (req, res) => {
    const category = await Category.findById(req.params.id)

    if (!category)
            return res.status(404).send('Requested category does not exist.');
    
    res.send(category);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body) // {error} - Destructuring.

    if (error)
        res.status(400).send(error.details[0].message);

    const category = new Category ({
        name: req.body.name
    })

    await category.save();
    res.send(category);
});

router.put('/:id', async (req, res) => {
    const{error} = validate(req.body)

    if (error)
        res.status(400).send(error.details[0].message);

    const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true})

    if (!category)
        return res.status(404).send('Category with the given id does not exist.');

    res.send(category);
});

router.delete('/:id', async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id)

    if (!category)
        return res.status(404).send('Category with the given id does not exist.')

    res.send(category);
});

module.exports = router;