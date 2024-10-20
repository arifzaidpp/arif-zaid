import express from "express";
import { deleteImage, uploadImage } from "../controllers/image.controller.js";
import upload from "../utils/multerFile.js";
import { addProject, deleteProject, editProject, getAllProjects } from "../controllers/project.controller.js";
import { requireLiveField } from "../middleware/liveRequire.js";
import { checkIdParam } from "../middleware/editDetails.js";

const router = express.Router();

router.post('/upload-image',upload, uploadImage);
router.post('/delete-image', deleteImage);
router.post('/add-project', requireLiveField, addProject);
router.put('/edit-project/:id',requireLiveField, checkIdParam, editProject);
router.delete('/delete-project/:id', deleteProject);
router.get('/projects', getAllProjects);

export default router;