// Function to handle responsive navigation toggle
function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }

  // After toggling, update the active link
  updateActiveLink();
}

/* //////////////////////////////////////////// */
/* /////////////// DOM ELEMENTS /////////////// */
/* //////////////////////////////////////////// */

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close"); // Selecting the close modal button
const successCloseBtn = document.querySelector(".btn-close"); // Selecting the close modal button when form has been validated
const form = document.querySelector("form[name='reserve']"); // Selecting the form
const successMessage = document.getElementById("success-message"); // Success message div

/* //////////////////////////////////////////// */
/* ////////////////// MODAL /////////////////// */
/* //////////////////////////////////////////// */

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  form.style.display = "block"; // Shows the form
  successMessage.style.display = "none"; // Hides the success message
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}
// close modal event
closeBtn.addEventListener("click", closeModal);

// close modal event (with the "Fermer" button)
successCloseBtn.addEventListener("click", closeModal);

/* //////////////////////////////////////////// */
/* ////////////////// ACTIVE ////////////////// */
/* //////////////////////////////////////////// */

// Function to update active link (and red bground) based on display value
function updateActiveLink() {
  const links = document.querySelectorAll(".main-navbar a");

  // Remove 'active' class from all links
  links.forEach((link) => {
    link.classList.remove("active");
  });

  // Find the first visible link and add the 'active' class
  for (let i = 0; i < links.length; i++) {
    if (links[i].offsetParent !== null) {
      // Check if link is visible (desktop VS mobile)
      links[i].classList.add("active");
      break;
    }
  }
}

// Updating active link on page load
updateActiveLink();

// Event listener for window resize (responsive)to update active link
window.addEventListener("resize", updateActiveLink);

/* //////////////////////////////////////////// */
/* ///////////// FORM VALIDATION ////////////// */
/* //////////////////////////////////////////// */

// Validation function
function validate() {
  let valid = true;
  clearErrors();

  // Check first name
  const firstName = document.getElementById("first");
  if (firstName.value.trim().length < 2) {
    showError(firstName, "Ce champ doit comporter un minimum de 2 caractères.");
    valid = false;
  }

  // Check last name
  const lastName = document.getElementById("last");
  if (lastName.value.trim().length < 2) {
    showError(lastName, "Ce champ doit comporter un minimum de 2 caractères.");
    valid = false;
  }

  // Check email
  const email = document.getElementById("email");
  const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.value)) {
    showError(email, "L'adresse mail doit être valide.");
    valid = false;
  }

  // Check birthdate (no empty nor future bdate)
  const birthdate = document.getElementById("birthdate");
  const birthdateValue = new Date(birthdate.value);
  const now = new Date();
  if (!birthdate.value || birthdateValue > now) {
    showError(birthdate, "Vous devez entrer une date de naissance valide.");
    valid = false;
  }

  // Check numbers of tournaments
  const quantity = document.getElementById("quantity");
  if (!/^\d+$/.test(quantity.value)) {
    showError(quantity, "Ce champ ne peut comporter que des chiffres.");
    valid = false;
  }

  // Check location selected
  const locationInputs = document.querySelectorAll('input[name="location"]');
  if (![...locationInputs].some((input) => input.checked)) {
    showError(locationInputs[0], "Vous devez choisir une option.");
    valid = false;
  }

  // Check checkbox with terms and conditions
  const checkbox1 = document.getElementById("checkbox1");
  if (!checkbox1.checked) {
    showError(checkbox1, "Vous devez accepter les conditions d'utilisation.");
    valid = false;
  }

  return valid;
}

/* //////////////////////////////////////////// */
/* ////////////// ERROR MESSAGES ////////////// */
/* //////////////////////////////////////////// */

// Function to show error messages
function showError(input, message) {
  const formData = input.closest(".formData");
  formData.setAttribute("data-error", message);
  formData.setAttribute("data-error-visible", "true");
  input.style.border = "2px solid #ff4e60";
}

// Function to clear all error messages
function clearErrors() {
  formData.forEach((formField) => {
    formField.removeAttribute("data-error");
    formField.removeAttribute("data-error-visible");
    formField.querySelector("input").style.border = "none";
  });
}

// Attach the validation function to the form submit event
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the real submission of the form (fake form)
  if (validate()) {
    form.style.display = "none"; // Hide the form to show success message
    successMessage.style.display = "flex"; // Show the success message
    successMessage.style.flexDirection = "column";
  } else {
    console.log("Form is invalid");
  }
});

// Resetting the inputs if the form has been validated successfully
document
  .getElementById("reservation-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    clearFormInputs();
    showSuccessMessage();
  });

function clearFormInputs() {
  document.getElementById("reservation-form").reset();
}

function showSuccessMessage() {
  document.querySelector(".modal-content").classList.add("show-success");
}
