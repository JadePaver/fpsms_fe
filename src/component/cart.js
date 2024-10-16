import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = ({ cartItems, setCart }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 370);
  const handleQuantityChange = (id, quantity) => {
    const parsedQuantity = parseInt(quantity, 10);

    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: parsedQuantity } : item
        )
      );
    }
  };

  const handleRemove = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  useEffect(() => {
    console.log("width:", window.innerWidth);
    if (window.innerWidth <= 450) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    console.log("mobile:", isMobile);
  }, []);

  return (
    <Grid container spacing={2} sx={{ p: "1rem 0" }}>
      {cartItems.map((product) => (
        <Grid item xs={12} key={product.id}>
          {isMobile ? (
            <>
              <Grid
                direction="row"
                container
                spacing={0}
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  p: "0.5rem 1rem",
                  height: "100%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #ccc", // Adds a border
                  borderRadius: "8px",
                }}
              >
                <CardMedia
                  component="img"
                  image={`/item_images/${product.image}`}
                  alt={product.name}
                  sx={{
                    width: "40%", // Set width to your desired percentage
                    height: "auto", // Allow the height to adjust based on content
                    aspectRatio: "1 / 1", // Enforce a square ratio (1:1)
                    objectFit: "cover", // Ensure the image covers the container without distortion
                    borderRadius: "8px", // Apply rounded corners
                  }}
                />
                <Stack
                  sx={{
                    width: "50%",
                    p: "0 1rem",
                    justifyContent: "start",
                    height: "100%",
                  }}
                >
                  <Typography variant="h6" color="secondary">
                    {product.description}
                  </Typography>
                  <Typography>₱{product.price}</Typography>
                  <Stack direction="row" sx={{ marginTop: "auto" }}>
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        handleQuantityChange(
                          product.id,
                          Math.max((product.quantity ?? 0) - 1, 0)
                        )
                      }
                      sx={{ padding: 1 }}
                    >
                      <RemoveIcon sx={{ color: "grey" }} />{" "}
                    </IconButton>
                    <TextField
                      fullWidth
                      type="number"
                      label="Quantity"
                      variant="filled"
                      value={product.quantity ?? ""}
                      onChange={(e) =>
                        handleQuantityChange(
                          product.id,
                          Math.max(0, e.target.value)
                        )
                      }
                      inputProps={{ min: 0, max: product.stock }}
                      sx={{ marginTop: "auto" }}
                    />
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        handleQuantityChange(
                          product.id,
                          Math.min((product.quantity ?? 0) + 1, product.stock)
                        )
                      }
                      sx={{ padding: 1 }}
                    >
                      <AddIcon color="success" />{" "}
                    </IconButton>
                  </Stack>
                </Stack>
                <Stack
                  sx={{ width: "10%", justifyContent: "start", height: "100%" }}
                >
                  <Button
                    disableElevation
                    variant="contained"
                    color="error"
                    sx={{
                      minWidth: 0,
                      minHeight: "100%",
                      padding: "0.45rem",
                    }}
                    onClick={() => handleRemove(product.id)}
                  >
                    <CloseIcon />
                  </Button>
                </Stack>
              </Grid>
            </>
          ) : (
            <Grid
              container
              spacing={0}
              alignItems="center"
              justifyContent="space-between"
              sx={{ p: "0.5rem 1rem" }}
            >
              <Grid item xs={1} justifyContent="center" alignItems="center" f>
                <Button
                  disableElevation
                  variant="contained"
                  color="error"
                  sx={{
                    minWidth: 0,
                    minHeight: 0,
                    padding: "0.25rem",
                  }}
                  onClick={() => handleRemove(product.id)}
                >
                  <CloseIcon />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <ListItemText
                  primary={product.name}
                  secondary={
                    <Typography variant="h6" color="secondary">
                      {product.description}
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  height="auto"
                  image={`/item_images/${product.image}`}
                  alt={product.name}
                  sx={{ width: "auto", maxWidth: "50%", borderRadius: "8px" }}
                />
              </Grid>
              <Grid item xs={1} justifyContent="flex-end">
                <TextField
                  fullWidth
                  type="number"
                  size="small"
                  label="Quantity"
                  variant="filled"
                  value={product.quantity ?? ""}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                  inputProps={{ min: 0, max: product.stock }}
                  sx={{ width: 100 }}
                />
              </Grid>
              <Grid sx={2} item>
                <CloseRoundedIcon />
              </Grid>
              <Grid sx={2} item textAlign="end">
                <Typography>₱{product.price}</Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default Cart;
