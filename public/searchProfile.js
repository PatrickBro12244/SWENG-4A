
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
        <img src="${pet.image}" alt="${pet.name}"> <!-- Update image source URL here -->
        <h2>${pet.name}</h2>
        <p>${pet.breed}</p>
        <p class="overflow-scroll">${pet.description}</p>
        <a href="petProfile.html?name=${pet.name}&species=${pet.species}&breed=${pet.breed}&sizeParam=${pet.size}&shelterParam=${pet.shelter}&image=${encodeURIComponent(pet.image)}&description=${encodeURIComponent(pet.description)}&age=${pet.age}" class="see-profile-link">See Profile</a>
      </div>
    `;
  }



  async function updatePetProfiles() {
    const petData = await fetchPets();
    const filteredPets = filterPets(petData, speciesDropdown.value.toLowerCase(), breedDropdown.value.toLowerCase(), ageDropdown.value.toLowerCase(), sizeDropdown.value.toLowerCase());
    petContainer.innerHTML = filteredPets.map(generatePetProfile).join('');
  }
  updatePetProfiles();

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

   ageDropdown.innerHTML = '<option value="Any">Any</option>'; // Add option for "Any"

  ageDropdown.innerHTML += '<option value="below-1-year">Below 1 year</option>'; // Add option for below 1 year

  for (let i = 1; i <= 15; i++) {
    ageDropdown.innerHTML += `<option value="${i}-year">${i} year${i === 1 ? '' : 's'} old</option>`;
  }

  ageDropdown.innerHTML += '<option value="above-15-years">Above 15 years</option>'; // Add option for above 15 years

  // Populate initial breeds and update pet profiles
  populateBreeds(['Any']);
  searchButton.addEventListener('click', updatePetProfiles);

});
  // Function to filter pets based on selected species and breed
  function filterPets(pets, selectedSpecies, selectedBreed, selectedAge, selectedSize) {
  return pets.filter(pet => {
    const speciesMatch = selectedSpecies === "any" || pet.species.toLowerCase() === selectedSpecies;
    const breedMatch = selectedBreed === "any" || pet.breed.toLowerCase() === selectedBreed;
    const ageMatch = selectedAge === "any" || pet.age.toLowerCase() === selectedAge;
    const sizeMatch = selectedSize === "any" || pet.size.toLowerCase() === selectedSize;
    return speciesMatch && breedMatch && ageMatch && sizeMatch;
  });
}

  function populateBreeds(breeds) {
    breedDropdown.innerHTML = '';
    breeds.forEach((breed) => {
      breedDropdown.innerHTML += `<option value="${breed.toLowerCase()}">${breed}</option>`;
    });
  }

  

  module.exports = { filterPets, populateBreeds };

  