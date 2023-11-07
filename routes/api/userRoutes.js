const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  // addAssignment,
  // removeAssignment,
} = require("../../controllers/userController");

// /api/students
router.route("/").get(getAllUsers).post(createUser);

// /api/students/:studentId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/students/:studentId/assignments THIS IS FOR THOUGHTS
// router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId  THOUGHTS
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
