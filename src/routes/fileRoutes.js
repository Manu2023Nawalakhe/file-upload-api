import express from "express";
const router = express.Router();
import multer from "multer";
import {
  uploadFile,
  getFiles,
  getFile,
  updateFile,
  deleteFile,
} from "../controllers/fileController.js";

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getFiles);
router.get("/:id", getFile);
router.put("/:id", upload.single("file"), updateFile);
router.delete("/:id", deleteFile);

router.get("/test", (req, res) => {
  console.log("Test route hit");
  res.send("Test route working");
});

export default router;
