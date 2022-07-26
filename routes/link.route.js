import { Router } from "express";
import {getLinks,createLink,getSingleLink, removeLink, updateLink} from "../controllers/link.controller.js";
import {requireAuth} from "../middlewares/requireAuth.js";
import {validatorLink, validatorParams} from "../middlewares/validatorManager.js";

const router= Router();

//GET /api/v1/links all links
router.get("/",requireAuth,getLinks)
//GET /api/v1/links/:id single links
router.get("/:id",requireAuth,validatorParams,getSingleLink)
//POST /api/v1/links create
router.post("/",requireAuth,validatorLink,createLink)
//PACTH /api/v1/links/:id update
router.patch("/:id",requireAuth,validatorParams,updateLink)
//DELETE /api/v1/links/:id delete
router.delete("/:id",requireAuth,validatorParams,validatorLink,removeLink)

export default router;
