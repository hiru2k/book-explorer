const Genre = require("../models/genreModel");

const genreCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Genre.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = genreCtrl;
