import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IdeaFormContext } from "../../contexts/IdeaFormContext";
import { apiIdeas, apiUpdateIdeaById } from "../../services/api.ideas";
import getNameFileToFirebaseLink from "../../utils/getNameFileToFirebaseLink";
import DialogSave from "./DialogSave";
import AlertOnSave from "./AlertOnSave";

function IdeaEditForm({ children }) {
  const {
    handleSubmit,
    filesAttachment,
    teamSelect,
    setFilesAttachment,
    setPrimaryImg,
    primaryImg,
    setTeamSelect,
    setValue,
    valueCategories,
    setValueCategories,
  } = useContext(IdeaFormContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState(false);

  const [alertMessage, setAlertMessage] = useState("message");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertTitle, setAlertTitle] = useState("title");
  const [alertOpen, setAlertOpen] = useState(false);
  const [idIdea, setIdIdea] = useState();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const isEdit = async () => {
      try {
        const getIdeaById = await apiIdeas(`/${params.id}`);

        // Header
        setValue(`title`, getIdeaById.title);
        setValue("context", getIdeaById.context);
        setPrimaryImg(getIdeaById.primary_img);

        // Categories
        setValueCategories(
          getIdeaById.idea_category.map((category) => ({
            id: category.category.id,
            label: category.category.label,
            color: category.category.color,
          }))
        );
        // Content
        setValue("goal", getIdeaById.goal);
        setValue("profits", getIdeaById.profits);
        setValue("risks", getIdeaById.risks);

        // Upload Files

        setFilesAttachment(
          getIdeaById.attachment.map((file, index) => ({
            id: index + 1,
            file: {
              id: file.id,
              content_url: file.content_url,
              size: file.size,
              name: getNameFileToFirebaseLink(file.content_url),
            },
          }))
        );

        // CloudShare
        setValue("cloudshare", getIdeaById.cloudshare);

        // Teams
        setTeamSelect(
          getIdeaById.idea_teams.map((user) => ({
            id: user.user.id,
            avatar_url: user.user.avatar_url,
            firstname: user.user.firstname,
            lastname: user.user.lastname,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    isEdit();
  }, []);

  const beforeSave = (data) => {
    setDialogData(data);
    setOpenDialog(true);
  };

  const onUpdate = async (data) => {
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
      } else if (primaryImg) {
        formData.append("primaryImg", primaryImg);
      }

      if (filesAttachment.length > 0) {
        filesAttachment
          .map((item) => {
            if (item.file.content_url) {
              return { attachement: item.file.content_url };
            }
            return { attachement: item.file };
          })
          .forEach((attachement) => {
            const key = Object.keys(attachement)[0];
            const value = attachement[key];
            formData.append(key, value);
          });
      }

      const updateIdea = await apiUpdateIdeaById(params.id, formData);
      setOpenDialog(false);
      if (updateIdea) {
        setIdIdea(updateIdea.id);
        setAlertMessage("Idea updated successfully.");
        setAlertTitle("Idea updated");
        setAlertOpen(true);
      } else {
        setAlertMessage("Failed to update idea. Please try again.");
        setAlertTitle("Error");
        setAlertSeverity("error");
        setAlertOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(beforeSave)}>{children}</form>
      <DialogSave
        open={openDialog}
        setOpen={setOpenDialog}
        handleAgree={() => onUpdate(dialogData)}
      />
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

IdeaEditForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdeaEditForm;
