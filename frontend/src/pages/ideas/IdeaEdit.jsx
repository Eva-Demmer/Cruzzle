import { Divider } from "@mui/material";

import IdeaEditForm from "../../components/createidea/IdeaEditForm.";
import IdeaHeader from "../../components/createidea/IdeaHeader";
import IdeaTabs from "../../components/createidea/IdeaTabs";
import IdeaUpload from "../../components/createidea/IdeaUpload";
import IdeaCloud from "../../components/createidea/IdeaCloud";

import IdeaFormProvider from "../../contexts/IdeaFormContext";
import IdeaButtons from "../../components/createidea/IdeaButtons";
import IdeaError from "../../components/createidea/IdeaError";
import IdeaTeam from "../../components/createidea/IdeaTeam";

function IdeaEdit() {
  return (
    <div className="w-full py-4 px-4">
      <div className="mb-8" aria-label="Title">
        <h1 className="text-3xl font-bold my-4">Modify idea</h1>
        <p className="text-base font-normal my-2">
          Modify idea, add files and pictures
        </p>
      </div>
      <IdeaFormProvider>
        <IdeaEditForm>
          <IdeaHeader />
          <Divider />
          <IdeaTabs />
          <Divider />
          <IdeaUpload />
          <IdeaCloud />
          <Divider />
          <IdeaTeam />
          <IdeaButtons />
          <IdeaError />
        </IdeaEditForm>
      </IdeaFormProvider>
    </div>
  );
}

export default IdeaEdit;
