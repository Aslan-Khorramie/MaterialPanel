import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

function TableHeadRowCreator(props) {
  const { tableHeadData = [] } = props;

  return (
    <TableRow>
      {tableHeadData &&
        tableHeadData.map((item, key) => {
          const { title = "" } = item;
          return <TableCell key={key}>{title}</TableCell>;
        })}
    </TableRow>
  );
}

export default TableHeadRowCreator;
