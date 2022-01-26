import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCurrentRoom, useUpdateCurrentRoom } from "../Room";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";

export const HorizontalAlignButtons = () => {
  const room = useCurrentRoom();
  const updateRoom = useUpdateCurrentRoom();

  return (
    <ToggleButtonGroup
      exclusive
      value={room?.data?.horizontal ?? ""}
      onChange={(_, v) => updateRoom({ horizontal: v })}
    >
      <ToggleButton value="left">
        <FormatAlignLeftIcon />
      </ToggleButton>
      <ToggleButton value="center">
        <FormatAlignCenterIcon />
      </ToggleButton>
      <ToggleButton value="right">
        <FormatAlignRightIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default HorizontalAlignButtons;
