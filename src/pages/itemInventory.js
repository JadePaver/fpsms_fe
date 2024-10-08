import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import OutlinedInput from "@mui/material/OutlinedInput";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

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

const materials = [
  {
    Department: "Wood",
    Description: "High-quality oak wood",
    Stock: 120,
    Price: "$200",
    Batch_date: "2024-09-12",
  },
  {
    Department: "Metal",
    Description: "Stainless steel sheets",
    Stock: 50,
    Price: "$150",
    Batch_date: "2024-09-01",
  },
  {
    Department: "Plastic",
    Description: "Durable plastic polymers",
    Stock: 200,
    Price: "$80",
    Batch_date: "2024-08-28",
  },
];

const ItemInventory = () => {
  const [stacks, setStacks] = useState([{ material: null, quantity: 0 }]);

  const handleAddStack = () => {
    setStacks([...stacks, { material: null, quantity: 0 }]);
  };

  // Handler to remove a specific stack
  const handleRemoveStack = (index) => {
    setStacks(stacks.filter((_, i) => i !== index));
  };

  // Handler to update a specific stack's material and quantity
  const handleChangeMaterial = (index, newMaterial) => {
    const updatedStacks = [...stacks];
    updatedStacks[index].material = newMaterial;
    setStacks(updatedStacks);
  };

  const handleChangeQuantity = (index, newQuantity) => {
    const updatedStacks = [...stacks];
    updatedStacks[index].quantity = newQuantity;
    setStacks(updatedStacks);
  };

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
  const [openAddForm, set_openAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [editMode, setEditMode] = useState(false); // To manage edit mode
  const [currentItem, setCurrentItem] = useState(null);

  const handleEdit = (item) => {
    console.log("item:", item);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      type: value,
    }));
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
              const data = currentItem;
              console.log("Form submitted", data); //data+stacks
              console.log("stacks", stacks);
              set_openAddForm(false);
            }}
            spacing={2}
          >
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              defaultValue={editMode ? currentItem.description : ""}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Stock"
              name="stock"
              variant="outlined"
              type="number"
              defaultValue={editMode ? currentItem.stock : ""}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Price(₱)"
              name="description"
              variant="outlined"
              type="number"
              defaultValue={editMode ? currentItem.price : ""}
              onChange={handleInputChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                defaultValue={editMode ? currentItem.type : ""}
                onChange={handleTypeChange}
              >
                <MenuItem value={"Material"}>Material</MenuItem>
                <MenuItem value={"Furniture"}>Furniture</MenuItem>
              </Select>
            </FormControl>
            {currentItem?.type === "Furniture" && (
              <>
                <Typography>Raw Material Cost:</Typography>

                {stacks.map((stack, index) => (
                  <Stack key={index} spacing={2} direction="row" sx={{ mb: 2 }}>
                    <Autocomplete
                      sx={{ flex: 7 }}
                      id={`material-autocomplete-${index}`}
                      options={materials}
                      getOptionLabel={(option) => option.Department || ""}
                      value={stack.material}
                      onChange={(event, newValue) =>
                        handleChangeMaterial(index, newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`Material #${index + 1}`}
                        />
                      )}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          {...props}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            padding: "8px",
                          }}
                        >
                          <Typography variant="h6">
                            {option.Department}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Description: {option.Description}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Stock: {option.Stock}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Price: {option.Price}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Batch Date: {option.Batch_date}
                          </Typography>
                        </Box>
                      )}
                    />
                    <TextField
                      label="Quantity"
                      name="quantity"
                      variant="outlined"
                      type="number"
                      sx={{ flex: 2 }}
                      value={stack.quantity}
                      onChange={(e) =>
                        handleChangeQuantity(index, e.target.value)
                      }
                    />
                    <Box sx={{ p: "0.25rem", flex: 1 }}>
                      <Button
                        disableElevation
                        variant="contained"
                        color="error"
                        sx={{
                          minWidth: "100%",
                          minHeight: "100%",
                          padding: "0.25rem",
                        }}
                        onClick={() => handleRemoveStack(index)}
                      >
                        <CloseIcon />
                      </Button>
                    </Box>
                  </Stack>
                ))}
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleAddStack}
                  sx={{ mt: 2 }}
                >
                  <AddRoundedIcon color="success" />
                  Add Material
                </Button>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="image-upload" shrink>
                    Upload Image
                  </InputLabel>
                  <OutlinedInput
                    id="image-upload"
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    label="Upload Image"
                  />
                </FormControl>
              </>
            )}
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
