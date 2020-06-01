import React from "react";
import { getRecentCodes, resetRecentCodes } from "../services/recentCodes";
import { Paper, Button } from "@material-ui/core";
import "./FlexiblePaperCard.css";

const RecentCodes = (props) => {
  if (!getRecentCodes().length) {
    return (
      <Paper className="paperContainer">
        <p> Non hai nessun timer recente</p>
      </Paper>
    );
  }
  return (
    <Paper className="paperContainer">
      <Button onClick={resetRecentCodes}>elimina recenti</Button>
      {getRecentCodes().map((code) => {
        return (
          <Button onClick={() => props.onRecentClick(code)}>{code}</Button>
        );
      })}
    </Paper>
  );
};

export default RecentCodes;
