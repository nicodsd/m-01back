import { Router } from "express"
import read from "../controllers/categories/get.js"

let router = Router()

router.get("/", read)

export default router

