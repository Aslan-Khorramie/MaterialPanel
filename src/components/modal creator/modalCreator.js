import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

// Import Style
import "./modalCreator.scss";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

function ModalCreator(props) {
  const {
    open = false,
    handleClose,
    handleAccept,
    hasTitle = false,
    title = "Title",
    hasAccept = true,
    acceptText = "Save",
    cancelText = "Cancel",
  } = props;

  const DIR = useSelector((state) => state.dir);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      dir={DIR.direction}
      className="modal"
    >
      {hasTitle && (
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
      )}
      <DialogContent dividers>{props.children}</DialogContent>
      <DialogActions>
        {hasAccept && (
          <Button onClick={handleAccept} color="primary" variant="contained">
            {acceptText}
          </Button>
        )}
        <Button onClick={handleClose} color="primary" variant="outlined">
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalCreator;
