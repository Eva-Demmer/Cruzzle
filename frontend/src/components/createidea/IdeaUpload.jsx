import dragdrop from "../../assets/idea/dragdrop.svg";

function IdeaUpload() {
  return (
    <div className="my-8" aria-label="Upload Files">
      <h2 className="text-2xl font-bold my-4">Upload files</h2>
      <div className="flex my-6">
        <img src={dragdrop} alt="standard" />
      </div>
    </div>
  );
}
export default IdeaUpload;
