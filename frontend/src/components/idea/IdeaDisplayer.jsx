import React from "react";
import PropTypes from "prop-types";
import IdeaCard from "./IdeaCard";

function IdeaDisplayer({ ideas, isMini }) {
  return (
    <div className="flex flex-col gap-7 px-6 py-6 overflow-scroll no-scrollbar::-webkit-scrollbar no-scrollbar">
      {ideas !== undefined
        ? ideas.map((idea) => (
            <IdeaCard key={idea.id} isMini={isMini} idea={idea} />
          ))
        : ""}
    </div>
  );
}
export default IdeaDisplayer;

const categoryPropTypes = PropTypes.shape({
  color: PropTypes.string,
  label: PropTypes.string,
});

const positionPropTypes = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

const attachmentsPropTypes = PropTypes.shape({
  id: PropTypes.number,
  content_url: PropTypes.string,
});

const agencyPropTypes = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
});

const userPropTypes = PropTypes.shape({
  id: PropTypes.number,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  position: positionPropTypes,
  avatar_url: PropTypes.string,
  agency: agencyPropTypes,
});

IdeaDisplayer.propTypes = {
  isMini: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  ideas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      context: PropTypes.string.isRequired,
      user: userPropTypes,
      created_at: PropTypes.string.isRequired,
      archived_at: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      deleted_at: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      goal: PropTypes.string.isRequired,
      profits: PropTypes.string.isRequired,
      risks: PropTypes.string.isRequired,
      cloudshare: PropTypes.string,
      primary_img: PropTypes.string.isRequired,
      views: PropTypes.number.isRequired,
      idea_category: PropTypes.arrayOf(categoryPropTypes).isRequired,
      attachment: PropTypes.arrayOf(attachmentsPropTypes).isRequired,
      idea_teams: PropTypes.arrayOf(userPropTypes),
      _count: PropTypes.shape({
        idea_like: PropTypes.number.isRequired,
        comment: PropTypes.number.isRequired,
        attachment: PropTypes.number.isRequired,
        idea_teams: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
