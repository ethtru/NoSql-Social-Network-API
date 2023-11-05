// const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User
        // .populate("friends")
        // .populate("thoughts")
        .findOne({ _id: req.params.userId })
        .select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove them from the app
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and thoughts deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a thought to a user

  async addThought(req, res) {
    console.log("You are adding an thought");
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove assignment from a student
  // async removeAssignment(req, res) {
  //   try {
  //     const student = await Student.findOneAndUpdate(
  //       { _id: req.params.studentId },
  //       { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!student) {
  //       return res
  //         .status(404)
  //         .json({ message: 'No student found with that ID :(' });
  //     }

  //     res.json(student);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
};
