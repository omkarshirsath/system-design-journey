# Basic Array Problems - Interview Questions

## 5-7 Basic Interview Questions

### Q1: Sum of two numbers

```javascript
// Function declaration
function addTwoNumbers(num1, num2) {
    return num1 + num2;  // 'return' sends result back
}

let result = addTwoNumbers(5, 7);  // Call function with 5,7
console.log(result);  // Output: 12



Q2: String concatenation
javascript
function combineNames(firstName, lastName) {
    return firstName + " " + lastName;  // + joins strings
}

let fullName = combineNames("John", "Doe");
console.log(fullName);  // Output: "John Doe"
Q3: Find max number from array
javascript
function findMax(arr) {  // arr is the array passed in
    let max = arr[0];  // Assume first element is largest
    
    for(let i = 1; i < arr.length; i++) {  // Loop through rest
        if(arr[i] > max) {  // If current element is bigger
            max = arr[i];   // Update max
        }
    }
    return max;
}

let numbers = [2, 7, 8, 11];
let maxNumber = findMax(numbers);  // Pass the array
console.log(maxNumber);  // Output: 11
Q4: Find TWO number indices that sum to target
javascript
function twoSum(nums, target) {
    // Loop through each element with first pointer
    for(let i = 0; i < nums.length; i++) {
        // Loop through elements AFTER i with second pointer
        for(let j = i + 1; j < nums.length; j++) {
            if(nums[i] + nums[j] === target) {  // If sum matches
                return [i, j];  // Return both indices immediately
            }
        }
    }
    return [];  // If no pair found, return empty array
}

let arr = [2, 7, 8, 11];
let targetSum = 9;
let indices = twoSum(arr, targetSum);
console.log(indices);  // Output: [0, 1] because 2 (index0) + 7 (index1) = 9
Step by step for [2,7,8,11] target=9:

i=0 (value 2), j=1 (value 7): 2+7=9 ✅ return [0,1]

Function stops immediately.

Q5: Reverse a string
javascript
function reverseString(str) {
    let reversed = "";
    for(let i = str.length - 1; i >= 0; i--) {  // Start from last char
        reversed = reversed + str[i];  // Add each character
    }
    return reversed;
}

console.log(reverseString("hello"));  // Output: "olleh"
Q6: Check if number is even or odd
javascript
function isEven(number) {
    if(number % 2 === 0) {  // % gives remainder. Even numbers remainder 0
        return true;
    } else {
        return false;
    }
}

console.log(isEven(4));  // Output: true
console.log(isEven(7));  // Output: false
Q7: Find index of an element in array
javascript
function findIndex(arr, targetValue) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === targetValue) {
            return i;  // Return position if found
        }
    }
    return -1;  // -1 means "not found" (standard convention)
}

let myArray = [10, 20, 30, 40];
console.log(findIndex(myArray, 30));  // Output: 2
console.log(findIndex(myArray, 99));  // Output: -1
Quick Practice for You
After learning these, try these yourself:

Write a function that takes temperature in Celsius and returns Fahrenheit

Write a function that counts how many vowels in a string

Write a function that finds the smallest number in an array

Remember for interviews: Always say out loud what the function inputs and outputs are before writing code. Good luck! 🚀

Printing and Finding Indexes in Arrays
How to PRINT array indexes
Print all indexes with their values:

javascript
let arr = [2, 7, 8, 11];

// Method 1: Simple loop
for(let i = 0; i < arr.length; i++) {
    console.log("Index:", i, "Value:", arr[i]);
}
// Output:
// Index: 0 Value: 2
// Index: 1 Value: 7
// Index: 2 Value: 8
// Index: 3 Value: 11
Print just the indexes (without values):

javascript
let arr = [2, 7, 8, 11];

for(let i = 0; i < arr.length; i++) {
    console.log(i);  // Prints: 0, 1, 2, 3
}
Using forEach (modern way):

javascript
let arr = [2, 7, 8, 11];

arr.forEach((value, index) => {
    console.log("Index:", index);
});
// Output: Index: 0, Index: 1, Index: 2, Index: 3
How to FIND index of a specific number
Method A: Find ONE index (first occurrence)

javascript
let arr = [2, 7, 8, 11];

let index = arr.indexOf(8);  // Built-in function
console.log(index);  // Output: 2 (because 8 is at position 2)

let notFound = arr.indexOf(99);
console.log(notFound);  // Output: -1 (means not in array)
Method B: Find ALL indexes of a number (if duplicate exists)

javascript
function findAllIndexes(arr, targetNumber) {
    let indexes = [];  // Empty array to store results
    
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === targetNumber) {
            indexes.push(i);  // Add this index to our result array
        }
    }
    return indexes;
}

let arrWithDuplicates = [2, 7, 2, 11, 2];
let result = findAllIndexes(arrWithDuplicates, 2);
console.log(result);  // Output: [0, 2, 4]
Method C: Manual search (what interviewers want to see)

javascript
function findMyIndex(arr, searchNumber) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === searchNumber) {
            return i;  // Found it! Return position
        }
    }
    return -1;  // Never found it
}

let arr = [2, 7, 8, 11];
console.log(findMyIndex(arr, 7));   // Output: 1
console.log(findMyIndex(arr, 11));  // Output: 3
console.log(findMyIndex(arr, 99));  // Output: -1
Complete Example: Find index and then print it
javascript
let numbers = [10, 20, 30, 40, 50];
let searchValue = 30;

// Step 1: Find the index
let foundIndex = numbers.indexOf(searchValue);

// Step 2: Print the result
if(foundIndex !== -1) {
    console.log("Found", searchValue, "at index:", foundIndex);
    console.log("Value at that index is:", numbers[foundIndex]);
} else {
    console.log(searchValue, "not found in array");
}
// Output: Found 30 at index: 2
// Output: Value at that index is: 30
The "Two Sum" Problem (Fully Explained)
javascript
function twoSum(nums, target) {
    // Loop through each index i
    for(let i = 0; i < nums.length; i++) {
        // Loop through indexes after i (j = i+1)
        for(let j = i + 1; j < nums.length; j++) {
            // Check if numbers at these two indexes sum to target
            if(nums[i] + nums[j] === target) {
                // Return BOTH indexes as an array
                return [i, j];
            }
        }
    }
    return [];  // No pair found
}

let arr = [2, 7, 8, 11];
let target = 9;
let result = twoSum(arr, target);
console.log(result);  // Output: [0, 1]

// Explanation:
// i=0 (value 2), j=1 (value 7): 2+7=9 ✓ return [0,1]