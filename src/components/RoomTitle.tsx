import { Box, IconButton, Typography } from "@mui/material";
import { useCurrentRoom } from "../Room";
import EditRoomTitleButton from "./EditRoomTitleButton";

export const RoomTitle = () => {
  const room = useCurrentRoom();
  const title = room?.data?.title ?? room?.id ?? "";
  const id = room?.id;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Typography
          sx={{
            flexGrow: 1,
            fontWeight: 800,
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
          variant="h5"
          component="h1"
        >
          {title}
        </Typography>
        <EditRoomTitleButton />
      </Box>
      <Typography sx={{ fontSize: "0.8rem", opacity: 0.6 }}>{id}</Typography>
    </Box>
  );
};

export default RoomTitle;
