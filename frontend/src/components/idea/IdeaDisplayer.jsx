import React, { useContext } from "react";
import PropTypes from "prop-types";
import { IdeasContext } from "../../contexts/IdeasContext";
import IdeaCard from "./IdeaCard";

function IdeaDisplayer({ isMini }) {
  const { ideas } = useContext(IdeasContext);

  return (
    <div className="flex flex-col gap-7 px-4 pt-8 w-auto h-[calc(100vh-64px)] overflow-scroll no-scrollbar::-webkit-scrollbar no-scrollbar">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} isMini={isMini} idea={idea} />
      ))}
    </div>
  );
}

export default IdeaDisplayer;

IdeaDisplayer.propTypes = {
  isMini: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};
