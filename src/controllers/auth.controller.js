import db from "../db/db.js";
import expressAsyncHandler from "express-async-handler";

const getUserData = expressAsyncHandler(async (req, res) => {
  if (!req.isAuthenticated() || !req.user?.id) {
    return res.status(401).json({
      success: false,
      message: "Unauthenticated request",
    });
  }


  const userData = await db.user.findFirst({
    where: {
      id: req.user.id
    },
    select: {
      id: true,
      username: true,
      email: true,
      ProfileDetails: {
        select: {
          picture: true,
          nickName: true
        }
      }
    }
  });

  if (!userData) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: userData,
  });
});

const logOutUser = expressAsyncHandler(async (req, res) => {
  return new Promise((resolve, reject) => {
    req.logout((error) => {
      if (error) {
        console.error("Logout error:", error);
        return reject(new Error("Log out failed"));
      }

      req.session.destroy((sessionError) => {
        if (sessionError) {
          console.error("Session destroy error:", sessionError);
        }

        res.clearCookie("connect.sid");

        resolve(res.status(200).json({
          success: true,
          message: "Log out successful"
        }));
      });
    });
  });
});

export {
  getUserData,
  logOutUser
}