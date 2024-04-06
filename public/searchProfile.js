document.addEventListener('DOMContentLoaded', () => {
  const speciesDropdown = document.getElementById('speciesDropdown');
  const breedDropdown = document.getElementById('breedDropdown');
  const ageDropdown = document.getElementById('ageDropdown');
  const petContainer = document.querySelector('.pet-container');
  const searchButton = document.getElementById("search-button");

  // Function to populate breed dropdown based on selected species


  // Function to fetch pets from the server
  async function fetchPets() {
    try {
      const response = await fetch('/get-pets');
      return await response.json();
    } catch (error) {
      console.error('Error fetching pets:', error);
      return [];
    }
  }

  // Function to generate HTML for pet profile
  function generatePetProfile(pet) {
    return `
      <div class="pet-profile ${pet.breed.toLowerCase()}">
        <img src="assets/${pet.image}" alt="${pet.name}"> <!-- Update image source URL here -->
        <h2>${pet.name}</h2>
        <p>${pet.breed}</p>
        <p class="overflow-scroll">${pet.description}</p>
        <a href="petProfile.html?name=${pet.name}&species=${pet.species}&breed=${pet.breed}&sizeParam=${pet.size}&shelterParam=${pet.shelter}&image=${encodeURIComponent(pet.image)}&description=${encodeURIComponent(pet.description)}&age=${pet.age}" class="see-profile-link">See Profile</a>
      </div>
    `;
  }

  updatePetProfiles();

  // Function to update pet profiles based on selected species and breed
  async function updatePetProfiles() {
    const petData = await fetchPets();
    const filteredPets = filterPets(petData, speciesDropdown.value.toLowerCase(), breedDropdown.value.toLowerCase());
    petContainer.innerHTML = filteredPets.map(generatePetProfile).join('');
  }
  


  // Event listeners for species dropdown, breed dropdown, and search button
  speciesDropdown.addEventListener('change', () => {
    const selectedSpecies = speciesDropdown.value.toLowerCase();
    const selectedBreed = breedDropdown.value.toLowerCase();
    const speciesBreeds = {
      dog: ['Any','Shih Tzu', 'Mini Poodle', 'Border Collie', 'Labrador', 'Yorkie'],
      cat: ['Any','Ragdoll', 'Shorthair', 'Maine Coon', 'Siamese'],
      bird: ['Any','Parakeet', 'Parrot', 'Cockatoo'],
      hamster: ['Any','Dwarf', 'Roborovski', 'Syrian']
    };
    populateBreeds(speciesBreeds[selectedSpecies] || ['Any']);

  });


  searchButton.addEventListener('click', updatePetProfiles);

  // Populate age dropdown
  for (let i = 0; i < 15; i++) {
    ageDropdown.innerHTML += `<option value="${i + 1}-year">${i + 1} year${i === 0 ? '' : 's'} old</option>`;
  }

  // Populate initial breeds and update pet profiles
  populateBreeds(['Any']);
  searchButton.addEventListener('click', updatePetProfiles);

});
  // Function to filter pets based on selected species and breed
  function filterPets(pets, selectedSpecies, selectedBreed) {
    return pets.filter(pet => {
      const speciesMatch = selectedSpecies === "any" || pet.species.toLowerCase() === selectedSpecies;
      const breedMatch = selectedBreed === "any" || pet.breed.toLowerCase() === selectedBreed;
      return speciesMatch && breedMatch;
    });
  }

  function populateBreeds(breeds) {
    breedDropdown.innerHTML = '';
    breeds.forEach((breed) => {
      breedDropdown.innerHTML += `<option value="${breed.toLowerCase()}">${breed}</option>`;
    });
  }

  module.exports = { filterPets, populateBreeds };
