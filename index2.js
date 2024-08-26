const express = require('express');

const bodyparser=require('body-parser')
const app = express();
const port = 8888;
const eventRoutes = require('./apiroutes');

// Use routes
app.use('/api/v3/app', eventRoutes);
// Middleware to parse JSON
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// MongoDB connection URL and Database Name




// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
