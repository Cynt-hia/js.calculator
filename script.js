const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
let input = "";

function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent.trim();

    if (value === "C") {
      input = "";
      display.textContent = "0";
      return;
    }

    if (value === "=") {
      try {
        if (input === "") {
          display.textContent = "0";
          return;
        }

        if (!/^[0-9+\-*/().\s]+$/.test(input)) {
          display.textContent = "Error";
          input = "";
          return;
        }

        const normalized = input.replace(/\d*\.?\d+/g, (m) =>
          String(Number(m))
        );

        const result = eval(normalized);
        display.textContent = result;
        input = String(result);
      } catch (err) {
        display.textContent = "Error";
        input = "";
      }
      return;
    }
    if (isOperator(value)) {
      if (input === "") {
        if (value === "-") {
          input = "-";
          display.textContent = input;
        }
        return;
      }
      const lastChar = input[input.length - 1];
      if (isOperator(lastChar)) {
        input = input.slice(0, -1) + value;
      } else {
        input += value;
      }
    } else {
      input += value;
    }

    display.textContent = input;
  });
});
