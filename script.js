// Form element
const form = document.getElementById("user-registration");

// Input elements
const fullName = document.querySelector("#fullname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPswrd = document.querySelector("#confirm-pswrd");
const age = document.querySelector("#age");

// error messages
const fullNameError = document.querySelector("#fullname-error");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const confirmError = document.querySelector("#confirm-error");
const ageError = document.querySelector("#age-error");

// success message
const successMessage = document.querySelector(".success-message");

// track validation states for inputs
let isFullNameValid = false;
let isEmailValid = false;
let isPasswordValid = false;
let isConfirmPasswordValid = false;
let isAgeValid = false;

// Full Name Validator
fullName.addEventListener("input", (e) => {
  let fullNameInput = e.target.value;

  if (!validateFullName(fullNameInput)) {
    fullName.classList.remove("success-border");
    fullName.classList.add("error-border");
    fullNameError.style.display = "block";
  } else {
    fullNameError.style.display = "none";
    fullName.classList.add("success-border");
    isFullNameValid = true;
  }

  if (!fullNameInput) {
    fullName.classList.remove("error-border");
    fullName.classList.remove("success-border");
    fullNameError.style.display = "none";
  }
});

// Email Validator
email.addEventListener("input", (e) => {
  let emailInput = e.target.value;

  if (!validateEmail(emailInput)) {
    email.classList.remove("success-border");
    email.classList.add("error-border");
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
    email.classList.add("success-border");
    isEmailValid = true;
  }

  if (!emailInput) {
    email.classList.remove("error-border");
    email.classList.remove("success-border");
    emailError.style.display = "none";
  }
});

// Password Validator
let passwordInput;
password.addEventListener("input", (e) => {
  passwordInput = e.target.value;

  if (!validatePassword(passwordInput)) {
    password.classList.remove("success-border");
    password.classList.add("error-border");
    passwordError.style.display = "block";
  } else {
    password.classList.add("success-border");
    passwordError.style.display = "none";
    isPasswordValid = true;
  }

  if (!passwordInput) {
    password.classList.remove("success-border");
    password.classList.remove("error-border");
    passwordError.style.display = "none";
  }
});

// Confirm Password Validator
confirmPswrd.addEventListener("input", (e) => {
  let confirmPasswordInput = e.target.value;

  if (!validateConfirmPassword(confirmPasswordInput)) {
    confirmPswrd.classList.remove("success-border");
    confirmPswrd.classList.add("error-border");
    confirmError.style.display = "block";
    isConfirmPasswordValid = false;
  } else {
    confirmPswrd.classList.add("success-border");
    confirmError.style.display = "none";
    isConfirmPasswordValid = true;
  }

  if (!confirmPasswordInput) {
    confirmPswrd.classList.remove("success-border");
    confirmPswrd.classList.remove("error-border");
    confirmError.style.display = "none";
  }
});

// Age Validator
age.addEventListener("input", (e) => {
  let ageInput = Number(e.target.value);

  if (!validateAge(ageInput)) {
    age.classList.remove("success-border");
    age.classList.add("error-border");
    ageError.style.display = "block";
  } else {
    age.classList.add("success-border");
    ageError.style.display = "none";
    isAgeValid = true;
  }

  if (!ageInput) {
    age.classList.remove("success-border");
    age.classList.remove("error-border");
    ageError.style.display = "none";
  }
});

// Handles Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("hey");
  if (
    isFullNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isAgeValid
  ) {
    successMessage.style.display = "flex";
  }
});

// Validation Functions for each input
const validateFullName = (fullname) => {
  if (!fullname) return false;
  /* the string must return up to two seperate words when seperated by a space character
     and the second element in the array must have some value inside for it to be valid to avoid a user just pressing
     space bar and breaking the validation. Each name must also have more than two letters.
  */
  const getFullNameArray = fullname.split(" ");
  if (
    getFullNameArray.length <= 1 ||
    getFullNameArray[1] === "" ||
    getFullNameArray[0].length < 2 ||
    getFullNameArray[1].length < 2
  ) {
    return false;
  }
  return true;
};

const validateEmail = (email) => {
  if (!email) return false;
  /* the email MUST include: an undefined number of characters that are not whitespace or @, 
  then it must have the special character "@" following after, then another undefined number of characters
  for the domain but should not include whitespace or @, then followed immediately by "." 
  and then a domain extension of at least 2 chars e.g "co", "org", and not just "com".
  */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return false; // the test function returns a true or false
  return true;
};

const validatePassword = (password) => {
  if (!password) return false;
  /* Check that the password string includes at least one digit, one upper and lowercase char
  and one special character with a minimum of 8 characters in total
  */
  const digit = /[0-9]/;
  const upperAndLowerCase = /[a-zA-Z]/;
  const specialCharacters = /[!@#$%^&*]/;
  if (
    password.length < 8 ||
    !(
      digit.test(password) &&
      upperAndLowerCase.test(password) &&
      specialCharacters.test(password)
    )
  ) {
    return false;
  }
  return true;
};

const validateConfirmPassword = (confirmPswrd) => {
  if (!confirmPswrd) return false;
  if (passwordInput !== confirmPswrd || confirmPswrd.length < 8) return false;
  return true;
};

const validateAge = (age) => {
  if (!age) return false;
  if (age < 18) return false;
  return true;
};
