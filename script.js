'use strict';


const uploadError = document.getElementById('uploadError');

function generateTicket(event) {
    event.preventDefault();

    const avatar = document.getElementById('avatar').files[0];
    const uploadError = document.getElementById('uploadError');
    const email = document.getElementById('email').value.trim();
    const fullName = document.getElementById('fullName').value.trim();
    const userName = document.getElementById('github').value.trim();

    if (!avatar) {
        uploadError.innerHTML = `<img src="assets/images/icon-info.svg" class="info" alt=""> Please upload an image (JPG or PNG, max 500KB).`;
        uploadError.classList.add('error');
        return;
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
}
