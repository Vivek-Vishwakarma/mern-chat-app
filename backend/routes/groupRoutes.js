const auth = require("../config/auth");
const Chats = require("../models/chat");
const router = require("express").Router();

router.post("/", auth, async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send("Please Fill all the feilds");
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }
  users.push(req.user);
  try {
    const groupChat = await Chats.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chats.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.put("/add", auth, async (req, res) => {
  const { chatId, userId } = req.body;
  const added = await Chats.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404), send("Chat Not Found");
  } else {
    res.send(added);
  }
});

router.put("/remove", auth, async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chats.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404).send("Chat Not Found");
  } else {
    res.send(removed);
  }
});

router.put("/remove", auth, async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chats.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404).send("Chat Not Found");
  } else {
    res.send(updatedChat);
  }
});
module.exports = router;
