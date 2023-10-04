const pressCardNameInput = selector("inputName");
const nameError = selector("name-err");
const cvcInput = selector("cvcInput");
const cvcErr = selector("cvc-err");
const error = selector("number-err");
const errorInput = selector("cardNumberInput");
const input = selector("cardNumberInput");
const month = selector("mm");
const errDate = selector("date-err");
const year = selector("yy");
const btnConfirm = selector("btnConfirm");

function isCharLetter(char) {
  return /^[a-zA-Z ]+$/.test(char);
}

function isCharNumber(num) {
  return /^[0-9\s]*$/.test(num);
}

function selector(pick) {
  return document.querySelector(`.${pick}`);
}

function formatDate(date) {
  let year = date.getFullYear();

  year = year.toString().substr(-2);

  return year;
}
function namefunction() {
  pressCardNameInput.addEventListener("input", (e) => {
    upperCase = e.target.value;

    if (isCharLetter(upperCase)) {
      selector("displayName").innerHTML = `${upperCase.toUpperCase()}`;
      nameError.classList.remove("error");
    } else {
      nameError.classList.add("error");
    }
  });
}

function numberFunc() {
  input.addEventListener("input", () => {
    if (isCharNumber(input.value)) {
      selector("displayNumber").innerHTML = input.value = formatNumber(
        input.value.replaceAll(" ", "")
      );
      error.classList.remove("error");
    } else {
      error.classList.add("error");
      errorInput.classList.add("error-input");
    }
  });

  const formatNumber = (number) =>
    number.split("").reduce((seed, next, index) => {
      if (index !== 0 && !(index % 4)) seed += " ";
      return seed + next;
    }, "");
}

function monthFunc() {
  month.addEventListener("input", (e) => {
    const input = e.target.value;

    if (input <= 12 && isCharNumber(input)) {
      document.querySelector(".displayMonth").innerHTML = e.target.value;
      errDate.classList.remove("error");
      month.classList.remove("error-input");
    } else {
      month.classList.add("error-input");
      errDate.classList.add("error");
    }
  });
}
function yearFunc() {
  year.addEventListener("input", (e) => {
    const yearInput = e.target.value;
    console.log(yearInput);
    const date = new Date();
    currentDate = formatDate(date);
    console.log(formatDate(date));

    if (yearInput <= currentDate && isCharNumber(yearInput)) {
      selector("displayYear").innerHTML = yearInput;
      selector("date-err").classList.remove("error");
    } else if (yearInput === "") {
      selector("date-err").classList.add("error");
    } else {
      selector("date-err").classList.add("error");
    }
  });
}
function cvcFunc() {
  cvcInput.addEventListener("input", (e) => {
    inputCVC = e.target.value;
    console.log(inputCVC);
    if (isCharNumber(inputCVC)) {
      selector("displayCVC").innerHTML = inputCVC;
      cvcInput.classList.remove("error-input");
      cvcErr.classList.remove("error");
    } else {
      cvcInput.classList.add("error-input");
      cvcErr.classList.add("error");
    }
  });
}
function all() {
  namefunction();
  numberFunc();
  monthFunc();
  yearFunc();
  cvcFunc();
}

all();
btnConfirm.addEventListener("click", () => {
  if (
    isCharLetter(pressCardNameInput.value) &&
    isCharNumber(input.value) &&
    isCharNumber(month.value) &&
    isCharNumber(year.value) &&
    isCharNumber(cvcInput.value)
  ) {
    selector("inputs").innerHTML = `<div class="congrats">
    <div class="check">
      <img src="./images/icon-complete.svg" alt="complete-icon" />
    </div>
    <div class="thanks">
      <h1 class="thankyou">THANK YOU!</h1>
      <p class="added">We've added your card details</p>
    </div>

    <button class="btnContinue">Continue</button>`;
  } else console.log("not valid");
});
