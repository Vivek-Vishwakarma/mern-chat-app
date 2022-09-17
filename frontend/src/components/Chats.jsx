import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Mychats from "./Mychats";
import { Box } from "@mui/material";
import MainMessage from "./MainMessage";

const Chats = () => {
  return (
    <>
      <Nav />
      <Box sx={{ display: "flex" }}>
        <Mychats />
        <MainMessage />
      </Box>
    </>
  );
};

export default Chats;
