import { Router } from "express";
import {
  getClientes,
  getCliente,
  postClientes,
  patchCliente,
  deleteCliente,
} from "../controllers/clientes.controller.js";

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

router.get("/clientes", getClientes);

router.get("/clientes/:id", getCliente);

router.post("/clientes", postClientes);

router.patch("/clientes/:id", patchCliente);

router.delete("/clientes/:id", deleteCliente);

export default router;
