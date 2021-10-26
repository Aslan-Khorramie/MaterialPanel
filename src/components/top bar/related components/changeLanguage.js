import React, { memo } from "react";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import TranslateIcon from "@material-ui/icons/Translate";
import ReactCountryFlag from "react-country-flag";
import { IconButton, Popover, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

function ChangeLanguage() {
  // Styles of ChangeLanguage Start Here
  const useStyles = makeStyles((theme) => ({
    content: {
      display: "flex",
      flexDirection: "column",
    },
  }));
  // Styles of ChangeLanguage End Here

  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            {...bindTrigger(popupState)}
            style={{ boxShadow: "none" }}
          >
            <TranslateIcon />
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box p={2} className={classes.content}>
              <IconButton
                onClick={() => {
                  dispatch({
                    type: "CHANGE_DIR",
                    payload: "ltr",
                  });
                  popupState.close();
                }}
              >
                <ReactCountryFlag countryCode="US" svg />
              </IconButton>
              <IconButton
                onClick={() => {
                  dispatch({
                    type: "CHANGE_DIR",
                    payload: "rtl",
                  });
                  popupState.close();
                }}
              >
                <ReactCountryFlag countryCode="IR" svg />
              </IconButton>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export default memo(ChangeLanguage);
