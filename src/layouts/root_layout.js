import React, { useState, useContext, createContext, useEffect } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";

import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import DehazeRoundedIcon from "@mui/icons-material/DehazeRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

export const UserContext = createContext();
const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  //Snackbar
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    severity: "info", // can be 'success', 'error', 'warning', or 'info'
  });

  const showSnackbar = ({ message, severity = "info" }) => {
    setSnackbarData({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbarData((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/fpsms/login");
      localStorage.removeItem("token");
    }
  }, [location]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, closeSnackbar }}>
      <UserContext.Provider value={user}>
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            id="sidebar"
            sx={{
              backgroundColor: "#FFFFFF",
              width: sidebarOpen ? "15vw" : "3vw",
              overflow: "hidden",
              height: "100vh",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              flexDirection: "column",
              transition: `width 0.5s ease-in-out`,
            }}
          >
            <Stack
              direction="row"
              sx={{
                p: sidebarOpen ? "20%" : 0,
                width: sidebarOpen ? "100%" : 0,
                height: "10vh",
                backgroundColor: "#514538",
                justifyContent: "start",
                alignItems: "center",
                overflow: "hidden",
                transition: `all 0.5s ease-in-out`,
              }}
            >
              <Avatar sx={{ bgcolor: "white" }}>
                <DonutSmallRoundedIcon
                  sx={{ m: "auto", fontSize: "29px", color: "#AC875D" }}
                />
              </Avatar>
              <Typography
                variant="h5" // Adjust size as needed
                sx={{
                  maxWidth: "3rem",
                  lineHeight: "0.8rem",
                  fontWeight: "bold",
                  color: "#FFFFFF", // White text
                }}
              >
                Butch Furniture
              </Typography>
            </Stack>
            <Stack
              sx={{
                width: "100%",
                margin: "70% 0 0 0",
                height: "100%",
                alignSelf: "center",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    borderRadius: 0,
                    borderTop: sidebarOpen ? "1px solid" : "none",
                    borderBottom: sidebarOpen ? "1px solid" : "none",
                    transition: "border 0.4s ease-in-out",
                    borderLeft: "none", // Remove left border
                    borderRight: "none",
                    padding: ".75rem",
                  }}
                  onClick={() => navigate("")}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between", // Space between icon and button
                      alignItems: "center",
                    }}
                  >
                    <SpaceDashboardRoundedIcon
                      sx={{ height: "30px", width: "30px", margin: "auto" }}
                    />
                    <Typography
                      sx={{
                        width: "100%",
                        textAlign: "left",
                        fontSize: sidebarOpen ? "1rem" : "0",
                        transition: "font-size 0.3s",
                      }}
                    >
                      Dashboard
                    </Typography>
                  </Stack>
                </Button>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    borderRadius: 0,
                    borderTop: sidebarOpen ? "1px solid" : "none",
                    borderBottom: sidebarOpen ? "1px solid" : "none",
                    transition: "border 0.4s ease-in-out",
                    borderLeft: "none", // Remove left border
                    borderRight: "none",
                    padding: ".75rem",
                  }}
                  onClick={() => navigate("purchase_order")}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between", // Space between icon and button
                      alignItems: "center",
                    }}
                  >
                    <ShoppingCartRoundedIcon
                      sx={{ height: "30px", width: "30px", margin: "auto" }}
                    />
                    <Typography
                      sx={{
                        width: "100%",
                        textAlign: "left",
                        fontSize: sidebarOpen ? "1rem" : "0",
                        transition: "font-size 0.3s",
                      }}
                    >
                      Purchase Order
                    </Typography>
                  </Stack>
                </Button>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    borderRadius: 0,
                    borderTop: sidebarOpen ? "1px solid" : "none",
                    borderBottom: sidebarOpen ? "1px solid" : "none",
                    transition: "border 0.4s ease-in-out",
                    borderLeft: "none", // Remove left border
                    borderRight: "none",
                    padding: ".75rem",
                  }}
                  onClick={() => navigate("inventory")}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between", // Space between icon and button
                      alignItems: "center",
                    }}
                  >
                    <Inventory2RoundedIcon
                      sx={{ height: "30px", width: "30px", margin: "auto" }}
                    />
                    <Typography
                      sx={{
                        width: "100%",
                        textAlign: "left",
                        fontSize: sidebarOpen ? "1rem" : "0",
                        transition: "font-size 0.3s",
                      }}
                    >
                      Inventory Management
                    </Typography>
                  </Stack>
                </Button>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    borderRadius: 0,
                    borderTop: sidebarOpen ? "1px solid" : "none",
                    borderBottom: sidebarOpen ? "1px solid" : "none",
                    transition: "border 0.4s ease-in-out",
                    borderLeft: "none", // Remove left border
                    borderRight: "none",
                    padding: ".75rem",
                  }}
                  onClick={() => navigate("delivery_schedule")}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between", // Space between icon and button
                      alignItems: "center",
                    }}
                  >
                    <TodayRoundedIcon
                      sx={{ height: "30px", width: "30px", margin: "auto" }}
                    />
                    <Typography
                      sx={{
                        width: "100%",
                        textAlign: "left",
                        fontSize: sidebarOpen ? "1rem" : "0",
                        transition: "font-size 0.3s",
                      }}
                    >
                      Delivery Scheadule
                    </Typography>
                  </Stack>
                </Button>
              </Stack>
              {user?.role === "Admin" && (
                <Stack
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      width: "100%",
                      borderRadius: 0,
                      borderTop: sidebarOpen ? "1px solid" : "none",
                      borderBottom: sidebarOpen ? "1px solid" : "none",
                      transition: "border 0.4s ease-in-out",
                      borderLeft: "none",
                      borderRight: "none",
                      padding: ".75rem",
                    }}
                    onClick={() => navigate("user_management")}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between", // Space between icon and button
                        alignItems: "center",
                      }}
                    >
                      <GroupRoundedIcon
                        sx={{ height: "30px", width: "30px", margin: "auto" }}
                      />
                      <Typography
                        sx={{
                          width: "100%",
                          textAlign: "left",
                          fontSize: sidebarOpen ? "1rem" : "0",
                          transition: "font-size 0.3s",
                        }}
                      >
                        User Management
                      </Typography>
                    </Stack>
                  </Button>
                </Stack>
              )}
              <Box
                sx={{
                  width: sidebarOpen ? "100%" : 0,
                  height: "10vh",
                  backgroundColor: "#514538",
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "center",
                  transition: `all 0.5s ease-in-out`,
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: sidebarOpen ? "1.5rem" : "0",
                    transition: "font-size 0.3s",
                  }}
                ></Typography>
              </Box>
            </Stack>
          </Box>

          <Stack
            direction="column"
            sx={{
              width: sidebarOpen ? "85vw" : "97vw",
              height: "100vh",
              transition: `width 0.5s ease-in-out`,
            }}
          >
            <Stack
              id="header"
              direction="row"
              sx={{
                backgroundColor: "#AC875D",
                height: "7.5vh",
                width: "100%",
                display: "text",
                justifyContent: "space-between",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ margin: "0.75rem" }}
                disableElevation
                onClick={handleToggleSidebar}
              >
                {sidebarOpen ? (
                  <KeyboardDoubleArrowLeftRoundedIcon />
                ) : (
                  <DehazeRoundedIcon />
                )}
              </Button>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  color: "white",
                  fontSize: { xs: "1.2rem", sm: "1.5rem" }, // Responsive font size
                  fontWeight: "medium", // Font weight for the regular text
                  whiteSpace: "nowrap", // Prevent text wrapping
                  textOverflow: "ellipsis", // Add ellipsis for long text
                  overflow: "hidden", // Ensures no overflow beyond container
                }}
              >
                Welcome, {user?.role},&nbsp;{/* Add non-breaking space */}
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "bold", // Make the username bold
                    fontSize: { xs: "1.4rem", sm: "1.7rem" }, // Larger font for the username
                    color: "primary.main", // Optional: Change color to make it stand out (gold)
                  }}
                >
                  {user?.username}
                </Typography>
              </Typography>

              <Button
                variant="outlined"
                sx={{ margin: "0.75rem" }}
                disableElevation
                onClick={() => {
                  navigate("/fpsms/login");
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                }}
              >
                <LogoutIcon />
              </Button>
            </Stack>
            <Box
              id="content"
              sx={{
                backgroundColor: "#CCCCCC",
                height: "92.5vh",
                width: "100%",
                padding: "0.5rem",
                overflowY: "auto",
              }}
            >
              <Outlet />
            </Box>
          </Stack>
        </Box>
        <Snackbar
          open={snackbarData.open}
          autoHideDuration={6000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={closeSnackbar}
            severity={snackbarData.severity}
            sx={{ width: "100%" }}
          >
            {snackbarData.message}
          </Alert>
        </Snackbar>
      </UserContext.Provider>
    </SnackbarContext.Provider>
  );
}
