import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Cart = ({ cartItems, setCart }) => {
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

  return (
    <Grid container spacing={2}>
      {cartItems.map((product) => (
        <Grid item xs={12} key={product.id}>
          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: "0.5rem 1rem" }}
          >
            <Grid item xs={1} justifyContent='center'alignItems='center' f>
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
                sx={{ width: 'auto', maxWidth:'50%', borderRadius: "8px" }}
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
                inputProps={{ min: 0, max:product.stock }}
                sx={{ width: 100 }}
              />
            </Grid>
            <Grid sx={2} item>
              <CloseRoundedIcon/>
            </Grid>
            <Grid sx={2} item textAlign="end">
              <Typography>₱{product.price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cart;
