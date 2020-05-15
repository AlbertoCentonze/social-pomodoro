import React from "react";
import { Grid } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import SettingsIcon from "@material-ui/icons/Settings";
import "./Header.css";

const Header = (props) => {
  return (
    <Grid
      className="gridContainer"
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <TimerIcon className="appIcon" color="default" fontSize="larger" />
      <p className="appTitle">PomoFocus</p>
      <SettingsIcon className="settingsIcon" />
    </Grid>
  );
};

export default Header;
