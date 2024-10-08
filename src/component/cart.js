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

const Cart = ({ cartItems, setCart }) => {
  // Function to update quantity
  const handleQuantityChange = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  // Function to remove item from cart
  const handleRemove = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <List>
      {cartItems.map((product) => (
        <ListItem
          key={product.id}
          alignItems="flex-start"
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
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

          <CardMedia
            component="img"
            height="100"
            image={product.image}
            alt={product.name}
            sx={{ width: 130, borderRadius: "8px" }}
          />

          <ListItemText
            primary={product.name}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  ₱ {product.price}
                </Typography>
              </>
            }
          />

          {/* Quantity Input */}
          <Grid item>
            <TextField
              type="number"
              size="small"
              label="Quantity"
              variant="filled"
              value={product.quantity}
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
            />
          </Grid>

          {/* Total Amount */}
          <Grid item>
            <Typography sx={{ width: 100 }}>₱{product.price}</Typography>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};

// Sample usage in a parent component

export default Cart;
