import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { useState } from "react";
import CreateRoomButton from "./CreateRoomButton";

export const CreateRoomForm = () => {
  return (
    <Stack direction="row" spacing={2}>
      <CreateRoomButton />
    </Stack>
  );
};

export default CreateRoomForm;
