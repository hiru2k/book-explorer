const router = require("express").Router();

const genreCtrl = require("../controllers/genreCtrl");
const auth = require("../middlewares/auth");

router.route("/genre").get(auth, genreCtrl.getGenres);

module.exports = router;
