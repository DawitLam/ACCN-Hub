require('dotenv').config();
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const lesson = await Lesson.findOne({ title: /Session 1:/ });
  console.log(lesson.content);
  await mongoose.disconnect();
})();
