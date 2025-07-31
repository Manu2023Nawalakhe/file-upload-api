import FileModel from "../models/fileModel.js";
import fs from "fs";

export const uploadFile = async (req, res) => {
  try {
    const file = new FileModel({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });

    await file.save();
    res.status(201).json({ message: "File uploaded successfully", file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await FileModel.find();
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFile = async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    res.status(200).json(file);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFile = async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    // Delete old file
    fs.unlinkSync(file.path);

    // Update with new file
    file.filename = req.file.filename;
    file.path = req.file.path;
    file.size = req.file.size;
    file.mimetype = req.file.mimetype;

    await file.save();
    res.status(200).json({ message: "File updated", file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    // Remove from local storage
    fs.unlinkSync(file.path);

    // Remove from DB
    await file.deleteOne();

    res.status(200).json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
