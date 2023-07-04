import multer from "multer";
import dayjs from "dayjs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/home/oliviert/WCS/cruzzle/backend/public/uploads");
  },
  filename: (req, file, cb) => {
    const currentDate = dayjs().format("YYYYMMDDHHmmss");
    cb(null, `${currentDate}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadAvatar = upload.single("avatar");

export default uploadAvatar;
