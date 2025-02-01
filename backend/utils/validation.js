const Users = require("../models/userModel");
const Genre = require("../models/genreModel");

const validateAuthorAndGenre = async (author, genre) => {
  const errors = [];
  if (author) {
    const user = await Users.findById(author);
    if (!user) errors.push("Author not found");
  }
  if (genre) {
    const cat = await Genre.findById(genre);
    if (!cat) errors.push("Genre not found");
  }
  return errors;
};

module.exports = { validateAuthorAndGenre };
