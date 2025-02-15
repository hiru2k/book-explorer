const router = require("express").Router();

const { getGenres } = require("../controllers/genreCtrl");
const auth = require("../middlewares/auth");

router.route("/genre").get(auth, getGenres);

module.exports = router;
