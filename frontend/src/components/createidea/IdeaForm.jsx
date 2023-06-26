import PropTypes from "prop-types";
import { useContext } from "react";
import axios from "axios";
import { IdeaFormContext } from "../../contexts/IdeaFormContext";

function IdeaForm({ children }) {
  const { handleSubmit, filesAttachment, teamSelect } =
    useContext(IdeaFormContext);

  const onSubmit = (data) => {
    const formData = new FormData();
    const { categories, primaryImg, ...dataWithoutCategories } = data;

    const formatedTeam = teamSelect.map((user) => ({
      user_id: user.id,
    }));

    formData.append("team", JSON.stringify(formatedTeam));
    formData.append("categories", JSON.stringify(categories));

    for (const key in dataWithoutCategories) {
      if (Object.prototype.hasOwnProperty.call(dataWithoutCategories, key)) {
        const value = dataWithoutCategories[key];
        if (value) {
          formData.append(key, value);
        }
      }
    }

    if (primaryImg) {
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

  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
}

IdeaForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdeaForm;
