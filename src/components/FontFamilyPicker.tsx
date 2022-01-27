import dynamic from "next/dynamic";
import { apiKey } from "../google/fonts";

// NOTE: https://github.com/samuelmeuli/font-picker-react/issues/37
const FontPicker = dynamic<any>(() => import("font-picker-react"), {
  ssr: false,
});

const defaultFamily = "Roboto";

const families = [
  defaultFamily,
  "Mochiy Pop P One",
  "Murecho",
  "Noto Serif JP",
  "Noto Sans JP",
];

export const FontFamilyPicker = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (family: string) => void;
}) => {
  return (
    <FontPicker
      apiKey={apiKey}
      // activeFontFamily={value ?? defaultFamily}
      activeFontFamily={families.find((f) => f === value) ?? defaultFamily}
      families={families}
      limit={200}
      onChange={(f: { family: string }) => onChange?.(f.family)}
    />
  );
};
