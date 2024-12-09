/* This function does the addition operation. */
function add(addendA, addendB) {
  return (addendA) + (addendB);
}


/* This function does the subtraction operation. */
function subtract(minuend, subtrahend) {
  return (minuend) - (subtrahend);
}


/* This function does the division operation. */
function divide(dividend, divisor) {
  return (dividend) / (divisor);
}


/* This function does the multiplication operation. */
function multiply(factorA, factorB) {
  return (factorA) * (factorB);
}


/* This function updates the display box.  */
function display(text) {
  boxDisplay.textContent = text;
}


/* This function resets the display box.  */
function clearDisplay() {
  
  boxDisplay.textContent = "0";
  
}


/* This function calculates the converted values. */
function operate() {
  
  let placeholder;
  
  switch (operator) {
    
    case "/":
      
      placeholder = divide(operandA, operandB);
      break;
      
    case "*":
      
      placeholder = multiply(operandA, operandB);
      break;
      
    case "-":
      
      placeholder = subtract(operandA, operandB);
      break;
      
    case "+":
      
      placeholder = add(operandA, operandB);
      break;
      
  }
  
  // Converts the result to string for decimal checking.
  placeholder = String(placeholder);
  
  if (checkDecimal(placeholder) === true) {
    
    result = reduceDecimal(placeholder);
    
  } else result = placeholder;
  
}


/* This function checks the input entered by the user. */
function checkInput(input) {
  
  if (Boolean(operandA) == false && checkOperator(input) === false) {
    
    if (Number.isInteger(Number(input))) operandA += input;
    else if (input === ".") operandA += "0.";
    else if (input === "+/-") return;
    else if (input === "<--") return;
    else if (input === "%") return;
    else if (input === "=") return;
    else if (input === "AC") return;
    
    display(operandA);
    
  } else if ((Boolean(operandA) == true && Boolean(operator) == false) && checkOperator(input) === false) {
    
    if (Number.isInteger(Number(input)) && checkPercentage(operandA) === false) {
      
      operandA += input;
      
    } else if ((input === "." && checkDecimal(operandA) === false) && checkPercentage(operandA) === false) {
      
      operandA += input;
      
    } else if (input === "%" && checkPercentage(operandA) === false) {
      
      operandA += input;
      
    } else if (input === "+/-") {
      if (checkNegative(operandA) === false) {
        
        operandA = addNegative(operandA);
        
      } else if (checkNegative(operandA) === true) {
        
        operandA = removeNegative(operandA);
        
      } 
    } else if (input === "<--") {
      
        clearInput();
        return;
      
    } else if (input === "AC") {
      
      clearValues();
      clearDisplay();
      return;
      
    }
    
    display(operandA);
    
  } else if ((Boolean(operandA) === true && Boolean(operandB) === false) && ((checkOperator(input) === true) && Boolean(result) === false)) {
    
    operator = input;
    display(operator);
    
  } else if ((Boolean(operandA) === true && Boolean(operandB) === false) && (Boolean(result) === false && input === "<--")) {
    
    clearInput();
    
  } else if ((Boolean(operandA) === true && Boolean(operandB) === false) && (Boolean(result) === false && input === "+/-")) return;
    
  else if ((Boolean(operandA) === true && Boolean(operandB) === false) && (Boolean(result) === false && input === "AC")) {
    
      clearValues();
      clearDisplay();
      return;
  } else if ((Boolean(operandA) === true && Boolean(operandB) === false) && (Boolean(operator) === true && input === "=")) return;
    
  else if ((Boolean(operandA) === true && Boolean(operator) === true) && Boolean(operandB) == false) {
    
    
    if (Number.isInteger(Number(input))) operandB = input;
    
    else if (input === ".") operandB += "0.";
    else if (input === "<--") return;
    else if (input === "%") return;
    else if (input === "AC") {
      
      clearValues();
      clearDisplay();
      return;
      
    }
    
    display(operandB);
    
  } else if (((Boolean(operandA) == true && Boolean(operator) == true) && (Boolean(operandB) == true && checkOperator(input) === false)) && input !== "=") {
    
    if (Number.isInteger(Number(input)) && checkPercentage(operandB) === false) {
      
      operandB += input;
      
    } else if ((input === "." && checkDecimal(operandB) === false ) && checkPercentage(operandB) === false) {
     
      operandB += input;
      
    } else if (input === "%" && checkPercentage(operandB) === false) {
      
      operandB += input;
      
    } else if (input === "+/-") {
      
      if (checkNegative(operandB) === false) {
        
        operandB = addNegative(operandB);
        
      } else if (checkNegative(operandB) === true) {
        
        operandB = removeNegative(operandB);
        
      } 
    } else if (input === "<--") {
      
        clearInput();
        return;

    } else if (input === "AC") {
      
      clearValues();
      clearDisplay();
      return;
      
    }
    
    display(operandB);
    
  } else if (((Boolean(operandA) == true && Boolean(operator) == true) && (Boolean(operandB) == true && Boolean(result) === false)) && (checkOperator(input) === true || input === "=")) {
    
    convertValues();
    operate();
    display(result);
    addOperation(input);
    
  }
  
} 


