const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const tho = await Thought.find();
      res.json(tho);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThoughts(req, res) {
    try {
      const tho = await Thought.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!tho) {
        return res.status(404).json({ message: "not thoughts" });
      }
      res.json({
        user,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThoughts(req, res) {
    try {
      const tho = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: tho._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "no user" });
      }
      res.json(tho);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThoughts(req, res) {
    console.log("U R adding a thought");
    console.log(req.body);
    try {
      const tho = await User.findOneAndUpdate(
        { _id: req.params.thoId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!tho) {
        res.status(404).json({ message: "no thought" });
      }
      res.json(tho);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThoughts(req, res) {
    try {
      const tho = await Thought.findByIdAndRemove({ _id: req.params.thoId });
      if (!tho) {
        return res.status(404).json({
          message: "no thought existed",
        });
      }
      res.json({ message: "thought deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReactions(req, res) {
    console.log("making reaction");
    try {
      const react = await Thought.findOneAndUpdate(
        { _id: req.params.reactId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      res.json(react);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReactions(req, res) {
    try {
      const react = await Thought.findOneAndDelete(
        { _id: req.params.reactId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      res.json(react);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
