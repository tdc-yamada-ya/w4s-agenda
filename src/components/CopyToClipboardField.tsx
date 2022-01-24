import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export const CopyToClipboardField = ({
  timeout = 3000,
  value,
}: {
  timeout?: number;
  value: string;
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), timeout);
    return () => clearTimeout(t);
  }, [copied, timeout]);

  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: "#eee",
        border: "1px solid #ccc",
        borderRadius: "0.2rem",
        boxSizing: "border-box",
        display: "flex",
        gap: "0.5rem",
        padding: "0.5rem",
      }}
    >
      <Box sx={{ flexGrow: 1, wordBreak: "break-all" }}>{value}</Box>
      <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
        <IconButton>{copied ? <CheckIcon /> : <ContentCopyIcon />}</IconButton>
      </CopyToClipboard>
    </Box>
  );
};
