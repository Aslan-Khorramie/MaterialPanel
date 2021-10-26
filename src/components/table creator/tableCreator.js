import React from "react";
import { Table, TableHead, TableBody } from "@material-ui/core";

// Import Style
import "./tableCreator.scss";

// Import Components
import TableHeadRowCreator from "./related components/tableHeadRowCreator";

function TableCreator(props) {
  const { tableHeadData = [] } = props;

  return (
    <Table aria-label="simple table" className="table">
      <TableHead>
        <TableHeadRowCreator tableHeadData={tableHeadData} />
      </TableHead>
      <TableBody>{props.children}</TableBody>
    </Table>
  );
}

export default TableCreator;
