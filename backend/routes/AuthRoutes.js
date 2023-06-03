import express from "express";
import { createUser, isUserLoggedIn, logIn, signOut } from "../controllers/AuthControllers.js";
const router=express.Router();

router.post("/signup",createUser);
router.post("/login",logIn);
router.get("/signOut",signOut);
router.get("/islogin",isUserLoggedIn);



export default router;