import { ColorName } from "../Room";
import UpdateColorButton from "./UpdateColorButton";
import { Fragment } from "react";
import { Stack } from "@mui/material";

const colors = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#222222",
  "#ffffff",
  "#607D8B",
  "transparent",
];

export const UpdateColorButtons = ({ name }: { name: ColorName }) => {
  return (
    <Stack direction="row" flexWrap="wrap" gap={0.5}>
      {colors.map((color) => (
        <UpdateColorButton key={color} name={name} color={color} />
      ))}
    </Stack>
  );
};

export default UpdateColorButtons;
