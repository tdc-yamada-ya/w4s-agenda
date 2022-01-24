import { useEffect, useState } from "react";
import { useCurrentRoomID } from "../Room";
import { CopyToClipboardField } from "./CopyToClipboardField";

export const CopyViewURLToClipboardField = () => {
  const [url, setURL] = useState("");
  const id = useCurrentRoomID();

  useEffect(() => {
    setURL(`${location.origin}/view?id=${id}`);
  }, [id]);

  return <CopyToClipboardField value={url} />;
};
