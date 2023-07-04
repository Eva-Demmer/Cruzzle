import React, { useRef } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

export function Modal({ saveButton, isOpen, onClose, onSave, children }) {
  if (!isOpen) return null;

  const globalOverlay = useRef();
  const closeButton = useRef();

  const handleClose = (event) => {
    if (
      event.target === globalOverlay.current ||
      event.target === closeButton.current
    ) {
      onClose();
    }
  };

  return (
    <div
      role="presentation"
      ref={globalOverlay}
      onClick={handleClose}
      className="black-overlay flex items-center justify-center w-full absolute inset-0 z-[9000] bg-black bg-opacity-50"
    >
      <div className="rounded-lg shadow-lg flex flex-col w-full m-2 max-h-[97%] overflow-scroll no-scrollbar::-webkit-scrollbar no-scrollbar sm:mx-16 lg:w-fit lg:min-w-[450px] bg-white">
        <div className="flex flex-col gap-4 px-2 pt-10 pb-8 sm:px-8 sm:pt-16 sm:pb-10">
          {children}
        </div>
        <div className="flex gap-6 justify-center py-4 bg-white drop-shadow-top sticky bottom-0 z-[100] sm:py-6">
          {saveButton && (
            <Button
              disableElevation
              variant="contained"
              sx={{ width: "125px" }}
              onClick={onSave}
            >
              Save
            </Button>
          )}
          <Button
            ref={closeButton}
            disableElevation
            variant="outlined"
            sx={{ width: "125px" }}
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  saveButton: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  saveButton: true,
  onSave: () => {
    console.info("Save button clicked");
  },
};

export default Modal;
