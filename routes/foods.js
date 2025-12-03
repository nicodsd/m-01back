import { Router } from "express"
import read from "../controllers/food/get.js"
//import create from "../controllers/food/post.js"

let router = Router()

router.get("/", read)
//router.post("/", /* create */)

export default router
