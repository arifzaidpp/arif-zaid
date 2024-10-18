import express from "express";
import { deleteImage, uploadImage } from "../controllers/image.controller.js";
import upload from "../utils/multerFile.js";

const router = express.Router();

router.post('/upload-image',upload, uploadImage);
router.post('/delete-image', deleteImage);

export default router;