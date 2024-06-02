const express = require('express');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
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

// DELETE /api/notes/:id - Delete a note by ID from db.json
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
  
    readFromFile(dbPath)
      .then((data) => JSON.parse(data))
      .then((json) => {
        const filteredNotes = json.filter((note) => note.id !== noteId);

        writeToFile(dbPath, filteredNotes);

        res.json({ message: `Note ${noteId} has been deleted` });
      })
        
});
  

module.exports = router;

