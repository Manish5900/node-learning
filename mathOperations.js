const add = (number1, number2) => {
  return `Addition of ${number1} and ${number2} is ${number1 + number2}`;
};

const subtract = (number1, number2) => {
  return `Subtraction of ${number1} from ${number2} is ${number1 - number2}`;
};

const multiply = (number1, number2) => {
  return `Multiplication of ${number1} with ${number2} is ${number1 * number2}`;
};

const divide = (number1, number2) => {
  if (number2 === 0) {
    throw new Error("Cannot divide by zero");
  }
  return `Division of ${number1} by ${number2} is ${number1 / number2}`;
};

module.exports = { add, subtract, multiply, divide };
