import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { CopyViewURLToClipboardField } from "../src/components/CopyViewURLToClipboardField";
import { useCurrentRoomItems, useUpdateCurrentRoomItems } from "../src/Item";
import { useCurrentRoom, useUpdateCurrentRoom } from "../src/Room";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import VerticalAlignCenterIcon from "@mui/icons-material/VerticalAlignCenter";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";

const BulkRegistrationDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [value, setValue] = useState("");
  const updateItems = useUpdateCurrentRoomItems();

  const submit = () => {
    updateItems(value.split(/\r?\n/));
    onClose();
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm" onClose={onClose}>
      <DialogContent>
        <DialogContentText>Enter agenda items line by line.</DialogContentText>
        <TextField
          sx={{ mt: 2 }}
          multiline
          rows={8}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fullWidth={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const RegisterItemsButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Register Items
      </Button>
      <BulkRegistrationDialog open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

const ItemList = () => {
  const room = useCurrentRoom();
  const items = useCurrentRoomItems();
  const updateRoom = useUpdateCurrentRoom();

  return (
    <Fragment>
      {items == null ? (
        <Fragment>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Fragment>
      ) : items.length === 0 ? (
        <RegisterItemsButton />
      ) : (
        <List>
          {items?.map((item, index) => (
            <ListItemButton
              key={item.id.id}
              selected={index === room?.data?.selectedIndex}
              onClick={() => updateRoom({ selectedIndex: index })}
            >
              {item.data?.title}
            </ListItemButton>
          ))}
        </List>
      )}
    </Fragment>
  );
};

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

const HorizontalAlignButtons = () => {
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

const VerticalAlignButtons = () => {
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

const Room: NextPage = () => {
  const [tab, setTab] = useState(0);
  const room = useCurrentRoom();

  return (
    <Container sx={{ mb: 4, mt: 4 }} maxWidth="sm">
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography sx={{ opacity: 0.8 }}>W4S Agenda</Typography>
          <Typography sx={{ fontWeight: 800 }} variant="h4" component="h1">
            Room
          </Typography>
          <Typography sx={{ opacity: 0.8 }}>ID - {room?.id}</Typography>
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
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: 800 }}>Items</Typography>
              <Stack direction="row">
                <RegisterItemsButton />
              </Stack>
              <Typography sx={{ fontWeight: 800 }}>Alignment</Typography>
              <Stack direction="row" spacing={2}>
                <HorizontalAlignButtons />
                <VerticalAlignButtons />
              </Stack>
            </Stack>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 800 }}>Graphics URL</Typography>
              <Typography>
                Copy this URL and paste it into software such as OBS.
              </Typography>
              <CopyViewURLToClipboardField />
            </Stack>
          </TabPanel>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Room;
