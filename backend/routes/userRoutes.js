const router = require("express").Router();
const User = require("../models/user");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    if (!userExist)
      return res.status(400).send("User doesnt exist !! Please create new id");
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch)
      return res
        .status(400)
        .send("Incorrect password !! Please enter correct password");
    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);
    res.status(200).send({ user: userExist, token: token });
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

router.get("/user", (req, res) => {
  const search = req.query.search;
  res.send(search);
});

module.exports = router;
