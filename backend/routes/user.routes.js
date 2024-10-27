import express from "express";
import { addContact } from "../controllers/contact.controller.js";

const router = express.Router();


router.post('/add-contact', addContact);

export default router;