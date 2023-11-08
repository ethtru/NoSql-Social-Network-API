const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
// /api/students/:studentId/assignments THIS IS FOR THOUGHTS
// router.route('/:studentId/assignments').post(addAssignment);

router.route("/:userId/friends").post(addFriend);
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
