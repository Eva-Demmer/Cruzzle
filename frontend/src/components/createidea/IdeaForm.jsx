import PropTypes from "prop-types";
import { useContext } from "react";
import { IdeaFormContext } from "../../contexts/IdeaFormContext";

function IdeaForm({ children }) {
  const { handleSubmit, filesAttachment, teamSelect } =
    useContext(IdeaFormContext);

  const onSubmit = (data) => {
    console.info(teamSelect);
    const formData = new FormData();

    teamSelect.forEach((collaborator, index) => {
      const key = `team_${index}`;
      formData.append(key, collaborator);
    });

    filesAttachment
      .map((item, index) => ({
        [`attachments_${index}`]: item.file,
      }))
      .forEach((attachment) => {
        const key = Object.keys(attachment)[0];
        const value = attachment[key];
        formData.append(key, value);
      });

    const { categories, ...dataWithoutCategories } = data;

    categories.forEach((category, index) => {
      const key = `category_${index}`;
      formData.append(key, category);
    });

    for (const key in dataWithoutCategories) {
      if (Object.prototype.hasOwnProperty.call(dataWithoutCategories, key)) {
        const value = dataWithoutCategories[key];
        if (value) {
          formData.append(key, value);
        }
      }
    }

    // Valeur du formData pour le submit
    for (const pair of formData.entries()) {
      console.info(`${pair[0]},${pair[1]}`);
    }

    // Request Axios to post
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
}

IdeaForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdeaForm;
