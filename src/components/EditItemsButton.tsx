import { Button } from "@mui/material";
import { Fragment, useState } from "react";
import EditItemsDialog from "./EditItemsDialog";

export const EditItemsButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Edit Items
      </Button>
      <EditItemsDialog open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

export default EditItemsButton;
