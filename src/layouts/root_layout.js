import React, { useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";

import Box from "@mui/material/Box";
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

export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
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
          alignItems: "center",
          flexDirection: "column",
          borderRight: "solid 0.5px #514538",
          transition: `width 0.5s ease-in-out`,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "10vh",
            backgroundColor: "#514538",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: sidebarOpen ? "1.5rem" : "0",
              transition: "font-size 0.3s",
            }}
          >
            LOGO
          </Typography>
        </Box>
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
                borderTop: "1px solid", // Keep top border
                borderBottom: "1px solid", // Keep bottom border
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
                borderTop: "1px solid", // Keep top border
                borderBottom: "1px solid", // Keep bottom border
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
                borderTop: "1px solid", // Keep top border
                borderBottom: "1px solid", // Keep bottom border
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
                borderTop: "1px solid", // Keep top border
                borderBottom: "1px solid", // Keep bottom border
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
                borderTop: "1px solid", // Keep top border
                borderBottom: "1px solid", // Keep bottom border
                borderLeft: "none", // Remove left border
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
          <Box
            sx={{
              width: "100%",
              height: "10vh",
              backgroundColor: "#514538",
              marginTop: "auto",
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: sidebarOpen ? "1.5rem" : "0",
                transition: "font-size 0.3s",
              }}
            >
              LOGO
            </Typography>
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
            }}
            variant="h5"
          >
            Welcome, Admin, John
          </Typography>
          <Button variant="outlined" sx={{ margin: "0.75rem" }} disableElevation>
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
  );
}
