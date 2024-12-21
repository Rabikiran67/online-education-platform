const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('lessons');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description, category } = req.body;
        const course = new Course({ name, description, category });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
