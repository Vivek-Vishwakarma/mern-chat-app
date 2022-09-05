import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import "../App.css";
import Error from "./Error";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const cloud = import.meta.env.VITE_CLOUDINARY;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const [url, setUrl] = useState("");
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [type, setType] = useState("");
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
  });
  const showPassword = () => {
    setShow(!show);
  };
  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await axios.post("http://localhost:5000/api/auth/register", {
        ...user,
        image: url,
      });
      console.log(data.data.user);
      setError(true);
      setLoading(false);
      setErrorMsg("Registeration successful");
      setType("success");
    } catch (error) {
      setError(true);
      setType("error");
      setErrorMsg(error.response.data);
      setLoading(false);
      console.log(error);
    }
  };
  const uploadImage = (e) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "chat app");
    data.append("cloud_name", cloudName);
    fetch(cloud, {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        setLoading(false);
        console.log(data.url);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await axios.post("http://localhost:5000/api/auth/login", {
        email: user.email,
        password: user.password,
      });
      console.log(data.data.user);
      setType("success");
      setErrorMsg("Login successful");
      setLoading(false);
      setError(true);
    } catch (error) {
      setError(true);
      setLoading(false);
      setType("error");
      setErrorMsg(error.response.data);
      console.log(error);
    }
  };
  return (
    <>
      <Error message={errorMsg} error={error} setError={setError} type={type} />
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <Typography
          className="title"
          sx={{
            backgroundColor: "#EEEEEE",
            textAlign: "center",
            p: "10px 20px",
            borderRadius: "8px",
          }}
          variant="h4"
          component="h4"
        >
          MERN Chat App
        </Typography>
        <Box
          className="main"
          sx={{
            mt: 1,
            backgroundColor: "#EEEEEE",
            textAlign: "center",
            p: "10px 40px",
            borderRadius: "8px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                variant="fullWidth"
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab icon={<LockOpenIcon />} label="LOGIN" {...a11yProps(0)} />
                <Tab
                  icon={<PersonAddIcon />}
                  label="SIGN UP"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <form onSubmit={handleLogin}>
                <TextField
                  margin="normal"
                  fullWidth
                  onChange={handleUser}
                  required
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                />
                <TextField
                  margin="normal"
                  required
                  name="password"
                  onChange={handleUser}
                  fullWidth
                  type={show ? "text" : "password"}
                  label="Password"
                  variant="outlined"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Show Password"
                  onClick={showPassword}
                  labelPlacement="end"
                  checked={show}
                />
                <Button
                  type="submit"
                  sx={{ mt: 2 }}
                  fullWidth
                  variant="contained"
                >
                  Login
                </Button>
              </form>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <form onSubmit={register}>
                <TextField
                  onChange={handleUser}
                  margin="normal"
                  name="name"
                  value={user.name}
                  required
                  fullWidth
                  label="Name"
                  variant="outlined"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  type="email"
                  name="email"
                  value={user.email}
                  required
                  onChange={handleUser}
                  label="Email"
                  variant="outlined"
                />

                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  onChange={handleUser}
                  type={show ? "text" : "password"}
                  required
                  value={user.password}
                  label="Password"
                  variant="outlined"
                />
                <FormControlLabel
                  sx={{ textAlign: "left" }}
                  control={<Checkbox />}
                  label="Show Password"
                  onClick={showPassword}
                  labelPlacement="end"
                  checked={show}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="image"
                  type="file"
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                  variant="outlined"
                />
                <Button
                  type="sumbit"
                  sx={{ mt: 2 }}
                  fullWidth
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress color="success" size="25px" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </TabPanel>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
