const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses1() {
  return await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function getCourses2() {
  return await Course.find({
    isPublished: true,
    tags: { $in: ["backend", "frontend"] },
  })
    // .sort({ price: -1 })
    .sort("-price")
    // .select({ name: 1, author: 1 });
    .select("name author");
}

async function getCourses3() {
  return await Course.find({ isPublished: true }).or([
    { price: { $gte: 15 } },
    { name: /.*by.*/i },
  ]);
}

async function run() {
  const courses = await getCourses3();
  console.log(courses);
}

run();
