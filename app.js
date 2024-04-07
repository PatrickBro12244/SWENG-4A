const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const multer = require('multer'); // Import multer for handling file uploads
const path = require('path');

const uri = "mongodb+srv://franciscokyle12345:cyt5m9JvsBDwk0Ny@stsweng.wjpjqmc.mongodb.net/";

const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Import the Pet model
const Pet = require('./database/schemas/Pet.js');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // File naming convention
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // File size limit: 10MB
}).single('image'); // Assuming the field name for image upload is 'image'

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse JSON bodies, currently for registration->r_form
app.use(express.json());

// Middleware for URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes

// Routes - Pages


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
app.get('/get-pets', (req, res) => {
  Pet.find()
    .then(pets => {
      res.json(pets);
    })
    .catch(error => {
      console.error('Error fetching pets:', error);
      res.status(500).send('Error fetching pets');
    });
});


// API route for serving images
app.get('/api/images/:imageName', (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(__dirname, 'uploads', imageName);

  // Send the image file
  res.sendFile(imagePath);
});


// Route to petSearch.html
app.get('/petSearch.html', (req, res) => {
  // Serve the petSearch.html file
  res.sendFile(path.join(__dirname, 'public', 'petSearch.html'));
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to handle pet creation
app.post('/create-pet', (req, res) => {
  // Handle file upload
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).send('Error uploading file');
    }

    try {
      // Create new pet document
      const pet = new Pet({
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        age: req.body.age,
        size: req.body.size,
        description: req.body.description,
        shelter: req.body.shelter,
        // Assuming image path is saved in 'uploads/' folder
        image: req.file ? '/uploads/' + req.file.filename : null,
      });

      // Save pet document to MongoDB
      await pet.save();

      // Redirect to petSearch.html upon successful creation
      res.redirect('/petSearch.html');
    } catch (error) {
      // Handle any errors
      console.error('Error creating pet profile:', error);
      // Send error response
      res.status(500).send('Error creating pet profile');
    }
  });
});

// Route to petSearch.html
app.get('/petSearch.html', (req, res) => {
  // Display alert indicating successful profile creation
  res.send('<script>alert("Successfully made profile!");</script>');
});