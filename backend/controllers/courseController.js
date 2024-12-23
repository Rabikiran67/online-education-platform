const Course = require('../models/Course');

// Create a new course
exports.createCourse = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      instructor: req.user.id, // Authenticated user
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating course', error: err.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email');
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};

// Get a specific course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching course', error: err.message });
  }
};
