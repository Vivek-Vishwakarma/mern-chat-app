import { Box } from "@mui/material";
import React from "react";

const MainMessage = () => {
  return (
    <>
      <Box
        sx={{
          height: "88vh",
          backgroundColor: "black",
          mr: "20px",
          borderRadius: "10px",
          mt: "10px",
          width: "80%",
        }}
      >
        <h2 style={{ color: "white", textAlign: "center" }}>Heading</h2>
      </Box>
    </>
  );
};

export default MainMessage;
