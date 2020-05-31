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
    >
      <p className="appTitle">PomoFocus</p>
      <div className="icons">
        <TimerIcon className="icon" color="default" fontSize="larger" />
        <SettingsIcon className="icon" />
      </div>
    </Grid>
  );
};

export default Header;
