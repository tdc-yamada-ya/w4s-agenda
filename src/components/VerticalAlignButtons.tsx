import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCurrentRoom, useUpdateCurrentRoom } from "../Room";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import VerticalAlignCenterIcon from "@mui/icons-material/VerticalAlignCenter";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";

export const VerticalAlignButtons = () => {
  const room = useCurrentRoom();
  const updateRoom = useUpdateCurrentRoom();

  return (
    <ToggleButtonGroup
      exclusive
      value={room?.data?.vertical ?? ""}
      onChange={(_, v) => updateRoom({ vertical: v })}
    >
      <ToggleButton value="top">
        <VerticalAlignTopIcon />
      </ToggleButton>
      <ToggleButton value="center">
        <VerticalAlignCenterIcon />
      </ToggleButton>
      <ToggleButton value="bottom">
        <VerticalAlignBottomIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default VerticalAlignButtons;
