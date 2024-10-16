import apiClient from "../axios/axiosInstance";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactToPrint from "react-to-print";


import ConfirmationDialog from "../component/confirmationDialog";
import { useSnackbar } from "../layouts/root_layout";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

const UserManagement = () => {
  const [openAddForm, set_openAddForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState({
    id:"",
    username: "",
    password: "",
    confirmPassword: "",
    type: "",
  });

  const { showSnackbar } = useSnackbar();

  const submitUser = (e) => {
    e.preventDefault();

    if (currentData.password === currentData.confirmPassword) {
      apiClient.post("/users/create", currentData).then(() => {
        showSnackbar({
          message: "User added successfully",
          severity: "success",
        });
        set_openAddForm(false);
        getUsers();
      });
    } else {
      showSnackbar({
        message: "Password does not matched!",
        severity: "error",
      });
    }
  };

  const editUser = (e) => {
    e.preventDefault();

    if (currentData.password === currentData.confirmPassword) {
      console.log("edit:", currentData)
      apiClient.post("/users/edit", currentData).then(() => {
        showSnackbar({
          message: "User updated successfully",
          severity: "success",
        });
        set_openAddForm(false);
        getUsers();
      });
    } else {
      showSnackbar({
        message: "Password does not matched!",
        severity: "error",
      });
    }
  };

  const handleRemoveUser = () => {
    console.log("user:", selectedUser);
    apiClient.post("/users/remove", { user: selectedUser }).then(() => {
      showSnackbar({
        message: "User removed successfully",
        severity: "success",
      });
      getUsers();
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("data:", currentData);
    setCurrentData({
      ...currentData,
      [name]: value, // Dynamically update the state based on the input's name
    });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "username", headerName: "Username", flex: 3 },
    { field: "role", headerName: "Role", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 3,
      headerAlign: "center",
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
              setIsEdit(true);
              set_openAddForm(true);
              console.log("row:",params.row)
              setCurrentData(params.row)
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
              setSelectedUser(params.row);
              setOpenConfirm(true);
            }}
          >
            <DeleteIcon />
          </Button>
        </Stack>
      ),
    },
  ];

  const getUsers = () => {
    apiClient.get("/users/get_all").then((res) => {
      console.log("users:", res.data);
      setUsers(res.data);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("user:", storedUser); // Log the actual user to the console
    if (storedUser?.role !== "Admin") {
      showSnackbar({
        message: "Your account is not authorized for that page!",
        severity: "error",
      });
      navigate("/fpsms"); // Redirect to /fpsms if the user is not an Admin
    }
  }, [navigate]); // Ensure that `navigate` is added as a dependency
  

  return (
    <>
      <Dialog
        onClose={() => {
          set_openAddForm(false);
        }}
        open={openAddForm}
        PaperProps={{
          sx: {
            height: "auto",
            width: "50vw",
            margin: 0, // To remove any default margin
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>{isEdit? "Edit User":"Add New User"}</DialogTitle>
        <DialogContent>
          <Stack
            sx={{ marginTop: "1rem" }}
            component="form"
            onSubmit={(e) => {
              if (isEdit) {
                // Call your edit function here
                editUser(e);
              } else {
                // Call your add function here
                submitUser(e);
              }
            }}
            spacing={2}
          >
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              fullWidth
              value={currentData.username}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              variant="outlined"
              type="password"
              fullWidth
              value={currentData.password}
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              variant="outlined"
              type="password"
              fullWidth
              value={currentData.confirmPassword}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentData.role}
                label="Role"
                name="role"
                onChange={handleChange}
              >
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Sales Staff"}>Sales Staff</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" type="submit" fullWidth>
            {isEdit ? "Update" : "Submit"}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <Stack
        spacing={1}
        alignItems="end"
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Button
          color="secondary"
          sx={{ display: "inline-block" }}
          variant="contained"
          onClick={() => {set_openAddForm(true); setIsEdit(false)}}
        >
          Add User
        </Button>
        <Box
          sx={{
            borderRadius: "0.2rem",
            bgcolor: "white",
            height: "100%",
            width: "100%",
          }}
        >
          <DataGrid
            sx={{ width: "100%", height: "100%" }}
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />
        </Box>
        <ConfirmationDialog
          isOpen={openConfirm}
          label="Are you sure to remove this user?"
          onClose={() => setOpenConfirm(false)}
          isConfirmFunction={handleRemoveUser}
        />
      </Stack>
      
    </>
  );
};
export default UserManagement;
