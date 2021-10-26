import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

// Import Components
import { COPY_RIGHT_FA } from "../../constants/persian";
import { COPY_RIGHT_EN } from "../../constants/english";

function Copyright() {
  const DIR = useSelector((state) => state.dir);
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {DIR.direction === "rtl" ? COPY_RIGHT_FA : COPY_RIGHT_EN}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
