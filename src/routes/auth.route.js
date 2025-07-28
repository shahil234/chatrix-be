import { Router } from "express";
import { getUserData, logOutUser } from "../controllers/auth.controller.js";
import passport from "passport";
import "../config/passport-config.js";
import db from "../db/db.js";
import { populate } from "dotenv";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_SIDE_URL}/sign-in`,
  }),
  function (req, res) {
    res.redirect(process.env.CLIENT_SIDE_URL);
  }
);

authRouter.get("/user", getUserData);

authRouter.get("/logout", logOutUser);

export default authRouter;
