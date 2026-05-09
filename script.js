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
let fullNameInput;
fullName.addEventListener("input", (e) => {
  fullNameInput = e.target.value;
  if (
    validatorFunction(fullNameInput, validateFullName, fullName, fullNameError)
  ) {
    isFullNameValid = true;
  } else {
    isFullNameValid = false;
  }
});

// Email Validator
email.addEventListener("input", (e) => {
  let emailInput = e.target.value;
  if (validatorFunction(emailInput, validateEmail, email, emailError)) {
    isEmailValid = true;
  } else {
    isEmailValid = false;
  }
});

// Password Validator
let passwordInput;
password.addEventListener("input", (e) => {
  passwordInput = e.target.value;
  if (
    validatorFunction(passwordInput, validatePassword, password, passwordError)
  ) {
    isPasswordValid = true;
  } else {
    isPasswordValid = false;
  }
});

// Confirm Password Validator
confirmPswrd.addEventListener("input", (e) => {
  let confirmPasswordInput = e.target.value;
  if (
    validatorFunction(
      confirmPasswordInput,
      validateConfirmPassword,
      confirmPswrd,
      confirmError,
    )
  ) {
    isConfirmPasswordValid = true;
  } else {
    isConfirmPasswordValid = false;
  }
});

// Age Validator
age.addEventListener("input", (e) => {
  let ageInput = Number(e.target.value);

  if (validatorFunction(ageInput, validateAge, age, ageError)) {
    isAgeValid = true;
  } else {
    isAgeValid = false;
  }
});

// Handles Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    isFullNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isAgeValid
  ) {
    successMessage.style.display = "flex";
    // Extra Feature: Redirects to a simple homepage, to show the user successfully validated and created their account
    setTimeout(() => {
      window.location.href = `Readly/homepage.html?name=${fullNameInput}`;
    }, 3000);
  }
});

/* ***REFACTOR*** - Instead of repetitively calling the same error message class over all the inputs, just put it in a simple function and pass
 in the values for each input, makes it easier to read and less clustered.
*/
const validatorFunction = (input, validateFunc, inputElem, inputError) => {
  if (!validateFunc(input)) {
    inputElem.classList.remove("success-border");
    inputElem.classList.add("error-border");
    inputError.style.display = "block";
  } else {
    inputElem.classList.add("success-border");
    inputError.style.display = "none";
    return true;
  }

  if (!input) {
    inputElem.classList.remove("success-border");
    inputElem.classList.remove("error-border");
    inputError.style.display = "none";
  }
};

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
  const upperAndLowerCase = /[A-Z]/;
  const specialCharacters = /[!@#$%^&*]/;
  if (
    password.length < 8 ||
    !(
      digit.test(password) &&
      upperAndLowerCase.test(password) &&
      specialCharacters.test(password)
    ) ||
    password.includes(" ")
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
