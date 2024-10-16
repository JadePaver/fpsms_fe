import { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../axios/axiosInstance";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";

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
import Pagination from "@mui/material/Pagination";

import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ITEMS_PER_PAGE = 8;

const Shopping = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [furnitures, setFurnitures] = useState([]);
  const [resultReceipt, setResultReceipt] = useState("");

  const [openReciept, setOpenReciept] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleCheckout = () => {
    setOpenReciept(true);

    apiClient.post("/po/checkout", cart).then((res) => {
      setResultReceipt(res.data);
    });
  };

  const handleCloseReciept = () => {
    setOpenReciept(false);
  };

  const handleAddToCart = (product) => {
    const isProductInCart = cart.some((item) => item.id === product.id);
    if (!isProductInCart) {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 0 }]);
    }
    const data = cart;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage("");
  };
  const fetchFurnitures = () => {
    apiClient.get("/items/get_furnitures").then((res) => {
      setFurnitures(res.data);
    });
  };

  const filteredFurnitures = furnitures.filter((product) =>
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredFurnitures.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the current items to display based on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredFurnitures.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    fetchFurnitures();
  }, []);

  return (
    <>
      <Stack
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
        }}
      >
        <Button sx={{ p: 0, m: 0 }} onClick={() => navigate("/fpsms/login")}>
          <Stack
            id="header"
            direction="row"
            sx={{
              backgroundColor: "#AC875D",
              height: "9vh",
              width: "100%",
              display: "text",
              justifyContent: { xs: "flex-start", sm: "center" },
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ bgcolor: "white", marginLeft: { xs: "30%", sm: 0 } }}
              onClick={() => navigate("/fpsms/login")}
            >
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
            height: "100%",
            display: "flex", // Flexbox to center login content
            justifyContent: "start", // Horizontally center
            alignItems: "center",
            padding: "1rem",
            overflow: "hidden",
            overflowY: "auto",
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
              name="search"
              variant="outlined"
              placeholder="Wooden Chair..."
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            spacing={0.5}
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
              padding: 0,
              margin: 0,
            }}
          >
            {currentItems.map((product) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                lg={3}
                key={product.id}
                sx={{ margin: "1rem auto 1rem auto" }}
              >
                <Card
                  sx={{
                    maxWidth: {
                      xs: "95%",
                      sm: "250px",
                    },
                    maxHeight: {
                      xs: "250px",
                      sm: "100%",
                    },
                  }}
                  elevation={3}
                >
                  <CardMedia
                    sx={{
                      m: "auto",
                      p: "1rem",
                      borderRadius: "20px", // Makes the border fully round
                      maxWidth: "100%",
                      width: "auto",
                      // Ensure it scales proportionally
                      height: {
                        xs: "130px",
                        sm: "170px",
                      },
                      objectFit: "cover",
                    }}
                    component="img"
                    image={`/item_images/${product.image}`}
                    alt={product.name}
                    onClick={() =>
                      openLightbox(`/item_images/${product.image}`)
                    }
                  />
                  <CardContent
                    sx={{
                      p: {
                        xs: "0 1rem",
                        sm: "1rem",
                      },
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant={{ xs: "body2", sm: "h6" }}
                      component="div"
                    >
                      {product.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₱ {product.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={
                        product.stock <= 0 ? "error.main" : "text.secondary"
                      }
                    >
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
          <Stack
            spacing={2}
            fullWidth
            alignItems="flex-start"
            justifyContent="start"
            sx={{ mt: 2, width: "100%", p: "0.5rem", borderRadius: "0.4rem" }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="secondary"
              shape="rounded"
            />
          </Stack>
        </Stack>
      </Stack>
      {lightboxOpen && (
        <Lightbox mainSrc={lightboxImage} onCloseRequest={closeLightbox} />
      )}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          marginTop: { xs: "0", sm: "8vh" }, // Remove margin for mobile
          height: { xs: "100vh", sm: `calc(100vh - 9vh)` }, // This ensures the dialog occupies the rest of the space below 9vh
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
              disableElevation
              disabled={cart.length === 0}
              autoFocus
              variant="contained"
              color="secondary"
              onClick={() => {
                handleClose();
                handleCheckout();
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
            flexDirection: { xs: "column", sm: "row" },
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
                (total, item) => total + item.price * (item.quantity || 0),
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
            width: "370px",
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
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mt: 2 }}
            color="secondary"
          >
            THANK YOU !
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }} color="secondary">
            PLEASE TAKE A SCREENSHOT OR NOTE DOWN YOUR RECEIPT NUMBER AND
            PROCEED TO THE COUNTER FOR PAYMENT.
          </Typography>

          {/* Receipt Number */}
          <Typography
            variant="h6"
            sx={{ mt: 3, fontWeight: "bold" }}
            color="secondary"
          >
            {resultReceipt}
          </Typography>

          {/* Barcode */}
          <Box sx={{ mt: 1 }}>
            <Barcode
              value={resultReceipt}
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
