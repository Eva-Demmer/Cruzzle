interface UploadedFiles {
  url: string;
  type: "attachment" | "primaryImg";
}

interface UploadedImg {
  url: string;
}

export { UploadedFiles, UploadedImg };
