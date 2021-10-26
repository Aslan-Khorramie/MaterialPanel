import React from "react";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

// Import Style
import "./index.scss";

// Import Components
import GeneralLayout from "../../components/general layout/general-layout";
import MembersList from "./related components/membersList";
import SearchField from "../../components/search field/searchField";
import {
  TABLE_TITLE_FA,
  TABLE_TITLE_EN,
} from "../../constants/members page/header";

function Members() {
  // Styles of H2
  const useStyles = makeStyles({
    paper: {
      padding: "16px",
      overflow: "auto",
    },
  });

  const classes = useStyles();

  const DIR = useSelector((state) => state.dir);
  const sideMenu = useSelector((state) => state.sideMenu);
  const { menuTitleFa = "داشبورد", menuTitleEn = "Dashboard" } = sideMenu;
  document.title = DIR.direction === "rtl" ? menuTitleFa : menuTitleEn;

  return (
    <GeneralLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <Typography
              variant="h3"
              component="h2"
              className="page-main-header"
            >
              {DIR.direction === "rtl" ? TABLE_TITLE_FA : TABLE_TITLE_EN}
            </Typography>
            <SearchField />
            <MembersList />
          </Paper>
        </Grid>
      </Grid>
    </GeneralLayout>
  );
}

export default Members;
