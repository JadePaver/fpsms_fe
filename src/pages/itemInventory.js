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

import Lightbox from "react-image-lightbox";
import apiClient from "../axios/axiosInstance";
import { useSnackbar } from "../layouts/root_layout";
import ConfirmationDialog from "../component/confirmationDialog";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const ItemInventory = () => {
  const [materials, setMaterials] = useState([]);
  const [stacks, setStacks] = useState([{ material: { id: 1 }, quantity: 0 }]);
  const [openAddForm, set_openAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [editMode, setEditMode] = useState(false);
  const [allItems, setAllItems] = useState([]);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleOpenConfirmDialog = (item) => {
    setItemToDelete(item);
    setOpenConfirmDialog(true);
  };

  // Function to close confirmation dialog
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setItemToDelete(null);
  };

  // Function to remove item after confirmation
  const handleConfirmDelete = () => {
    removeItem(itemToDelete);
    handleCloseConfirmDialog(); // Close the dialog after deletion
  };

  //lightBox
  const [lightboxOpen, setLightboxOpen] = useState(false); // Controls if the lightbox is open
  const [lightboxImage, setLightboxImage] = useState("");

  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage("");
  };

  const { showSnackbar } = useSnackbar();

  const [currentItem, setCurrentItem] = useState({
    description: "",
    stock: 0,
    price: 0,
    type: "",
    selectedDate: selectedDate,
  });

  const submitItem = (e) => {
    e.preventDefault();
    const newItem = {
      ...currentItem,
      selectedDate: selectedDate.format("YYYY-MM-DD"), // Add one day to selectedDate
    };

    const formData = new FormData();
    formData.append("item", JSON.stringify(newItem)); // Append item data as JSON
    formData.append("ingredients", JSON.stringify(stacks)); // Append ingredients as JSON
    if (currentItem.image) {
      formData.append("image", currentItem.image); // Append the image file
    }

    let hasStockIssue = false;

    if (currentItem.type === "Furniture") {
      if (stacks.length < 2) {
        showSnackbar({
          message: "At least 1 materials is required for Furniture.",
          severity: "warning",
        });
        return;
      }

      stacks.forEach((item) => {
        if (item.quantity * currentItem.stock > item.material.stock) {
          hasStockIssue = true;
          showSnackbar({
            message: `Insufficient stock for ${
              item.material.description
            }. Needed: ${item.quantity * currentItem.stock}, Available: ${
              item.material.stock
            }`,
            severity: "error",
          });
        }
      });
    }
    if (!hasStockIssue) {
      if (editMode) {
        apiClient
          .post(`/items/update`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              showSnackbar({
                message: "Item updated successfully",
                severity: "success",
              });
              getAllMaterials();
              getAllItems();
              set_openAddForm(false);
              setEditMode(false);
            }
          });
      } else {
        apiClient
          .post(`/items/create`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              showSnackbar({
                message: "Item added successfully",
                severity: "success",
              });
              getAllMaterials();
              getAllItems();
              set_openAddForm(false);
            }
          });
      }
    }
  };

  const handleAddStack = () => {
    const newStack = { material: null, quantity: 0 };
    setStacks([...stacks, newStack]);
  };

  const handleRemoveStack = (index) => {
    setStacks(stacks.filter((_, i) => i !== index));
  };

  const handleChangeMaterial = (index, newValue) => {
    const updatedStacks = [...stacks];
    updatedStacks[index].material = newValue;
    setStacks(updatedStacks);
  };

  const handleChangeQuantity = (index, newQuantity) => {
    const updatedStacks = [...stacks];
    updatedStacks[index].quantity = newQuantity;
    setStacks(updatedStacks);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCurrentItem((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const columns = [
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      renderCell: (params) => (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => {
        const imageExists = Boolean(params.value);

        return (
          <Box
            sx={{
              height: imageExists ? 100 : 50, // Set height based on image presence
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {imageExists ? (
              <Box
                component="img"
                sx={{
                  height: "80%", // Adjust image height within the box
                  width: "auto", // Keep width auto to maintain aspect ratio
                  objectFit: "cover", // Ensures the image maintains aspect ratio
                  borderRadius: "8px", // Optional: Add some styling
                }}
                src={`/item_images/${params.value}`} // Build the image path
                alt={params.row.description}
                onClick={() => openLightbox(`/item_images/${params.value}`)} // Set the alt text
              />
            ) : null}
          </Box>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: (params) => (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            height: "100%",
          }}
        >
          ₱ {params.value.toFixed(2)}
        </Typography>
      ),
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
      renderCell: (params) => (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (params) => (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "batch_date",
      headerName: "Batch Date",
      flex: 1,
      renderCell: (params) => {
        // Format the date to "MM/DD/YYYY"
        const date = new Date(params.value);
        const formattedDate = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        return (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              height: "100%",
            }}
          >
            {formattedDate}
          </Typography>
        );
      },
    },
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
            onClick={() => {
              handleOpenConfirmDialog(params.row);
            }}
          >
            <DeleteIcon />
          </Button>
        </Stack>
      ),
    },
  ];

  const handleEdit = (item) => {
    const formattedDate = dayjs(item.batch_date);
    setCurrentItem(item);
    setSelectedDate(formattedDate);
    set_openAddForm(true);
    setEditMode(true);
    const transformedIngredients = item.ingredients.map((ingredient) => ({
      material: {
        id: ingredient.material_item_id,
        description: ingredient.material_description,
        stock: ingredient.material_stock,
      },

      quantity: ingredient.quantity,
    }));

    setStacks(transformedIngredients);
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

  const removeItem = (item) => {
    apiClient.post("/items/remove", item).then((res) => {
      getAllMaterials();
      getAllItems();
      showSnackbar({
        message: `${item.description} removed successfully`,
        severity: "success",
      });
    });
  };

  const getAllMaterials = () => {
    apiClient.get("/items/get_materials").then((res) => {
      setMaterials(res.data);
    });
  };

  const getAllItems = () => {
    apiClient.get("/items/get_all").then((res) => {
      console.log("items:",res.data)
      setAllItems(res.data);
    });
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(allItems);
  useEffect(() => {
    setFilteredItems(
      allItems.filter(item =>
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.material_description?.toLowerCase().includes(searchQuery.toLowerCase()) // Optional field
      )
    );
  }, [searchQuery, allItems]);

  useEffect(() => {
    getAllMaterials();
    getAllItems();
  }, []);

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
          {editMode ? "Edit Item" : "Add New Item"}
        </DialogTitle>
        <DialogContent>
          <Stack
            sx={{ marginTop: "1rem" }}
            component="form"
            onSubmit={(e) => {
              submitItem(e); // Pass the event object to submitItem
            }}
            spacing={2}
          >
            <TextField
              required
              label="Description"
              name="description"
              variant="outlined"
              defaultValue={currentItem.description}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              required
              label="Stock"
              name="stock"
              type="number"
              defaultValue={currentItem.stock}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              required
              label="Price(₱)"
              name="price"
              variant="outlined"
              type="number"
              defaultValue={currentItem.price}
              onChange={handleInputChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                defaultValue={currentItem.type}
                onChange={handleTypeChange}
              >
                <MenuItem value={"Material"}>Material</MenuItem>
                <MenuItem value={"Furniture"}>Furniture</MenuItem>
              </Select>
            </FormControl>
            {currentItem?.type === "Furniture" && (
              <>
                <Typography>Raw Material Cost:</Typography>

                {stacks.map((stack, index) => {
                  return (
                    <Stack
                      key={`${stack.id}-${index}`}
                      spacing={2}
                      direction="row"
                      sx={{ mb: 2 }}
                    >
                      <Autocomplete
                        required
                        sx={{ flex: 7 }}
                        id={`material-autocomplete-${stack.id}`}
                        key={stack.id}
                        options={materials}
                        getOptionLabel={(option) => option.description || ""}
                        value={
                          materials.find(
                            (material) => material.id === stack.material?.id
                          ) || null
                        }
                        onChange={(event, newValue) =>
                          handleChangeMaterial(index, newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={`Material #${index + 1}`}
                          />
                        )}
                        renderOption={(props, option) => {
                          const { key, ...restProps } = props; // Remove the key prop from the props object
                          return (
                            <Box
                              key={key} // Pass the key prop directly
                              component="li"
                              {...restProps}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                padding: "8px",
                              }}
                            >
                              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                {option.Description}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                Description:{" "}
                                <strong color="secondary">
                                  {option.description}
                                </strong>
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                Stock: {option.stock}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                Price: {option.price}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                Batch Date:{" "}
                                {new Date(option.batch_date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </Typography>
                            </Box>
                          );
                        }}
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
                        inputProps={{ min: 0 }}
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
                  );
                })}

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
                    onChange={handleFileChange}
                  />
                </FormControl>
              </>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  setCurrentItem((prevItem) => ({
                    ...prevItem,
                    selectedDate: newValue,
                  }));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {editMode ? "Update" : "Submit"}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Stack
        spacing={1}
        alignItems="end"
        sx={{ height: "100%", width: "100%" }}
      >
        <Stack
          spacing={1}
          direction="row"
          sx={{ p: "0.2rem", width: "100%" }}
          alignItems="center"
          justifyContent="flex-end"
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search something..."

            value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
            
          />

          <Button
            color="secondary"
            sx={{ width:"fit-content" }}
            variant="contained"
            startIcon={<AddCircleOutlineRoundedIcon/>}
            onClick={() => {
              set_openAddForm(true);
              setEditMode(false);
              setStacks([{ material: { id: 1 }, quantity: 0 }]);
            }}
          >
            Add New Item
          </Button>
        </Stack>

        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            height: "92.5%",
            width: "100%",
            borderRadius: "0.2rem",
          }}
        >
          <DataGrid
            sx={{ width: "100%" }}
            getRowHeight={() => "auto"}
            rows={filteredItems}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />
        </Box>
      </Stack>
      <ConfirmationDialog
        isOpen={openConfirmDialog}
        label="Are you sure to remove this item??"
        onClose={() => handleCloseConfirmDialog()}
        isConfirmFunction={handleConfirmDelete}
      />
      {lightboxOpen && (
        <Lightbox mainSrc={lightboxImage} onCloseRequest={closeLightbox} />
      )}
    </>
  );
};

export default ItemInventory;
