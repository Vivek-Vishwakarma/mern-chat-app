import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";

const Error = ({ message, error, setError, type }) => {
  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };
  return (
    <>
      <Snackbar
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={error}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={type ? type : "warning"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Error;
