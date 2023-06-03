import express from "express";
import { deleteUser, getUser, isSubscribed, liked_videos_of_user, subscribeChannel, subscribtions, updateUser } from
 "../controllers/UserController.js";

 import { verify } from "../VerifyToken.js";

const router=express.Router();

router.delete("/delete/:id",verify,deleteUser);

router.get("/find/:id",getUser);

router.put("/update/:id",verify,updateUser);

router.put("/sub/:id",verify,subscribeChannel);

router.get("/subscribtions",verify,subscribtions);

router.get("/likedVideos",verify,liked_videos_of_user);

router.get("/isSubscribed/:id",verify,isSubscribed);

export default router;