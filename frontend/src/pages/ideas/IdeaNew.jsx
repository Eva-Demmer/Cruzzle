import { useLocation } from "react-router-dom";

import IdeaTabs from "../../components/createidea/IdeaTabs";
import IdeaHeader from "../../components/createidea/IdeaHeader";
import IdeaAuthorization from "../../components/createidea/IdeaAuthorization";
import IdeaUpload from "../../components/createidea/IdeaUpload";

function IdeaNew() {
  const location = useLocation();

  const isNewIdea = location.pathname === "/ideas/new";

  const title = isNewIdea ? "Create idea" : "Modify idea";

  return (
    <div className="w-full py-4 px-4">
      <div className="mb-8" aria-label="Title">
        <h1 className="text-3xl font-bold my-4">{title}</h1>
        <p className="text-base font-normal my-2">
          {`${isNewIdea ? "Create" : "Modify"} idea, add files and pictures`}
        </p>
      </div>

      <IdeaHeader />
      <IdeaAuthorization />
      <IdeaTabs />
      <IdeaUpload />
      {/* 
      <div className="my-8" aria-label="Cloud Share"></div>
      <div className="my-8" aria-label="Teams"></div> */}
    </div>
  );
}

export default IdeaNew;
