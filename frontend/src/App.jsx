import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chats from "./components/Chats";
function App() {
  return (
 
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/chats" element={<Chats />}></Route>
      </Routes>
    
  );
}

export default App;
