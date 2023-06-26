interface UploadedFiles {
  url: string;
  type: "attachement" | "primaryImg";
}

interface UploadedImg {
  url: string;
}

export { UploadedFiles, UploadedImg };
