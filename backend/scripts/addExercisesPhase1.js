require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

async function addExercisesPhase1() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const course = await Course.findOne({ title: /AI Fundamentals/i });
    const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
    
    console.log('📝 Adding exercises to Sessions 3, 6-13...\n');

    // SESSION 3: Types of AI
    const session3 = lessons.find(l => l.title.includes('Session 3'));
    if (session3 && (!session3.codingExercises || session3.codingExercises.length === 0)) {
      session3.codingExercises = [
        {
          title: 'AI Type Identifier',
          description: 'Create a program that asks questions about an AI system and identifies if it\'s Narrow, General, or Super AI.',
          difficulty: 'beginner',
          starterCode: `# AI Type Identifier
print("=== AI Type Identifier ===")
print("Answer questions about the AI system:\\n")

# Ask questions
can_do_multiple_tasks = input("Can it perform many different tasks? (yes/no): ")
learns_by_itself = input("Does it learn and improve on its own? (yes/no): ")
exceeds_human = input("Does it exceed human intelligence in ALL areas? (yes/no): ")

# TODO: Determine AI type based on answers
# Narrow AI: Specialized, single task
# General AI: Multiple tasks, human-level
# Super AI: Exceeds humans in all areas

print("\\nAI Type: ???")`,
          solution: `print("=== AI Type Identifier ===")
print("Answer questions about the AI system:\\n")

can_do_multiple_tasks = input("Can it perform many different tasks? (yes/no): ").lower()
learns_by_itself = input("Does it learn and improve on its own? (yes/no): ").lower()
exceeds_human = input("Does it exceed human intelligence in ALL areas? (yes/no): ").lower()

if exceeds_human == "yes":
    ai_type = "Super AI (Hypothetical - doesn't exist yet!)"
elif can_do_multiple_tasks == "yes" and learns_by_itself == "yes":
    ai_type = "General AI (AGI - Still in research)"
else:
    ai_type = "Narrow AI (Current AI technology)"

print(f"\\nAI Type: {ai_type}")`,
          hints: ['Check for Super AI first (exceeds human)', 'Then check for General AI (multiple tasks + learning)', 'Everything else is Narrow AI'],
          points: 20
        },
        {
          title: 'AI Examples Classifier',
          description: 'Build a program that classifies real-world AI examples into categories.',
          difficulty: 'beginner',
          starterCode: `# AI Examples Classifier
examples = {
    "Siri": "voice assistant",
    "Tesla Autopilot": "self-driving",
    "Netflix recommendations": "recommendation system",
    "Face ID": "facial recognition",
    "ChatGPT": "language model"
}

# TODO: Let user pick an example and show its category
# TODO: Add your own AI examples`,
          solution: `examples = {
    "Siri": "voice assistant",
    "Tesla Autopilot": "self-driving",
    "Netflix recommendations": "recommendation system",
    "Face ID": "facial recognition",
    "ChatGPT": "language model",
    "Spam filter": "classification",
    "Google Translate": "language translation"
}

print("=== AI Examples ===")
for name in examples:
    print(f"- {name}")

choice = input("\\nEnter an AI name to learn more: ")

if choice in examples:
    print(f"{choice} is a {examples[choice]} AI")
else:
    print("Not found. Add it to the list!")`,
          hints: ['Use a dictionary to store AI names and types', 'Check if user input exists in dictionary', 'Add more examples to show variety'],
          points: 25
        }
      ];
      session3.interactiveTools = [
        {
          name: 'colab',
          url: 'https://colab.research.google.com/',
          description: 'Run Python code exercises in your browser',
          instructions: 'Click "New Notebook" and paste the starter code'
        }
      ];
      await session3.save();
      console.log('✅ Session 3: Types of AI');
    }

    // SESSION 6: Types of Machine Learning
    const session6 = lessons.find(l => l.title.includes('Session 6'));
    if (session6 && (!session6.codingExercises || session6.codingExercises.length === 0)) {
      session6.codingExercises = [
        {
          title: 'ML Type Quiz Builder',
          description: 'Create a quiz that teaches supervised, unsupervised, and reinforcement learning through examples.',
          difficulty: 'beginner',
          starterCode: `# ML Type Quiz
questions = [
    {
        "scenario": "Teaching AI to recognize cats vs dogs with labeled photos",
        "answer": "supervised"
    },
    {
        "scenario": "AI learns to play chess by trying moves and getting rewards",
        "answer": "reinforcement"
    }
    # TODO: Add 3 more scenarios
]

score = 0
# TODO: Ask each question and check answers`,
          solution: `questions = [
    {"scenario": "Teaching AI to recognize cats vs dogs with labeled photos", "answer": "supervised"},
    {"scenario": "AI learns to play chess by trying moves and getting rewards", "answer": "reinforcement"},
    {"scenario": "Finding hidden patterns in customer shopping data", "answer": "unsupervised"},
    {"scenario": "Email spam filter trained on spam vs not-spam examples", "answer": "supervised"},
    {"scenario": "Self-driving car learns from trial and error", "answer": "reinforcement"}
]

print("=== ML Type Quiz ===")
print("Types: supervised, unsupervised, reinforcement\\n")

score = 0
for i, q in enumerate(questions):
    print(f"Q{i+1}: {q['scenario']}")
    answer = input("ML Type: ").lower()
    if answer == q['answer']:
        print("✓ Correct!\\n")
        score += 1
    else:
        print(f"✗ Wrong. Answer: {q['answer']}\\n")

print(f"Score: {score}/{len(questions)}")`,
          hints: ['Supervised = labeled training data', 'Unsupervised = find patterns without labels', 'Reinforcement = learn from rewards/penalties'],
          points: 30
        }
      ];
      await session6.save();
      console.log('✅ Session 6: Types of Machine Learning');
    }

    // SESSION 7: Data Quality & Bias
    const session7 = lessons.find(l => l.title.includes('Session 7'));
    if (session7 && (!session7.codingExercises || session7.codingExercises.length === 0)) {
      session7.codingExercises = [
        {
          title: 'Data Quality Checker',
          description: 'Build a program that checks a dataset for missing values, duplicates, and outliers.',
          difficulty: 'intermediate',
          starterCode: `# Data Quality Checker
dataset = [85, 92, 78, 88, None, 95, 88, 200, 82, None, 88]

# TODO: Count missing values (None)
# TODO: Find duplicates
# TODO: Identify outliers (values > 100 or < 0)

print("Data Quality Report:")
print(f"Total records: {len(dataset)}")
print(f"Missing values: ???")
print(f"Duplicates: ???")
print(f"Outliers: ???")`,
          solution: `dataset = [85, 92, 78, 88, None, 95, 88, 200, 82, None, 88]

# Count missing values
missing = dataset.count(None)

# Find duplicates
seen = []
duplicates = []
for value in dataset:
    if value is not None:
        if value in seen and value not in duplicates:
            duplicates.append(value)
        seen.append(value)

# Find outliers
outliers = [v for v in dataset if v is not None and (v > 100 or v < 0)]

print("Data Quality Report:")
print(f"Total records: {len(dataset)}")
print(f"Missing values: {missing}")
print(f"Duplicates: {duplicates}")
print(f"Outliers: {outliers}")`,
          hints: ['Use .count(None) for missing values', 'Track seen values to find duplicates', 'Check if value > 100 or < 0 for grade outliers'],
          points: 35
        }
      ];
      await session7.save();
      console.log('✅ Session 7: Data Quality & Bias');
    }

    // SESSION 9: Python Basics for AI
    const session9 = lessons.find(l => l.title.includes('Session 9'));
    if (session9 && (!session9.codingExercises || session9.codingExercises.length === 0)) {
      session9.codingExercises = [
        {
          title: 'AI Training Data Generator',
          description: 'Create synthetic training data for an AI model using Python lists and random numbers.',
          difficulty: 'intermediate',
          starterCode: `import random

# Generate training data: house prices based on size
# Rule: price = size * 100 + random variation

training_data = []

# TODO: Generate 20 examples
# Each example: {"size": sqft, "price": calculated_price}

for i in range(20):
    size = random.randint(500, 3000)
    # TODO: Calculate price with formula
    # TODO: Add to training_data list

print("Sample Training Data:")
for example in training_data[:5]:
    print(example)`,
          solution: `import random

training_data = []

for i in range(20):
    size = random.randint(500, 3000)
    base_price = size * 100
    variation = random.randint(-10000, 10000)
    price = base_price + variation
    
    training_data.append({"size": size, "price": price})

print("Sample Training Data:")
for item in training_data[:5]:
    print("Size:", item["size"], "sqft -> Price: $", item["price"])

print("Total examples:", len(training_data))`,
          hints: ['Use random.randint() for size and variation', 'Store each example as dictionary', 'Formula: base_price * size + random_variation'],
          points: 30
        }
      ];
      await session9.save();
      console.log('✅ Session 9: Python Basics for AI');
    }

    // SESSION 10: AI Ethics
    const session10 = lessons.find(l => l.title.includes('Session 10'));
    if (session10 && (!session10.codingExercises || session10.codingExercises.length === 0)) {
      session10.codingExercises = [
        {
          title: 'Bias Detection Simulator',
          description: 'Simulate how biased training data leads to unfair AI decisions.',
          difficulty: 'intermediate',
          starterCode: `# Bias Detection Simulator
# Hiring AI trained on biased data

training_data = [
    {"experience": 5, "education": "BS", "gender": "M", "hired": True},
    {"experience": 3, "education": "MS", "gender": "M", "hired": True},
    {"experience": 7, "education": "BS", "gender": "M", "hired": True},
    {"experience": 6, "education": "MS", "gender": "F", "hired": False},
    {"experience": 8, "education": "PhD", "gender": "F", "hired": False},
]

# TODO: Analyze the training data
# TODO: Count hired by gender
# TODO: Show the bias

print("Bias Analysis Report:")`,
          solution: `training_data = [
    {"experience": 5, "education": "BS", "gender": "M", "hired": True},
    {"experience": 3, "education": "MS", "gender": "M", "hired": True},
    {"experience": 7, "education": "BS", "gender": "M", "hired": True},
    {"experience": 6, "education": "MS", "gender": "F", "hired": False},
    {"experience": 8, "education": "PhD", "gender": "F", "hired": False},
]

male_hired = sum(1 for d in training_data if d['gender'] == 'M' and d['hired'])
female_hired = sum(1 for d in training_data if d['gender'] == 'F' and d['hired'])

male_total = sum(1 for d in training_data if d['gender'] == 'M')
female_total = sum(1 for d in training_data if d['gender'] == 'F')

print("Bias Analysis Report:")
print(f"Male hired: {male_hired}/{male_total} ({male_hired/male_total*100:.0f}%)")
print(f"Female hired: {female_hired}/{female_total} ({female_hired/female_total*100:.0f}%)")
print("\\n⚠️ This training data shows gender bias!")
print("AI trained on this data will discriminate.")`,
          hints: ['Count hired=True for each gender', 'Calculate percentages', 'Compare hiring rates to show bias'],
          points: 40
        }
      ];
      await session10.save();
      console.log('✅ Session 10: AI Ethics - Bias & Fairness');
    }

    // SESSION 11: Python for Data (NumPy)
    const session11 = lessons.find(l => l.title.includes('Session 11'));
    if (session11 && (!session11.codingExercises || session11.codingExercises.length === 0)) {
      session11.codingExercises = [
        {
          title: 'NumPy Array Operations',
          description: 'Learn NumPy basics for AI: arrays, operations, and statistics.',
          difficulty: 'intermediate',
          starterCode: `import numpy as np

# Create arrays
temperatures = np.array([72, 75, 68, 82, 79, 71, 77])

# TODO: Calculate mean temperature
# TODO: Find hottest day (max)
# TODO: Find coldest day (min)
# TODO: Calculate temperature range

print("Temperature Analysis:")`,
          solution: `import numpy as np

temperatures = np.array([72, 75, 68, 82, 79, 71, 77])

mean_temp = np.mean(temperatures)
max_temp = np.max(temperatures)
min_temp = np.min(temperatures)
temp_range = max_temp - min_temp
std_dev = np.std(temperatures)

print("Temperature Analysis:")
print(f"Mean: {mean_temp:.1f}°F")
print(f"Hottest: {max_temp}°F")
print(f"Coldest: {min_temp}°F")
print(f"Range: {temp_range}°F")
print(f"Std Dev: {std_dev:.2f}")`,
          hints: ['Use np.mean() for average', 'Use np.max() and np.min()', 'Range = max - min'],
          points: 25
        },
        {
          title: 'Matrix Operations for AI',
          description: 'Practice matrix operations used in neural networks.',
          difficulty: 'intermediate',
          starterCode: `import numpy as np

# Input features (3 samples, 2 features each)
X = np.array([[1, 2], [3, 4], [5, 6]])

# Weights
weights = np.array([0.5, 0.3])

# TODO: Calculate predictions = X @ weights (matrix multiplication)
# TODO: This simulates a simple neural network layer

predictions = None
print("Predictions:", predictions)`,
          solution: `import numpy as np

X = np.array([[1, 2], [3, 4], [5, 6]])
weights = np.array([0.5, 0.3])

# Matrix multiplication (like neural network)
predictions = X @ weights

print("Input features:")
print(X)
print("\\nWeights:", weights)
print("\\nPredictions:", predictions)
print("\\nThis is how neural networks process data!")`,
          hints: ['Use @ operator for matrix multiplication', 'Result shape: (3, 2) @ (2,) = (3,)', 'Each prediction = sum of features * weights'],
          points: 30
        }
      ];
      await session11.save();
      console.log('✅ Session 11: Python for Data (NumPy)');
    }

    // SESSION 12: Hands-on Python Practice
    const session12 = lessons.find(l => l.title.includes('Session 12'));
    if (session12 && (!session12.codingExercises || session12.codingExercises.length === 0)) {
      session12.codingExercises = [
        {
          title: 'List Comprehensions for Data Processing',
          description: 'Master Python list comprehensions for efficient data manipulation.',
          difficulty: 'intermediate',
          starterCode: `# List Comprehensions Practice
data = [23, 45, 12, 67, 89, 34, 56, 78, 91, 25]

# TODO: Filter numbers > 50 using list comprehension
large_numbers = []

# TODO: Square all numbers
squared = []

# TODO: Filter even numbers and multiply by 2
processed = []

print("Large numbers:", large_numbers)
print("Squared:", squared)
print("Processed:", processed)`,
          solution: `data = [23, 45, 12, 67, 89, 34, 56, 78, 91, 25]

# Filter > 50
large_numbers = [x for x in data if x > 50]

# Square all
squared = [x**2 for x in data]

# Even numbers * 2
processed = [x*2 for x in data if x % 2 == 0]

print("Original:", data)
print("Large numbers (>50):", large_numbers)
print("Squared:", squared[:5], "...")
print("Processed (even*2):", processed)`,
          hints: ['Syntax: [expression for item in list if condition]', 'Use x**2 for squaring', 'Use x % 2 == 0 for even numbers'],
          points: 30
        }
      ];
      await session12.save();
      console.log('✅ Session 12: Hands-on Python Practice');
    }

    // SESSION 13: Introduction to Teachable Machine
    const session13 = lessons.find(l => l.title.includes('Session 13'));
    if (session13 && (!session13.codingExercises || session13.codingExercises.length === 0)) {
      session13.codingExercises = [
        {
          title: 'Teachable Machine Planning Worksheet',
          description: 'Plan your first image classification project: define classes, collect data strategy.',
          difficulty: 'beginner',
          starterCode: `# Teachable Machine Project Planner

project = {
    "name": "???",
    "classes": [],  # What categories will you classify?
    "examples_per_class": 0,  # How many training images?
    "use_case": "???"  # What will this AI do?
}

# TODO: Fill in your project details
# Example: Hand gesture recognizer with 5 gestures

# TODO: Calculate total training images needed
total_images = len(project["classes"]) * project["examples_per_class"]

print("Project Plan:")
print(f"Name: {project['name']}")
print(f"Classes: {project['classes']}")
print(f"Total training images needed: {total_images}")`,
          solution: `project = {
    "name": "Rock Paper Scissors Classifier",
    "classes": ["rock", "paper", "scissors"],
    "examples_per_class": 50,
    "use_case": "Play rock-paper-scissors with AI"
}

total_images = len(project["classes"]) * project["examples_per_class"]

print("=== Teachable Machine Project Plan ===")
print(f"Project: {project['name']}")
print(f"Classes to detect: {', '.join(project['classes'])}")
print(f"Examples per class: {project['examples_per_class']}")
print(f"Total images needed: {total_images}")
print(f"\\nUse Case: {project['use_case']}")
print("\\nNext: Go to teachablemachine.withgoogle.com and train it!")`,
          hints: ['Choose 3-5 distinct classes', 'Need 30-50 examples per class', 'Make classes visually different'],
          points: 20
        }
      ];
      session13.interactiveTools = [
        {
          name: 'teachable_machine',
          url: 'https://teachablemachine.withgoogle.com/',
          description: 'Train AI models without code using your webcam',
          instructions: 'Start an Image Project, add classes, collect samples, train model'
        }
      ];
      await session13.save();
      console.log('✅ Session 13: Introduction to Teachable Machine');
    }

    console.log('\n🎉 Phase 1 Complete: Added exercises to Sessions 3, 6-13');
    console.log('📊 Total new exercises: ~15');
    console.log('🎯 Total new points: ~315\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addExercisesPhase1();
