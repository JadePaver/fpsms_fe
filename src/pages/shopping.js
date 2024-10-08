import { useState, forwardRef } from "react";
import { useNavigate} from "react-router-dom";

import Barcode from "react-barcode";

import Cart from "../component/cart";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";

import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Shopping = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const [openReciept, setOpenReciept] = useState(false);

  const handleOpenReciept = () => {
    setOpenReciept(true);
  };

  const handleCloseReciept = () => {
    setOpenReciept(false);
  };

  const handleAddToCart = (product) => {
    const isProductInCart = cart.some((item) => item.id === product.id); // Check if product exists
    if (!isProductInCart) {
      setCart((prevCart) => [...prevCart, product]); // Add product to cart if not already present
    } // Add product to cart
    const data = cart;
    console.log("cart:", data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const products = [
    {
      id: 1,
      name: "Retro Wooden Chair",
      price: 4500,
      stock: 48,
      image: "/chair.jpeg",
    },
    {
      id: 2,
      name: "Retro Wooden Chair",
      price: 4500,
      stock: 48,
      image: "/chair.jpeg",
    },
    {
      id: 3,
      name: "Retro Wooden Chair",
      price: 4500,
      stock: 48,
      image: "/chair.jpeg",
    },
    {
      id: 4,
      name: "Retro Wooden Chair",
      price: 4500,
      stock: 48,
      image: "/chair.jpeg",
    },
    // Add more products as needed
  ];
  return (
    <>
      <Stack
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
        }}
      >
        <Button sx={{p:0,m:0}}onClick={()=>navigate("/fpsms/login")}>
        <Stack
          id="header"
          direction="row"
          sx={{
            backgroundColor: "#AC875D",
            height: "9vh",
            width: "100%",
            display: "text",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "white" }} onClick={()=>navigate("/fpsms/login")}>
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
        </Button>
        <Stack
          spacing={1}
          sx={{
            backgroundImage: `url('/furniture_bg.jpg')`, // Reference to image in public folder
            backgroundSize: "cover", // Ensure the image covers the entire container
            backgroundPosition: "center", // Center the image
            backgroundRepeat: "no-repeat", // Prevent repeating of the image
            height: "100vh", // Full viewport height
            display: "flex", // Flexbox to center login content
            justifyContent: "start", // Horizontally center
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "start", // Horizontally center
              alignItems: "center",
              bgcolor: "white",
              width: "100%",
              padding: "0.4rem 0.4rem",
              borderRadius: "0.2rem",
            }}
          >
            <Typography sx={{ flex: 1 }}>Search Something</Typography>
            <TextField
              sx={{ flex: 7 }}
              name="description"
              variant="outlined"
              placeholder="Wooden Chair..."
              fullWidth
            />
            <Button sx={{ height: "100%" }} onClick={handleClickOpen}>
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartOutlinedIcon
                  sx={{ fontSize: "2rem" }}
                  color="secondary"
                />
              </Badge>
            </Button>
          </Stack>
          <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card sx={{ maxWidth: "250px" }}>
                  <CardMedia
                    sx={{ p: "1rem", borderRadius: "20px" }}
                    component="img"
                    height="170"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₱ {product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Stocks: {product.stock}
                    </Typography>
                  </CardContent>
                  <Stack sx={{ p: "0 1rem 1rem 1rem" }}>
                    <Button
                      variant="contained"
                      fullWidth
                      color="secondary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          marginTop: "8vh",
          height: `calc(100vh - 9vh)`, // This ensures the dialog occupies the rest of the space below 9vh
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              My Cart
            </Typography>
            <Button
              autoFocus
              variant="contained"
              color="secondary"
              onClick={() => {
                handleClose();
                handleOpenReciept();
              }}
              sx={{ height: "80%" }}
            >
              Proceed Checkout
            </Button>
          </Toolbar>
        </AppBar>
        <Cart cartItems={cart} setCart={setCart} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            borderTop: "1px solid #ccc", // Optional border at the top of the total section
            bgcolor: "#f9f9f9",
          }}
        >
          <Typography variant="h6">Total Amount</Typography>
          <Typography variant="h6">
            ₱{" "}
            {cart
              .reduce(
                (total, item) => total + item.price * (item.quantity || 1),
                0
              )
              .toLocaleString()}
          </Typography>
        </Box>
      </Dialog>

      <Dialog
        open={openReciept}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseReciept}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "0.4rem",
            border: "solid 1px #AC875D",
            width: "350px",
            textAlign: "center",
          },
        }}
      >
        <Stack sx={{ width: "100%", alignItems: "end" }}>
          <IconButton
            color="inherit"
            onClick={handleCloseReciept}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent
          sx={{
            maxWidth: "400px", // Set a specific max-width to the dialog content
            margin: "0 auto", // Center the dialog content horizontally
            textAlign: "center", // Center-align all the text content
            overflowX: "hidden", // Disable horizontal scrolling
          }}
        >
          {/* Green Checkmark */}
          <CheckCircleIcon sx={{ fontSize: "140px", color: "green", mb: 2 }} />

          {/* Main Text */}
          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }} color="secondary">
            THANK YOU !
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }} color="secondary">
            PLEASE TAKE A SCREENSHOT OR NOTE DOWN YOUR RECEIPT NUMBER AND
            PROCEED TO THE COUNTER FOR PAYMENT.
          </Typography>

          {/* Receipt Number */}
          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }} color="secondary">
            12N3532ASF341
          </Typography>

          {/* Barcode */}
          <Box sx={{ mt: 1 }}>
            <Barcode
              value="12N3532ASF341"
              width={1.5} // Controls the width of each bar
              height={50} // Controls the height of the barcode
              displayValue={false}
              color="secondary"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Shopping;
