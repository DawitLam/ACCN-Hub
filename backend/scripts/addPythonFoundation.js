require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

async function addPythonFoundationLessons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const course = await Course.findOne({ title: /AI Fundamentals/i });
    const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
    
    // Find Session 2, 4, and 5 to update with Python content
    const session2 = lessons.find(l => l.title.includes('Session 2'));
    const session4 = lessons.find(l => l.title.includes('Session 4'));
    const session5 = lessons.find(l => l.title.includes('Session 5'));

    // UPDATE SESSION 2: Control Flow
    if (session2) {
      session2.title = 'Session 2: Control Flow - Making Decisions & Loops';
      session2.duration = '90 minutes';
      session2.content = `# Control Flow: Teaching Your Code to Make Decisions

Now that you know variables, let's make programs that can think and repeat actions!

## Part 1: If Statements - Making Decisions (25 minutes)

Programs need to make choices, just like you do every day.

**Real life:** "If it's raining, bring an umbrella. Otherwise, wear sunglasses."

**Python:**
\`\`\`python
weather = "rainy"

if weather == "rainy":
    print("Bring an umbrella! ☔")
else:
    print("Wear sunglasses! 😎")
\`\`\`

**Comparison Operators:**
- \`==\` Equal to
- \`!=\` Not equal to
- \`>\` Greater than
- \`<\` Less than
- \`>=\` Greater than or equal
- \`<=\` Less than or equal

### Multiple Conditions (elif)

\`\`\`python
grade = 85

if grade >= 90:
    print("A - Excellent!")
elif grade >= 80:
    print("B - Good job!")
elif grade >= 70:
    print("C - Passing")
else:
    print("Need improvement")
\`\`\`

## Part 2: For Loops - Repeating Actions (25 minutes)

Instead of writing the same code multiple times, use loops!

**Without loop (tedious):**
\`\`\`python
print("Hello 1")
print("Hello 2")
print("Hello 3")
print("Hello 4")
print("Hello 5")
\`\`\`

**With loop (smart):**
\`\`\`python
for i in range(5):
    print("Hello", i+1)
\`\`\`

### Looping Through Lists

\`\`\`python
fruits = ["apple", "banana", "orange", "grape"]

for fruit in fruits:
    print("I like", fruit)
\`\`\`

### Range Function

\`\`\`python
# range(5) gives: 0, 1, 2, 3, 4
for num in range(5):
    print(num)

# range(1, 11) gives: 1, 2, 3...10
for num in range(1, 11):
    print(num)

# range(0, 10, 2) gives: 0, 2, 4, 6, 8
for num in range(0, 10, 2):
    print(num)
\`\`\`

## Part 3: While Loops - Repeat Until Condition is False (20 minutes)

\`\`\`python
count = 1

while count <= 5:
    print("Count:", count)
    count = count + 1

print("Done!")
\`\`\`

### Be Careful: Infinite Loops!

\`\`\`python
# DON'T DO THIS - it never stops!
# while True:
#     print("Forever...")
\`\`\`

## Part 4: Combining Conditions with and/or (10 minutes)

\`\`\`python
age = 16
has_license = True

if age >= 16 and has_license:
    print("You can drive!")
else:
    print("Not yet!")

# OR example
day = "Saturday"

if day == "Saturday" or day == "Sunday":
    print("It's the weekend! 🎉")
else:
    print("It's a weekday")
\`\`\`

## 🎯 Summary

You learned:
✅ If/elif/else for making decisions
✅ For loops to repeat code
✅ While loops to repeat until condition is false
✅ Combining conditions with and/or
✅ How to avoid infinite loops`;

      session2.objectives = [
        'Use if/elif/else statements to make decisions',
        'Create for loops to repeat actions',
        'Use while loops for conditional repetition',
        'Combine conditions using and/or operators',
        'Build programs that respond to different inputs'
      ];

      session2.codingExercises = [
        {
          title: 'Exercise 1: Grade Calculator',
          description: 'Build a program that converts numeric grades to letter grades with if/elif/else.',
          difficulty: 'beginner',
          starterCode: `# Grade Calculator
grade = int(input("Enter your grade (0-100): "))

# TODO: Add if/elif/else statements
# 90-100: A
# 80-89: B
# 70-79: C
# 60-69: D
# Below 60: F`,
          solution: `grade = int(input("Enter your grade (0-100): "))

if grade >= 90:
    print("Grade: A")
elif grade >= 80:
    print("Grade: B")
elif grade >= 70:
    print("Grade: C")
elif grade >= 60:
    print("Grade: D")
else:
    print("Grade: F")`,
          hints: ['Start with the highest grade first', 'Use elif for middle conditions', 'Use else for the last case'],
          points: 20
        },
        {
          title: 'Exercise 2: Multiplication Table',
          description: 'Create a multiplication table for any number using a for loop.',
          difficulty: 'beginner',
          starterCode: `# Multiplication Table
number = int(input("Enter a number: "))

# TODO: Use a for loop to print multiplication table
# Example: 5 x 1 = 5, 5 x 2 = 10, etc.
for i in range(1, 11):
    # Complete this line
    print()`,
          solution: `number = int(input("Enter a number: "))

for i in range(1, 11):
    result = number * i
    print(f"{number} x {i} = {result}")`,
          hints: ['Use range(1, 11) for numbers 1 to 10', 'Calculate result = number * i inside loop', 'Print in format: number x i = result'],
          points: 25
        },
        {
          title: 'Exercise 3: Number Guessing Game',
          description: 'Build a game where the computer picks a number and user guesses until correct.',
          difficulty: 'intermediate',
          starterCode: `# Number Guessing Game
import random

secret_number = random.randint(1, 10)
guess = 0

# TODO: Use while loop to keep asking until correct
# Give hints: "Too high" or "Too low"

print("I'm thinking of a number between 1 and 10")

# YOUR CODE HERE`,
          solution: `import random

secret_number = random.randint(1, 10)
guess = 0

print("I'm thinking of a number between 1 and 10")

while guess != secret_number:
    guess = int(input("Your guess: "))
    
    if guess < secret_number:
        print("Too low! Try again.")
    elif guess > secret_number:
        print("Too high! Try again.")
    else:
        print("Correct! You won! 🎉")`,
          hints: ['Use while loop: while guess != secret_number', 'Compare guess to secret_number', 'Give feedback before next guess'],
          points: 30
        }
      ];

      session2.activities = [
        {
          title: 'FizzBuzz Challenge',
          description: 'Classic programming challenge: Print numbers 1-100, but for multiples of 3 print "Fizz", multiples of 5 print "Buzz", and multiples of both print "FizzBuzz".',
          type: 'hands-on',
          duration: '20 minutes',
          required: true
        }
      ];

      await session2.save();
      console.log('✅ Updated Session 2: Control Flow');
    }

    // UPDATE SESSION 4: Data Analysis Project
    if (session4) {
      session4.title = 'Session 4: Data Analysis Project - Real-World Python';
      session4.duration = '120 minutes';
      session4.content = `# Data Analysis with Python - Your First Real Project!

Let's use Python to analyze real data, just like data scientists do!

## Project: Student Grade Analyzer

**What you'll build:** A program that analyzes test scores and generates statistics.

## Part 1: Lists - Storing Multiple Values (20 minutes)

\`\`\`python
# Store multiple grades
grades = [85, 92, 78, 95, 88]

# Access items by index (starts at 0!)
print(grades[0])  # First: 85
print(grades[4])  # Last: 88

# Add new grade
grades.append(90)

# Length of list
print(len(grades))  # 6
\`\`\`

## Part 2: Calculating Statistics (30 minutes)

\`\`\`python
grades = [85, 92, 78, 95, 88, 90, 76, 89, 94, 82]

# Calculate average
total = sum(grades)
average = total / len(grades)
print(f"Average: {average:.2f}")

# Find highest and lowest
highest = max(grades)
lowest = min(grades)
print(f"Highest: {highest}")
print(f"Lowest: {lowest}")

# Count passing grades (70+)
passing_count = 0
for grade in grades:
    if grade >= 70:
        passing_count += 1

print(f"Passing: {passing_count}/{len(grades)}")
\`\`\`

## Part 3: Grade Distribution (25 minutes)

\`\`\`python
# Count letter grades
a_count = 0
b_count = 0
c_count = 0
d_count = 0
f_count = 0

for grade in grades:
    if grade >= 90:
        a_count += 1
    elif grade >= 80:
        b_count += 1
    elif grade >= 70:
        c_count += 1
    elif grade >= 60:
        d_count += 1
    else:
        f_count += 1

print("Grade Distribution:")
print(f"A's: {a_count}")
print(f"B's: {b_count}")
print(f"C's: {c_count}")
print(f"D's: {d_count}")
print(f"F's: {f_count}")
\`\`\`

## Part 4: Visual Bar Chart with Text (20 minutes)

\`\`\`python
# Create simple text-based chart
print("\\nGrade Chart:")
print("A: " + "█" * a_count)
print("B: " + "█" * b_count)
print("C: " + "█" * c_count)
print("D: " + "█" * d_count)
print("F: " + "█" * f_count)
\`\`\`

## Part 5: Complete Project Challenge (25 minutes)

**Your Task:** Build a complete grade analyzer that:
1. Asks user to input multiple grades
2. Calculates all statistics
3. Shows grade distribution
4. Displays text-based chart
5. Identifies students needing help (below 70)

## 🎯 Real-World Application

This same logic is used for:
- Netflix analyzing viewing patterns
- Schools tracking student performance
- Businesses analyzing sales data
- Scientists processing research results`;

      session4.objectives = [
        'Use lists to store and organize data',
        'Calculate statistics (average, min, max)',
        'Analyze data distribution',
        'Create visual representations with text',
        'Build a complete data analysis program'
      ];

      session4.codingExercises = [
        {
          title: 'Mini Project: Complete Grade Analyzer',
          description: 'Build the full grade analyzer program with all features: input, statistics, distribution, and visualization.',
          difficulty: 'intermediate',
          starterCode: `# Complete Grade Analyzer Project

def analyze_grades():
    grades = []
    
    # Part 1: Get grades from user
    print("Enter student grades (enter -1 when done):")
    while True:
        grade = int(input("Grade: "))
        if grade == -1:
            break
        grades.append(grade)
    
    # Part 2: Calculate statistics
    # TODO: Calculate average, highest, lowest
    
    # Part 3: Grade distribution
    # TODO: Count A's, B's, C's, D's, F's
    
    # Part 4: Display results
    # TODO: Print all statistics and chart
    
analyze_grades()`,
          solution: `def analyze_grades():
    grades = []
    
    print("Enter student grades (enter -1 when done):")
    while True:
        grade = int(input("Grade: "))
        if grade == -1:
            break
        if 0 <= grade <= 100:
            grades.append(grade)
    
    if len(grades) == 0:
        print("No grades entered!")
        return
    
    # Statistics
    average = sum(grades) / len(grades)
    highest = max(grades)
    lowest = min(grades)
    
    # Distribution
    a = sum(1 for g in grades if g >= 90)
    b = sum(1 for g in grades if 80 <= g < 90)
    c = sum(1 for g in grades if 70 <= g < 80)
    d = sum(1 for g in grades if 60 <= g < 70)
    f = sum(1 for g in grades if g < 60)
    
    # Display
    print(f"\\n=== Grade Analysis ===")
    print(f"Total Students: {len(grades)}")
    print(f"Average: {average:.2f}")
    print(f"Highest: {highest}")
    print(f"Lowest: {lowest}")
    print(f"\\nDistribution:")
    print(f"A: {a} | " + "█" * a)
    print(f"B: {b} | " + "█" * b)
    print(f"C: {c} | " + "█" * c)
    print(f"D: {d} | " + "█" * d)
    print(f"F: {f} | " + "█" * f)
    
analyze_grades()`,
          hints: ['Use a list to store all grades', 'Use sum() and len() for average', 'Loop through grades once for distribution', 'Use f-strings for neat formatting'],
          points: 50
        }
      ];

      session4.activities = [
        {
          title: 'Extend the Analyzer',
          description: 'Add new features: sort grades, find median, identify outliers, save results to file.',
          type: 'project',
          duration: '45 minutes',
          required: false
        }
      ];

      await session4.save();
      console.log('✅ Updated Session 4: Data Analysis Project');
    }

    // UPDATE SESSION 5: Quiz Game Project
    if (session5) {
      session5.title = 'Session 5: Build a Quiz Game - Functions & Project';
      session5.duration = '120 minutes';
      session5.content = `# Build Your Own Quiz Game!

Combine everything you've learned to create an interactive quiz game!

## Part 1: Functions - Reusable Code Blocks (25 minutes)

Functions are like recipes - write once, use many times!

\`\`\`python
# Define a function
def greet(name):
    print(f"Hello, {name}!")
    print("Welcome to Python!")

# Call the function
greet("Alice")
greet("Bob")
\`\`\`

**Functions with Return Values:**
\`\`\`python
def add_numbers(a, b):
    result = a + b
    return result

answer = add_numbers(5, 3)
print(answer)  # 8
\`\`\`

## Part 2: Quiz Game Structure (30 minutes)

\`\`\`python
# Store questions and answers
questions = [
    "What is 2 + 2?",
    "What is the capital of France?",
    "What year did Python release?"
]

answers = ["4", "Paris", "1991"]

score = 0

# Ask each question
for i in range(len(questions)):
    print(f"\\nQuestion {i+1}: {questions[i]}")
    user_answer = input("Your answer: ")
    
    if user_answer.lower() == answers[i].lower():
        print("✓ Correct!")
        score += 1
    else:
        print(f"✗ Wrong! Answer: {answers[i]}")

print(f"\\nFinal Score: {score}/{len(questions)}")
\`\`\`

## Part 3: Multiple Choice Quiz (35 minutes)

\`\`\`python
def ask_question(question, options, correct):
    print(f"\\n{question}")
    for i, option in enumerate(options):
        print(f"{i+1}. {option}")
    
    while True:
        try:
            choice = int(input("Your answer (number): "))
            if 1 <= choice <= len(options):
                return choice == correct
            print("Invalid choice!")
        except:
            print("Enter a number!")

# Quiz questions
quiz = [
    {
        "question": "What does AI stand for?",
        "options": ["Automatic Intelligence", "Artificial Intelligence", "Advanced Internet"],
        "correct": 2
    },
    {
        "question": "Which language is best for AI?",
        "options": ["Java", "C++", "Python", "JavaScript"],
        "correct": 3
    }
]

score = 0
for q in quiz:
    if ask_question(q["question"], q["options"], q["correct"]):
        print("✓ Correct!")
        score += 1
    else:
        print("✗ Wrong!")

print(f"\\nScore: {score}/{len(quiz)}")
\`\`\`

## Part 4: Complete Quiz Game Challenge (30 minutes)

**Your Task:** Build a complete quiz game with:
1. At least 10 questions
2. Multiple choice format
3. Score tracking
4. Difficulty levels (easy/medium/hard)
5. Timer (optional challenge)
6. Leaderboard (save high scores)

## 🎯 What You've Accomplished

You can now:
✅ Write functions to organize code
✅ Store complex data in lists and dictionaries
✅ Build interactive programs
✅ Create a complete game from scratch
✅ Handle user input and errors

**Next:** Now that you know Python, we'll start learning AI!`;

      session5.objectives = [
        'Create and use functions effectively',
        'Build interactive programs with user input',
        'Store and organize complex data',
        'Handle errors gracefully',
        'Complete a full project from start to finish'
      ];

      session5.codingExercises = [
        {
          title: 'Final Project: Complete Quiz Game',
          description: 'Build a fully functional quiz game with 10+ questions, multiple choice, scoring, and difficulty levels.',
          difficulty: 'advanced',
          starterCode: `# Quiz Game Final Project

import random

# Easy questions
easy_questions = [
    {"q": "What is 5 + 5?", "options": ["8", "10", "12"], "answer": 1},
    # Add 4 more easy questions
]

# Medium questions  
medium_questions = [
    {"q": "What is the capital of Japan?", "options": ["Seoul", "Tokyo", "Beijing"], "answer": 1},
    # Add 4 more medium questions
]

# Hard questions
hard_questions = [
    {"q": "Who invented Python?", "options": ["Guido van Rossum", "Bill Gates", "Steve Jobs"], "answer": 0},
    # Add 4 more hard questions
]

def play_quiz(questions, difficulty):
    score = 0
    # TODO: Implement quiz logic
    return score

def main():
    print("=== QUIZ GAME ===")
    # TODO: Ask for difficulty level
    # TODO: Play quiz
    # TODO: Show final score
    
main()`,
          solution: `import random

easy_questions = [
    {"q": "What is 5 + 5?", "options": ["8", "10", "12"], "answer": 1},
    {"q": "What color is the sky?", "options": ["Green", "Blue", "Red"], "answer": 1},
    {"q": "How many days in a week?", "options": ["5", "6", "7"], "answer": 2},
    {"q": "What is 10 - 3?", "options": ["7", "8", "9"], "answer": 0},
    {"q": "Which is a fruit?", "options": ["Carrot", "Apple", "Potato"], "answer": 1}
]

def play_quiz(questions, difficulty):
    score = 0
    random.shuffle(questions)
    
    for i, q in enumerate(questions[:5]):
        print(f"\\nQ{i+1}: {q['q']}")
        for j, opt in enumerate(q['options']):
            print(f"  {j+1}. {opt}")
        
        try:
            ans = int(input("Answer: ")) - 1
            if ans == q['answer']:
                print("✓ Correct!")
                score += 1
            else:
                print(f"✗ Wrong! Answer: {q['options'][q['answer']]}")
        except:
            print("Invalid input!")
    
    return score

def main():
    print("=== QUIZ GAME ===")
    print("1. Easy\\n2. Medium\\n3. Hard")
    level = int(input("Choose difficulty: "))
    
    questions = easy_questions  # Can expand with medium/hard
    score = play_quiz(questions, level)
    
    print(f"\\nFinal Score: {score}/5")
    percentage = (score/5) * 100
    
    if percentage >= 80:
        print("Excellent! 🌟")
    elif percentage >= 60:
        print("Good job! 👍")
    else:
        print("Keep practicing! 💪")

main()`,
          hints: ['Use dictionaries to store question data', 'random.shuffle() to randomize questions', 'Try/except for error handling', 'Calculate percentage for grade'],
          points: 60
        }
      ];

      session5.activities = [
        {
          title: 'Share Your Quiz',
          description: 'Create a quiz on a topic you love (sports, movies, science) and share with classmates. Play each other\'s quizzes!',
          type: 'project',
          duration: '60 minutes',
          required: true
        }
      ];

      await session5.save();
      console.log('✅ Updated Session 5: Quiz Game Project');
    }

    console.log('\n🎉 Python foundation lessons added!');
    console.log('\n📚 NEW COURSE STRUCTURE:');
    console.log('Session 1: Python Basics ✓');
    console.log('Session 2: Control Flow ✓');
    console.log('Session 3: Functions & Lists (next to create)');
    console.log('Session 4: Data Analysis Project ✓');
    console.log('Session 5: Quiz Game Project ✓');
    console.log('Session 6+: AI Concepts (after solid Python foundation)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addPythonFoundationLessons();
