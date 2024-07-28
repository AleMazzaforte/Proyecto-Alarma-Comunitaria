// src/controllers/mainController.js

const { pool } = require('../../db/db'); // Asegúrate de que la ruta es correcta

const mainController = {};

// Ejemplo de función para obtener todos los datos
mainController.getAllData = async (req, res) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM Alarma_Comunitaria'); // Reemplaza 'Alarma_Comunitaria' con el nombre de tu tabla
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener datos');
    }
};

// Ejemplo de función para insertar datos
mainController.addData = async (req, res) => {
    const { control, lote, direccion, telefono, nombre } = req.body;
    try {
        const result = await pool.query('INSERT INTO Alarma_Comunitaria (control, lote, direccion, telefono, nombre) VALUES (?, ?, ?, ?, ?)', [control, lote, direccion, telefono, nombre]);
        res.redirect('/admin');
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.redirect('/admin?error=duplicate');
        } else {
            console.error(err);
            res.status(500).send('Error al insertar datos');
        }
    }
};

// Ejemplo de función para borrar datos
mainController.deleteData = async (req, res) => {
    const { control } = req.params;
    try {
        await pool.query('DELETE FROM Alarma_Comunitaria WHERE control = ?', [control]);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al borrar datos');
    }
};

// Ejemplo de función para obtener datos para actualizar
mainController.getUpdateData = async (req, res) => {
    const { control } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Alarma_Comunitaria WHERE control = ?', [control]);
        if (rows.length === 0) {
            return res.status(404).send('Número de control no encontrado');
        }
        res.render('update', { data: rows[0] }); // Suponiendo que tienes una vista `update.ejs` para el formulario
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos para la actualización');
    }
};

// Ejemplo de función para actualizar datos
mainController.updateData = async (req, res) => {
    const { control } = req.params;
    const { lote, direccion, telefono, nombre } = req.body;
    try {
        await pool.query('UPDATE Alarma_Comunitaria SET lote = ?, direccion = ?, telefono = ?, nombre = ? WHERE control = ?', [lote, direccion, telefono, nombre, control]);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar datos');
    }
};

module.exports = mainController;
