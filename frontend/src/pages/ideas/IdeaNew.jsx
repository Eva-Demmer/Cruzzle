import { useLocation } from "react-router-dom";
import { Divider } from "@mui/material";

import IdeaForm from "../../components/createidea/IdeaForm";
import IdeaHeader from "../../components/createidea/IdeaHeader";
import IdeaTabs from "../../components/createidea/IdeaTabs";
import IdeaUpload from "../../components/createidea/IdeaUpload";
import IdeaCloud from "../../components/createidea/IdeaCloud";

import IdeaFormProvider from "../../contexts/IdeaFormContext";
import IdeaButtons from "../../components/createidea/IdeaButtons";
import IdeaError from "../../components/createidea/IdeaError";

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
      <IdeaFormProvider>
        <IdeaForm>
          <IdeaHeader />
          <Divider />
          <IdeaTabs />
          <Divider />
          <IdeaUpload />
          <IdeaCloud />
          <Divider />
          <IdeaButtons />
          <IdeaError />
        </IdeaForm>
      </IdeaFormProvider>
    </div>
  );
}

export default IdeaNew;
