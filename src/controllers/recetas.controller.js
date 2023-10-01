

import { pool } from "../../db/db.js";

export const getRecetas = async (req, res) => {
  try {
    // throw new Error('DB Error')
    const [rows] = await pool.query("SELECT * FROM recetas");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

// En tu controlador de recetas
export const getRecipe = async (req, res) => {
  try {
    const { dni, afiliado } = req.query;

    // Registra la consulta SQL en la consola
    const sqlQuery = `
    SELECT r.id, c.nombre, c.apellido, c.dni, c.afiliado, r.fecha_de_vencimiento, r.title
    FROM clientes AS c
    JOIN recetas AS r ON c.afiliado = r.afiliado AND c.dni = r.dni
`;
    // Realiza la consulta SQL para obtener las recetas que coincidan con el DNI y el afiliado
    const [rows] = await pool.query(sqlQuery, [dni, afiliado]);

    res.json(rows);
    console.log(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};


export const getReceta = async (req, res) => {
  try {
        // throw new Error('GET:id Error')

    const [rows] = await pool.query("SELECT * FROM recetas WHERE id = ?", [
      req.params.id,
    ]);
    console.log(rows);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "No se encuentra recetas por id",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const postRecetas = async (req, res) => {
  try {
    const { dni, afiliado, fecha_de_vencimiento, start, title } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO recetas (dni, afiliado, fecha_de_vencimiento, start, title) VALUES (?,?,?,?,?)",
      [dni, afiliado, fecha_de_vencimiento, start, title]
    );

    res.send({
      id: rows.insertId,
      dni,
      afiliado,
      fecha_de_vencimiento,
      start,
      title,
    });
  } catch (error) {
    console.error("Error en la consulta SQL:", error); // Agrega esta línea
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};


// Controlador para sumar 30 días a la fecha de vencimiento de una receta por su ID
export const sumar30DiasReceta = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta la receta por su ID
    const [rows] = await pool.query("SELECT * FROM recetas WHERE id = ?", [id]);

    if (rows.length <= 0) {
      return res.status(404).json({
        message: "No se encuentra la receta por ID",
      });
    }

    // Obtén la fecha de vencimiento actual de la receta
    const fechaActual = new Date(rows[0].fecha_de_vencimiento);

    // Suma 30 días a la fecha de vencimiento
    fechaActual.setDate(fechaActual.getDate() + 30);

    // Actualiza la fecha de vencimiento en la base de datos
    await pool.query("UPDATE recetas SET fecha_de_vencimiento = ? WHERE id = ?", [
      fechaActual,
      id,
    ]);

    return res.json({
      message: "Se sumaron 30 días a la fecha de vencimiento de la receta",
    });
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const patchRecetas = async (req, res) => {
  try {
        // throw new Error('PATCH Error')

    const { id } = req.params;
    const {  dni, afiliado, fecha_de_vencimiento, start, title } = req.body;

    const [result] = await pool.query(
      "UPDATE recetas SET dni = IFNULL(?, dni),afiliado = IFNULL(?, afiliado),fecha_de_vencimiento = IFNULL(?, fecha_de_vencimiento),start = IFNULL(?, start),title = IFNULL(?, title) WHERE id = ?",
      [dni, afiliado, fecha_de_vencimiento,start,title, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "recetas not found",
      });
    res.json("received");
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteRecetas = async (req, res) => {
 try {
     // throw new Error('DELETE Error')
    const [result] = await pool.query("DELETE FROM recetas WHERE id = ?", [
        req.params.id,
      ]);
    
      if (result.affectedRows <= 0)
        return res.status(404).json({
          message: "recetas not found",
        });
      res.sendStatus(204);
 } catch (error) {
    return res.status(500).json({
        message: "Something goes wrong",
      });
 }
};
