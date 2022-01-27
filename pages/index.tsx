import { Box, Container, Link, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import CreateRoomForm from "../src/components/CreateRoomForm";
import ScreenshotImage from "../docs/images/screenshot.jpg";

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
          This is a web app that creates a widget to overlay an agenda on an{" "}
          <Link
            href="https://obsproject.com/"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            OBS
          </Link>{" "}
          or desktop. Press &quot;Create Room&quot; to create a room to register
          the agenda data.
        </Typography>
        <CreateRoomForm />
        <Box>
          <Image src={ScreenshotImage} alt="Screenshot" />
        </Box>
      </Stack>
    </Container>
  );
};

export default Home;
