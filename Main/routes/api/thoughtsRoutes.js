const router = require("express").Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  createReactions,
  deleteReactions,
} = require("../../controllers/thoughtsController");

router.route("/").get(getThoughts).post(createThoughts);

router
  .route("/:thoughtId")
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

router.route("/:thoughtId/reactions").post(createReactions);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReactions);

module.exports = router;
