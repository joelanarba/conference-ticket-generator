const formElement = document.querySelector('form');
const uploadHint = document.getElementById('uploadHint');
const avatar = document.getElementById('avatar');
const uploadError = document.getElementById('uploadError');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const userName = document.getElementById('userName');
const userNameError = document.getElementById('userNameError');
const submitButton = document.getElementById('submitBtn');

const ticketName = document.getElementById('ticket-name');
const ticketEmail = document.getElementById('ticket-email');
const ticketAvatar = document.getElementById('ticketAvatar');
const ticketHandle = document.getElementById('ticketHandle');
const ticketNameDisplay = document.getElementById('ticketName');

// New elements for image preview functionality
const previewContainer = document.getElementById('previewContainer');
const uploadActions = document.getElementById('uploadActions');
const removeImageBtn = document.getElementById('removeImageBtn');
const changeImageBtn = document.getElementById('changeImageBtn');

const validateFileType = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  return allowedTypes.includes(file.type);
};

const validateFileSize = (file) => {
  const maxSize = 500 * 1024; // 500 KB
  return file.size <= maxSize;
};

const validateFile = (file) => {
  if (!file) {
    uploadError.textContent = 'No file selected.';
    uploadError.classList.add('error');
    return false;
  }
  
  if (!validateFileType(file)) {
    uploadError.textContent = 'Invalid file type. Only JPEG or PNG allowed.';
    uploadError.classList.add('error');
    return false;
  }
  
  if (!validateFileSize(file)) {
    uploadError.textContent = 'File size exceeds 500 KB.';
    uploadError.classList.add('error');
    return false;
  }

  uploadError.textContent = '';
  uploadError.classList.remove('error');
  return true;
};

// Function to display image preview
function displayImagePreview(file) {
  if (!previewContainer) return;
  
  // Create image preview if it doesn't exist
  if (!previewContainer.querySelector('img')) {
    const previewImg = document.createElement('img');
    previewImg.id = 'imagePreview';
    previewImg.style.maxWidth = '100%';
    previewImg.style.maxHeight = '150px';
    previewImg.style.borderRadius = '8px';
    previewImg.style.marginBottom = '10px';
    previewContainer.appendChild(previewImg);
  }
  
  const previewImg = previewContainer.querySelector('img');
  
  // Read and display the file
  const reader = new FileReader();
  reader.onload = function(e) {
    previewImg.src = e.target.result;
  };
  reader.readAsDataURL(file);
  
  // Hide upload hint, show preview and buttons
  uploadHint.style.display = 'none';
  previewContainer.style.display = 'flex';
  uploadActions.style.display = 'flex';
}

// Function to reset upload area
function resetUploadArea() {
  avatar.value = ''; // Clear file input
  uploadHint.style.display = 'block';
  
  if (previewContainer) {
    previewContainer.style.display = 'none';
    // Remove image if it exists
    const previewImg = previewContainer.querySelector('img');
    if (previewImg) {
      previewImg.remove();
    }
  }
  
  if (uploadActions) {
    uploadActions.style.display = 'none';
  }
  
  uploadError.textContent = '';
  uploadError.classList.remove('error');
}

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  let isValid = true;

  //NAME VALIDATION
  if (fullName.value.trim() === '') {
    fullNameError.textContent = 'Full Name is required.';
    isValid = false;
    fullNameError.classList.add('error');
  } else if (fullName.value.trim().length < 2) {
    fullNameError.textContent = 'Full Name must be at least 2 characters.';
    fullNameError.classList.add('error');
    isValid = false;
  } else if (!/^[\p{L}\s'-]+$/u.test(fullName.value.trim())) {
    fullNameError.textContent = 'Full Name can only contain letters, spaces, hyphens, and apostrophes.';
    fullNameError.classList.add('error');
    isValid = false;
  } else {
    fullNameError.textContent = '';
    fullNameError.classList.remove('error');
  }

  //EMAIL VALIDATION
  const emailValue = email.value.trim();
  if (emailValue === '') {
    emailError.textContent = 'Email Address is required.';
    emailError.classList.add('error');
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailValue)) {
    emailError.textContent = 'Please enter a valid email address.';
    emailError.classList.add('error');
    isValid = false;
  } else {
    emailError.textContent = '';
    emailError.classList.remove('error');
  }

  //USERNAME VALIDATION
  const userNameValue = userName.value.trim();
  if (userNameValue === '') {
    userNameError.textContent = 'GitHub Username is required.';
    userNameError.classList.add('error');
    isValid = false;
  } else if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(userNameValue)) {
    userNameError.textContent = 'Invalid GitHub Username format.';
    userNameError.classList.add('error');
    isValid = false;
  } else {
    userNameError.textContent = '';
    userNameError.classList.remove('error');
  }

  // AVATAR VALIDATION 
  const file = avatar.files[0]; // get first selected file

  if (!file) {
    uploadError.textContent = 'Please upload an avatar image.';
    uploadError.classList.add('error');
    isValid = false;
  } else if (!validateFile(file)) {
    isValid = false;
  }

  if (isValid) {
    generateTicket(file);
  }
});

function generateTicket(file) {
  // Update ticket details
  ticketName.textContent = fullName.value;
  ticketEmail.textContent = email.value;
  ticketNameDisplay.textContent = fullName.value;
  ticketHandle.innerHTML = `<img src="assets/images/icon-github.svg" alt="">${userName.value}`;

  // Avatar image preview
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      ticketAvatar.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Optionally scroll to ticket or show it (if you're hiding it initially)
  // document.querySelector('.ticket-section').scrollIntoView({ behavior: 'smooth' });
}

// Handle file selection
avatar.addEventListener('change', () => {
  const file = avatar.files[0];

  if (!file) {
    resetUploadArea();
    return;
  }

  if (validateFile(file)) {
    displayImagePreview(file);
  } else {
    resetUploadArea();
  }
});

// Initialize event listeners for buttons
if (removeImageBtn) {
  removeImageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetUploadArea();
  });
}

if (changeImageBtn) {
  changeImageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    avatar.click(); // Programmatically trigger file input
  });
}

// Initialize the upload area state
resetUploadArea();