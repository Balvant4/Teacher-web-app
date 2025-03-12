import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/temp");
  },
  filename: function (req, file, cb) {
    const random = uuid();
    cb(null, random + "" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
