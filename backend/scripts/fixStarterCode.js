/**
 * Fix starter code to work in browser environment
 * - Remove input() calls (not supported in Pyodide)
 * - Add comments explaining what to modify
 * - Make code runnable out of the box
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');

async function fixStarterCode() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected\n');

        let updatedCount = 0;

        // Session 1 - Replace input() with hardcoded values
        const session1 = await Lesson.findOne({ title: /Session 1:/ });
        if (session1 && session1.codingExercises) {
            session1.codingExercises[0].starterCode = `# Exercise 1: About Me Program
# Create variables to store your information (no input() needed in browser!)

# TODO: Change these to your own information
name = "Alice"
age = 15
city = "Seattle"
favorite_subject = "Computer Science"

# Print your information
print("=== About Me ===")
print(f"Name: {name}")
print(f"Age: {age}")
print(f"City: {city}")
print(f"Favorite Subject: {favorite_subject}")
print("\\nNice to meet you!")`;

            session1.codingExercises[1].starterCode = `# Exercise 2: Simple Calculator
# Perform operations on two numbers

# TODO: Change these numbers
num1 = 10
num2 = 5

# Perform calculations
sum_result = num1 + num2
diff_result = num1 - num2
product = num1 * num2
quotient = num1 / num2

# Display results
print(f"{num1} + {num2} = {sum_result}")
print(f"{num1} - {num2} = {diff_result}")
print(f"{num1} × {num2} = {product}")
print(f"{num1} ÷ {num2} = {quotient}")`;

            session1.codingExercises[2].starterCode = `# Exercise 3: Age Calculator
# Calculate birth year and future age

current_year = 2025

# TODO: Change this to your age
age = 15

# Calculate birth year
birth_year = current_year - age

# Calculate age in 10 years
future_age = age + 10
future_year = current_year + 10

# Display results
print(f"Current age: {age}")
print(f"You were born in: {birth_year}")
print(f"In {future_year}, you will be {future_age} years old")`;

            await session1.save();
            console.log('✅ Session 1 updated (3 exercises)');
            updatedCount += 3;
        }

        // Session 2 - Replace input() with hardcoded values
        const session2 = await Lesson.findOne({ title: /Session 2:/ });
        if (session2 && session2.codingExercises) {
            session2.codingExercises[0].starterCode = `# Grade Calculator
# TODO: Change this grade to test different cases
grade = 85

# Add if/elif/else statements to determine letter grade
if grade >= 90:
    letter = "A"
elif grade >= 80:
    letter = "B"
elif grade >= 70:
    letter = "C"
elif grade >= 60:
    letter = "D"
else:
    letter = "F"

print(f"Grade: {grade} = {letter}")`;

            session2.codingExercises[1].starterCode = `# Multiplication Table
# TODO: Change this number
number = 7

print(f"\\nMultiplication Table for {number}:")
print("=" * 30)

# Use a for loop to print multiplication table
for i in range(1, 11):
    result = number * i
    print(f"{number} × {i} = {result}")`;

            session2.codingExercises[2].starterCode = `# Number Guessing Game
import random

secret_number = random.randint(1, 10)
print(f"I'm thinking of a number between 1 and 10...")
print(f"(The secret number is: {secret_number})")

# TODO: Try guessing with different numbers
guess = 7

# Add while loop and if statements
attempts = 1
while guess != secret_number:
    if guess < secret_number:
        print(f"{guess} is too low! Try again.")
        guess = guess + 1  # Increment guess
    else:
        print(f"{guess} is too high! Try again.")
        guess = guess - 1  # Decrement guess
    attempts += 1

print(f"\\n🎉 You guessed it! The number was {secret_number}")
print(f"It took you {attempts} attempts.")`;

            await session2.save();
            console.log('✅ Session 2 updated (3 exercises)');
            updatedCount += 3;
        }

        // Session 27 - Fix pandas exercise
        const session27 = await Lesson.findOne({ title: /Session 27:/ });
        if (session27 && session27.codingExercises) {
            session27.codingExercises[0].starterCode = `# Healthcare Data Exploration
# NOTE: pandas and matplotlib work in browser but are slower to load

# First run will take 15-20 seconds to load packages
# Remove this exercise if packages fail to load

import pandas as pd
import numpy as np

# Create sample heart disease data
data = {
    'age': [63, 37, 41, 56, 57, 45, 52, 68, 39, 60],
    'sex': [1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
    'chest_pain': [3, 2, 1, 1, 0, 2, 3, 0, 2, 3],
    'blood_pressure': [145, 130, 130, 120, 120, 112, 172, 144, 118, 120],
    'cholesterol': [233, 250, 204, 236, 354, 290, 199, 193, 219, 246],
    'disease': [1, 0, 0, 1, 0, 0, 1, 1, 0, 1]
}

df = pd.DataFrame(data)

print("Dataset Shape:", df.shape)
print("\\nFirst 5 rows:")
print(df.head())
print("\\nBasic Statistics:")
print(df.describe())
print("\\nDisease Count:")
print(df['disease'].value_counts())`;

            await session27.save();
            console.log('✅ Session 27 updated (1 exercise)');
            updatedCount += 1;
        }

        console.log('\n' + '='.repeat(60));
        console.log(`✅ Total exercises updated: ${updatedCount}`);
        console.log('='.repeat(60));
        console.log('\n✨ Starter code fixed for browser execution!\n');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

fixStarterCode();
