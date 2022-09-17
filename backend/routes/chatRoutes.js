const auth = require("../config/auth");
const router = require("express").Router();
const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/message");
router.post("/", auth, async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("userId param not sent with request");
    return res.status(400).send("Chat doesnt exist");
  }
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name image email",
  });
  if (isChat.length > 0) {
    return res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    const finalChats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name image email",
    });
    res.send(finalChats);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Somthing Wrong");
  }
});

module.exports = router;
