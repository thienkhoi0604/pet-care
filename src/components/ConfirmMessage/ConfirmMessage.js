// import classes from "./ConfirmMessage.module.css";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const params = useParams();
  console.log(params);

  const handleClose = () => {
    setOpen(false);
  };

  const acceptInvitationHandler = async () => {
    const url = "http://localhost:3001/accept";
    try {
      await axios
        .post(url, {
          activation_token: params.token,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            alert("You joined this group!");
            navigate(`/${params.idGroup}`);
          }
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Invitation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To join in this group, please click button "Join" below. You will be
            added.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={acceptInvitationHandler}>Join</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
