import { Router } from "express";
import {
  getRecetas,
  getRecipe,
  getReceta,
  postRecetas,
  patchRecetas,
  sumar30DiasReceta,
  deleteRecetas,
} from "../controllers/recetas.controller.js";

const router = Router();


router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permite solicitudes desde cualquier origen
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE" // Define los métodos HTTP permitidos
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept" // Define los encabezados permitidos
  );
  next();
});


router.get("/recetas", getRecetas);

router.get("/recipe", getRecipe);

router.get("/recetas/:id", getReceta);

router.post("/recetas", postRecetas);

router.patch("/recetas/:id", patchRecetas);

router.patch("/recetas/sumar30dias/:id", sumar30DiasReceta);

router.delete("/recetas/:id", deleteRecetas);

export default router;
