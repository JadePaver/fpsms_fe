import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "reciept", headerName: "Reciept #", flex: 1 },
  { field: "amount", headerName: "Amount", width: 150 },
  { field: "date", headerName: "Date of Purchased", width: 150 },
];

const rows = [
  { id: 1, reciept: "A1B2C345", amount: 8500, date: "01/02/2024" },
  { id: 2, reciept: "A1B2C346", amount: 8500, date: "01/02/2024" },
  { id: 3, reciept: "A1B2C347", amount: 8500, date: "01/02/2024" },
  { id: 4, reciept: "A1B2C348", amount: 8500, date: "01/02/2024" },
  { id: 5, reciept: "A1B2C349", amount: 8500, date: "01/02/2024" },
  { id: 6, reciept: "A1B2C350", amount: 8500, date: "01/02/2024" },
];

const dataset = [
  { month: 1, sales: 40, revenue: 30 },
  { month: 2, sales: 55, revenue: 45 },
  { month: 3, sales: 70, revenue: 50 },
  { month: 4, sales: 90, revenue: 85 },
  { month: 5, sales: 100, revenue: 90 },
  { month: 6, sales: 120, revenue: 110 },
  { month: 7, sales: 80, revenue: 75 },
  { month: 8, sales: 95, revenue: 85 },
  { month: 9, sales: 110, revenue: 95 },
  { month: 10, sales: 130, revenue: 105 },
  { month: 11, sales: 115, revenue: 100 },
  { month: 12, sales: 140, revenue: 120 },
];

const Dashboard = () => {
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
            dataset={dataset}
            xAxis={[{ dataKey: "month", label: "Month" }]}
            series={[
              { dataKey: "sales", label: "Sales", stroke: "blue" },
              { dataKey: "revenue", label: "Revenue", stroke: "green" },
            ]}
            margin={{ left: 30, right: 30, top: 30, bottom: 50 }}
            grid={{ vertical: true, horizontal: true }}
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
                  data: [
                    { id: 0, value: 10, label: "series A" },
                    { id: 1, value: 15, label: "series B" },
                    { id: 2, value: 20, label: "series C" },
                    { id: 3, value: 5, label: "series D" },
                    { id: 4, value: 45, label: "series E" },
                  ],
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 2,
                  cornerRadius: 5,
                  startAngle: -180,
                  endAngle: 180,
                  cx: 110,
                  cy: 140,
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
            <Typography variant="subtitle1">Recent Sales</Typography>
            <DataGrid
              sx={{ width: "100%" }}
              rows={rows}
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