/* This function removes the most recent input. */ 
function clearInput() {
  
  if (Boolean(operandB) == true) {
    
    if (operandB.length > 1) {
      
      operandB = operandB.slice(0, -1);
      display(operandB);
      
    } else if (operandB.length <= 1) {
      
      operandB = "";
      display(operator);
      
    }
  } else if (Boolean(operator) == true) {
    
    operator = "";
    display(operandA);
    
  } else if (Boolean(operandA) == true) {
    
      if (operandA.length > 1) {
        
        operandA = operandA.slice(0, -1);
        display(operandA);
        
      } else if (operandA.length <= 1) {
        
        operandA = "";
        clearDisplay();
        
      }
      
  } 
  
}


/* This function reduces the number of decimal places.  */
function reduceDecimal(item) {
  
  let decimalPlaces = item.slice(item.indexOf(".")).replace(".", "").length;
  
  if (decimalPlaces > 4) return Number(item).toFixed(4);
    
  else return item;
  
}


/* This function checks for a decimal period.  */
function checkDecimal(item) {
  
  return item.includes(".");
  
}


/* This function checks for a negative sign.  */
function checkNegative(item) {
  
  return item.includes("-");
  
}


/* This function adds a negative sign. */
function addNegative(item) {
  
  const placeholder = ["(", "-", ")"];

  placeholder.splice(placeholder.indexOf(")"), 0, item);
  
  const result = placeholder.toString().replaceAll(",", "");

  return result;
  
}


/* This function removes the nrgatuve sign. */
function removeNegative(item) {
  
  const itemsRemove = ["(", "-", ")"];
  const placeholder = item.split("");
  const result = placeholder.filter(element => {
    
    if (itemsRemove.includes(element)) {
      
      return false;
      
    } else return true;
  }).toString().replaceAll(",", "");
  
  return result;
  
}


/* This function converts a negative numerical string into a number.  */
function convertNegative(item) {
  
  item = String(Number(removeNegative(item)) * -1);
  
  return item;
  
}


/* This function checks for the percentage symbol. */
function checkPercentage(item) {
  
  return item.includes("%");
  
}


/*  This function adds a percentage symbol.  */
function addPercentage(item) {
  
  return `${item}%`;
  
}


/* This functiom removes the percentage symbol.  */
function removePercentage(item) {
  
  return item.replace("%", "");
  
}


/* This function converts a numerical percent string into a number. */
function convertPercentage(item) {
  
  if (checkNegative(item) === true) {
    
    item = addPercentage(convertNegative(removePercentage(item)));
    
  }
  
  let placeholder = String(Number(removePercentage(item)) / 100);
  
  return placeholder;
  
}


/* This function resets all the math operation variables */
function clearValues() {
  
  operandA = "";
  operandB = "";
  operator = "";
  result = "";
  
}


/* This function converts the operands into their numerical counterparts. */
function convertValues() {
  
  if (Number.isNaN(Number(operandA)) === false) {
    
    operandA = Number(operandA);
    
  } else if (Number.isNaN(Number(operandA)) === true) {
    
    if (checkPercentage(operandA) === true) {
      
      operandA = convertPercentage(operandA);
      
    }
    
    if (checkNegative(operandA) === true) {
      
      operandA = convertNegative(operandA);
      
    }
    
    operandA = Number(operandA);
    
  }
  
  if (Number.isNaN(Number(operandB)) === false) {
    
    operandB = Number(operandB);
    
  } else if (Number.isNaN(Number(operandB)) === true) {
    
    if (checkPercentage(operandB) === true) {
      
      operandB = convertPercentage(operandB);
      
    }
    if (checkNegative(operandB) === true) {
      
      operandB = convertNegative(operandB);
      
    }
    
    operandB = Number(operandB);
    
  }

}


/* This function checks for a math operator sign.  */
function checkOperator(item) {
  
  const operators = ["+", "-", "*", "/"];
  return operators.includes(item);
  
}


/* This function shifts the data in the math operation variables to continue the math operation. */
function addOperation(sign) {
  
  if (sign !== "=") {
    
    operandA = String(result);
    operandB = "";
    operator = sign;
    result = "";
    
  } else {
    
    operandA = String(result);
    operandB = "";
    operator = "";
    result = "";
    
  }
  
}


// The math operation variables
let operandA = "";
let operandB = "";
let operator = "";
let result = ""

// The calculator buttons
const keypads = document.querySelectorAll(".container-keypads button");

keypads.forEach(keypad => {
  
  keypad.addEventListener("click", event => {
    
    const input = event.target.textContent;
    
    checkInput(input);
    
  });
  
});

// The display box
const boxDisplay = document.querySelector(".container-display");

