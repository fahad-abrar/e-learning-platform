import multer from "multer";
import path from "path";
import ErrorHandler from "../errorHandler/errorHandler.js";

const fileUpload = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(process.cwd(), "/public");
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname).toLowerCase();
      //const fileExt = path.extname(file.originalname).toLowerCase();
      console.log("this is from multer --- >>>", fileExt);

      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        Date.now() +
        fileExt;

      cb(null, fileName);
    },
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const fileExt = path.extname(file.originalname).toLowerCase();
      const allowExt = [
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".pdf",
        ".doc",
        ".docx",
      ];

      if (!allowExt.includes(fileExt)) {
        return next(new ErrorHandler("file formate is nt valid", 404));
      }
      cb(null, true);
    },
  });

  return upload;
};

export default fileUpload;
