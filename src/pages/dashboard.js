import Box from "@mui/material/Box";
import { useEffect, useState, useContext } from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import apiClient from "../axios/axiosInstance";

import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

import { formatDate } from "../configs/formmatter";
import { UserContext } from "../layouts/root_layout";

const colors = [
  "#26C6DA", // Default teal color
  "#42A5F5", // Default blue color
  "#AB47BC", // Default purple color
  "#FF7043", // Default orange color
  "#7E57C2", // Default deep purple color
  "#66BB6A", // Default green color
  "#FF8A80", // New light red color
  "#81D4FA"  // New light sky blue color
];

const columns = [
  { field: "receipt", headerName: "Reciept #", flex: 2 },
  {
    field: "total_amount",
    headerName: "Amount",
    flex: 1,
    renderCell: (params) => {
      const formattedAmount = new Intl.NumberFormat("en-PH", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(params.value);

      return (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            height: "100%",
          }}
        >
          ₱ {formattedAmount}
        </Typography>
      );
    },
  },
  {
    field: "date_of_purchased",
    headerName: "Date of Purchased",
    flex: 1,
    renderCell: (params) => {
      return (
        <Typography
          sx={{
            justifyContent: "center", // Center the content horizontally
            alignItems: "center", // Center the content vertically
            textAlign: "center", // Center align text within the Typography
          }}
        >
          {formatDate(params.value)}
        </Typography>
      );
    },
  },
];

const Dashboard = () => {
  const user = useContext(UserContext);
  const [allPO, setAllPO] = useState([]);
  const [furnitures, setFurnitures] = useState([]);

  const fetchPO = () => {
    apiClient.get("/po/get_all").then((res) => {
      console.log("PO:", res.data);
      setAllPO(res.data);
    });
  };
  const fetchFurnitures = () => {
    apiClient.get("/items/get_furnitures").then((res) => {
      console.log("furniture:", res.data);
      setFurnitures(res.data);
    });
  };

  const formattedData = furnitures
  .sort((a, b) => b.stock - a.stock) // Sort by stock in descending order
  .slice(0, 8) // Get only the first 8 items
  .map((item, index) => ({
    id: index,
    value: item.stock,
    label: item.description,
    color: colors[index],
  }));

  useEffect(() => {
    fetchPO();
    fetchFurnitures();
  }, []);

  // Aggregate data by date_of_purchased
  const chartData = allPO.reduce((acc, po) => {
    // Convert date_of_purchased to a Date object
    const date = new Date(po.date_of_purchased).toDateString(); // Use toDateString to ignore time for grouping

    // Check if the date already exists in the accumulator
    const existingEntry = acc.find((item) => item.date_of_purchased === date);

    if (existingEntry) {
      // If the date exists, add the total_amount to the existing entry
      existingEntry.total_amount += po.total_amount;
    } else {
      // If it doesn't exist, create a new entry
      acc.push({
        date_of_purchased: date,
        total_amount: po.total_amount,
      });
    }

    return acc; // Return the accumulator for the next iteration
  }, []);

  // If you need to convert the date back to a Date object in the final chartData
  const finalChartData = chartData.map((item) => ({
    date_of_purchased: new Date(item.date_of_purchased), // Convert back to Date object if needed
    total_amount: item.total_amount,
  }));

  return (
    <>
      <Stack
        spacing={1}
        sx={{ padding: "0.1rem", width: "100%", height: "100%" }}
      >
        <Stack
          sx={{
            width: "100%",
            height: "50%",
            background: "white",
            borderRadius: "0.2rem",
          }}
        >
          <LineChart
            dataset={finalChartData} // Use formatted chart data
            xAxis={[
              {
                dataKey: "date_of_purchased",
                label: "Date of Purchased",
                labelStyle: {
                  paddingTop: "1rem",
                },
                scaleType: "time",
                domain: ["dataMin", "dataMax"], // Automatically set the domain based on data
              },
            ]}
            yAxis={[
              {
                dataKey: "total_amount",
                label: "Total Amount",
                labelStyle: {
                  padding: "1rem", // Add padding to y-axis label
                  zIndex: 100, // You can adjust the translation if necessary
                },
              },
            ]}
            series={[
              {
                dataKey: "total_amount",
                label: "Total Amount Purchased",
                stroke: "blue",
              },
            ]}
            margin={100}
            grid={{ vertical: true, horizontal: true }}
            sx={{
              width: "50%", // Adjust the width to desired percentage
              height: "50%", // Set a fixed height or use percentage
              p: "4px",
            }}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ width: "100%", height: "50%" }}
        >
          <Box
            sx={{
              background: "white",
              height: "100%",
              width: "30%",
              borderRadius: "0.2rem",
            }}
          >
            <PieChart
              series={[
                {
                  data: formattedData,
                  innerRadius: 40,
                  outerRadius: 120,
                  paddingAngle: 2,
                  cornerRadius: 5,
                  startAngle: -180,
                  endAngle: 180,
                  cx: 120,
                  cy: 170,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
            />
          </Box>
          <Stack
            sx={{
              background: "white",
              height: "100%",
              width: "70%",
              borderRadius: "0.2rem",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Recent Sales </Typography>
            <DataGrid
              sx={{ width: "100%" }}
              rows={allPO}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
export default Dashboard;
