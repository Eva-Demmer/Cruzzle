import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import PropTypes from "prop-types";

function DialogArchive({ open, setOpen, handleAgree }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirm Archive</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to archive this idea? This action is{" "}
          <strong>irreversible</strong> and will permanently remove the idea
          from the active list.
          <br />
          <br />
          Please note that archived ideas cannot be restored.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setOpen(false)}
          autoFocus
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleAgree}
          sx={{
            boxShadow: 1,
            "&:hover": { boxShadow: 2 },
            "&:active, &.Mui-focusVisible": { boxShadow: 4 },
          }}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogArchive.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleAgree: PropTypes.func.isRequired,
};

export default DialogArchive;
