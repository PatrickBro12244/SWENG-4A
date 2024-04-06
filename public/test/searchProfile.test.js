const { filterPets } = require('../searchProfile'); // Adjust the path if necessary

describe('filterPets function', () => {
  const petData = [
    {
      breed: 'Labrador',
      species: 'Dog',
      name: 'Kiwi',
      age: '3-year', // Add age data for testing
      size: 'medium' // Add size data for testing
    },
    {
      breed: 'Ragdoll',
      species: 'Cat',
      name: 'Alfalfa',
      age: '2-year', // Add age data for testing
      size: 'large' // Add size data for testing
    },
    {
      breed: 'Parrot',
      species: 'Bird',
      name: 'Porpie',
      age: '5-year', // Add age data for testing
      size: 'small' // Add size data for testing
    },
    {
      breed: 'Cockatoo',
      species: 'Bird',
      name: 'Loki',
      age: '1-year', // Add age data for testing
      size: 'medium' // Add size data for testing
    },
    // Add more test data as needed
  ];

  test('filters pets correctly when both species and breed are "any"', () => {
    const filteredPets = filterPets(petData, 'any', 'any', 'any', 'any'); // Add age and size as "any"
    expect(filteredPets.length).toBe(petData.length);
  });

  test('filters pets correctly when only species is selected', () => {
    const selectedSpecies = 'Dog';
    const filteredPets = filterPets(petData, selectedSpecies.toLowerCase(), 'any', 'any', 'any'); // Add age and size as "any"
    const expectedPets = petData.filter(pet => pet.species.toLowerCase() === selectedSpecies.toLowerCase());
    expect(filteredPets.length).toBe(expectedPets.length);
  });
  
  test('filters pets correctly when only species is selected 2', () => {
    const selectedSpecies = 'Bird';
    const filteredPets = filterPets(petData, selectedSpecies.toLowerCase(), 'any', 'any', 'any'); // Add age and size as "any"
    const expectedPets = petData.filter(pet => pet.species.toLowerCase() === selectedSpecies.toLowerCase());
    expect(filteredPets.length).toBe(expectedPets.length);
  });

  test('filters pets correctly when both species and breed are specified', () => {
    const selectedSpecies = 'Cat';
    const selectedBreed = 'Ragdoll';
    const filteredPets = filterPets(petData, selectedSpecies.toLowerCase(), selectedBreed.toLowerCase(), 'any', 'any'); // Add age and size as "any"
    const expectedPets = petData.filter(pet => pet.species.toLowerCase() === selectedSpecies.toLowerCase() && pet.breed.toLowerCase() === selectedBreed.toLowerCase());
    expect(filteredPets.length).toBe(expectedPets.length);
  });

  test('filters pets correctly based on age', () => {
    const selectedAge = '3-year';
    const filteredPets = filterPets(petData, 'any', 'any', selectedAge, 'any'); // Filter based on age
    const expectedPets = petData.filter(pet => pet.age.toLowerCase() === selectedAge.toLowerCase());
    expect(filteredPets.length).toBe(expectedPets.length);
  });

  test('filters pets correctly based on size', () => {
    const selectedSize = 'Medium';
    const filteredPets = filterPets(petData, 'any', 'any', 'any', selectedSize); // Filter based on size
    const expectedPets = petData.filter(pet => pet.size.toLowerCase() === selectedSize);
    expect(filteredPets.length).toBe(expectedPets.length);
  });


  test('filters pets correctly when species, breed, age, and size are specified', () => {
    const selectedSpecies = 'Dog';
    const selectedBreed = 'Labrador';
    const selectedAge = '3-year'; // Specify age
    const selectedSize = 'Medium'; // Specify size
    const filteredPets = filterPets(petData, selectedSpecies.toLowerCase(), selectedBreed.toLowerCase(), selectedAge, selectedSize);
    const expectedPets = petData.filter(pet => 
      pet.species.toLowerCase() === selectedSpecies.toLowerCase() &&
      pet.breed.toLowerCase() === selectedBreed.toLowerCase() &&
      pet.age.toLowerCase() === selectedAge.toLowerCase() &&
      pet.size.toLowerCase() === selectedSize
    );
    expect(filteredPets.length).toBe(expectedPets.length);
  });
});
