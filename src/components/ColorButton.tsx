import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export const ColorButton = ({
  checked = false,
  color = "#ffffff",
  onClick,
}: {
  checked?: boolean;
  color?: string;
  onClick?: () => void;
}) => (
  <Button
    sx={{
      border: "1px solid rgba(0, 0, 0, 0.2)",
      borderRadius: "1.1rem",
      height: "2.2rem",
      minHeight: "0",
      minWidth: "0",
      padding: 0,
      width: "2.2rem",
    }}
    style={{
      backgroundColor: color,
    }}
    onClick={onClick}
  >
    {checked ? <CheckIcon sx={{ fontSize: "1.2rem" }} /> : null}
  </Button>
);

export default ColorButton;
