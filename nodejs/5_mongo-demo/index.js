const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true, // convert to lowercase
    trim: true, // remove leading and trailing whitespace
  },
  author: String,
  // tags: {
  //   type: Array,
  //   validate: {
  //     validator: function (v) {
  //       return v && v.length > 0;
  //     },
  //     message: "A course should have at least one tag.",
  //   },
  // },
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(v && v.length > 0);
          }, 4000);
        });
      },
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number, // mongoose type
    required: function () {
      return this.isPublished;
    }, // price is only required when published
    min: 10,
    max: 200,
    get: (v) => Math.round(v), // round the value when getting it
    set: (v) => Math.round(v), // round the value when setting it
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    category: "Web",
    tags: ["frontend"],
    isPublished: true,
    price: 15.88,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}

async function getCourses() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than and equal to)
  // lt (less than)
  // lte (less than and equal to)
  // in
  // nin (not in)
  const courses = await Course
    // .find({ author: "Mosh", isPublished: true })
    // .find({ price: { $gt: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    // .find()
    // .or([{ author: "Mosh" }, { isPublished: true }])
    // .and([{ author: "Mosh" }, { isPublished: true }])
    .find({ author: /^Mosh/ }) // starts with Mosh
    .find({ author: /Hamedani$/i }) // ends with Hamedani (case insensitive)
    .find({ author: /.*Mosh.*/i }) // contains Mosh
    .limit(10)
    .sort({ name: 1 })
    // .select({ name: 1, tags: 1 });
    .count(); // returns only count
  console.log(courses);
}

async function updateCourse1(id) {
  // Query first
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Another Author";
  //   course.set( {
  //     isPublished: true,
  //     author: "Another Author"
  //   })
  const result = await course.save();
  console.log(result);
}

async function updateCourse2(id) {
  // Update first
  const course = await Course.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        author: "Jack",
        isPublished: true,
      },
    }
  );
  console.log(course);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id }); // can also use findByIdAndRemove
  console.log(result);
}

createCourse();

// getCourses();

// updateCourse1("6678696892acc7255cdf2bfd");

// updateCourse2("6678696892acc7255cdf2bfd");

// removeCourse("6678696892acc7255cdf2bfd");
