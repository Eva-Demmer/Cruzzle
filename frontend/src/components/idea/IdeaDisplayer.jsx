import React, { useContext } from "react";
import { IdeasContext } from "../../contexts/IdeasContext";
import IdeaCard from "./IdeaCard";

function IdeaDisplayer() {
  const { ideas } = useContext(IdeasContext);

  return (
    <div className="flex flex-col gap-7 px-4 pt-8 w-auto h-[calc(100vh-64px)] overflow-scroll no-scrollbar">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} isMini={false} idea={idea} />
      ))}
    </div>
  );
}

export default IdeaDisplayer;
