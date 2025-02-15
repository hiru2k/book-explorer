const router = require("express").Router();
const {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookCtrl");
const auth = require("../middlewares/auth");

router.route("/books").get(auth, getBooks).post(auth, createBook);

router.route("/books/:id").delete(auth, deleteBook).put(auth, updateBook);

module.exports = router;
