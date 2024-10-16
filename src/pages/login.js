import { useState } from "react";
import apiClient from "../axios/axiosInstance";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value, // Use the name of the input field to update the correct property
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!user.username || !user.password) {
      setError("Please enter both username and password.");
      return; // Prevent submission if fields are empty
    }
    setIsLoading(true);
    apiClient
      .post("/users/login", user)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        navigate("/fpsms");
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.error);
        } else if (error.request) {
          setError("Server cannot be reached. Please try again later.");
        } else {
          setError("An unexpected error occurred.");
        }
        console.log("err:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url('/furniture_bg.jpg')`, // Reference to image in public folder
          backgroundSize: "cover", // Ensure the image covers the entire container
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat", // Prevent repeating of the image
          height: "100vh", // Full viewport height
          display: "flex", // Flexbox to center login content
          justifyContent: "center", // Horizontally center
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          sx={{
            margin: "10%",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              height: "60vh",
              width: "60vw",
              justifyContent: "space-between",
            }}
          >
            <Stack
              direction="row"
              sx={{
                margin: "0 20%",

                maxHeight: "35%",
                width: "100%",
                display: "text",
                justifyContent: "start",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#D9D9D9",
                  p: "4rem",
                  display: "flex", // Use flexbox layout
                  justifyContent: "center", // Center the content horizontally
                  alignItems: "center", // Center the content vertically
                }}
                onClick={() => navigate("/fpsms/login")}
              >
                <DonutSmallIcon
                  sx={{
                    fontSize: "88px",
                    color: "#AC875D",
                  }}
                />
              </Avatar>

              <Typography
                sx={{
                  fontSize: "4rem",
                  maxWidth: "3rem",
                  lineHeight: "2.2rem",
                  fontWeight: "bold",
                  color: "#FFFFFF", // White text
                }}
              >
                Butch Furniture
              </Typography>
            </Stack>
            <Button
              sx={{
                margin: "0 auto",
                height: "35vh",
                width: "20vw",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: "0.4rem",
                backdropFilter: "blur(5px) opacity(0.9)",
                border: "1px solid transparent",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.5)", // Optional hover effect
                },
              }}
              onClick={() => navigate("/fpsms/shopping")}
            >
              <Stack
                direction="column"
                spacing={2}
                sx={{
                  margin: "0 auto",
                  height: "35vh",
                  width: "20vw",
                  borderRadius: "0.4rem",
                  border: "1px solid transparent",
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ShoppingCartOutlinedIcon
                  sx={{ color: "white", fontSize: "12rem" }}
                />
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: 700 }}
                >
                  Go Shopping
                </Typography>
              </Stack>
            </Button>
          </Stack>
          <Stack
            component="form"
            direction="column"
            spacing={2}
            sx={{
              justifyContent: "space-between",
              padding: "2rem 3rem",
              height: "60vh",
              width: "30vw",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "0.4rem",
              backdropFilter: "blur(5px) opacity(0.9)",
              border: "1px solid transparent",
              display: "flex",
              textAlign: "center",
            }}
            onSubmit={handleLogin}
          >
            <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
              Log in
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                <PersonIcon />
                <TextField
                  fullWidth
                  required
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  sx={{ marginTop: "4rem" }}
                  value={user.username}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                <KeyIcon />
                <TextField
                  fullWidth
                  required
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  sx={{ marginTop: "4rem" }}
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </Stack>
              {isLoading && <LinearProgress color="primary" />}
              {error && (
                <Typography sx={{ color: "red", m: 0, p: 0 }}>
                  {error} {/* Display error message */}
                </Typography>
              )}
            </Stack>

            <Stack sx={{ alignItems: "center" }}>
              <Button
                sx={{ width: "50%", padding: "0.75rem" }}
                color="secondary"
                variant="contained"
                type="submit"
              >
                Log in
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
