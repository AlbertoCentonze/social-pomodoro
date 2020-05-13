import React from "react";
import Paper from "@material-ui/core/Paper";
import "./FlexiblePaperCard.css";

const FlexiblePaperCard = (props) => {
  return (
    <Paper elevation={3} className="paperContainer">
      <p className="title">{props.title}</p>
      <p className="description">{props.description}</p>
    </Paper>
  );
};

export default FlexiblePaperCard;
