const { Router } = require("express");
const AuthControler = require("../authController");
const CourseController = require("./courses.controller");

const router = new Router();

router
  .route("/get_all_courses")
  .get(AuthControler.verifyUserJwt, CourseController.getAllCourses);

module.exports = router;
