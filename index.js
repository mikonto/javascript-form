const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");
const country = document.getElementById("country");
const countryError = document.querySelector("#country + span.error");
const zip = document.getElementById("zip");
const zipError = document.querySelector("#zip + span.error");
const password = document.getElementById("password");
const passwordError = document.querySelector("#password + span.error");
const passwordConfirm = document.getElementById("password-confirm");
const passwordConfirmError = document.querySelector(
  "#password-confirm + span.error"
);
const submit = document.getElementById("submit");
const reset = document.getElementById("reset");

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    showErrorEmail();
  }
});

function showErrorEmail() {
  if (email.validity.valueMissing) {
    emailError.textContent = "Enter an email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Enter correct email";
  }
  emailError.className = "error active";
}

country.addEventListener("input", (event) => {
  if (country.value === "finland") {
    zip.setAttribute("pattern", "\\d{6}");
    zip.disabled = false;
  } else if (country.value === "denmark") {
    const regex = /^\d{5}$/;
    zip.setAttribute("pattern", "\\d{5}");
    zip.disabled = false;
  } else {
    zip.removeAttribute("pattern");
    zip.value = "";
    zip.disabled = true;
  }

  countryError.textContent = "";
  countryError.className = "error";

  zipError.textContent = "";
  zipError.className = "error";
});

function showErrorCountry() {
  countryError.textContent = "Select country";
  countryError.className = "error active";
}

zip.addEventListener("input", (event) => {
  if (zip.validity.valid) {
    zipError.textContent = "";
    zipError.className = "error";
  } else {
    showErrorZip();
  }
});

function showErrorZip() {
  if (country.value === "finland") {
    zipError.textContent = "Enter 6 digits";
  } else if (country.value === "denmark") {
    zipError.textContent = "Enter 5 digits";
  } else {
    zipError.textContent = "Enter a valid zip code";
  }
  zipError.className = "error active";
}

password.addEventListener("focus", (event) => {
  passwordError.textContent = "";
  passwordError.className = "error";
});

passwordConfirm.addEventListener("input", (event) => {
  if (password.value === passwordConfirm.value) {
    passwordConfirmError.textContent = "";
    passwordConfirmError.className = "error";
  } else if (password.value !== passwordConfirm.value) {
    showErrorPasswordConfirm("Password is not the same");
  }
});

function showErrorPassword() {
  passwordError.textContent = "Add password";
  passwordError.className = "error active";
}

function showErrorPasswordConfirm(errorMessage) {
  passwordConfirmError.textContent = errorMessage;
  passwordConfirmError.className = "error active";
}

submit.addEventListener("click", (event) => {
  email.required = true;
  country.required = true;
  zip.required = true;
  password.required = true;
  passwordConfirm.required = true;

  let emailError = !email.validity.valid;
  let countryError = country.value === "";
  let zipError = !zip.validity.valid;
  let passwordError = !password.validity.valid;
  let passwordConfirmError = !passwordConfirm.validity.valid;
  let passwordMatchError = password.value !== passwordConfirm.value;

  let anyError =
    emailError ||
    countryError ||
    zipError ||
    passwordError ||
    passwordConfirmError ||
    passwordMatchError;

  if (anyError) {
    if (emailError) {
      showErrorEmail();
    }

    if (countryError) {
      showErrorCountry();
    }

    if (zipError) {
      showErrorZip();
    }

    if (passwordError) {
      showErrorPassword();
    }

    if (passwordConfirmError || passwordMatchError) {
      showErrorPasswordConfirm(
        passwordMatchError ? "Password is not the same" : "Add password"
      );
    }
  } else {
    thumbsUp();
  }
});

reset.addEventListener("click", (event) => {
  window.location.reload();
});

function thumbsUp() {
  const thumbsUp = document.getElementById("thumbs-up");
  thumbsUp.style.display = "block";
}
