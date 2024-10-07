import Container from "@mui/material/Container";
import Box from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Stack
      spacing={1}
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" color="secondary">
          404 PAGE
        </Typography>
        <Typography variant="h4" color="secondary">
          We’re Sorry! The Page Took a Detour
        </Typography>
        <Button variant="outlined" autoFocus onClick={() => navigate("fpsms/login")}>
        

          Redirect Me
        </Button>
      </Stack>
    </>
  );
};
export default Home;
