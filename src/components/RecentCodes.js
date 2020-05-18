import React from "react";
import { getRecentCodes, resetRecentCodes } from "../services/recentCodes";
import { Paper, Button } from "@material-ui/core";
import "./FlexiblePaperCard.css";

const RecentCodes = (props) => {
  return (
    <Paper className="paperContainer">
      <Button onClick={resetRecentCodes}>Clear recents</Button>
      {getRecentCodes().map((code) => {
        return <Button>{code}</Button>;
      })}
    </Paper>
  );
};

export default RecentCodes;
