import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { IdeaFormContext } from "../../contexts/IdeaFormContext";
import { apiIdeasNew } from "../../services/api.ideas";
import AlertOnSave from "./AlertOnSave";

function IdeaForm({ children }) {
  const { t } = useTranslation();
  const { handleSubmit, filesAttachment, teamSelect, valueCategories } =
    useContext(IdeaFormContext);

  const [alertMessage, setAlertMessage] = useState("message");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertTitle, setAlertTitle] = useState("title");
  const [alertOpen, setAlertOpen] = useState(false);
  const [idIdea, setIdIdea] = useState();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const { primaryImg: primaryPicture, ...dataWithoutCategories } = data;

      const formatedTeam = teamSelect.map((user) => ({
        user_id: user.id,
      }));

      formData.append("team", JSON.stringify(formatedTeam));
      formData.append("categories", JSON.stringify(valueCategories));

      for (const key in dataWithoutCategories) {
        if (Object.prototype.hasOwnProperty.call(dataWithoutCategories, key)) {
          const value = dataWithoutCategories[key];
          if (value) {
            formData.append(key, value);
          }
        }
      }

      if (primaryPicture) {
        formData.append("primaryImg", primaryPicture);
      }

      if (filesAttachment.length > 0) {
        filesAttachment
          .map((item) => ({
            attachement: item.file,
          }))
          .forEach((attachement) => {
            const key = Object.keys(attachement)[0];
            const value = attachement[key];
            formData.append(key, value);
          });
      }

      const newIdea = await apiIdeasNew(formData);

      if (newIdea) {
        setIdIdea(newIdea.id);
        setAlertMessage(t("pages.ideas.ideanew.alert.success.message"));
        setAlertTitle(t("pages.ideas.ideanew.alert.success.title"));
        setAlertOpen(true);
      } else {
        setAlertMessage(t("pages.ideas.ideanew.alert.error.message"));
        setAlertTitle(t("pages.ideas.ideanew.alert.error.title"));
        setAlertSeverity("error");
        setAlertOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
      <AlertOnSave
        open={alertOpen}
        setOpen={setAlertOpen}
        severity={alertSeverity}
        message={alertMessage}
        title={alertTitle}
        onClose={() => navigate(`/ideas/${idIdea}`, { replace: true })}
      />
    </>
  );
}

IdeaForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdeaForm;
