const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Import uuid for unique IDs

const router = express.Router();

// GET /api/notes - Read and return all notes from db.json
router.get('/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to read notes' });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// POST /api/notes - Add a new note to db.json
router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4(); // Assign a unique ID to the new note

    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to read notes' });
        } else {
            const notes = JSON.parse(data);
            notes.push(newNote);

            fs.writeFile('db.json', JSON.stringify(notes, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Failed to save note' });
                } else {
                    res.json(newNote);
                }
            });
        }
    });
});

module.exports = router;
