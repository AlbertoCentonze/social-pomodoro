import React from "react";
import { getRecentCodes, resetRecentCodes } from "../services/recentCodes";
import { Paper, Button, Typography } from "@material-ui/core";
import "./FlexiblePaperCard.css";

const RecentCodes = (props) => {
  if (!getRecentCodes().length) {
    return (
      <Paper className="paperContainer">
        <Typography> Non hai nessun timer recente</Typography>
      </Paper>
    );
  }
  return (
    <Paper className="paperContainer">
      <Button onClick={resetRecentCodes}>
        elimina recenti (ricarica per pulire)
      </Button>
      {getRecentCodes().map((code) => {
        return (
          <Button onClick={() => props.onRecentClick(code)}>{code}</Button>
        );
      })}
    </Paper>
  );
};

export default RecentCodes;
