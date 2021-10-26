import React, { useState, useEffect } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";

// Import Components
import { DEV_API } from "../../../constants/api";
import { getToken } from "../../../helpers/getToken";
import TableCreator from "../../../components/table creator/tableCreator";
import * as THeads from "../../../constants/members page/table/index";
import PartialLoading from "../../../components/partial loading/partialLoading";

function MembersList() {
  const auth = useSelector((state) => state.auth);
  const DIR = useSelector((state) => state.dir);
  const token = getToken(auth);
  const [tableData, setTableData] = useState();
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState({});

  // Table Head Data
  const tableHeadData = [
    {
      title: "#",
    },
    {
      title: DIR.direction === "rtl" ? THeads.NAME_FA : THeads.NAME_EN,
    },
    {
      title:
        DIR.direction === "rtl" ? THeads.LAST_NAME_FA : THeads.LAST_NAME_EN,
    },
    {
      title: DIR.direction === "rtl" ? THeads.MOBILE_FA : THeads.MOBILE_EN,
    },
    {
      title: DIR.direction === "rtl" ? THeads.EMAIL_FA : THeads.EMAIL_EN,
    },
    {
      title:
        DIR.direction === "rtl"
          ? THeads.NATIONAL_CODE_FA
          : THeads.NATIONAL_CODE_EN,
    },
    {
      title: DIR.direction === "rtl" ? THeads.BIRTHDAY_FA : THeads.BIRTHDAY_EN,
    },
    {
      title:
        DIR.direction === "rtl" ? THeads.EXPIRE_DATE_FA : THeads.EXPIRE_DATE_EN,
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios({
      url: `${DEV_API}Staff/get_member_paginate`,
      method: "POST",
      data: {},
      headers: {
        "Content-Type": "application/json-patch+json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const { data = [] } = res.data;
        setTableData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setNoData({
          fa: "داده ای موجود نیست!",
          en: "No Records Found!",
        });
        // setLoading(false);
      });
  }, [token]);
  return (
    <>
      <TableCreator tableHeadData={tableHeadData}>
        {tableData &&
          tableData.map((row, key) => {
            return (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {key + 1}
                </TableCell>
                <TableCell>{row.first_name}</TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.id_card_no}</TableCell>
                <TableCell>{row.birth_date}</TableCell>
                <TableCell>{row.membership_exp_days}</TableCell>
              </TableRow>
            );
          })}
      </TableCreator>
      {loading && (
        <PartialLoading
          noData={DIR.direction === "rtl" ? noData.fa : noData.en}
        />
      )}
    </>
  );
}

export default MembersList;
