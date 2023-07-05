import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { IdeaFormContext } from "../../contexts/IdeaFormContext";
import apiIdeas from "../../services/api.ideas";
import getNameFileToFirebaseLink from "../../utils/getNameFileToFirebaseLink";

function IdeaForm({ children }) {
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

  const location = useLocation();
  const params = useParams();

  const isNewIdea = location.pathname === "/ideas/new";

  useEffect(() => {
    const isEdit = async () => {
      if (!isNewIdea) {
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
      }
    };
    isEdit();
  }, []);

  // const onSubmitOrUpdate = () => {

  // }

  const onUpdate = (data) => {
    const formData = new FormData();
    const { primaryImg: primaryPicture, ...rest } = data;

    const formatedTeam = teamSelect.map((user) => ({
      user_id: user.id,
    }));

    formData.append("team", JSON.stringify(formatedTeam));
    formData.append("categories", JSON.stringify(valueCategories));

    for (const key in rest) {
      if (Object.prototype.hasOwnProperty.call(rest, key)) {
        const value = rest[key];
        if (value) {
          formData.append(key, value);
        }
      }
    }

    if (primaryPicture) {
      formData.append("primaryImg", primaryImg);
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
  };

  const onSubmit = (data) => {
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

    // Request Axios to post
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/ideas/`, formData)
      .then((response) => {
        console.info(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(isNewIdea ? onSubmit : onUpdate)}>
      {children}
    </form>
  );
}

IdeaForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdeaForm;
