import { IconButton } from "@mui/material";
import { Fragment, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditRoomTitleDialog from "./EditRoomTitleDialog";

export const EditRoomTitleButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      <EditRoomTitleDialog open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

export default EditRoomTitleButton;
