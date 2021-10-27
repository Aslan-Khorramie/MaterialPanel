import React, { useState, useCallback } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
import ReactCountryFlag from "react-country-flag";
import { useDispatch, useSelector } from "react-redux";
import rtl from "jss-rtl";
import { create } from "jss";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

// Import Style
import "./Login.scss";

import { DEV_API } from "../../constants/api/index";

function Login(props) {
  //we should declare every component language to take advantage of i18n
  // the lang state is to detect component lang

  const { i18n, t } = useTranslation();

  const handleLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  // Styles of Login Page start here
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  // Styles of Login Page end here

  const classes = useStyles();
  const dispatch = useDispatch();

  const DIR = useSelector((state) => state.dir);
  const route = useHistory();

  document.title =
    DIR.direction === "rtl" ? "هوو کلاب | ورود" : "Hoo Club | Login";

  // activate loading
  const [loading, setLoading] = useState(false);

  // style loading image
  const override = css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 50%;
  `;

  // Configure JSS
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  const RTLTheme = createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
    typography: {
      fontFamily: ["Vazir-Medium-FD"],
    },
  });

  const LTRTheme = createTheme({
    direction: "ltr", // Both here and <body dir="rtl">
  });

  // for show the hidden password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // showing alert
  const [showAlert, setShowAlert] = useState(false);

  // call api
  const login = (values) => {
    const { email = "", password = "" } = values;
    setLoading(true);
    axios({
      url: `${DEV_API}Account/login`,
      method: "POST",
      data: {
        user_name: email,
        password: password,
      },
    })
      .then((res) => {
        setLoading(false);
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
        route.push("/dashboard");
      })
      .catch(() => {
        setLoading(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      });
  };

  const LoginForm = useCallback(() => {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .min(5, t("login_page.short_username"))
            .max(50, t("login_page.long_username"))
            .required(t("login_page.required")),
          password: Yup.string()
            .min(3, t("login_page.short_password"))
            .max(50, t("login_page.long_password"))
            .required(t("login_page.required")),
        })}
        onSubmit={(values) => {
          login(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("login_page.username")}
              name="email"
              autoComplete="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              error={errors.email && touched.email ? true : false}
              helperText={errors.email && touched.email && errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("login_page.password")}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              error={errors.password && touched.password ? true : false}
              helperText={
                errors.password && touched.password && errors.password
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t("login_page.remember")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("login_page.login_btn")}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {t("login_page.forget_password")}
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    );
    // eslint-disable-next-line
  }, [t]);

  return (
    <ThemeProvider theme={DIR.direction === "rtl" ? RTLTheme : LTRTheme}>
      <CssBaseline />
      <StylesProvider jss={jss}>
        <CircleLoader
          loading={loading}
          size={100}
          color="#36D7B7"
          css={override}
        />
        <Container
          component="main"
          maxWidth="xs"
          dir={DIR.direction}
          style={{ opacity: loading ? "0.4" : "1" }}
        >
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("login_page.title")}
            </Typography>
            {showAlert ? (
              <Alert
                onClose={() => {
                  setShowAlert(false);
                }}
                className="login-alert"
                severity="error"
              >
                {t("login_page.invalid_data")}
              </Alert>
            ) : (
              ""
            )}
            <LoginForm />
          </div>
          <Box mt={8} className="flags-box">
            <span
              onClick={() => {
                handleLanguage("en");
                dispatch({
                  type: "CHANGE_DIR",
                  payload: "ltr",
                });
                dispatch({
                  type: "CHANGE_LANG",
                  payload: "en",
                });
              }}
            >
              <IconButton>
                <ReactCountryFlag countryCode="US" svg />
              </IconButton>
            </span>
            <span
              onClick={() => {
                handleLanguage("fa");
                dispatch({
                  type: "CHANGE_DIR",
                  payload: "rtl",
                });
                dispatch({
                  type: "CHANGE_LANG",
                  payload: "fa",
                });
              }}
            >
              <IconButton>
                <ReactCountryFlag countryCode="IR" svg />
              </IconButton>
            </span>
          </Box>
          <Box mt={8}>
            <Typography variant="body2" color="textSecondary" align="center">
              {t("login_page.copy_right")}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Container>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default Login;
