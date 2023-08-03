const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imageView.style.backgroundImage = `url(${imgLink})`;
    imageView.textContent="";
    imageView.style.border=0;
}

// dropArea.addEventListener("dragover", function(e){
//     e.preventDefault();
//     uploadImage();
// });
// dropArea.addEventListener("drop", function(e){
//     e.preventDefault();
//     inputFile.files=e.dataTransfer.files;
//     uploadImage();
// })


// form validation


var nameError=document.getElementById("name-error");
var phoneError=document.getElementById("phone-error");
var emailError=document.getElementById("email-error");

function validateName(){
    var name=document.getElementById("contact-name").value;
    
    if(name.length == 0){
        nameError.innerHTML= 'Name is required';
        return false
    }

    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.innerHTML='Write full name';
        return false
    }
    nameError.innerHTML='<i class="fa-solid fa-circle-check"></i>';
    return true;
}



function validatePhone(){
    var phone=document.getElementById("contact-phone").value;

    if(phone.length==0){
        phoneError.innerHTML='phone no is required';
        return false;

    }

    if(phone.length !== 10){
        phoneError.innerHTML='Phone no should be 10 digits';
        return false;
    }

    if(!phone.match(/^[0-9]{10}$/)){
        phoneError.innerHTML='only digits please.';
        return false;
    }

    phoneError.innerHTML='<i class="fa-solid fa-circle-check"></i>';
    return true;
}




 function validateEmail(){
    var email=document.getElementById("contact-email").value;
    if (email.length === 0) {
        emailError.innerHTML = 'Email is required';
        return false;
      }
    
      // Use a regex pattern to validate the email format
      var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email.match(emailPattern)) {
        emailError.innerHTML = 'Invalid email address';
        return false;
      }
    
      emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      return true;
 }