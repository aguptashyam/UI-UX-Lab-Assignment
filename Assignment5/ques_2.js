const numbers = [12, 5, 8, 130, 44];

const largest = Math.max(...numbers);
const smallest = Math.min(...numbers);

const ascending = [...numbers].sort((a, b) => a - b);
const descending = [...numbers].sort((a, b) => b - a);

console.log('Array:', numbers);
console.log('Largest:', largest);
console.log('Smallest:', smallest);
console.log('Ascending:', ascending);
console.log('Descending:', descending);
