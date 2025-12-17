require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

async function restructureCourse() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const course = await Course.findOne({ title: /AI Fundamentals/i });
    
    if (!course) {
      console.log('❌ Course not found!');
      process.exit(1);
    }

    console.log(`📚 Restructuring: ${course.title}\n`);

    // NEW STRUCTURE:
    // Sessions 1-3: Python Fundamentals
    // Sessions 4-5: Data Analysis with Python
    // Sessions 6+: AI & Machine Learning concepts

    // Update Session 1: Introduction to Python
    const session1 = await Lesson.findOne({ title: /Session 1/i, course: course._id });
    
    if (session1) {
      session1.title = 'Session 1: Python Basics - Variables, Data Types & Your First Program';
      session1.duration = '90 minutes';
      session1.content = `# Welcome to Python Programming!

Before we dive into AI, we need to learn Python - the most popular language for artificial intelligence and data science.

## Why Python for AI?
- **Easy to read and write** - Python looks almost like English
- **Powerful libraries** - NumPy, Pandas, TensorFlow, PyTorch
- **Huge community** - Millions of developers can help you
- **Industry standard** - Used by Google, Netflix, NASA, and more

## Part 1: What is Programming? (15 minutes)

Programming is giving instructions to a computer. Just like you follow a recipe to bake cookies, computers follow code to perform tasks.

**Real-world analogy:**
- Recipe: "Mix 2 cups flour, 1 cup sugar, bake at 350°F"
- Python code: "Add these numbers, multiply the result, print the answer"

## Part 2: Your First Python Program (20 minutes)

The traditional first program every programmer writes:

\`\`\`python
print("Hello, World!")
print("My name is [Your Name]")
print("I'm learning Python to build AI!")
\`\`\`

**What does print() do?**
- Shows text on the screen
- Like talking to your user
- Essential for seeing results

## Part 3: Variables - Storing Information (25 minutes)

Variables are like labeled boxes that store data.

\`\`\`python
# Storing text (strings)
name = "Alice"
favorite_color = "blue"

# Storing numbers (integers)
age = 16
year = 2025

# Storing decimals (floats)
height = 5.6
grade_average = 92.5

# Storing True/False (booleans)
is_student = True
has_python_installed = True
\`\`\`

**Variable naming rules:**
- Use lowercase with underscores: student_name
- Start with letter, not number: age1 ✓, 1age ✗
- No spaces: my_name ✓, my name ✗
- Be descriptive: user_age ✓, x ✗

## Part 4: Data Types (20 minutes)

Python has different types of data:

\`\`\`python
# 1. Strings (text)
greeting = "Hello!"
message = 'Welcome to Python'

# 2. Integers (whole numbers)
students = 25
year = 2025

# 3. Floats (decimals)
price = 19.99
temperature = 72.5

# 4. Booleans (True/False)
is_raining = False
is_sunny = True

# Check the type
print(type(greeting))  # <class 'str'>
print(type(students))  # <class 'int'>
print(type(price))     # <class 'float'>
\`\`\`

## Part 5: Basic Operations (10 minutes)

\`\`\`python
# Math operations
x = 10
y = 3

print(x + y)   # Addition: 13
print(x - y)   # Subtraction: 7
print(x * y)   # Multiplication: 30
print(x / y)   # Division: 3.333...
print(x // y)  # Integer division: 3
print(x % y)   # Remainder: 1
print(x ** y)  # Power: 1000

# String operations
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name  # John Doe
repeated = "AI " * 3  # AI AI AI
\`\`\`

## Part 6: Getting User Input (10 minutes)

Make your programs interactive!

\`\`\`python
# Ask user for their name
name = input("What is your name? ")
print("Hello, " + name + "!")

# Ask for age (input returns string, convert to int)
age = int(input("How old are you? "))
print("Next year you'll be", age + 1)
\`\`\`

## 🎯 Summary

You learned:
✅ What programming is and why Python
✅ How to print output
✅ Variables and data types
✅ Basic math and string operations
✅ Getting user input

Next lesson: We'll learn if/else statements, loops, and functions - the building blocks of programming!`;

      session1.objectives = [
        'Understand what programming is and why Python is used for AI',
        'Write and run your first Python program',
        'Create and use variables to store data',
        'Understand different data types (strings, integers, floats, booleans)',
        'Perform basic operations and get user input'
      ];

      session1.codingExercises = [
        {
          title: 'Exercise 1: About Me Program',
          description: 'Create a program that stores information about yourself in variables and prints it in a formatted way.',
          difficulty: 'beginner',
          starterCode: `# Exercise 1: About Me Program
# Create variables to store your information

# Store your name
name = ""  # YOUR NAME HERE

# Store your age
age = 0    # YOUR AGE HERE

# Store your favorite subject
favorite_subject = ""  # YOUR SUBJECT HERE

# Store your career goal
career_goal = ""  # YOUR GOAL HERE

# Now print them in nice sentences
# TODO: Complete these print statements
print("My name is", name)
print("I am", age, "years old")
# Add 2 more print statements for subject and goal`,
          solution: `name = "Alice"
age = 16
favorite_subject = "Computer Science"
career_goal = "AI Engineer"

print("My name is", name)
print("I am", age, "years old")
print("My favorite subject is", favorite_subject)
print("I want to become an", career_goal)`,
          hints: [
            'Use quotes for text (strings)',
            'No quotes needed for numbers',
            'Use commas in print() to separate items',
            'Make sure variable names match exactly'
          ],
          points: 15
        },
        {
          title: 'Exercise 2: Simple Calculator',
          description: 'Build a calculator that asks for two numbers and performs all basic math operations.',
          difficulty: 'beginner',
          starterCode: `# Exercise 2: Simple Calculator
# Ask user for two numbers and show all operations

# Get first number (convert input to float for decimals)
num1 = float(input("Enter first number: "))

# Get second number
num2 = float(input("Enter second number: "))

# TODO: Calculate and print all operations
# Addition
total = num1 + num2
print(num1, "+", num2, "=", total)

# Subtraction (YOU DO THIS)
# Multiplication (YOU DO THIS)
# Division (YOU DO THIS)`,
          solution: `num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

# All operations
print(num1, "+", num2, "=", num1 + num2)
print(num1, "-", num2, "=", num1 - num2)
print(num1, "*", num2, "=", num1 * num2)
print(num1, "/", num2, "=", num1 / num2)`,
          hints: [
            'Use float() to convert input to decimal numbers',
            'Copy the pattern from addition for other operations',
            'Use -, *, / operators for other operations'
          ],
          points: 20
        },
        {
          title: 'Exercise 3: Age Calculator',
          description: 'Create a program that calculates birth year from current age and predicts age in future years.',
          difficulty: 'intermediate',
          starterCode: `# Exercise 3: Age Calculator
# Calculate birth year and future age

current_year = 2025

# Get user's age
age = int(input("How old are you? "))

# TODO: Calculate birth year
birth_year = 0  # FIX THIS

print("You were born in", birth_year)

# TODO: Calculate age in 10 years
future_age = 0  # FIX THIS

print("In 10 years, you will be", future_age, "years old")

# TODO: Calculate age in year 2050
age_2050 = 0  # FIX THIS

print("In 2050, you will be", age_2050, "years old")`,
          solution: `current_year = 2025
age = int(input("How old are you? "))

birth_year = current_year - age
print("You were born in", birth_year)

future_age = age + 10
print("In 10 years, you will be", future_age, "years old")

age_2050 = age + (2050 - current_year)
print("In 2050, you will be", age_2050, "years old")`,
          hints: [
            'Birth year = current year - age',
            'Future age = current age + years ahead',
            'For 2050: add the difference between 2050 and current year'
          ],
          points: 25
        }
      ];

      session1.interactiveTools = [
        {
          name: 'colab',
          url: 'https://colab.research.google.com/',
          description: 'Google Colab - Free online Python environment. No installation needed!',
          instructions: `1. Click the link to open Google Colab
2. Sign in with your Google account
3. Click "New Notebook"
4. Type your Python code in the cell
5. Press Shift+Enter to run the code
6. See the output immediately below!

TIP: Save your notebook to Google Drive for later`
        }
      ];

      session1.activities = [
        {
          title: 'Python Installation (Optional)',
          description: 'If you want Python on your computer: Download from python.org and install. But Google Colab works great without installing anything!',
          type: 'individual',
          duration: '15 minutes',
          required: false
        },
        {
          title: 'Complete All 3 Coding Exercises',
          description: 'Practice each exercise in Google Colab. Type the code yourself (don\'t copy-paste) to build muscle memory!',
          type: 'hands-on',
          duration: '45 minutes',
          required: true
        },
        {
          title: 'Personal Project: Create Your Own Calculator',
          description: 'Build a calculator that does something unique - maybe converting temperatures, calculating grades, or something creative! Share with your classmates.',
          type: 'project',
          duration: '30 minutes',
          required: false
        }
      ];

      await session1.save();
      console.log('✅ Updated Session 1: Python Basics');
    }

    console.log('\n🎉 Course restructured successfully!');
    console.log('\nNEW PROGRESSION:');
    console.log('Session 1: Python Basics (variables, data types, input/output)');
    console.log('Session 2: Control Flow (if/else, loops)');
    console.log('Session 3: Functions & Lists');
    console.log('Session 4: Data Analysis Project - Analyzing Real Data');
    console.log('Session 5: Mini Project - Build a Quiz Game');
    console.log('Session 6: Introduction to AI (after Python foundation)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

restructureCourse();
