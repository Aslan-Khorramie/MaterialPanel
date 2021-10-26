import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

// Import Style
import "./partialLoading.scss";

function PartialLoading(props) {
  const { noData = "" } = props;
  return (
    <div className="partial-loading">
      {noData ? noData : <CircularProgress />}
    </div>
  );
}

export default PartialLoading;
