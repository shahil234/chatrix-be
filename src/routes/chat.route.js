import express from "express";
import { sendPersonalMessage } from "../controllers/chat.controller";

const router = express.Router();

router.post("/dm/:userId", sendPersonalMessage)