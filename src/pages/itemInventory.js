import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import dayjs from "dayjs";

const rows = [
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

const ItemInventory = () => {
  const columns = [
    { field: "description", headerName: "Description", flex: 1 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "stock", headerName: "Stock", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "batch_date", headerName: "Batch Date", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
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
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
              minWidth: 0,
              minHeight: 0,
              width: "40px",
              height: "40px",
              backgroundColor: "#007BFF",
            }}
            variant="contained"
            onClick={() => {
              handleEdit(params.row);
            }}
          >
            <EditIcon />
          </Button>
          <Button
            disableElevation
            color="error"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
              minWidth: 0,
              minHeight: 0,
              width: "40px",
              height: "40px",
            }}
            variant="contained"
            onClick={() => {}}
          >
            <DeleteIcon />
          </Button>
        </Stack>
      ),
    },
  ];
  const today = new Date();
  const [openAddForm, set_openAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [editMode, setEditMode] = useState(false); // To manage edit mode
  const [currentItem, setCurrentItem] = useState(null);

  const handleEdit = (item) => {
    console.log("item:",item)
    setCurrentItem(item);
    setSelectedDate(dayjs(item.batch_date, "MM/DD/YYYY")); // Set the date as needed, e.g., item.date
    set_openAddForm(true);
    setEditMode(true); // Switch to edit mode
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", currentItem);
    // Implement your logic to add or update the product
    set_openAddForm(false);
  };

  return (
    <>
      <Dialog
        onClose={() => {
          set_openAddForm(false);
          setEditMode(false);
        }}
        open={openAddForm}
        PaperProps={{
          sx: {
            height: "80vh",
            width: "50vw",
            margin: 0, // To remove any default margin
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          {editMode ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent>
          <Stack
            sx={{ marginTop: "1rem" }}
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form submitted");
              set_openAddForm(false);
            }}
            spacing={2}
          >
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              defaultValue={editMode ? currentItem.description : ""}
              fullWidth
            />
            <TextField
              label="Stock"
              name="stock"
              variant="outlined"
              type="number"
              defaultValue={editMode ? currentItem.stock : ""}
              fullWidth
            />
            <TextField
              label="Price(₱)"
              name="description"
              variant="outlined"
              type="number"
              defaultValue={editMode ? currentItem.price : ""}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                defaultValue={editMode ? currentItem.type : ""}
              >
                <MenuItem value={"Material"}>Material</MenuItem>
                <MenuItem value={"Furniture"}>Furniture</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {editMode ? "Update" : "Submit"}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Stack spacing={1} alignItems="end" sx={{ height: "100%" }}>
        <Button
        color="secondary"
          sx={{ display: "inline-block" }}
          variant="contained"
          onClick={() => set_openAddForm(true)}
        >
          Add Product
        </Button>
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            height: "92.5%",
            width: "100%",
            borderRadius: "0.2rem",
          }}
        >
          <DataGrid
            sx={{ width: "100%", height: "100%" }}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            checkboxSelection
            onRowSelected={(params) => handleEdit(params.row)}
          />
        </Box>
      </Stack>
    </>
  );
};

export default ItemInventory;
