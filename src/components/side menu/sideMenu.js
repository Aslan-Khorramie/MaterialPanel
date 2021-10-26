import React, { memo } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, IconButton, Divider } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useSelector } from "react-redux";

// Import Components
import MenuItems from "./related components/menuItems";

function SideMenu(props) {
  const drawerWidth = 240;

  // Styles of SideMenu Start Here
  const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up("md")]: {
        position: "relative",
      },
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      paddingTop: "15vh",
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
      [theme.breakpoints.down("sm")]: {
        width: theme.spacing(0) + 1,
      },
    },
    logo: {
      textAlign: "center",
      padding: "32px",
      fontSize: "2rem",
      fontWeight: "bold",
    },
  }));
  // Styles of SideMenu End Here

  const { open = true, handleDrawerClose } = props;
  const classes = useStyles();
  const DIR = useSelector((state) => state.dir);

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      {open ? <div className={classes.logo}>LOGO</div> : null}
      <Divider style={{ display: !open ? "none" : "block" }} />
      <MenuItems />
      <Divider
        style={{ marginTop: "auto", display: !open ? "none" : "block" }}
      />
      {open ? (
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            {DIR.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
      ) : null}
    </Drawer>
  );
}

export default memo(SideMenu);
