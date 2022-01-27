import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllItems, useUpdateCurrentRoomItems } from "../Item";
import { useCurrentRoomID } from "../Room";

export const EditItemsDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [value, setValue] = useState("");
  const updateItems = useUpdateCurrentRoomItems();
  const id = useCurrentRoomID();

  const submit = () => {
    updateItems(value.split(/\r?\n/).filter((l) => l));
    onClose();
  };

  useEffect(() => {
    if (!open) return;

    const f = async () => {
      const items = await getAllItems(id);
      const value =
        items
          ?.map((item) => item.data?.title)
          .filter((title) => title)
          .join("\n") ?? "";
      setValue(value);
    };

    f();
  }, [open, id]);

  return (
    <Dialog open={open} fullWidth={true} maxWidth="md" onClose={onClose}>
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

export default EditItemsDialog;
