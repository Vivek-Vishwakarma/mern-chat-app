import { Box } from "@mui/material";
import React from "react";
import SingleChat from "./SingleChat";

const Mychats = () => {
  return (
    <>
      <Box
        sx={{
          width: "350px",
          height: "88vh",
          backgroundColor: "black",
          margin: "10px 20px",
          borderRadius: "10px",
        }}
      >
        <Box sx={{ p: "10px 20px" }}>
          <SingleChat />
        </Box>
      </Box>
    </>
  );
};

export default Mychats;
