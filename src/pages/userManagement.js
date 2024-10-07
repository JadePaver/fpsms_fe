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

import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const rows = [
  {
    id: 1,
    username: "johnDoe",
    role: "Admin",
  },
  {
    id: 2,
    username: "janeSmith",
    role: "Sales Staff",
  },
];

const UserManagement = () => {
    const [openAddForm, set_openAddForm] = useState(false);


  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "username", headerName: "Username", flex: 3 },
    { field: "role", headerName: "Role", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 3,
      headerAlign: 'center',
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
              //   handleEdit(params.row);
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
        <DialogTitle sx={{ textAlign: "center" }}>
         Add New Product
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
              label="Username"
              name="username"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Password"
              name="password" 
              variant="outlined"
              type="password"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
              >
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Sales Staff"}>Sales Staff</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
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
          onClick={() => set_openAddForm(true)}
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
export default UserManagement;
