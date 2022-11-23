import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import classes from "./Lists.module.css";

export default function AlignItemsList({ data }) {
  const selectItemHandler = (e) => {};

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      className={classes["list-container"]}
    >
      {data.map((item) => {
        return (
          <div key={item.id}>
            <ListItem
              alignItems="flex-start"
              className={classes["list-item"]}
              onClick={selectItemHandler}
            >
              <ListItemAvatar>
                <Avatar
                  alt={item.name}
                  src="https://png.pngtree.com/png-clipart/20190920/original/pngtree-user-flat-character-avatar-png-png-image_4643588.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      ID Room:{" "}
                    </Typography>
                    {item.id}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      })}
    </List>
  );
}
