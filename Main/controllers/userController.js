const { User, Thought } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const user = await User.find();

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__V"
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }
      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    console.log("U R adding a User");
    console.log(req.body);
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, //what does this need to be changed to
        { $addToSet: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "bad" });
      }
      res.json({ user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove(
        { _id: req.params.userId } //change this
      );
      if (!user) {
        return res.status(404).json({
          message: "no user from this id exists",
        });
      }
      // const deletingThoughts = await Thought.findOneAndUpdate(
      //     {deletingUser: req.params. }
      // )
      res.json({ message: "User Deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    console.log("You have friends, whats that like");
    console.log(req.body);
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status.json({ message: "no friend" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async noFriends(req, res) {
    console.log("what r friends");
    console.log(req.body);
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status.json({ message: "no friend" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
