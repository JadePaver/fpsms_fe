import React, { useState } from "react"; // Import useState
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";

import GroupsIcon from "@mui/icons-material/Groups";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";

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
  const [hoveredEventId, setHoveredEventId] = useState(null); // State to track hovered event

  const events = [
    {
      id: 1, // Unique ID for each event
      title: "Event 1",
      date: "2024-10-01",
      extendedProps: {
        description: `40 pcs - Ply-wood 
4 pcs - Nail Box 
2x - 16’ x 24’ Wooden Table Furniture
1x - 11’ x 4’ Acacia Chair`, // Description is part of extendedProps
      },
    },
    {
      id: 2,
      title: "Event 2",
      date: "2024-10-11",
      extendedProps: {
        description: "This is the description for Event 2", // Add description
      },
    },
    {
      id: 3,
      title: "Event 3",
      date: "2024-10-26",
      extendedProps: {
        description: "This is the description for Event 3", // Add description
      },
    },
  ];

  const renderEventContent = (eventInfo) => {
    const isHovered = hoveredEventId === eventInfo.event.id;

    return (
      <Box
        onMouseEnter={() => setHoveredEventId(eventInfo.event.id)} // Set hovered event ID on mouse enter
        onMouseLeave={() => setHoveredEventId(null)} // Reset on mouse leave
        sx={{
          position: "relative", // Position for floating effect
          height: isHovered ? "auto" : "30px", // Change height based on hover state
          width: isHovered ? "auto" : "100%", // Change width based on hover state
          overflow: "visible", // Show overflow when expanded
          borderRadius: "4px", // Round corners
          backgroundColor: isHovered ? "#007BFF" : "transparent",
          boxShadow: isHovered ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none", // Add shadow when hovered
          zIndex: isHovered ? 10 : 100, // Bring to front on hover
          transition: "all 0.4s ease",
        }}
      >
        <Tooltip
          title={eventInfo.event.title} // Show the full title on hover
          arrow
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
            height: "100%",
            width: "30%",
            bgcolor: "white",
            borderRadius: "0.2rem",
          }}
        >
          <Stack
            spacing={2}
            sx={{
              borderRadius: "0.2rem",
              bgcolor: "white",
              p: "1rem",
              width: "100%",
              minHeight: "100%",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "1.75rem" }}>
              ADD DELIVERY SCHEDULE
            </Typography>
            <TextField
              label="Deliver Name:"
              name="delivery"
              variant="outlined"
              value={"Driver Jome"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalShippingIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Item to Recieve:"
              name="recieve_item"
              variant="outlined"
              defaultValue={`40 pcs - Ply-wood 
4 pcs - Nail Box 
2x - 16’ x 24’ Wooden Table Furniture
1x - 11’ x 4’ Acacia Chair`}
              multiline
              rows={6}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InventoryIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Remarks:"
              name="customer"
              variant="outlined"
              defaultValue={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi nihil, architecto assumenda maiores ad temporibus."
              }
              fullWidth
              multiline
              rows={6}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Delivery"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Stack sx={{ marginTop: "2rem" }}>
              <Button variant="contained" fullWidth color="secondary">
                Add Deliver Schedule
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "70%",
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
            eventContent={renderEventContent} // Use custom event content renderer
          />
        </Box>
      </Stack>
    </>
  );
};

export default DeliverySchedule;
