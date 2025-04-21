const formElement = document.querySelector('form');
const formSection = document.querySelector('.form-section');
const ticketSection = document.querySelector('.ticket-section');
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

const previewContainer = document.getElementById('previewContainer');
const uploadActions = document.getElementById('uploadActions');
const removeImageBtn = document.getElementById('removeImageBtn');
const changeImageBtn = document.getElementById('changeImageBtn');

// Hide ticket section by default when the page loads
window.addEventListener('DOMContentLoaded', () => {
  ticketSection.style.display = 'none';
});

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

// Toggle visibility between form and ticket sections
function showTicketSection() {
  formSection.style.display = 'none';
  ticketSection.style.display = 'flex'; 
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
    showTicketSection(); // Show ticket section if validation passes
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

document.addEventListener('DOMContentLoaded', function() {
  // Create script element for html2canvas
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  script.async = true;
  document.head.appendChild(script);
  
  // Initializing the download functionality once html2canvas is loaded
  script.onload = function() {
    const downloadBtn = document.getElementById('downloadTicketBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', downloadTicket);
    }
  };
});

// Function to download the ticket as an image
function downloadTicket() {
  const ticketElement = document.querySelector('.ticket');
  
  // Show loading state
  const downloadBtn = document.getElementById('downloadTicketBtn');
  const originalText = downloadBtn.textContent;
  downloadBtn.textContent = 'Generating...';
  downloadBtn.disabled = true;
  
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '-9999px';
  
  const ticketClone = ticketElement.cloneNode(true);
  

  ticketClone.style.backgroundColor = 'var(--neutral-900)';
  ticketClone.style.backgroundImage = 'url("assets/images/pattern-ticket.svg")';
  ticketClone.style.backgroundSize = 'contain';
  ticketClone.style.backgroundRepeat = 'no-repeat';
  ticketClone.style.borderRadius = '8px';
  ticketClone.style.padding = '20px';
  ticketClone.style.width = ticketElement.offsetWidth + 'px';
  ticketClone.style.height = ticketElement.offsetHeight + 'px';
  ticketClone.style.display = 'grid';
  ticketClone.style.gap = '20px';
  
  // Apply additional styles to ensure all backgrounds are captured
  ticketClone.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
  
  // Add a surrounding container with proper background
  const backgroundContainer = document.createElement('div');
  backgroundContainer.style.backgroundColor = 'var(--neutral-900)';
  backgroundContainer.style.padding = '20px';
  backgroundContainer.style.borderRadius = '12px';
  backgroundContainer.style.width = (ticketElement.offsetWidth + 40) + 'px'; // Add padding to width
  backgroundContainer.style.height = (ticketElement.offsetHeight + 40) + 'px'; // Add padding to height
  
  // Add the ticket to the background container
  backgroundContainer.appendChild(ticketClone);
  
  // Add the container to our temp element
  tempContainer.appendChild(backgroundContainer);
  
  // Add the temp container to the document
  document.body.appendChild(tempContainer);
  
  // Use html2canvas with the explicit background color
  html2canvas(backgroundContainer, {
    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--neutral-900').trim() || '#0E0933',
    scale: 2, 
    logging: false,
    allowTaint: true,
    useCORS: true,
    onclone: function(clonedDoc) {

      const clonedTicket = clonedDoc.querySelector('.ticket');
      if (clonedTicket) {
        // Force background to be visible
        clonedTicket.style.backgroundColor = 'var(--neutral-900)';
      }
    }
  }).then(canvas => {
    // Convert canvas to blob
    canvas.toBlob(function(blob) {
      // Create a download link
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      
      // Generate filename with user's name (sanitized)
      const userName = document.getElementById('ticketName').textContent.trim();
      const safeUserName = userName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      downloadLink.download = `coding_conf_ticket_${safeUserName}.png`;
      
      // Trigger download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Release object URL
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      // Clean up the temporary container
      document.body.removeChild(tempContainer);
      
      // Reset button state
      downloadBtn.textContent = originalText;
      downloadBtn.disabled = false;
    });
  }).catch(error => {
    console.error('Error generating ticket image:', error);
    
    // Clean up the temporary container even on error
    if (document.body.contains(tempContainer)) {
      document.body.removeChild(tempContainer);
    }
    
    downloadBtn.textContent = originalText;
    downloadBtn.disabled = false;
    alert('There was an error generating your ticket. Please try again.');
  });
}