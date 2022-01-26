import ColorButton from "./ColorButton";
import { ColorName, useCurrentRoom, useUpdateCurrentRoom } from "../Room";

const useColor = (name: ColorName) => {
  const room = useCurrentRoom();
  const color = room?.data?.[name];
  return color;
};

const useUpdateColor = (name: ColorName, color: string) => {
  const update = useUpdateCurrentRoom();
  return () => update({ [name]: color });
};

export const UpdateColorButton = ({
  color = "#ffffff",
  name,
}: {
  color?: string;
  name: ColorName;
}) => {
  const currentColor = useColor(name);
  const update = useUpdateColor(name, color);
  const checked = currentColor === color;

  return <ColorButton checked={checked} color={color} onClick={update} />;
};

export default UpdateColorButton;
