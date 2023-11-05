const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  // addAssignment,
  // removeAssignment,
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/students/:studentId/assignments THIS IS FOR THOUGHTS
// router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId  THOUGHTS
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;