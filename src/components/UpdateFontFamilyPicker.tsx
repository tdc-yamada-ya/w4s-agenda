import { useCurrentRoom, useUpdateCurrentRoom } from "../Room";
import { FontFamilyPicker } from "./FontFamilyPicker";

const useFontFamily = () => {
  const room = useCurrentRoom();
  const fontFamily = room?.data?.fontFamily;
  return fontFamily;
};

export const UpdateFontFamilyPicker = ({}) => {
  const fontFamily = useFontFamily();
  const updateRoom = useUpdateCurrentRoom();
  const commit = (value: string) => updateRoom({ fontFamily: value });

  return <FontFamilyPicker value={fontFamily} onChange={(v) => commit(v)} />;
};
