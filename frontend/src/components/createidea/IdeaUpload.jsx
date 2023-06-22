import { useContext, useState } from "react";

import handleFileProcessing from "../../utils/handleFileProcessing";
import formatBytes from "../../utils/formatBytes";

import dragdrop from "../../assets/idea/dragdrop.svg";
import UploadButton from "../styledComponents/UploadButton";
import TableFilesUpload from "./TableFilesUpload";
import Dropzone from "../styledComponents/Dropzone";

import { IdeaFormContext } from "../../contexts/IdeaFormContext";

const columns = [
  { id: 1, label: "Type" },
  { id: 2, label: "File" },
  {
    id: 3,
    label: "Size",
  },
  {
    id: 4,
    label: "Action",
  },
];

function IdeaUpload() {
  const { setOpen, filesAttachment, setFilesAttachment, setErrorFiles } =
    useContext(IdeaFormContext);

  const [isDragActive, setIsDragActive] = useState(false);

  const maxSizeInKB = 4096; // Maximum size file in Kb
  const maxFiles = 10; // Maximum number of files

  const handleChangeFile = (event) => {
    const { files } = event.target;
    handleFileProcessing(
      files,
      maxSizeInKB,
      maxFiles,
      filesAttachment,
      setErrorFiles,
      setOpen,
      setFilesAttachment
    );
  };

  const handleDropFiles = (droppedFiles) => {
    handleFileProcessing(
      droppedFiles,
      maxSizeInKB,
      maxFiles,
      filesAttachment,
      setErrorFiles,
      setOpen,
      setFilesAttachment
    );
  };

  const handleDeleteFiles = (id) => {
    const newFiles = filesAttachment.filter((file) => file.id !== id);
    setFilesAttachment(newFiles);
  };

  return (
    <div className="my-8" aria-label="Upload Files">
      <h2 className="text-xl sm:text-2xl font-bold my-4">Upload files</h2>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full flex justify-center items-center sm:mx-8">
          <Dropzone
            handleDropFiles={handleDropFiles}
            isClick
            onDragActive={setIsDragActive}
          >
            <div
              className={`w-[316px] h-[202px] flex flex-col-reverse my-6 sm:w-[456px] sm:h-[372px] sm:flex-col rounded-3xl relative justify-around items-center py-10 sm:px-10 ${
                isDragActive ? "bg-neutral-300" : "bg-neutral-200"
              }`}
            >
              <img
                src={dragdrop}
                alt="standard"
                className="w-28 select-none sm:w-auto absolute top-[-40px] right-[-20px] sm:top-[-50px] sm:right-[-50px] "
              />

              <h2 className="hidden md:flex text-xl font-bold">
                Drag and drop files here
              </h2>
              <h2 className="hidden sm:flex text-xl font-normal">OR</h2>
              <UploadButton
                id="uploadButton2"
                accept="*"
                multiple
                onChange={handleChangeFile}
              >
                ADD FILES
              </UploadButton>

              <div className="flex flex-col items-center">
                <h2 className="text-sm font-bold my-2">Supported files</h2>
                <p className="text-xs font-normal my-2">
                  {formatBytes(maxSizeInKB * 1024)} max and {maxFiles} files max
                </p>
                <p className="text-xs font-normal my-2">
                  jpg, jpeg, docx, pdf...
                </p>
              </div>
            </div>
          </Dropzone>
        </div>

        <div className="w-full flex flex-col sm:mx-10 py-8">
          {filesAttachment.length !== 0 && (
            <>
              <p className="w-full my-4">
                {`Number of file${filesAttachment.length !== 0 ? "s" : ""}: `}
                <strong>{filesAttachment.length}</strong>
              </p>
              <TableFilesUpload
                columns={columns}
                rows={filesAttachment}
                onClickDelete={handleDeleteFiles}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default IdeaUpload;
