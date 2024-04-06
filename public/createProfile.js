document.addEventListener('DOMContentLoaded', () => {
  const speciesDropdown = document.getElementById('speciesDropdown');
  const breedDropdown = document.getElementById('breedDropdown');
  
  speciesDropdown.addEventListener('change', () => {
    const selectedSpecies = speciesDropdown.value.toLowerCase();
    const speciesBreeds = {
      dog: ['Shih Tzu', 'Mini Poodle', 'Border Collie', 'Labrador', 'Yorkie'],
      cat: ['Ragdoll', 'Shorthair', 'Maine Coon', 'Siamese'],
      bird: ['Parakeet', 'Parrot', 'Cockatoo'],
      hamster: ['Dwarf', 'Roborovski', 'Syrian']
    };
    
    // Clear previous options
    breedDropdown.innerHTML = '';

    // Populate breed dropdown based on selected species
    speciesBreeds[selectedSpecies].forEach(breed => {
      breedDropdown.innerHTML += `<option value="${breed.toLowerCase()}">${breed}</option>`;
    });
  });
  
  
    ageDropdown.innerHTML += '<option value="below-1-year">Below 1 year</option>'; // Add option for below 1 year
  
    for (let i = 1; i <= 15; i++) {
      ageDropdown.innerHTML += `<option value="${i}-year">${i} year${i === 1 ? '' : 's'} old</option>`;
    }
  
    ageDropdown.innerHTML += '<option value="above-15-years">Above 15 years</option>'; // Add option for above 15 years

    

  petForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Extract data from form fields
    const name = document.getElementById('petName').value;
    const species = document.getElementById('speciesDropdown').value;
    const breed = document.getElementById('breedDropdown').value;
    const age = document.getElementById('ageDropdown').value;
    const size = document.getElementById('sizeDropdown').value;
    const image = document.getElementById('imageUpload').files[0];
    const behaviorsAndCharacteristics = document.getElementById('behaviorsAndCharacteristics').value;
    const shelter = document.getElementById('shelter').value;

    function displayMessage(messageText, messageType) {
      const messageContainer = document.getElementById('message');
      const messageTextElement = document.getElementById('message-text');
    
      messageContainer.classList.remove('hidden');
      messageContainer.classList.add(messageType); // Add the success or error class
    
      messageTextElement.innerText = messageText;
    
      setTimeout(() => {
        messageContainer.classList.add('hidden');
        messageTextElement.innerText = '';
      }, 3000); // Hide the message after 3 seconds
      
    }
    // Error checking
    if (!name || !species || !breed || !age || !size || !image || !behaviorsAndCharacteristics || !shelter) {
      alert('Please fill in all fields');
      return;
    }

    // Check if the uploaded file is an image
    if (!image.type.startsWith('image/')) {
      alert('Please upload an image file');
      document.getElementById('imageUpload').value = ''; // Clear the input field
      return;
    }

 
    // Create a FormData object to store form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('species', species);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('size', size);
    formData.append('behaviorsAndCharacteristics', behaviorsAndCharacteristics);
    formData.append('shelter', shelter);
    formData.append('imageUpload', image); // Append the image file to FormData

    try {
      // Send form data to the server using Fetch API
      const response = await fetch('/create-pet', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert(responseData.message);
      } else {
        alert('Error: ' + responseData.message);
      }
    } catch (error) {
      console.error('Error creating pet profile:', error);
      alert('Error creating pet profile. Please try again later.');
    }
  });
});
