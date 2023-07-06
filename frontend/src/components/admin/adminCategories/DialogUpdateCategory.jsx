import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { SliderPicker } from "react-color";
import { Box } from "@mui/material";
import CustomChip from "../../styledComponents/CustomChip";
import { apiAdminUpdateCategoryById } from "../../../services/api.admin.categories";
import { AlertToastContext } from "../../../contexts/AlertToastContext";

export default function DialogUpdateColor({
  openDialog,
  setOpenDialog,
  category,
  setUpdateList,
}) {
  const { setAlertAdminOpen, setAlertAdminMessage } =
    useContext(AlertToastContext);
  const [label, setLabel] = useState(category.label);
  const [labelError, setLabelError] = useState(false);
  const [color, setColor] = useState(category.color);

  const handleChangeLabel = (event) => {
    setLabel(event.target.value);
  };

  const handleChangeColor = (colort) => {
    const { r, g, b, a } = colort.rgb;
    const rgbaValue = `rgba(${r}, ${g}, ${b}, ${a})`;
    setColor(rgbaValue);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    const isLabelValid = label.length >= 2;
    setLabelError(!isLabelValid);

    if (isLabelValid) {
      apiAdminUpdateCategoryById(category.id, { label, color })
        .then((res) => {
          if (res.status === 200) {
            setUpdateList(true);
            setAlertAdminMessage("Category updated successfully");
            setAlertAdminOpen(true);
            handleClose();
          } else {
            console.error("Cannot update category");
          }
        })
        .catch((err) => {
          console.error("error updating category", err);
        });
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Edit category</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              marginBottom: 3,
            }}
          >
            You are about to edit the label and color of the selected category.
            Please fill the form below.
          </DialogContentText>

          <Box
            maxWidth
            sx={{
              pr: 6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              marginBottom: 4,
            }}
          >
            <TextField
              id="label"
              label="Label"
              type="text"
              variant="standard"
              placeholder="Enter a label"
              value={label}
              error={labelError}
              helperText={labelError ? "Incorrect entry" : null}
              onChange={handleChangeLabel}
              InputLabelProps={{ shrink: true }}
              sx={{
                width: "60%",
                margin: 0,
                padding: 0,
              }}
            />
            <CustomChip colorchoice={color} label={label} />
          </Box>
          <Box
            sx={{
              marginBottom: 4,
            }}
          >
            <SliderPicker color={color} onChangeComplete={handleChangeColor} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogUpdateColor.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  setUpdateList: PropTypes.func.isRequired,
};
