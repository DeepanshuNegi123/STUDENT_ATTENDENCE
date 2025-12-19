import Class from "../models/classes.js";
import SubjectOffering from "../models/subjectoffering.js";

export const createClass = async (req, res) => {
  const data = req.body;
  const newClass = await Class.create(data);
  res.status(201).json(newClass);
};

export const getAllClasses = async (req, res) => {
  const classes = await Class.find({ isActive: true });
  res.json(classes);
};

export const assignSubjectToClass = async (req, res) => {
  const offering = await SubjectOffering.create(req.body);
  res.status(201).json(offering);
};

export const getAllOfferings = async (req, res) => {
  const offerings = await SubjectOffering.find()
    .populate("classId")
    .populate("subjectId")
    .populate("teacherId");

  res.json(offerings);
};
