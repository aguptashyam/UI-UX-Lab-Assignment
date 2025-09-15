function processNumbers(arr) {
  return arr
    .filter(num => num % 2 === 0)    // Keep even numbers
    .map(num => num * 2)           // Multiply by 2
    .reduce((sum, num) => sum + num, 0); // Sum of numbers
}

const numbers = [1, 2, 3, 4, 5, 6];
const result = processNumbers(numbers);

console.log('Result:', result);
