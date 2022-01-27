import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useCurrentRoomSelectedItem } from "../src/Item";
import { useCurrentRoom } from "../src/Room";

const flexVerticalAlignMap = {
  top: "flex-start",
  center: "center",
  bottom: "flex-end",
} as const;

const shadow = ({
  ox,
  oy,
  blur,
  color,
}: {
  ox: number;
  oy: number;
  blur: number;
  color: string;
}) => `${ox}em ${oy}em ${blur}em ${color}`;

const multiShadow = ({
  resolution = 32,
  blur = 0.02,
  color,
  offset,
}: {
  resolution?: number;
  blur?: number;
  color: string;
  offset: number;
}) => {
  const ss: string[] = [];

  for (let a = 0; a < Math.PI * 2; a += (Math.PI * 2) / resolution) {
    ss.push(
      shadow({
        ox: Math.cos(a) * offset,
        oy: Math.sin(a) * offset,
        blur,
        color,
      })
    );
  }

  return ss;
};

const View: NextPage = () => {
  const room = useCurrentRoom();
  const item = useCurrentRoomSelectedItem();
  const title = item?.data?.title ?? "";
  const textColor = room?.data?.textColor ?? "#f44336";
  const borderColor1 = room?.data?.borderColor1 ?? "#ffffff";
  const borderColor2 = room?.data?.borderColor2 ?? "#222222";
  const fontSize = room?.data?.fontSize ?? 4;
  const fontFamily = room?.data?.fontFamily ?? "";

  useEffect(() => {
    const f = async () => {
      const { load } = await import("webfontloader");
      load({
        google: {
          families: [fontFamily, "Roboto"],
        },
      });
    };
    f();
  }, [fontFamily]);

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "1rem",
        width: "100vw",
      }}
      style={{
        justifyContent: flexVerticalAlignMap[room?.data?.vertical ?? "top"],
        textAlign: room?.data?.horizontal,
      }}
    >
      <SwitchTransition>
        <CSSTransition key={title} timeout={200} classNames="fade">
          <Box
            sx={{
              "&.fade-enter": {
                opacity: 0,
              },
              "&.fade-enter-active": {
                opacity: 1,
                transition: `opacity 200ms`,
              },
              "&.fade-exit": {
                opacity: 1,
              },
              "&.fade-exit-active": {
                opacity: 0,
                transition: `opacity 200ms`,
              },
            }}
          >
            <Typography
              sx={{
                lineHeight: 1.2,
                width: "100%",
              }}
              style={{
                fontSize: `${fontSize}rem`,
                fontFamily: `'${fontFamily}',Roboto,Helvetica,Arial,sans-serif`,
                fontWeight: "bold",
                color: textColor,
                textShadow: [
                  ...multiShadow({ color: borderColor1, offset: 0.03 }),
                  ...multiShadow({ color: borderColor2, offset: 0.08 }),
                ].join(","),
              }}
            >
              {item?.data?.title}
            </Typography>
          </Box>
        </CSSTransition>
      </SwitchTransition>
    </Box>
  );
};

export default View;
