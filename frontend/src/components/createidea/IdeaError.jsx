import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Snackbar, AlertTitle } from "@mui/material";

import { IdeaFormContext } from "../../contexts/IdeaFormContext";

function IdeaError() {
  const { t } = useTranslation();
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
          <AlertTitle>{t("pages.ideas.ideanew.alert.error.title")}</AlertTitle>
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
export default IdeaError;
