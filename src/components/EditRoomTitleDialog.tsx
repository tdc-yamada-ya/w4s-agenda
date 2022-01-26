import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useUpdateCurrentRoom } from "../Room";

export const EditRoomTitleDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [value, setValue] = useState("");
  const updateCurrentRoom = useUpdateCurrentRoom();
  const submit = () => {
    updateCurrentRoom({ title: value });
    onClose();
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm" onClose={onClose}>
      <DialogContent>
        <DialogContentText>Enter room title.</DialogContentText>
        <TextField
          sx={{ mt: 2 }}
          multiline
          rows={3}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fullWidth={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRoomTitleDialog;
