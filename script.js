'use strict';


const uploadError = document.getElementById('uploadError');

function validName(name){
    if (!name) {
        nameError.innerHTML = `<img src="assets/images/icon-info.svg" class="info" alt=""> Please enter your full name.`;
        nameError.classList.add('error');
        
    } else {
        fullNameError.innerHTML = '';
        fullNameError.classList.remove('error');

    }
}
function generateTicket(event) {
    event.preventDefault();

    const avatar = document.getElementById('avatar').files[0];
    const uploadError = document.getElementById('uploadError');
    const email = document.getElementById('email').value.trim();
    const fullName = document.getElementById('fullName').value;
    const userName = document.getElementById('github').value.trim();
    // const displayError = document.querySelectorAll('.display-error');
    const fullNameError = document.getElementById('name-error');
    const emailError = document.querySelector('.email-error')
    const userNameError = document.querySelector('.userName-error')

    if (!avatar) {
        uploadError.innerHTML = `<img src="assets/images/icon-info.svg" class="info" alt=""> Please upload an image (JPG or PNG, max 500KB).`;
        uploadError.classList.add('error');
        // return;
    } 
    
    if(avatar.size > 500000){
        uploadError.innerHTML = `<img src="assets/images/icon-info.svg" class="info" alt=""> File too large. Please upload a photo under 500KB.`;
        uploadError.classList.add('error');
    }

    if(!['image/jpeg', 'image/png'].includes(avatar.type)){
        uploadError.innerHTML = `<img src="assets/images/icon-info.svg" class="info" alt=""> Only JPG and PNG formats are accepted.`;
        uploadError.classList.add('error');
    }

    // Other logic here...

   
    validName(fullName);
};

