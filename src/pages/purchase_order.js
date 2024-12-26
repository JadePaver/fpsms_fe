import React, {
  useState,
  useContext,
  useEffect,
  forwardRef,
  useRef,
} from "react";
import { UserContext } from "../layouts/root_layout";

import apiClient from "../axios/axiosInstance";
import { formatDate } from "../configs/formmatter";
import { useSnackbar } from "../layouts/root_layout";
import PrintPODialog from "../component/printPODialog";
import Barcode from "react-barcode";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { DataGrid } from "@mui/x-data-grid";

import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import CloseIcon from "@mui/icons-material/Close";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PurchaseOrder = () => {
  const user = useContext(UserContext);
  const { showSnackbar } = useSnackbar();
  const [isPurchase, setIsPurchase] = useState(false);
  const [recieptView, setRecieptView] = useState(true);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [furnitures, setFurnitures] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [allPO, setAllPO] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openReciept, setOpenReciept] = useState(false);

  const dialogRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term on input change
  };

  const filteredFurniture = furnitures.filter((item) => {
    return Object.values(item)
      .filter((value) => typeof value === "string" || typeof value === "number") // Only check string or number values
      .some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
  });

  const filteredPO = allPO.filter((row) => {
    // Search in top-level fields (e.g., receipt, status, customer_name)
    const topLevelMatch = Object.values(row)
      .filter((value) => typeof value === "string" || typeof value === "number") // Only check string or number values
      .some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Search in itemlist array (e.g., description inside each item)
    const itemListMatch = row.itemlist.some((item) =>
      Object.values(item)
        .filter(
          (value) => typeof value === "string" || typeof value === "number"
        ) // Only check string or number values
        .some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return topLevelMatch || itemListMatch;
  });

  const submitSale = async(e) => {
    e.preventDefault();

    const data = {
      customer: customerName,
      invoice: user?.id,
      receipt: receiptNumber,
      item_list: purchaseItems,
    };

    await apiClient.post("/po/submit_sale", data).then((res) => {
      fetchFurnitures();
      fetchPO();
      setReceiptNumber(res.data);
      showSnackbar({
        message: "Sale saved Successfully.",
        severity: "success",
      });
      setOpenReciept(true);
    });
  };

  // Handle input change in purchase items
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...purchaseItems];
    newItems[index] = { ...newItems[index], [name]: value };
    setPurchaseItems(newItems);
  };

  const handleRemoveItem = (indexToRemove) => {
    setPurchaseItems((prevItems) =>
      prevItems.filter((item, index) => index !== indexToRemove)
    );
  };

  const handleAddItem = (row) => {
    const itemIndex = purchaseItems.findIndex(
      (item) => item.description === row.description
    );
    if (itemIndex !== -1) {
      const updatedItems = [...purchaseItems];
      updatedItems[itemIndex].quantity = 0; // Increment quantity
      updatedItems[itemIndex].price = row.price; // Update the price
      setPurchaseItems(updatedItems);
    } else {
      // If the item doesn't exist, add it with quantity = 1
      setPurchaseItems([
        ...purchaseItems,
        {
          item_id: row.id,
          description: row.description,
          quantity: 1,
          price: row.price,
          stock: row.stock,
        },
      ]);
    }
  };

  const customerOnChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleViewPO = (row) => {
    if (row.status === "Paid") {
      setIsPurchase(true);
    } else {
      setIsPurchase(false);
    }
    setCustomerName(row.customer_name ? row.customer_name : "");
    setReceiptNumber(row?.receipt);
    setPurchaseItems(row?.itemlist);
  };

  const reciept_columns = [
    { field: "receipt", headerName: "Reciept #", flex: 2 },
    {
      field: "item_list",
      headerName: "List of Items",
      flex: 2,
      renderCell: (params) => {
        return (
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              overflowY: "auto",
              maxHeight: "100px",
            }}
          >
            {params.row?.itemlist.map((item) => (
              <Typography key={item.id}>
                {item.description} (Qty: {item.quantity})
              </Typography>
            ))}
          </Stack>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 2,
      renderCell: (params) => {
        const statusColor =
          params.value === "Awaiting Payment"
            ? "#BEC400"
            : params.value === "Paid"
            ? "#008000"
            : "black";
        return (
          <Typography sx={{ color: statusColor }}>{params.value}</Typography>
        );
      },
    },
    {
      field: "date_of_purchased",
      headerName: "Checkout Date",
      flex: 2,
      renderCell: (params) => {
        return (
          <Typography>{formatDate(params.row.date_of_purchased)}</Typography>
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
            color="success"
            variant="contained"
            sx={{
              padding: 0.5,
              minWidth: 0,
              minHeight: 0,
            }}
            onClick={() => handleViewPO(params.row)}
          >
            <AddRoundedIcon />
          </Button>
        </Stack>
      ),
    },
  ];

  const columns = [
    { field: "description", headerName: "Description", flex: 2 },
    { field: "price", headerName: "Price", flex: 2 },
    { field: "stock", headerName: "Stock", flex: 1 },
    { field: "type", headerName: "Type", flex: 2 },
    {
      field: "batch_date",
      headerName: "Batch Date",
      flex: 2,
      renderCell: (params) => {
        return <Typography>{formatDate(params.row.batch_date)}</Typography>;
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
            color="success"
            variant="contained"
            sx={{
              padding: 0.5,
              minWidth: 0,
              minHeight: 0,
            }}
            onClick={() => handleAddItem(params.row)}
          >
            <AddRoundedIcon />
          </Button>
        </Stack>
      ),
    },
  ];
  const fetchFurnitures = () => {
    apiClient.get("/items/get_furnitures").then((res) => {
      console.log("furniture:", res.data);

      setFurnitures(res.data);
    });
  };

  const fetchPO = () => {
    apiClient.get("/po/get_all").then((res) => {
      setAllPO(res.data);
    });
  };

  useEffect(() => {
    fetchFurnitures();
    fetchPO();
  }, []);

  return (
    <>
      <Stack
        spacing={1}
        direction="row"
        sx={{ height: "100%", width: "100%" }}
        component="form"
        onSubmit={(e) => {
          submitSale(e); // Pass the event object to submitItem
        }}
      >
        <Stack
          spacing={2}
          sx={{
            borderRadius: "0.2rem",
            bgcolor: "white",
            p: "1rem",
            width: "35%",
            maxHeight: "100%",
            display: "flex",
            overflowY: "auto",
          }}
        >
          <TextField
            label="Invoice to:"
            name="invoiceTo"
            variant="outlined"
            value={user?.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonRoundedIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{
              readOnly: { isPurchase },
            }}
          />
          <TextField
            label="Reciept #:"
            name="reciept"
            variant="outlined"
            value={receiptNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ReceiptLongRoundedIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{
              readOnly: { isPurchase },
            }}
          />
          <TextField
            label="Customer Name:"
            name="customer"
            variant="outlined"
            placeholder="Please enter customer name"
            value={customerName}
            fullWidth
            required
            disabled={isPurchase}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GroupsIcon />
                </InputAdornment>
              ),
            }}
            onChange={customerOnChange}
          />
          {purchaseItems.length > 0 ? (
            purchaseItems.map((item, index) => (
              <Stack spacing={2} direction="row" key={index}>
                <TextField
                  label="Description:"
                  name="description"
                  variant="outlined"
                  value={item.description}
                  inputProps={{
                    readOnly: { isPurchase },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Button
                          disabled={isPurchase}
                          disableElevation
                          variant="contained"
                          color="error"
                          sx={{
                            minWidth: 0,
                            minHeight: 0,
                            padding: "0.25rem",
                          }}
                          onClick={() => handleRemoveItem(index)}
                        >
                          <CloseIcon />
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    flex: 5,
                  }}
                />
                <TextField
                  label="Quantity:"
                  disabled={isPurchase}
                  name="quantity"
                  variant="outlined"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleInputChange(index, e)}
                  sx={{ flex: 2 }}
                  inputProps={{
                    min: 0,
                    max: item.stock,
                  }}
                />
                <TextField
                  disabled
                  label="Price:"
                  name="price"
                  variant="outlined"
                  value={item.price}
                  onChange={(e) => handleInputChange(index, e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>₱</Typography>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ flex: 2 }}
                />
              </Stack>
            ))
          ) : (
            <Typography>No items in the list.</Typography>
          )}
          <Typography sx={{ textAlign: "end", width: "100%" }}>
            Total amount: ₱
            {purchaseItems.reduce(
              (total, item) => total + item.quantity * item.price,
              0
            )}
          </Typography>
          <Stack sx={{ alignItems: "end", paddingTop: "1.5rem" }}>
            <Button
              disableElevation
              color="success"
              variant="contained"
              type="submit"
              disabled={isPurchase || purchaseItems.length === 0}
            >
              Save Sale
            </Button>
          </Stack>
        </Stack>
        <Box
          sx={{
            borderRadius: "0.2rem",
            bgcolor: "white",
            width: "65%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              p: "0.2rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <PrintPODialog />
            <Stack direction="row" spacing={2}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search something..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button
                variant="contained"
                sx={{ width: "fit-content" }}
                startIcon={
                  recieptView ? (
                    <Inventory2OutlinedIcon />
                  ) : (
                    <ReceiptLongRoundedIcon />
                  )
                }
                disableElevation
                onClick={() => {
                  setRecieptView(!recieptView);
                }}
              >
                {recieptView ? "Purchase Order Table" : "Furnitures Table"}
              </Button>
            </Stack>
          </Stack>

          {recieptView ? (
            <>
              <DataGrid
                sx={{ width: "100%", height: "100%" }}
                rows={filteredFurniture}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10]}
              />
            </>
          ) : (
            <DataGrid
              sx={{ width: "100%", height: "100%" }}
              rows={filteredPO}
              columns={reciept_columns}
              rowHeight={200}
            />
          )}
        </Box>
      </Stack>

      <Dialog
        open={openReciept}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenReciept(false)}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "0.4rem",
            border: "solid 1px #AC875D",
            width: "370px",
            textAlign: "center",
          },
        }}
      >
        <Stack
          sx={{
            p: "1rem",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
          ref={dialogRef}
        >
          <Stack
            direction="row"
            sx={{
              display: "text",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              ml: "-3rem",
            }}
          >
            <Avatar sx={{ bgcolor: "#CCCCCC" }}>
              <DonutSmallRoundedIcon
                color="secondary"
                sx={{ m: "auto", fontSize: "29px" }}
              />
            </Avatar>
            <Typography
              color="secondary"
              variant="h5"
              sx={{
                maxWidth: "3rem",
                lineHeight: "0.8rem",
                fontWeight: "bold",
              }}
            >
              Butch Furniture
            </Typography>
          </Stack>
          <Typography color="secondary" variant="subtitle2" sx={{ p: "1rem" }}>
            North Capitol Drive corner Aguinaldo Street, Bacolod City.
          </Typography>
          <Box
            sx={{ bgcolor: "secondary.main", height: "5px", width: "100%" }}
          />
          <Stack
            direction="row"
            sx={{ p: "1rem", width: "100%", justifyContent: "space-between" }}
          >
            <Typography
              color="secondary"
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
            >
              Item's
            </Typography>
            <Typography
              color="secondary"
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
            >
              Price
            </Typography>
          </Stack>
          {purchaseItems.map((item, index) => (
            <Stack
              direction="row"
              sx={{
                p: "0 1rem",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography color="primary" variant="subtitle1">
                {item?.quantity}x {item?.description}
              </Typography>
              <Typography color="primary" variant="subtitle1">
                ₱{" "}
                {new Intl.NumberFormat("en-PH", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(item?.price)}
              </Typography>
            </Stack>
          ))}
          <Box
            sx={{
              m: "1rem",
              bgcolor: "secondary.main",
              height: "2px",
              width: "100%",
            }}
          />
          <Stack
            direction="row"
            sx={{ p: "0 1rem", width: "100%", justifyContent: "space-between" }}
          >
            <Typography
              color="secondary"
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
            >
              Total amount:
            </Typography>
            <Typography
              color="secondary"
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
            >
              ₱{" "}
              {new Intl.NumberFormat("en-PH", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(
                purchaseItems.reduce(
                  (total, item) => total + item.quantity * item.price,
                  0
                )
              )}
            </Typography>
          </Stack>

          <CheckCircleRoundedIcon
            sx={{ fontSize: "70px", color: "secondary.main" }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700 }} color="secondary">
            THANK YOU
          </Typography>
          <Typography variant="subtitle2" color="secondary">
            We appreciate your continued support of our business as we strive to
            provide you with high-quality furniture and exceptional customer
            service.
          </Typography>
          <Typography color="secondary">{receiptNumber}</Typography>
          <Barcode
            value={receiptNumber}
            width={1} // Controls the width of each bar
            height={50} // Controls the height of the barcode
            displayValue={false}
            color="secondary"
          />
        </Stack>
        <Button
          variant="outlined"
          autoFocus
          sx={{ m: "1rem" }}
          className="print-hide"
          onClick={() => {
            window.print();
          }}
        >
          <PrintRoundedIcon />
        </Button>
      </Dialog>
    </>
  );
};
export default PurchaseOrder;
