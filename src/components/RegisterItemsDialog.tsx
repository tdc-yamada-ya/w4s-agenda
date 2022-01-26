import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useUpdateCurrentRoomItems } from "../Item";

export const RegisterItemsDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [value, setValue] = useState("");
  const updateItems = useUpdateCurrentRoomItems();

  const submit = () => {
    updateItems(value.split(/\r?\n/).filter((l) => l));
    onClose();
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm" onClose={onClose}>
      <DialogContent>
        <DialogContentText>Enter agenda items line by line.</DialogContentText>
        <TextField
          sx={{ mt: 2 }}
          multiline
          rows={8}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fullWidth={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterItemsDialog;
