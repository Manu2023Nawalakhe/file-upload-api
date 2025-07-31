import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: { type: String },
  path: { type: String },
  size: { type: Number },
  mimeType: { type: String },

  createdAt: { type: Date, default: Date.now },
});

const FileModel = mongoose.model("FileModel", fileSchema);

export default FileModel;
