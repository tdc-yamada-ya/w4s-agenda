import { Slider } from "@mui/material";
import { useCurrentRoom, useUpdateCurrentRoom } from "../Room";
import { useEffect, useState } from "react";
import { clamp } from "lodash";

const useFontSize = () => {
  const room = useCurrentRoom();
  const fontSize = room?.data?.fontSize;
  return fontSize;
};

const minFontSize = 2;
const maxFontSize = 8;

const encodeFontSize = (s: number): number =>
  clamp((100 * (s - minFontSize)) / (maxFontSize - minFontSize), 0, 100);

const decodeFontSize = (s: number): number =>
  minFontSize + (s / 100) * (maxFontSize - minFontSize);

export const FontSizeSlider = () => {
  const [value, setValue] = useState(0);
  const fontSize = useFontSize();
  const updateRoom = useUpdateCurrentRoom();

  const commit = () => updateRoom({ fontSize: decodeFontSize(value) });

  useEffect(() => setValue(encodeFontSize(fontSize ?? 0)), [fontSize]);

  return (
    <Slider
      value={value}
      onChange={(_, v) => setValue(v as number)}
      onChangeCommitted={() => commit()}
    />
  );
};

export default FontSizeSlider;
