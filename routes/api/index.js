const router = require("express").Router();
const friendsRoutes = require("./friendsRoutes.js");
const userRoutes = require("./userRoutes");

router.use("/videos", friendsRoutes);
router.use("/users", userRoutes);

module.exports = router;
