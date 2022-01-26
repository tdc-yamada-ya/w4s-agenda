import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDeleteCurrentRoom, useUpdateCurrentRoom } from "../Room";

export const DeleteRoomDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const deleteCurrentRoom = useDeleteCurrentRoom();
  const submit = () => {
    deleteCurrentRoom();
    onClose();
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm" onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the room?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={submit}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteRoomDialog;
