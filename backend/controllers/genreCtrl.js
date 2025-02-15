const Genre = require("../models/genreModel");

async function getGenres(req, res) {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

module.exports = { getGenres };
