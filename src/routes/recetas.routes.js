import { Router } from "express";
import {
  getRecetas,
  getReceta,
  postRecetas,
  patchRecetas,
  deleteRecetas,
} from "../controllers/recetas.controller.js";

const router = Router();

router.get("/recetas", getRecetas);

router.get("/recetas/:id", getReceta);

router.post("/recetas", postRecetas);

router.patch("/recetas/:id", patchRecetas);

router.delete("/recetas/:id", deleteRecetas);

export default router;
