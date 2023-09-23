import express from "express";
import { createPool } from "mysql2/promise";

const data = express();

const pool = createPool({
   
        host: 'mysqldb',
        user: 'albert_enrique',
        password: 'felipe2887',
        port: 3306,
        database: 'farmacia_moyano'

})
data.get('/', (req, res) => {
    res.send('Farmacia Moyi')

})
data.get('/ping', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result[0]);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error de servidor' });
    }
});

data.listen(3306)
console.log('server on port 🤑', 3306 )