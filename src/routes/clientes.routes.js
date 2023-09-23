import { Router } from "express";
import {
  getClientes,
  getCliente,
  postClientes,
  patchCliente,
  deleteCliente,
} from "../controllers/clientes.controller.js";

const router = Router();

router.get("/clientes", getClientes);

router.get("/clientes/:id", getCliente);

router.post("/clientes", postClientes);

router.patch("/clientes/:id", patchCliente);

router.delete("/clientes/:id", deleteCliente);

export default router;
