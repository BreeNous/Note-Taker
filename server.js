const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const routes = require('./routes'); // Import the index.js file from the routes folder

const app = express();
const PORT = process.env.PORT || 8080;

// Custom middleware
app.use(clog);

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static('public'));

// Use the routes defined in the index.js file
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} link: http://localhost:${PORT}`);
});
