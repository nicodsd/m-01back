import { Router } from "express"
import read from "../controllers/accessUrl.js"
let router = Router()
router.get("/:id", read)
export default router;