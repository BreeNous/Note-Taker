const express = require('express');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const dbPath = './db/db.json';

// GET /api/notes - Read and return all notes from db.json
router.get('/notes', (req, res) => {
  readFromFile(dbPath).then((data) => res.json(JSON.parse(data)));
});

// POST /api/notes - Add a new note to db.json
router.post('/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, dbPath);

    res.json(newNote);
  } else {
    res.error ('Note title and text are required' );
  }
});

module.exports = router;

