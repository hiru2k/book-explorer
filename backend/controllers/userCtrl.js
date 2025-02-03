const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/tokenHelper");
const { handleErrors } = require("../utils/errorHandler");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findOne({ email });
      if (user)
        return handleErrors(res, new Error("This email already exists"), 400);

      if (password.length < 6)
        return handleErrors(
          res,
          new Error("Password should be at least 6 characters long"),
          400
        );

      //passwrod encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });
      await newUser.save();

      return res.json({ msg: "Successfully Registered" });
    } catch (err) {
      return handleErrors(res, err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user)
        return handleErrors(res, new Error("User does not exist"), 400);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return handleErrors(res, new Error("Incorrect password"), 400);

      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      return res.json({ accesstoken });
    } catch (err) {
      return handleErrors(res, err);
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged Out" });
    } catch (err) {
      return handleErrors(res, err);
    }
  },
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return handleErrors(res, new Error("Please Login or Register"), 400);

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return handleErrors(res, new Error("Login or register now"), 400);
        const accesstoken = createAccessToken({ id: user.id });
        return res.json({ accesstoken });
      });
    } catch (err) {
      return handleErrors(res, err);
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user)
        return handleErrors(res, new Error("User does not exist"), 400);

      return res.json(user);
    } catch (err) {
      return handleErrors(res, err);
    }
  },
};

module.exports = userCtrl;
