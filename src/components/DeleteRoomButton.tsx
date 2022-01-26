import { Button } from "@mui/material";
import { Fragment, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteRoomDialog from "./DeleteRoomDialog";

export const DeleteRoomButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        startIcon={<DeleteForeverIcon />}
        color="error"
      >
        Delete Room
      </Button>
      <DeleteRoomDialog open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

export default DeleteRoomButton;
