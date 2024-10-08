import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Page404 from "./pages/page404";
import RootLayout from "./layouts/root_layout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import { CssBaseline } from "@mui/material";
import ItemInventory from "./pages/itemInventory";
import PurchaseOrder from "./pages/purchase_order";
import DeliverySchedule from "./pages/deliverySchedule";
import UserManagement from "./pages/userManagement";
import Shopping from "./pages/shopping";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#514538",
    },
    secondary: {
      main: "#2D2D2D",
    },
    accent: {
      main: "#AAE2FF",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
  },
});
document.title = "fpsms-BCC";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/fpsms" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route exact path="inventory" element={<ItemInventory />} />
        <Route exact path="purchase_order" element={<PurchaseOrder />} />
        <Route exact path="delivery_schedule" element={<DeliverySchedule />} />
        <Route exact path="user_management" element={<UserManagement />} />
      </Route>
      <Route exact path="/fpsms/login" element={<Login />} />
      <Route exact path="/fpsms/shopping" element={<Shopping />} />
      <Route path="*" element={<Page404 />} />
    </>
  )
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
