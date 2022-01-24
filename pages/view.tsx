import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useCurrentRoomSelectedItem } from "../src/Item";
import { useCurrentRoom } from "../src/Room";

const flexVerticalAlignMap = {
  top: "flex-start",
  center: "center",
  bottom: "flex-end",
} as const;

const View: NextPage = () => {
  const room = useCurrentRoom();
  const item = useCurrentRoomSelectedItem();

  console.log(room?.data?.horizontal);

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "1rem",
        width: "100vw",
      }}
      style={{
        justifyContent: flexVerticalAlignMap[room?.data?.vertical ?? "top"],
        textAlign: room?.data?.horizontal,
      }}
    >
      <Typography sx={{ fontSize: "4rem", fontWeight: "bold", width: "100%" }}>
        {item?.data?.title}
      </Typography>
    </Box>
  );
};

export default View;
