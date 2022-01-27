import {
  Box,
  Breadcrumbs,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { ReactNode, useState } from "react";

import Link from "next/link";
import RoomTitle from "../src/components/RoomTitle";
import ItemList from "../src/components/ItemList";
import SettingsPanel from "../src/components/SettingsPanel";
import URLPanel from "../src/components/URLPanel";
import { useTheme } from "@mui/system";

const TabPanel = ({
  children,
  index,
  value,
}: {
  children: ReactNode;
  index: number;
  value: number;
}) => {
  return (
    <Box sx={{ display: value === index ? "block" : "none" }}>{children}</Box>
  );
};

const Room: NextPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <Container sx={{ mb: 4, mt: 4 }} maxWidth="md">
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Breadcrumbs>
            <Link href="/">W4S Agenda</Link>
            <Typography color="text.primary">Room</Typography>
          </Breadcrumbs>
          <Stack spacing={1}>
            <RoomTitle />
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
              <Tab label="Items" />
              <Tab label="Settings" />
              <Tab label="URL" />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0}>
            <ItemList />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <SettingsPanel />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <URLPanel />
          </TabPanel>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Room;
