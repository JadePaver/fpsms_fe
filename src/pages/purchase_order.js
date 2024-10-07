import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { DataGrid } from "@mui/x-data-grid";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import CloseIcon from "@mui/icons-material/Close";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const initialRows = [
  {
    id: 1,
    description: "Plywood",
    price: 500,
    stock: 25,
    type: "Material",
    batch_date: "01/02/2024",
    quantity: 8,
  },
  {
    id: 2,
    description: "Furniture#3",
    price: 7200,
    stock: 3,
    type: "Furniture",
    batch_date: "02/24/2024",
    quantity: 2,
  },
  {
    id: 3,
    description: "Cement",
    price: 200,
    stock: 50,
    type: "Material",
    batch_date: "03/01/2024",
    quantity: 1,
  },
];

const PurchaseOrder = () => {
  const [rows, setRows] = useState(initialRows);
  const [purchaseItems, setPurchaseItems] = useState([]);

  // Handle input change in purchase items
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...purchaseItems];
    newItems[index] = { ...newItems[index], [name]: value };
    setPurchaseItems(newItems);
  };
  const handleRemoveItem = (indexToRemove) => {
    setPurchaseItems((prevItems) =>
      prevItems.filter((item, index) => index !== indexToRemove)
    );
  };

  const handleAddItem = (row) => {

    const itemExists = purchaseItems.some(
      (item) => item.description === row.description
    );

    if (!itemExists) {
      setPurchaseItems([
        ...purchaseItems,
        { description: row.description, quantity: 1, price: row.price },
      ]);
    } else {
      console.log("Item already exists:", row.description);
    }

  };

  const columns = [
    { field: "description", headerName: "Description", flex: 2 },
    { field: "price", headerName: "Price", flex: 2 },
    { field: "stock", headerName: "Stock", flex: 1 },
    { field: "type", headerName: "Type", flex: 2 },
    { field: "batch_date", headerName: "Batch Date", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack
          spacing={1}
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Button
            disableElevation
            color="success"
            variant="contained"
            sx={{
              padding: 0.5,
              minWidth: 0,
              minHeight: 0,
            }}
            onClick={() => handleAddItem(params.row)}
          >
            <AddRoundedIcon />
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Stack spacing={1} direction="row" sx={{ height: "100%", width: "100%" }}>
        <Stack
          spacing={2}
          sx={{
            borderRadius: "0.2rem",
            bgcolor: "white",
            p: "1rem",
            width: "35%",
          }}
        >
          <TextField
            label="Invoice to:"
            name="invoiceTo"
            variant="outlined"
            value={"John Doe"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonRoundedIcon />
                </InputAdornment>
              ),
            }}
            disabled
          />
          <TextField
            label="Reciept #:"
            name="reciept"
            variant="outlined"
            value={"ABC123"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ReceiptLongRoundedIcon />
                </InputAdornment>
              ),
            }}
            disabled
          />
          <TextField
            label="Customer Name:"
            name="customer"
            variant="outlined"
            defaultValue={"Jane Smith"}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GroupsIcon />
                </InputAdornment>
              ),
            }}
          />

          {purchaseItems.map((item, index) => (
            <Stack spacing={2} direction="row" key={index}>
              <TextField
                disabled
                label="Description:"
                name="description"
                variant="outlined"
                value={item.description}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Button
                      disableElevation 
                        variant="contained"
                        color="error"
                        sx={{
                          minWidth: 0,
                          minHeight: 0,
                          padding: "0.25rem",
                        }}
                        onClick={() => handleRemoveItem(index)}
                      >
                        <CloseIcon />
                      </Button>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  flex: 5,
                }}
              />
              <TextField
                label="Quantity:"
                name="quantity"
                variant="outlined"
                type="number"
                value={item.quantity}
                onChange={(e) => handleInputChange(index, e)}
                sx={{ flex: 2 }}
              />
              <TextField
                disabled
                label="Price:"
                name="price"
                variant="outlined"
                value={item.price}
                onChange={(e) => handleInputChange(index, e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography>₱</Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{ flex: 2 }}
              />
            </Stack>
          ))}
          <Typography sx={{ textAlign: "end", width: "100%" }}>
            Total amount: ₱
            {purchaseItems.reduce(
              (total, item) => total + item.quantity * item.price,
              0
            )}
          </Typography>
          <Stack sx={{alignItems:'end',paddingTop:'1.5rem'}}>
            <Button color="success" variant="contained">Save Sale</Button>
          </Stack>
        </Stack>
        <Box sx={{ borderRadius: "0.2rem", bgcolor: "white", width: "65%" }}>
          <DataGrid
            sx={{ width: "100%", height: "100%" }}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />
        </Box>
      </Stack>
    </>
  );
};
export default PurchaseOrder;
