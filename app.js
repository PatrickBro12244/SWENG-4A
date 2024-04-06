const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');


const app = express();

// Import the Pet model
const Pet = require('./database/schemas/Pet');


// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse JSON bodies, currently for registration->r_form
app.use(express.json());

// Middleware for URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes

// Routes - Pages

require('./database'); // mongodb stuff now in database

app.get('/', (req, res) => {
  res.redirect('/registration_route');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`); // log method and url, GET:/users
  next();
});

// Route to get all pets from the database
app.get('/get-pets', async (req, res) => {
  try {
    // Fetch all pets from the database
    const pets = await Pet.find();
    res.json(pets); // Send the fetched pets as JSON response
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).send('Error fetching pets');
  }
});

// API route for serving images
app.get('/api/images/:imageName', (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(__dirname, 'assets', imageName);

  // Send the image file
  res.sendFile(imagePath);
});


