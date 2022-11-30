import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const params = useParams();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const backHandler = () => {
    const url = "http://localhost:3001/activation";
    try {
      axios
        .post(url, {
          activation_token: params.token,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            alert("Sign up success!");
          }
        });
    } catch (error) {
      console.log("error", error);
    }
    navigate("/");
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <Button
        variant="outlined"
        style={{ width: "100px" }}
        onClick={backHandler}
      >
        Back
      </Button>
      {/* <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}
