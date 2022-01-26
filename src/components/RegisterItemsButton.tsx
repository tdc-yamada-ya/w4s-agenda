import { Button } from "@mui/material";
import { Fragment, useState } from "react";
import RegisterItemsDialog from "./RegisterItemsDialog";

export const RegisterItemsButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Register Items
      </Button>
      <RegisterItemsDialog open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

export default RegisterItemsButton;
