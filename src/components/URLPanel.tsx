import { Stack, Typography } from "@mui/material";
import { CopyViewURLToClipboardField } from "./CopyViewURLToClipboardField";

export const URLPanel = () => {
  return (
    <Stack spacing={1}>
      <Typography sx={{ fontWeight: 800 }}>Graphics URL</Typography>
      <Typography>
        Copy this URL and paste it into software such as OBS.
      </Typography>
      <CopyViewURLToClipboardField />
    </Stack>
  );
};

export default URLPanel;
