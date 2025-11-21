import { Router } from "express";
import read from "../controllers/categories/get.js";
import createCategory from "../controllers/categories/post.js";
import destroy from "../controllers/categories/delete.js";

let router = Router();

router.get("/", read);
router.post("/", createCategory);
router.delete("/:id", destroy);

export default router;
