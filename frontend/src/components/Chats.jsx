import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Chats = () => {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const { data } = await axios.get("http://localhost:5000/api/chats");
    setChats(data);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <>
      {chats.map((ele) => (
        <div key={ele._id}>{ele.chatName}</div>
      ))}
    </>
  );
};

export default Chats;
