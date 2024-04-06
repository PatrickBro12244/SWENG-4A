document.addEventListener('DOMContentLoaded', () => {
  // Parse query parameters from the URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Get pet data from query parameters
  const petName = urlParams.get('name');
  const petSpecies = urlParams.get('species');
  const petBreed = urlParams.get('breed');
  const petImage = urlParams.get('image');
  const petDescription = decodeURIComponent(urlParams.get('description'));

  // Populate HTML elements with pet data
  document.getElementById('petNameRight').textContent = petName;
  document.getElementById('petSpeciesRight').textContent = petSpecies;
  document.getElementById('petBreedRight').textContent = petBreed;
  document.getElementById('petDescriptionLeft').textContent = petDescription;
  document.getElementById('petImageLeft').src = petImage;
});
