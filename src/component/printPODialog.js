import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Stack,
  Box,
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
        return (
          <>
            <Stack>
              {params.formattedValue.map((item) => {
                return (
                  <>
                    <Stack direction="row" spacing={2}>
                      {item?.description} {item?.quantity}X - ₱{item?.price}
                    </Stack>
                  </>
                );
              })}
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
        console.log("params", params);
        return <>₱{params?.formattedValue}</>;
      },
    },
  ];

  const handleSubmit = async () => {
    try {
      const data = { start: startDate, end: endDate };
      const response = await apiClient.post("/po/report", data);
      setReportData(response.data);
      console.log("REPORTS:", response.data);
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
        onClose={()=>{setIsOpen(false)}}
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
          <Box ref={dialogRef} sx={{minWidth:"100%"}}>
            <DataGrid
              sx={{ width: "100%", height: "100%" }}
              rows={reportData}
              columns={columns}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setIsOpen(false)}}>Cancel</Button>{" "}
          <Button
            variant="contained"
            onClick={
              () => {
                handleSubmit();
              }
            }
          >
            Generate
          </Button>
          <Button
            variant="contained"
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
