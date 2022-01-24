import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useCreateRoom } from "../src/Room";

const CreateRoomButton = () => {
  const createRoom = useCreateRoom();

  return (
    <Button variant="contained" onClick={() => createRoom()}>
      Create Room
    </Button>
  );
};

const Home: NextPage = () => {
  return (
    <Container sx={{ mb: 8, mt: 8 }} maxWidth="md">
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography sx={{ opacity: 0.8 }}>W4S Agenda</Typography>
          <Typography sx={{ fontWeight: 800 }} variant="h4" component="h1">
            Overlay Agenda On Your Screen
          </Typography>
        </Stack>
        <Typography>
          This is a web app that creates a widget to overlay an agenda on an OBS
          or desktop. Press &quot;Create Room&quot; to create a room to register
          the agenda data.
        </Typography>
        <Stack direction="row">
          <CreateRoomButton />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home;
