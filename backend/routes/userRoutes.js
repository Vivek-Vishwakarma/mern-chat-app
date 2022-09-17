const router = require("express").Router();
const User = require("../models/user");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../config/auth");
router.post("/login", async (req, res) => {
  const { email } = req.body;
  const userPass = req.body.password;
  try {
    const userExist = await User.findOne({ email: email });
    if (!userExist)
      return res.status(400).send("User doesnt exist !! Please create new id");
    const isMatch = await bcrypt.compare(userPass, userExist.password);
    if (!isMatch)
      return res
        .status(400)
        .send("Incorrect password !! Please enter correct password");
    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);
    const { password, ...others } = userExist._doc;
    res.status(200).send({ user: others, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password, image } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist)
      return res
        .status(400)
        .send("This user already exist !! Please make different id");
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: passwordHash,
      image,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({ user: user, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get("/user", auth, async (req, res) => {
  const search = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(search).find({ _id: { $ne: req.user } });
  res.send(users);
});

module.exports = router;
