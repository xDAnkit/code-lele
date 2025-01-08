import React, { useEffect, useState } from "react";

import {
  Card,
  CardLink,
  CreatedBy,
  DeleteButton,
  DialogActionButtons,
  DialogHeading,
  GridContainer,
  Language,
  StyledDialog,
  Timestamp,
  Title,
} from "./History.Style";
import { DialogActions } from "@mui/material";
import { format, formatDistanceToNow } from "date-fns";
import {
  deleteRecord,
  getAllRecords,
} from "../../../service/firebase/firebase.service";

import { toast } from "react-toastify";

const HistoryUI = () => {
  const [getIDFromFirebase, setgetIDFromFirebase] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedItemId, setSelectedItemID] = useState(null);

  const handleClickOpen = (id, event) => {
    event.stopPropagation();
    event.preventDefault();
    setOpen(true);
    setSelectedItemID(id);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItemID(null);
  };
  const OnDeleteDoc = async () => {
    const response = await deleteRecord(selectedItemId);
    toast("Item Successfully Deleted");
    handleClose();
  };
  useEffect(() => {
    const handleFetchData = async () => {
      const response = await getAllRecords();
      setgetIDFromFirebase(response);
    };
    handleFetchData();
  }, [selectedItemId]);

  return (
    <>
      <GridContainer>
        <StyledDialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogHeading id="alert-dialog-title">
            {"Are you sure you want to delete this item?"}
          </DialogHeading>

          <DialogActions>
            <DialogActionButtons onClick={OnDeleteDoc} autoFocus>
              Delete
            </DialogActionButtons>
            <DialogActionButtons onClick={handleClose}>
              Cancel
            </DialogActionButtons>
          </DialogActions>
        </StyledDialog>

        {getIDFromFirebase.map((item) => (
          <CardLink href={`http://localhost:5173/${item.id}`} target="_blank">
            <Card key={item.id}>
              <DeleteButton onClick={(e) => handleClickOpen(item.id, e)}>
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
            </Card>
          </CardLink>
        ))}
      </GridContainer>
    </>
  );
};

export default HistoryUI;
