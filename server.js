const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static('public'));

// Use API routes
app.use('/api', apiRoutes);

// Use HTML routes
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
