const CourseModel = require("../../Models/CourseModel");

const CreateCourseController = async (req, res) => {
  try {
    const course = await CourseModel.create(req.body);
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar curso.", details: error.message });
  }
};

module.exports = CreateCourseController;
// Created by: Marcos