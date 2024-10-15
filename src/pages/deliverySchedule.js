import React, { useEffect, useState } from "react";

import apiClient from "../axios/axiosInstance";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useSnackbar } from "../layouts/root_layout";

import GroupsIcon from "@mui/icons-material/Groups";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";

import Stack from "@mui/material/Stack";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Tooltip } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const DeliverySchedule = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [hoveredEventId, setHoveredEventId] = useState(null); // State to track hovered event
  const [openForm, setOpenForm] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [formValues, setFormValues] = useState({
    delivery: "",
    recieve_item: "",
    remarks: "",
    date: selectedDate,
  });

  const handleSubmit = () => {
    const formattedData = {
      ...formValues,
      date: selectedDate.add(1, "day").format("YYYY-MM-DD"), // Add one day to selectedDate
    };
    apiClient.post("/delivery/add", formattedData).then(() => {
      getEvents();
      showSnackbar({
        message: "Delivery event saved Successfully.",
        severity: "success",
      });
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const renderEventContent = (eventInfo) => {
    const isHovered = hoveredEventId === eventInfo.event.id;

    return (
      <Box
        onMouseEnter={() => setHoveredEventId(eventInfo.event.id)} // Set hovered event ID on mouse enter
        onMouseLeave={() => setHoveredEventId(null)} // Reset on mouse leave
        sx={{
          p: isHovered ? "1rem": 0,
          position: "relative", // Position for floating effect
          height: isHovered ? "auto" : "30px", // Change height based on hover state
          width: isHovered ? "200%" : "100%", // Change width based on hover state
          overflow: "hidden", // Show overflow when expanded
          borderRadius: "4px", // Round corners
          backgroundColor: isHovered ? "blue" : "transparent",
          boxShadow: isHovered ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none", // Add shadow when hovered
          zIndex: isHovered ? 10 : 100, // Bring to front on hover
          transition: "all 0.4s ease",
        }}
      >
        <Tooltip
          title={eventInfo.event.title} // Show the full title on hover
          placement="top"
        >
          <Box>
            <Typography variant="body1">{eventInfo.event.title}</Typography>
          </Box>
        </Tooltip>
        <Box
          sx={{
            marginTop: "8px",
            width: "100%", // Ensure it uses full width
            height: "auto", // Set height to auto to fit content
            overflow: "visible", // Prevent overflow
            transition: "opacity 0.3s ease",
          }}
        >
          <Typography
            variant="caption"
            sx={{ whiteSpace: "pre-line", textAlign: "left" }}
          >
            {eventInfo.event.extendedProps.description}
          </Typography>
        </Box>
      </Box>
    );
  };

  const getEvents = () => {
    apiClient.get("/delivery/get_all").then((res) => {
      console.log("res.data:", res.data);
      const formattedEvents = res.data.map((event) => ({
        id: event.id,
        title: event.delivery_name,
        date: event.date_of_delivery.split("T")[0], // Extract only the date part
        extendedProps: {
          description: `${event.expected_item}\nRemarks: ${event.remarks}`, // Combine expected items and remarks
        },
      }));

      // Update the state with the formatted events
      setEvents(formattedEvents);
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Stack
        spacing={1}
        direction="row"
        sx={{
          height: "100%", // Adjust the height (80% of viewport height)
          width: "100%", // Set width to full
          overflow: "hidden", // Prevent overflow
          border: "1px solid #ccc", // Optional: add a border
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional: add shadow
          borderRadius: "8px", // Optional: round corners
        }}
      >
        <Box
          sx={{
            height: openForm ? "10%" : "100%",
            width: openForm ? "6%" : "30%",
            bgcolor: "white",
            borderRadius: "0.2rem",
            overflow: "hidden",
          }}
        >
          <Stack
            spacing={1}
            sx={{
              borderRadius: "0.2rem",
              bgcolor: "white",
              p: "1rem 1rem 0 1rem",
              width: "100%",
              minHeight: "100%",
            }}
          >
            <Stack sx={{ alignItems: "flex-end", m: "auto" }}>
              <Button
                disableElevation
                variant={openForm ? "contained" : "outlined"}
                color="secondary"
                sx={{ width: "fit-content" }}
                onClick={() => setOpenForm(!openForm)}
              >
                {openForm ? (
                  <KeyboardDoubleArrowRightRoundedIcon />
                ) : (
                  <KeyboardDoubleArrowLeftRoundedIcon />
                )}
              </Button>
            </Stack>

            <Typography sx={{ fontWeight: "bold", fontSize: "1.75rem" }}>
              ADD DELIVERY SCHEDULE
            </Typography>
            <TextField
              required
              placeholder="Driver John..."
              label="Deliver Name:"
              name="delivery"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalShippingIcon />
                  </InputAdornment>
                ),
              }}
              value={formValues.delivery}
              onChange={handleInputChange}
            />
            <TextField
              required
              placeholder="4x - Wooden Chair
            15x - 2x1 Metal Bar
            50x - 2x2 Wood Planks"
              label="Item to Recieve:"
              name="recieve_item"
              variant="outlined"
              multiline
              rows={6}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InventoryIcon />
                  </InputAdornment>
                ),
              }}
              value={formValues.recieve_item}
              onChange={handleInputChange}
            />
            <TextField
              label="Remarks:"
              name="remarks"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              value={formValues.customer}
              onChange={handleInputChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Delivery"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                  setFormValues((prevItem) => ({
                    ...prevItem,
                    date: newValue,
                  }));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Stack sx={{ marginTop: "2rem" }}>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                onClick={handleSubmit}
              >
                Add Deliver Schedule
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: openForm ? "94%" : "70%",
            bgcolor: "white",
            borderRadius: "0.2rem",
          }}
        >
          <FullCalendar
            plugins={[dayGridPlugin]} // Include plugins here
            initialView="dayGridMonth" // Set initial view
            events={events} // Pass events data
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            eventContent={renderEventContent}
            height="auto"
            width="auto"
          />
        </Box>
      </Stack>
    </>
  );
};

export default DeliverySchedule;
