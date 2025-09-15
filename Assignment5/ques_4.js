let student = {
  name: 'Alice',
  age: 20,
  grades: 'B'
};

// Add a new property
student.class = 'Physics';

// Update grade
student.grades = 'A+';

// Display student information
console.log('Student Information:');
for (let key in student) {
  console.log(`${key}: ${student[key]}`);
}
