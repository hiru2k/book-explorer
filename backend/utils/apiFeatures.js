class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };
    ["page", "sort", "limit"].forEach((el) => delete queryObj[el]);

    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));
    return this;
  }
}

module.exports = APIfeatures;
