/* This function does the addition operation. */
function add(addendA, addendB) {
  return addendA + addendB;
}

/* This function does the subtraction operation. */
function subtract(minuend, subtrahend) {
  return minuend - subtrahend;
}

/* This function does the division operation. */
function divide(dividend, divisor) {
  return dividend / divisor;
}

/* This function does the multiplication operation. */
function multiply(factorA, factorB) {
  return factorA * factorB;
}

function display(text) {
  boxDisplay.textContent = text;
}

const keypads = document.querySelectorAll(".container-keypads button");

keypads.forEach(keypad => {
  keypad.addEventListener("click", event => {
    const textDisplay = event.target.textContent;
    console.log(textDisplay);
    display(textDisplay);
  });
});

const boxDisplay = document.querySelector(".container-display");

