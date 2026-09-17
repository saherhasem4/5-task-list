import { Alert, Snackbar } from "@mui/material";

export default function MySnackbar({ showHideBar, msg }) {
  return (
    <Snackbar open={showHideBar} style={{ direction: "ltr" }}>
      <Alert severity="success" variant="filled">
        {msg || "تم الأمر"}
      </Alert>
    </Snackbar>
  );
}
