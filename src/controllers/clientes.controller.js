import { pool } from "../../db/db.js";

export const getClientes = async (req, res) => {
  try {
    // throw new Error('DB Error')
    const [rows] = await pool.query("SELECT * FROM clientes");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getCliente = async (req, res) => {
  try {
        // throw new Error('GET:id Error')

    const [rows] = await pool.query("SELECT * FROM clientes WHERE id = ?", [
      req.params.id,
    ]);
    console.log(rows);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "No se encuentra el cliente por id",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const postClientes = async (req, res) => {
  try {
        // throw new Error('POST Error')

    const { nombre, apellido, afiliado, dni, direccion, telefono } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO clientes (nombre, apellido, afiliado, dni, direccion, telefono) VALUES (?,?,?,?,?,?)",
      [nombre, apellido, afiliado, dni, direccion, telefono]
    );

    res.send({
      id: rows.insertId,
      nombre,
      apellido,
      afiliado,
      dni,
      direccion,
      telefono,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const patchCliente = async (req, res) => {
  try {
        // throw new Error('PATCH Error')

    const { id } = req.params;
    const { nombre, apellido, afiliado, dni, direccion, telefono } = req.body;

    const [result] = await pool.query(
      "UPDATE clientes SET nombre = IFNULL(?, nombre),apellido = IFNULL(?, apellido),afiliado = IFNULL(?, afiliado),dni = IFNULL(?, dni),direccion = IFNULL(?, direccion),telefono = IFNULL(?, telefono) WHERE id = ?",
      [nombre, apellido, afiliado, dni, direccion, telefono, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "cliente not found",
      });
    res.json("received");
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteCliente = async (req, res) => {
 try {
     // throw new Error('DELETE Error')
    const [result] = await pool.query("DELETE FROM clientes WHERE id = ?", [
        req.params.id,
      ]);
    
      if (result.affectedRows <= 0)
        return res.status(404).json({
          message: "cliente not found",
        });
      res.sendStatus(204);
 } catch (error) {
    return res.status(500).json({
        message: "Something goes wrong",
      });
 }
};
