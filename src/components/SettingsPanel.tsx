import { Stack, Typography } from "@mui/material";
import DeleteRoomButton from "./DeleteRoomButton";
import HorizontalAlignButtons from "./HorizontalAlignButtons";
import EditItemsButton from "./EditItemsButton";
import UpdateColorButtons from "./UpdateColorButtons";
import VerticalAlignButtons from "./VerticalAlignButtons";
import FontSizeSlider from "./FontSizeSlider";
import { UpdateFontFamilyPicker } from "./UpdateFontFamilyPicker";

const SectionTitle = ({ children }: { children: string }) => (
  <Typography sx={{ fontWeight: 800 }}>{children}</Typography>
);

export const SettingsPanel = () => {
  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <SectionTitle>Items</SectionTitle>
        <Stack direction="row">
          <EditItemsButton />
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <SectionTitle>Font Size</SectionTitle>
        <FontSizeSlider />
      </Stack>
      <Stack spacing={2}>
        <SectionTitle>Alignment</SectionTitle>
        <Stack direction="row" spacing={2}>
          <HorizontalAlignButtons />
          <VerticalAlignButtons />
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <SectionTitle>Font Family</SectionTitle>
        <UpdateFontFamilyPicker />
      </Stack>
      <Stack spacing={2}>
        <SectionTitle>Text Color</SectionTitle>
        <UpdateColorButtons name="textColor" />
      </Stack>
      <Stack spacing={2}>
        <SectionTitle>Border Color 1</SectionTitle>
        <UpdateColorButtons name="borderColor1" />
      </Stack>
      <Stack spacing={2}>
        <SectionTitle>Border Color 2</SectionTitle>
        <UpdateColorButtons name="borderColor2" />
      </Stack>
      <Stack spacing={2}>
        <SectionTitle>Danger Zone</SectionTitle>
        <Stack direction="row">
          <DeleteRoomButton />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SettingsPanel;
