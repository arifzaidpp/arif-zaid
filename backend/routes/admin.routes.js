import express from "express";
import { deleteImage, uploadImage } from "../controllers/image.controller.js";
import upload from "../utils/multerFile.js";
import { addProject, deleteProject, editProject, getAllProjects } from "../controllers/project.controller.js";
import { requireLiveField } from "../middleware/liveRequire.js";
import { checkIdParam } from "../middleware/editDetails.js";
import { addSkill, deleteSkill, editSkill, getAllSkills } from "../controllers/skill.controller.js";
import { addCertificate, deleteCertificate, editCertificate, getAllCertificates } from "../controllers/certificate.controller.js";

const router = express.Router();

router.post('/upload-image',upload, uploadImage);
router.post('/delete-image', deleteImage);
router.post('/add-project', requireLiveField, addProject);
router.put('/edit-project/:id',requireLiveField, checkIdParam, editProject);
router.delete('/delete-project/:id', checkIdParam, deleteProject);
router.get('/projects', getAllProjects);
router.post('/add-skill', addSkill);
router.put('/edit-skill/:id', checkIdParam, editSkill);
router.delete('/delete-skill/:id', checkIdParam, deleteSkill);
router.get('/skills', getAllSkills);
router.post('/add-certificate', addCertificate);
router.put('/edit-certificate/:id', checkIdParam, editCertificate);
router.delete('/delete-certificate/:id', checkIdParam, deleteCertificate);
router.get('/certificates', getAllCertificates);

export default router;