import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";

// Import Components
import GeneralLayout from "../../components/general layout/general-layout";
import Chart from "../../pages/dashboard/Chart";
import Deposits from "../../pages/dashboard/Deposits";
import Orders from "../../pages/dashboard/Orders";

function Dashboard() {
  // Style of General Layout Start Here
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    fixedHeight: {
      height: 240,
    },
  }));
  // Style of General Layout End Here

  const DIR = useSelector((state) => state.dir);
  const sideMenu = useSelector((state) => state.sideMenu);
  const { menuTitleFa = "داشبورد", menuTitleEn = "Dashboard" } = sideMenu;
  document.title = DIR.direction === "rtl" ? menuTitleFa : menuTitleEn;

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <GeneralLayout>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </GeneralLayout>
  );
}

export default Dashboard;
