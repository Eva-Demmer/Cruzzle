import PropTypes from "prop-types";
import { useContext } from "react";
import { IdeaFormContext } from "../../contexts/IdeaFormContext";

function IdeaForm({ children }) {
  const { handleSubmit, filesAttachment } = useContext(IdeaFormContext);

  const onSubmit = (data) => {
    const formData = new FormData();

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
        formData.append(key, dataWithoutCategories[key]);
      }
    }

    // Request Axios to post
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
}

IdeaForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdeaForm;
