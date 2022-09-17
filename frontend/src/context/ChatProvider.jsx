import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect, useContext } from "react";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUser(userInfo);
    // console.log(userInfo);
    if (!userInfo) navigate("/");
  }, [navigate]);
  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
