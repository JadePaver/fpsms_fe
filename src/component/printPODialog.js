import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Stack,
  Box,
  Typography,
} from "@mui/material";

import { useState, useRef } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DataGrid } from "@mui/x-data-grid";

import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import apiClient from "../axios/axiosInstance";

const PrintPODialog = () => {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [reportData, setReportData] = useState([]);

  const columns = [
    { field: "receipt", headerName: "Reciept #", flex: 1 },
    {
      field: "items",
      headerName: "Items",
      flex: 1,
      renderCell: (params) => {
        // Ensure params.formattedValue is an array
        if (!Array.isArray(params.formattedValue)) {
          return <span>No items</span>;
        }

        return (
          <>
            <Stack
              spacing={1}
              sx={{
                width: "100%",
                maxHeight: 5500, // Limit the height of the cell
                overflowY: "auto", // Add vertical scrolling for overflow
                overflowX: "hidden",
                padding: "4px", // Add padding for better appearance
                backgroundColor: "#f9f9f9", // Optional: Add background for better readability
                borderRadius: "4px", // Optional: Add rounded corners
              }}
            >
              {params.formattedValue.map((item, index) => (
                <Typography key={index} variant="body2" component="div">
                  <strong>{item.description}</strong> - {item.quantity}x ₱
                  {item.price}
                </Typography>
              ))}
            </Stack>
          </>
        );
      },
    },
    { field: "fullname", headerName: "Customer", flex: 1 },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
      renderCell: (params) => {
        return <>₱{params?.formattedValue}</>;
      },
    },
  ];

  const handleSubmit = async () => {
    try {
      const adjustedEndDate = endDate.add(1, "day");
      const data = { start: startDate, end: adjustedEndDate };
      const response = await apiClient.post("/po/report", data);
      setReportData(response.data);
    } catch (error) {}
  };

  return (
    <>
      <Button
        variant="contained"
        disableElevation
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <PrintRoundedIcon />
      </Button>
      <Dialog
        open={isOpen}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "60vw",
          },
        }}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <DialogTitle>
          Choose date range to generate Purchase Order records
        </DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} sx={{ m: "1rem 0" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                slotProps={{ textField: { variant: "outlined" } }}
                sx={{ flex: 1 }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                minDate={startDate}
                slotProps={{ textField: { variant: "outlined" } }}
                sx={{ flex: 1 }}
              />
            </LocalizationProvider>
          </Stack>
          <Box ref={dialogRef} sx={{ minWidth: "100%" }}>
            <DataGrid
              sx={{ minWidth: "100%", minHeight: "100%" }}
              rows={reportData}
              columns={columns}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>{" "}
          <Button
            variant="contained"
            disableElevation
            onClick={() => {
              handleSubmit();
            }}
          >
            Generate
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              window.print();
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PrintPODialog;
