const { filterPets } = require('../searchProfile'); // Adjust the path if necessary

describe('filterPets function', () => {
  const petData = [
    {
      breed: 'Labrador',
      species: 'Dog',
      name: 'Kiwi'
    },
    {
      breed: 'Ragdoll',
      species: 'Cat',
      name: 'Alfalfa'
    },
    {
      breed: 'Parrot',
      species: 'Bird',
      name: 'Porpie'
    },
    {
      breed: 'Cockatoo',
      species: 'Bird',
      name: 'Loki'
    },
    // Add more test data as needed
  ];

  test('filters pets correctly when both species and breed are "any"', () => {
    const filteredPets = filterPets(petData, 'any', 'any');
    expect(filteredPets.length).toBe(petData.length);
  });

  test('filters pets correctly when only species is selected', () => {
    const selectedSpecies = 'Dog';
    const filteredPets = filterPets(petData, selectedSpecies.toLowerCase(), 'any');
    const expectedPets = petData.filter(pet => pet.species.toLowerCase() === selectedSpecies.toLowerCase());
    expect(filteredPets.length).toBe(expectedPets.length);
  });
  
  test('filters pets correctly when only species is selected 2', () => {
    const selectedSpecies = 'Bird';
    const filteredPets = filterPets(petData, selectedSpecies.toLowerCase(), 'any');
    const expectedPets = petData.filter(pet => pet.species.toLowerCase() === selectedSpecies.toLowerCase());
    expect(filteredPets.length).toBe(expectedPets.length);
  });

  test('filters pets correctly when both species and breed are specified', () => {
    const selectedSpecies = 'Cat';
    const selectedBreed = 'Ragdoll';
    const filteredPets = filterPets(petData, selectedSpecies.toLowerCase(), selectedBreed.toLowerCase());
    const expectedPets = petData.filter(pet => pet.species.toLowerCase() === selectedSpecies.toLowerCase() && pet.breed.toLowerCase() === selectedBreed.toLowerCase());
    expect(filteredPets.length).toBe(expectedPets.length);
  });
});
