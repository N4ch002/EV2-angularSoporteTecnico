const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Soporte Técnico funcionando'
  });
});

// GET: obtener todos los tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const [tickets] = await db.query(
      'SELECT * FROM tickets ORDER BY id DESC'
    );
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los tickets' });
  }
});

// GET por id: obtener un ticket
app.get('/api/tickets/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const [tickets] = await db.query(
      'SELECT * FROM tickets WHERE id = ?',
      [id]
    );

    if (tickets.length === 0) {
      return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    }

    res.status(200).json(tickets[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el ticket' });
  }
});

// POST: crear un ticket
app.post('/api/tickets', async (req, res) => {
  const {
    asunto,
    solicitante,
    descripcion,
    categoria,
    prioridad,
    estado
  } = req.body;

  if (!asunto || !solicitante || !descripcion || !categoria || !prioridad || !estado) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }

  try {
    const [resultado] = await db.query(
      'INSERT INTO tickets (asunto, solicitante, descripcion, categoria, prioridad, estado) VALUES (?, ?, ?, ?, ?, ?)',
      [asunto, solicitante, descripcion, categoria, prioridad, estado]
    );

    const nuevoTicket = {
      id: resultado.insertId,
      asunto,
      solicitante,
      descripcion,
      categoria,
      prioridad,
      estado
    };

    res.status(201).json(nuevoTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar el ticket' });
  }
});

// PUT: actualizar un ticket
app.put('/api/tickets/:id', async (req, res) => {
  const id = Number(req.params.id);

  const {
    asunto,
    solicitante,
    descripcion,
    categoria,
    prioridad,
    estado
  } = req.body;

  if (!asunto || !solicitante || !descripcion || !categoria || !prioridad || !estado) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }

  try {
    const [resultado] = await db.query(
      'UPDATE tickets SET asunto = ?, solicitante = ?, descripcion = ?, categoria = ?, prioridad = ?, estado = ? WHERE id = ?',
      [asunto, solicitante, descripcion, categoria, prioridad, estado, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    }

    res.status(200).json({ mensaje: 'Ticket actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el ticket' });
  }
});

// DELETE: eliminar un ticket
app.delete('/api/tickets/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const [resultado] = await db.query(
      'DELETE FROM tickets WHERE id = ?',
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    }

    res.status(200).json({ mensaje: 'Ticket eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el ticket' });
  }
});

app.listen(PORT, () => {
  console.log(`API ejecutándose en http://localhost:${PORT}`);
});