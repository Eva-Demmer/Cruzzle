import { useContext } from "react";
import { Alert, Snackbar, AlertTitle } from "@mui/material";

import { IdeaFormContext } from "../../contexts/IdeaFormContext";

function FormErrorSnackbar() {
  const { errorFiles, setOpen, open } = useContext(IdeaFormContext);
  return (
    errorFiles.length > 0 && (
      <Snackbar
        open={open}
        autoHideDuration={30000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          severity="error"
          onClose={() => {
            setOpen(false);
          }}
          sx={{ width: "100%" }}
        >
          <AlertTitle>Error</AlertTitle>
          {errorFiles.map((file) => (
            <div key={file.id} className="w-full">
              {file.message}
            </div>
          ))}
        </Alert>
      </Snackbar>
    )
  );
}
export default FormErrorSnackbar;
