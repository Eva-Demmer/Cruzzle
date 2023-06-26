import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import dayjs from "dayjs";
import config from "../config/firebase.config";
import { UploadedFiles } from "../interfaces/uploadedfiles.interface";

// Initialize a firebase application
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

const uploadToFirebase = async (
  files: Express.Multer.File[]
): Promise<UploadedFiles[]> => {
  const uploadPromises = files.map(async (file) => {
    if (!Array.isArray(files)) {
      throw new Error("Invalid files parameter. Expected an array of files.");
    }
    const datetime = dayjs().format("YYYYMMDD_HHmmss");
    let storagePath = "files/"; // Dossier principal
    let fileType: "attachement" | "primaryImg";

    if (file.mimetype.includes("image")) {
      storagePath += "images/"; // Dossier pour les images
      fileType = "primaryImg";
    } else {
      storagePath += "files/"; // Dossier pour les autres types de fichiers
      fileType = "attachement";
    }

    const ext = file.originalname.split(".")[1];
    const fileName = file.originalname
      .split(".")[0]
      .toLowerCase()
      .split(" ")
      .join("-");

    const storageRef = ref(
      storage,
      `${storagePath}${fileName}-${datetime}.${ext}`
    );

    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );

    const url = await getDownloadURL(snapshot.ref);

    return { url, type: fileType };
  });

  const uploadedFiles = await Promise.all(uploadPromises);

  return uploadedFiles;
};

const uploadImgToFirebar = async () => {
  return true;
};

export { uploadToFirebase, uploadImgToFirebar };
