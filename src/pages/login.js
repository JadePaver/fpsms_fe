import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
              onClick={()=>navigate("/fpsms/shopping")}
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
          >
            <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
              Log in
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                <PersonIcon />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  sx={{ marginTop: "4rem" }}
                />
              </Stack>
              <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                <KeyIcon />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  sx={{ marginTop: "4rem" }}
                  type="password"
                />
              </Stack>
            </Stack>

            <Stack sx={{ alignItems: "center" }}>
              <Button
                sx={{ width: "50%", padding: "0.75rem" }}
                color="secondary"
                variant="contained"
                onClick={() => navigate("/fpsms")}
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
