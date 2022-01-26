import { Button } from "@mui/material";
import { useCreateRoom } from "../Room";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const CreateRoomButton = () => {
  const createRoom = useCreateRoom();

  return (
    <Button
      variant="contained"
      startIcon={<ArrowForwardIcon />}
      onClick={() => createRoom()}
    >
      Create Room
    </Button>
  );
};

export default CreateRoomButton;
