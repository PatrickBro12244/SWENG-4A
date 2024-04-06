const mongoose = require('mongoose');
const Pet = require('./schemas/Pet');

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/STSWENG')
  .then(async () => {
    console.log('Connected to MongoDB');
    // Populate pets
    //await petPopulate();
  })
  .catch((err) => console.error('Could not connect to MongoDB', err));

/**
 * Populates pet data
 */
async function petPopulate() {
  try {
    await Pet.insertMany([
      {
        breed: 'Labrador',
        species: 'Dog',
        image: '/uploads/sample_dog_labrador.jpg',
        description: `I am a Labrador Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
        name: 'Kiwi',
        size: 'Medium',
        shelter: 'ABC Shelter',
        age: '1 year',
      },
      {
        breed: 'Shih Tzu',
        species: 'Dog',
        image: '/uploads/chia.jpg',
        description: `I am a Labrador Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
        name: 'Chia',
        size: 'Toy',
        shelter: 'ABC Shelter',
        age: '1 year',
      },
      {
        breed: 'Mini Poodle',
        species: 'Dog',
        image: 'uploads/sample_dog_toypoodle.jpg',
        description: `I am a Mini Poodle Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
        name: 'Korki',
        size: 'Medium',
        shelter: 'ABC Shelter',
        age: '1 year',
      },
      {
        breed: 'Ragdoll',
        species: 'Cat',
        image: '/uploads/sample_cat_ragdoll.jpg',
        description: `I am a Ragdoll CatLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
        name: 'Alfalfa',
        size: 'Medium',
        shelter: 'ABC Shelter',
        age: '1 year',
      },
      {
        breed: 'Siamese',
        species: 'Cat',
        image: '/uploads/sample_cat_siamese.jpg',
        description: `I am a Siamese CatLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
        name: 'Barret',
        size: 'Medium',
        shelter: 'ABC Shelter',
        age: '1 year',
      },
      {
        breed: 'Cockatoo',
        species: 'Bird',
        image: '/uploads/sample_bird_cockatoo.jpg',
        description: `I am a CockatooLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
        name: 'Loki',
        size: 'Medium',
        shelter: 'ABC Shelter',
        age: '1 year',
      },
      {
        breed: 'Siamese',
        species: 'Cat',
        image: '/uploads/sample_cat_siamese2.jpg',
        description: `I am a Siamese CatLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
        name: 'Tim',
        size: 'Medium',
        shelter: 'ABC Shelter',
        age: '1 year',
      },
      {
        breed: 'Parrot',
        species: 'Bird',
        image: '/uploads/sample_bird_parrot.jpg',
        description: `I am a Parrot Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
        name: 'Rod',
        size: 'Medium',
        shelter: 'ABC Shelter',
        age: '1 year',
      },
      {
        breed: 'Dwarf',
        species: 'Hamster',
        image: '/uploads/sample_hamster_dwarf.jpg',
        description: `I am a Dwarf Hamster Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
        name: 'Hammantha',
        size: 'Medium',
        shelter: 'ABC Shelter',
        age: '1 year',
      },
      {
        breed: 'Parrot',
        species: 'Bird',
        image: '/uploads/sample_bird_parrot.jpg',
        description: `I am a Parrot Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
        name: 'Porpie',
        size: 'Medium',
        shelter: 'ABC Shelter',
        age: '1 year',
      },
      {
        breed: 'Syrian',
        species: 'Hamster',
        image: '/uploads/sample_hamster_syrian.jpg',
        description: `I am a Syrian Hamster Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
        name: 'Shark',
        size: 'Medium',
        shelter: 'ABC Shelter',
        age: '1 year',
      },
      
      
      
      // Add other pet data here...
    ]);
    console.log('Pet data populated successfully.');
  } catch (e) {
    console.error('Error populating pet data:', e.message);
  }
}
