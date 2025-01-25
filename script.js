const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = ""; // El número actual que el usuario está escribiendo
let previousInput = ""; // El número anterior
let operator = null; // Operador actual (+, -, *, /)

// Función para actualizar el display
function updateDisplay(value) {
  display.textContent = value || "0";
}

// Función para realizar el cálculo
function calculate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  if (isNaN(num1) || isNaN(num2)) return null;

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 !== 0 ? num1 / num2 : "Error"; // Evitar división por 0
    default:
      return null;
  }
}

// Añadir eventos a los botones
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.getAttribute("data-action");

    if (!isNaN(action) || action === ".") {
      // Números y punto decimal
      if (action === "." && currentInput.includes(".")) return; // Evitar múltiples puntos
      currentInput += action;
      updateDisplay(currentInput);
    } else if (action === "clear") {
      // Limpiar todo
      currentInput = "";
      previousInput = "";
      operator = null;
      updateDisplay("0");
    } else if (action === "delete") {
      // Eliminar el último carácter
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    } else if (action === "equals") {
      // Calcular resultado
      if (operator && previousInput) {
        const result = calculate();
        updateDisplay(result);
        currentInput = result.toString();
        previousInput = "";
        operator = null;
      }
    } else {
      // Manejar operadores (+, -, *, /)
      if (currentInput) {
        if (previousInput && operator) {
          const result = calculate();
          previousInput = result.toString();
          updateDisplay(result);
        } else {
          previousInput = currentInput;
        }
        operator = action === "add" ? "+" :
                   action === "subtract" ? "-" :
                   action === "multiply" ? "*" :
                   action === "divide" ? "/" : null;
        currentInput = "";
      }
    }
  });
});