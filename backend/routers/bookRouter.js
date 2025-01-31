const router = require("express").Router();
const bookCtrl = require("../controllers/bookCtrl");
const auth = require("../middlewares/auth");

router
  .route("/books")
  .get(auth, bookCtrl.getBooks)
  .post(auth, bookCtrl.createBook);

router
  .route("/books/:id")
  .delete(auth, bookCtrl.deleteBook)
  .put(auth, bookCtrl.updateBook);

module.exports = router;
