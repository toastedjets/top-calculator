(function() {
    let operator = null;
    let number1 = null;
    let number2 = null;
    let resetDisplay = false;

    function operate(operator, number1, number2) {
        if (operator === "+") {
            return add(number1, number2);
        } else if (operator === "-") {
            return subtract(number1, number2);
        } else if (operator === "/") {
            return divide(number1, number2);
        } else if (operator === "*") {
            return multiply(number1, number2);
        }
    }

    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    function divide(a, b) {
        if (b === 0 ) {
            return "Divide by zero error";
        } else return a / b;
    }

    function multiply(a, b) {
        return a * b;
    }

    function createButtons() {
        const buttons = [
            { text: "CLEAR", row: "row-one" },
            { text: "BACK", row: "row-one" },
            { text: "/", row: "row-one" },
            { text: "*", row: "row-one" },
            { text: "7", row: "row-two" },
            { text: "8", row: "row-two" },
            { text: "9", row: "row-two" },
            { text: "-", row: "row-two" },
            { text: "4", row: "row-three" },
            { text: "5", row: "row-three" },
            { text: "6", row: "row-three" },
            { text: "+", row: "row-three" },
            { text: "1", row: "row-four" },
            { text: "2", row: "row-four" },
            { text: "3", row: "row-four" },
            { text: "=", row: "equal-row" },
            { text: "0", row: "row-five" },
            { text: ".", row: "row-five" },
        ]

        for (let i = 0; i < buttons.length; i++) {
            const item = buttons[i];
            const button = document.createElement("button");

            if (item.text === "=") {
                button.classList.add("tall-button");
            } else if (item.text === "0") {
                button.classList.add("wide-button");
            } else {
                button.classList.add("button");
            }

            button.textContent = item.text;

            const targetRow = document.getElementById(item.row);
            if (targetRow) {
                button.addEventListener("click", handleButton);
                targetRow.appendChild(button);
            }
        }     
    }

    function handleButton(event) {
        const display = document.getElementById("display");
        const value = event.target.textContent;

        if (value === "CLEAR") {
            display.value = "0";
            number1 = null;
            number2 = null;
            operator = null;
            resetDisplay = true;
        } else if (value === "BACK") {
            if (display.value.length > 1) {
                display.value = display.value.slice(0, -1);
            } else {
                display.value = "0";
            }
        } else if (["/", "*", "-", "+"].includes(value)) {
            if (number1 === null) {
                number1 = parseFloat(display.value);
            } else {
                if (operator) {
                    operator = value;
                } else {
                    number2 = parseFloat(display.value);
                    const result = operate(operator, number1, number2);
                    display.value = result;
                    number1 = result;
                }
            }

            operator = value;
            resetDisplay = true;
        } else if (value === "=") {
            if (number1 !== null && operator !== null) {
                number2 = parseFloat(display.value);
                const result = operate(operator, number1, number2);
                display.value = result;
                number1 = result;
                resetDisplay = true;
            }
        } else {
            if (resetDisplay) {
                display.value = value;
                resetDisplay = false;
            } else {
                if (display.value === "0" && value !== ".") {
                    display.value = value;
                } else if (display.value.includes(".") && value === ".") {
                } else {
                    display.value += value;
                }
            }
        }
    }

    createButtons();
}) ();