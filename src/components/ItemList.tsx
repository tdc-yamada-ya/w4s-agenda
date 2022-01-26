import {
  List,
  ListItemButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import { useCurrentRoomItems } from "../Item";
import { useCurrentRoom, useUpdateCurrentRoom } from "../Room";
import { CopyViewURLToClipboardField } from "./CopyViewURLToClipboardField";
import RegisterItemsButton from "./RegisterItemsButton";

export const ItemList = () => {
  const room = useCurrentRoom();
  const items = useCurrentRoomItems();
  const updateRoom = useUpdateCurrentRoom();

  return (
    <Fragment>
      {items == null ? (
        <Stack spacing={2}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Stack>
      ) : items.length === 0 ? (
        <Stack spacing={2}>
          <Typography>
            No agenda items have been registered. Click on the &quot;Register
            Items&quot; button to register your agenda.
          </Typography>
          <RegisterItemsButton />
          <Typography>
            After you have registered items, set &quot;Graphics URL&quot; to
            your broadcast software such as OBS.
          </Typography>
          <CopyViewURLToClipboardField />
        </Stack>
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

export default ItemList;
