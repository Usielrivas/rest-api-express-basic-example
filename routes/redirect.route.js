import { Router } from "express";
import {redirect} from "../controllers/redirect.controller.js"

const route= Router()

route.get("/:nanolink",redirect)

export default route;
