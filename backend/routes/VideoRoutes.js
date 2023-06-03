import express from "express";
import { createVideo, delete_a_Video, dislike_a_Video, getSubscribedVideo, getTags, getVideo, getVideosByChannel, isLiked, isdisLiked, like_a_Video, randomVideos, searchByTittle, topVideos, updateVideo, viewIncrease } from "../controllers/VideoController.js";
import {verify} from "../VerifyToken.js";
const router=express.Router();

router.post('/create',verify,createVideo);

router.put('/update/:id',verify,updateVideo)

router.delete('/delete/:id',verify,delete_a_Video);

router.get('/isLiked/:videoid',verify,isLiked);

router.get('/isdisLiked/:videoid',verify,isdisLiked);

router.get('/find/:id',getVideo);

router.put('/view/:id',viewIncrease);

router.get('/getSub',verify,getSubscribedVideo);

router.get('/top',topVideos);

router.get('/random',randomVideos);

router.get('/search/title',searchByTittle);

router.post('/tags',getTags);

router.put('/likevideo/:videoid',verify,like_a_Video);

router.put('/dislikevideo/:videoid',verify,dislike_a_Video);

router.get('/getChannelVideos/:id',getVideosByChannel);

export default router;