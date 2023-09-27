import express from "express";
import clientesRoutes from "../src/routes/clientes.routes.js";
import recetasRoutes from "../src/routes/recetas.routes.js";
import ping from "../src/routes/ping.routes.js";



const app = express();

app.use(express.json());
app.use("/api", clientesRoutes);
app.use("/api", recetasRoutes);
app.use(ping);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint Not Found",
  });
});

export default app