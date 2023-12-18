import { Router } from "express";
import { sendMailEthereal, sendMailGmail } from "../controllers/emailControllers.js";
import passport from 'passport'

const router = Router();

router.use(passport.authenticate("jwt"));

router.post('/ethereal', sendMailEthereal);

router.post('/gmail', sendMailGmail);

export default router;
