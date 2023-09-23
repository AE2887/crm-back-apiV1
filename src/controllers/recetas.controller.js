

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
        // throw new Error('POST Error')

    const { dni, afiliado, fecha_de_vencimiento } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO recetas (dni, afiliado, fecha_de_vencimiento) VALUES (?,?,?)",
      [dni, afiliado, fecha_de_vencimiento]
    );

    res.send({
      id: rows.insertId,
      dni,
      afiliado,
      fecha_de_vencimiento,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const patchRecetas = async (req, res) => {
  try {
        // throw new Error('PATCH Error')

    const { id } = req.params;
    const {  dni, afiliado, fecha_de_vencimiento } = req.body;

    const [result] = await pool.query(
      "UPDATE recetas SET dni = IFNULL(?, dni),afiliado = IFNULL(?, afiliado),fecha_de_vencimiento = IFNULL(?, fecha_de_vencimiento) WHERE id = ?",
      [dni, afiliado, fecha_de_vencimiento, id]
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
