import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Box,
  Container,
  ThemeProvider,
  jssPreset,
  createTheme,
  StylesProvider,
} from "@material-ui/core";
import rtl from "jss-rtl";
import { create } from "jss";
import { useSelector, useDispatch } from "react-redux";

// Import Components
import Copyright from "../copy rights/copy-rights";
import Topbar from "../top bar/topbar";
import SideMenu from "../side menu/sideMenu";

function GeneralLayout(props) {
  // Style of General Layout start here
  // These come here to use react functional lifecycle to take effect on each render and each state and props change
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      fontFamily: theme.typography.fontFamily,
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    appBarSpacer: theme.mixins.toolbar,
  }));

  // Configure JSS
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  const RTLTheme = createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
    typography: {
      fontFamily: ["Vazir-Medium-FD"].join(","),
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "@font-face": ["Vazir-Medium-FD"],
        },
      },
    },
  });

  const LTRTheme = createTheme({
    direction: "ltr", // Both here and <body dir="rtl">
    typography: {
      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
  });
  // Style of General Layout end here
  const classes = useStyles();

  const dispatch = useDispatch();
  const DIR = useSelector((state) => state.dir);
  const sideMenu = useSelector((state) => state.sideMenu);
  const { isOpen = true } = sideMenu;

  const handleDrawerOpen = () => {
    dispatch({
      type: "COLLAPSE",
      payload: true,
    });
  };
  const handleDrawerClose = () => {
    dispatch({
      type: "COLLAPSE",
      payload: false,
    });
  };

  return (
    <ThemeProvider theme={DIR.direction === "rtl" ? RTLTheme : LTRTheme}>
      <CssBaseline />
      <StylesProvider jss={jss}>
        <div className={classes.root} dir={DIR.direction}>
          <Topbar open={isOpen} handleDrawerOpen={handleDrawerOpen} />
          <SideMenu open={isOpen} handleDrawerClose={handleDrawerClose} />
          <main className={classes.content} onClick={handleDrawerClose}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              {props.children}
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </main>
        </div>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default memo(GeneralLayout);
