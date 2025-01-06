import React, { useEffect, useState } from "react";

import {
  Card,
  CardLink,
  CreatedBy,
  DeleteButton,
  GridContainer,
  Language,
  Timestamp,
  Title,
} from "./history-style";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { format, formatDistanceToNow } from "date-fns";
import {
  DeleteData,
  FetchAllData,
} from "../../../service/firebase/firebase.service";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HistoryUI = () => {
  const [getIDFromFirebase, setgetIDFromFirebase] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedItemId, setSelectedItemID] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedItemID(id);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItemID(null);
  };
  const OnDeleteDoc = async () => {
    console.log("s", selectedItemId);

    const response = await DeleteData(selectedItemId);
    toast("Item Successfully Deleted");
    handleClose();
  };
  useEffect(() => {
    const handleFetchData = async () => {
      const response = await FetchAllData();
      console.log("Response", response);
      setgetIDFromFirebase(response);
    };
    handleFetchData();
  }, [selectedItemId]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        theme="dark"
        hideProgressBar={true}
        pauseOnHover={false}
      />
      <GridContainer>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiDialog-paper": {
              background: "#222",
            },
          }}
        >
          <DialogTitle id="alert-dialog-title" sx={{ color: "#fff" }}>
            {"Are you sure you want to delete this item?"}
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={OnDeleteDoc} autoFocus sx={{ color: "#fff" }}>
              Delete
            </Button>
            <Button onClick={handleClose} sx={{ color: "#fff" }}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {getIDFromFirebase.map((item) => (
          <Card key={item.id}>
            <DeleteButton onClick={() => handleClickOpen(item.id)}>
              ✖
            </DeleteButton>

            <Title>{item.title || "No Title"}</Title>
            <Language>Language: {item.language || "PlainText"}</Language>

            <CreatedBy>
              Created On:{" "}
              {item.createdAt
                ? `${format(Number(item.createdAt), "MMMM dd,yyy")}`
                : "Not Exists"}
            </CreatedBy>
            <Timestamp>
              {`Last Updated By: ${formatDistanceToNow(
                Number(item.updatedAt),
                "MMMM dd,yyy"
              )} ago`}
            </Timestamp>
            <CardLink href={`http://localhost:5173/${item.id}`} target="_blank">
              {" "}
              Click Here
            </CardLink>
          </Card>
        ))}
      </GridContainer>
    </>
  );
};

export default HistoryUI;
