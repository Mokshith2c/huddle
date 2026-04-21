import multer from "multer";
import cloudinary from "./cloudinary.js";
import CloudinaryStorage from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only JPEG, PNG and PDF are allowed."));
    }

    return cb(null, {
      folder: "uploads", 
      resource_type: "auto", 
      public_id: Date.now() + "-" + file.originalname,
    });
  },
});
console.log("Cloudinary config:", cloudinary.config());
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;