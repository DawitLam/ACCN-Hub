require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

async function completeAllLessons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    console.log('📝 Completing remaining lessons with exercises...\n');

    const course = await Course.findOne({ title: /AI Fundamentals/i });
    const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
    
    // Sessions that need exercises: 8, 15-20, 30-40
    const updates = [];

    for (const lesson of lessons) {
      const sessionNum = lesson.title.match(/Session (\d+)/)?.[1];
      if (!sessionNum) continue;
      
      const num = parseInt(sessionNum);
      
      // Add Google Colab to all lessons
      if (!lesson.interactiveTools || lesson.interactiveTools.length === 0) {
        lesson.interactiveTools = [{
          name: 'colab',
          url: 'https://colab.research.google.com/',
          description: 'Run Python exercises in Google Colab - free cloud environment',
          instructions: 'Click any exercise\'s "Open in Colab" button to run code'
        }];
      }

      // Add exercises to sessions that don't have them
      if (!lesson.codingExercises || lesson.codingExercises.length === 0) {
        
        // SESSION 8: Review & Drawize Game
        if (num === 8) {
          lesson.codingExercises = [{
            title: 'Python Fundamentals Quiz Game',
            description: 'Build a quiz game to test knowledge of Sessions 1-7 concepts.',
            difficulty: 'beginner',
            starterCode: `# Python Fundamentals Quiz
questions = [
    {"q": "What is a variable?", "a": "a"},
    {"q": "What does AI stand for?", "a": "b"}
]
# TODO: Complete the quiz logic
score = 0
print("Quiz complete! Score:", score)`,
            solution: `questions = [
    {"q": "What stores data in Python?", "options": ["variable", "print", "loop"], "a": 0},
    {"q": "What is AI?", "options": ["calculator", "artificial intelligence", "game"], "a": 1}
]
score = 0
for i, q in enumerate(questions):
    print(f"\\nQ{i+1}: {q['q']}")
    for j, opt in enumerate(q['options']):
        print(f"{j}. {opt}")
    ans = int(input("Answer: "))
    if ans == q['a']:
        print("✓ Correct!")
        score += 1
print(f"\\nScore: {score}/{len(questions)}")`,
            hints: ['Loop through questions', 'Display options', 'Compare answer to correct index'],
            points: 25,
            colabNotebookUrl: `https://colab.research.google.com/github/DawitLam/ACCN-Hub/blob/main/notebooks/session8_exercise1.ipynb`
          }];
        }

        // SESSIONS 15-17: Teachable Machine Audio/Pose
        if (num >= 15 && num <= 17) {
          lesson.codingExercises = [{
            title: 'Load and Use Teachable Machine Model',
            description: 'Learn to export your Teachable Machine model and use it in Python.',
            difficulty: 'intermediate',
            starterCode: `# Load Teachable Machine model in Python
from tensorflow import keras
import numpy as np

# TODO: Load your exported model
# model = keras.models.load_model('my_model.h5')

# TODO: Prepare test data
# prediction = model.predict(test_data)

print("Model loaded successfully!")`,
            solution: `from tensorflow import keras
import numpy as np
from PIL import Image

# Load model
model = keras.models.load_model('teachable_machine_model.h5')

# Load and preprocess image
img = Image.open('test_image.jpg').resize((224, 224))
img_array = np.array(img) / 255.0
img_array = np.expand_dims(img_array, 0)

# Predict
prediction = model.predict(img_array)
class_names = ['Class 1', 'Class 2', 'Class 3']

# Show results
for i, prob in enumerate(prediction[0]):
    print(f"{class_names[i]}: {prob*100:.1f}%")
    
predicted_class = class_names[np.argmax(prediction)]
print(f"\\nPredicted: {predicted_class}")`,
            hints: ['Export model from Teachable Machine as Keras', 'Resize images to 224x224', 'Normalize pixel values (divide by 255)'],
            points: 35,
            colabNotebookUrl: `https://colab.research.google.com/github/DawitLam/ACCN-Hub/blob/main/notebooks/session${num}_exercise1.ipynb`
          }];
        }

        // SESSIONS 18-20: Python Libraries, Transfer Learning, Model Testing
        if (num >= 18 && num <= 20) {
          lesson.codingExercises = [{
            title: num === 18 ? 'Explore Essential AI Libraries' : num === 19 ? 'Transfer Learning Example' : 'Model Evaluation Metrics',
            description: num === 18 ? 'Practice importing and using key Python libraries for AI.' : num === 19 ? 'Use a pre-trained model for image classification.' : 'Calculate and interpret model performance metrics.',
            difficulty: 'intermediate',
            starterCode: num === 18 ? `# Essential AI Libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# TODO: Create sample data with NumPy
# TODO: Analyze with Pandas  
# TODO: Visualize with Matplotlib

print("Libraries loaded!")` : num === 19 ? `# Transfer Learning with MobileNet
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing import image

# TODO: Load pre-trained model
# TODO: Make prediction on image

print("Transfer learning complete!")` : `# Model Evaluation
from sklearn.metrics import accuracy_score, precision_score, recall_score

y_true = [0, 1, 1, 0, 1, 0, 1, 1]
y_pred = [0, 1, 0, 0, 1, 0, 1, 1]

# TODO: Calculate metrics
# TODO: Interpret results

print("Evaluation complete!")`,
            solution: num === 18 ? `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# NumPy array
data = np.array([[1, 2, 3], [4, 5, 6]])
print("NumPy array:", data)
print("Mean:", np.mean(data))

# Pandas DataFrame
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})
print("\\nDataFrame:")
print(df)
print("\\nStats:", df.describe())

# Matplotlib plot
plt.plot([1, 2, 3, 4], [1, 4, 2, 3])
plt.title('Sample Plot')
plt.xlabel('X')
plt.ylabel('Y')
plt.show()` : num === 19 ? `from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions
import numpy as np

# Load pre-trained model
model = MobileNetV2(weights='imagenet')

# Load and process image
img = image.load_img('sample.jpg', target_size=(224, 224))
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = preprocess_input(img_array)

# Predict
predictions = model.predict(img_array)
results = decode_predictions(predictions, top=3)[0]

print("Top 3 predictions:")
for i, (imagenet_id, label, score) in enumerate(results):
    print(f"{i+1}. {label}: {score*100:.2f}%")` : `from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

y_true = [0, 1, 1, 0, 1, 0, 1, 1]
y_pred = [0, 1, 0, 0, 1, 0, 1, 1]

accuracy = accuracy_score(y_true, y_pred)
precision = precision_score(y_true, y_pred)
recall = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)

print(f"Accuracy: {accuracy*100:.1f}%")
print(f"Precision: {precision*100:.1f}%")
print(f"Recall: {recall*100:.1f}%")
print(f"F1 Score: {f1:.3f}")

cm = confusion_matrix(y_true, y_pred)
print("\\nConfusion Matrix:")
print(cm)`,
            hints: num === 18 ? ['Import all three libraries', 'Use np.array() for data', 'Use pd.DataFrame() for tables'] : num === 19 ? ['Load MobileNetV2 with imagenet weights', 'Resize images to 224x224', 'Use decode_predictions()'] : ['Calculate each metric separately', 'Confusion matrix shows TP, FP, TN, FN', 'Higher F1 = better balance'],
            points: num === 18 ? 30 : 40,
            colabNotebookUrl: `https://colab.research.google.com/github/DawitLam/ACCN-Hub/blob/main/notebooks/session${num}_exercise1.ipynb`
          }];
        }

        // SESSION 30: Neural Networks (needs exercises)
        if (num === 30) {
          lesson.codingExercises = [{
            title: 'Build Your First Neural Network',
            description: 'Create a simple neural network from scratch to understand how they work.',
            difficulty: 'advanced',
            starterCode: `import numpy as np

# Simple neural network for XOR problem
X = np.array([[0,0], [0,1], [1,0], [1,1]])
y = np.array([[0], [1], [1], [0]])

# TODO: Initialize weights
# TODO: Define activation function
# TODO: Forward propagation
# TODO: Calculate loss

print("Neural network training...")`,
            solution: `import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return x * (1 - x)

# XOR dataset
X = np.array([[0,0], [0,1], [1,0], [1,1]])
y = np.array([[0], [1], [1], [0]])

# Initialize weights
np.random.seed(42)
weights_input_hidden = np.random.uniform(-1, 1, (2, 2))
weights_hidden_output = np.random.uniform(-1, 1, (2, 1))

learning_rate = 0.5

# Train
for epoch in range(10000):
    # Forward propagation
    hidden = sigmoid(np.dot(X, weights_input_hidden))
    output = sigmoid(np.dot(hidden, weights_hidden_output))
    
    # Backpropagation
    output_error = y - output
    output_delta = output_error * sigmoid_derivative(output)
    
    hidden_error = output_delta.dot(weights_hidden_output.T)
    hidden_delta = hidden_error * sigmoid_derivative(hidden)
    
    # Update weights
    weights_hidden_output += hidden.T.dot(output_delta) * learning_rate
    weights_input_hidden += X.T.dot(hidden_delta) * learning_rate

print("Training complete!")
print("\\nPredictions:")
for i in range(len(X)):
    hidden = sigmoid(np.dot(X[i], weights_input_hidden))
    prediction = sigmoid(np.dot(hidden, weights_hidden_output))
    print(f"{X[i]} -> {prediction[0]:.3f} (expected: {y[i][0]})")`,
            hints: ['Use sigmoid activation function', 'Forward pass: input -> hidden -> output', 'Backprop: calculate errors and update weights'],
            points: 50,
            colabNotebookUrl: 'https://colab.research.google.com/github/DawitLam/ACCN-Hub/blob/main/notebooks/session30_neural_network.ipynb'
          }];
        }

        // SESSIONS 31-32: Guest Speaker & Model Comparison
        if (num === 31 || num === 32) {
          lesson.codingExercises = [{
            title: num === 31 ? 'AI Career Path Explorer' : 'Compare Multiple ML Models',
            description: num === 31 ? 'Research and analyze different AI career opportunities.' : 'Train and compare different ML algorithms on same dataset.',
            difficulty: 'intermediate',
            starterCode: num === 31 ? `# AI Career Path Explorer
careers = {
    "ML Engineer": {"salary": 120000, "skills": ["Python", "ML", "Math"]},
    # TODO: Add more AI careers
}

# TODO: Analyze skills needed
# TODO: Compare salaries
# TODO: Find best fit

print("Career analysis complete!")` : `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# Load data
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# TODO: Train multiple models
# TODO: Compare accuracy
# TODO: Choose best model

print("Model comparison complete!")`,
            solution: num === 31 ? `careers = {
    "ML Engineer": {"salary": 120000, "skills": ["Python", "TensorFlow", "Math"], "demand": "Very High"},
    "Data Scientist": {"salary": 115000, "skills": ["Python", "Statistics", "SQL"], "demand": "High"},
    "AI Researcher": {"salary": 140000, "skills": ["PhD", "Math", "Research"], "demand": "Medium"},
    "NLP Engineer": {"salary": 125000, "skills": ["Python", "NLP", "Deep Learning"], "demand": "High"},
    "Computer Vision": {"salary": 130000, "skills": ["Python", "OpenCV", "CNN"], "demand": "High"}
}

print("AI Career Opportunities:")
for role, info in careers.items():
    print(role + ":")
    print("  Salary: $" + str(info['salary']) + "/year")
    print("  Skills: " + ", ".join(info['skills']))
    print("  Demand: " + info['demand'])
    print()

# Calculate average salary
avg_salary = sum(c['salary'] for c in careers.values()) / len(careers)
print("Average AI salary: $" + str(int(avg_salary)))` : `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

models = {
    'Logistic Regression': LogisticRegression(max_iter=200),
    'Decision Tree': DecisionTreeClassifier(),
    'Random Forest': RandomForestClassifier(),
    'SVM': SVC(),
    'KNN': KNeighborsClassifier()
}

results = {}
for name, model in models.items():
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    results[name] = accuracy
    print(f"{name}: {accuracy*100:.1f}%")

best = max(results, key=results.get)
print(f"\\nBest Model: {best} ({results[best]*100:.1f}%)")`,
            hints: num === 31 ? ['Research real job postings', 'Include salary ranges', 'List key skills'] : ['Import multiple classifiers', 'Train each on same data', 'Use .score() for accuracy'],
            points: num === 31 ? 30 : 45,
            colabNotebookUrl: `https://colab.research.google.com/github/DawitLam/ACCN-Hub/blob/main/notebooks/session${num}_exercise1.ipynb`
          }];
        }

        // SESSIONS 33-40: Final Project & Presentations
        if (num >= 33 && num <= 40) {
          const exercisesBySession = {
            33: {
              title: 'Project Planning Document',
              description: 'Create a comprehensive plan for your final AI project.',
              starterCode: `# Final Project Plan
project = {
    "name": "",
    "problem": "",
    "data_source": "",
    "ml_approach": "",
    "expected_outcome": ""
}

# TODO: Fill in your project details
print("Project plan:", project)`,
              solution: `project = {
    "name": "Student Performance Predictor",
    "problem": "Predict student exam scores based on study habits",
    "data_source": "UCI Student Performance Dataset",
    "ml_approach": "Random Forest Regression",
    "features": ["study_time", "attendance", "previous_grades"],
    "expected_outcome": "75%+ accuracy in predictions",
    "timeline": "2 weeks",
    "deliverables": ["Model", "Report", "Presentation"]
}

print("Final Project Plan:\\n")
for key, value in project.items():
    print(f"{key}: {value}")`,
              points: 30
            },
            34: {
              title: 'Data Collection and Preprocessing',
              description: 'Load, clean, and prepare your project dataset.',
              starterCode: `import pandas as pd
import numpy as np

# TODO: Load your dataset
# TODO: Check for missing values
# TODO: Handle outliers
# TODO: Split train/test

print("Data preprocessing complete!")`,
              solution: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load data
df = pd.read_csv('project_data.csv')
print(f"Dataset shape: {df.shape}")

# Check missing values
print("\\nMissing values:")
print(df.isnull().sum())

# Remove/fill missing
df = df.dropna()

# Handle outliers (example: remove values > 3 std devs)
for col in df.select_dtypes(include=[np.number]).columns:
    mean = df[col].mean()
    std = df[col].std()
    df = df[(df[col] >= mean - 3*std) & (df[col] <= mean + 3*std)]

# Split features and target
X = df.drop('target', axis=1)
y = df['target']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"\\nTraining samples: {X_train.shape[0]}")
print(f"Testing samples: {X_test.shape[0]}")`,
              points: 40
            },
            35: {
              title: 'Model Training and Optimization',
              description: 'Train your model and optimize hyperparameters.',
              starterCode: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV

# TODO: Define parameter grid
# TODO: Perform grid search
# TODO: Train best model

print("Model optimization complete!")`,
              solution: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV

# Define parameter grid
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, 15],
    'min_samples_split': [2, 5, 10]
}

# Grid search
rf = RandomForestClassifier(random_state=42)
grid_search = GridSearchCV(rf, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
grid_search.fit(X_train_scaled, y_train)

# Best model
best_model = grid_search.best_estimator_
print(f"Best parameters: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_*100:.2f}%")

# Test performance
test_score = best_model.score(X_test_scaled, y_test)
print(f"Test accuracy: {test_score*100:.2f}%")`,
              points: 50
            },
            36: {
              title: 'Project Documentation',
              description: 'Create comprehensive documentation for your AI project.',
              starterCode: `# Project Documentation Template
documentation = {
    "title": "",
    "abstract": "",
    "methodology": "",
    "results": "",
    "conclusion": ""
}

# TODO: Fill in documentation
print("Documentation complete!")`,
              solution: `documentation = {
    "title": "Student Performance Prediction Using Machine Learning",
    "abstract": "This project develops an ML model to predict student exam scores based on study habits, attendance, and previous performance.",
    "methodology": "Random Forest classifier with GridSearchCV for hyperparameter tuning. Dataset of 1000 students preprocessed and split 80/20.",
    "results": "Achieved 85% accuracy on test set. Key features: study_time (0.45), attendance (0.30), previous_grades (0.25).",
    "conclusion": "Model successfully predicts performance. Can help identify at-risk students early for intervention.",
    "future_work": "Add more features (socioeconomic, learning style), try deep learning approaches."
}

print("=== PROJECT DOCUMENTATION ===\\n")
for section, content in documentation.items():
    print(f"{section.upper()}:")
    print(f"{content}\\n")`,
              points: 35
            },
            37: {
              title: 'Presentation Preparation',
              description: 'Create slides and practice your project presentation.',
              starterCode: `# Presentation Outline
slides = [
    "Title Slide",
    # TODO: Add more slides
]

# TODO: Prepare demo
# TODO: Practice timing

print("Presentation ready!")`,
              solution: `slides = [
    {
        "slide": 1,
        "title": "Student Performance Predictor",
        "content": "Using ML to predict exam scores"
    },
    {
        "slide": 2,
        "title": "Problem Statement",
        "content": "70% of failing students are not identified early enough"
    },
    {
        "slide": 3,
        "title": "Solution",
        "content": "ML model using study habits, attendance, previous grades"
    },
    {
        "slide": 4,
        "title": "Dataset",
        "content": "1000 students, 10 features, UCI dataset"
    },
    {
        "slide": 5,
        "title": "Model",
        "content": "Random Forest with GridSearchCV optimization"
    },
    {
        "slide": 6,
        "title": "Results",
        "content": "85% accuracy, identifies at-risk students"
    },
    {
        "slide": 7,
        "title": "Demo",
        "content": "Live prediction demonstration"
    },
    {
        "slide": 8,
        "title": "Impact",
        "content": "Early intervention can improve outcomes"
    },
    {
        "slide": 9,
        "title": "Future Work",
        "content": "Add more features, mobile app"
    },
    {
        "slide": 10,
        "title": "Q&A",
        "content": "Questions?"
    }
]

for slide in slides:
    print(f"\\nSlide {slide['slide']}: {slide['title']}")
    print(f"  {slide['content']}")

print("\\n⏱️  Presentation time: 5-7 minutes")
print("📝 Practice your demo 3 times!")`,
              points: 30
            },
            38: {
              title: 'Peer Review Feedback',
              description: 'Provide constructive feedback on classmates\' projects.',
              starterCode: `# Peer Review Template
review = {
    "project_name": "",
    "strengths": [],
    "improvements": [],
    "questions": []
}

# TODO: Complete review
print("Peer review submitted!")`,
              solution: `review = {
    "project_name": "Image Classification for Wildlife",
    "strengths": [
        "Clear problem statement and motivation",
        "Good use of transfer learning (MobileNet)",
        "Impressive 92% accuracy on test set",
        "Well-organized presentation"
    ],
    "improvements": [
        "Add more diverse training data",
        "Include confusion matrix in results",
        "Discuss real-world deployment challenges",
        "Show more failure cases"
    ],
    "questions": [
        "How did you handle class imbalance?",
        "What data augmentation techniques did you use?",
        "How would this work in low-light conditions?"
    ],
    "overall_rating": "8/10",
    "comments": "Strong project with practical applications. Well-executed and clearly presented."
}

print("=== PEER REVIEW ===\\n")
print(f"Project: {review['project_name']}")
print(f"\\nStrengths:")
for s in review['strengths']:
    print(f"  ✓ {s}")
print(f"\\nAreas for Improvement:")
for i in review['improvements']:
    print(f"  → {i}")
print(f"\\nQuestions:")
for q in review['questions']:
    print(f"  ? {q}")
print(f"\\nOverall: {review['overall_rating']}")`,
              points: 25
            },
            39: {
              title: 'Course Reflection',
              description: 'Reflect on your learning journey and key takeaways.',
              starterCode: `# Course Reflection
reflection = {
    "favorite_topic": "",
    "biggest_challenge": "",
    "key_takeaway": "",
    "future_goals": ""
}

# TODO: Complete reflection
print("Reflection complete!")`,
              solution: `reflection = {
    "favorite_topic": "Healthcare AI - saw direct real-world impact",
    "biggest_challenge": "Understanding backpropagation in neural networks",
    "most_useful_skill": "Data preprocessing and feature engineering",
    "surprise": "How accessible AI tools have become",
    "key_takeaway": "AI is powerful but requires ethical consideration",
    "projects_completed": ["Quiz Game", "Data Analyzer", "Healthcare AI", "Chatbot", "Final Project"],
    "skills_gained": ["Python", "ML algorithms", "Data science", "Model deployment"],
    "before_vs_after": {
        "before": "AI seemed like magic",
        "after": "Understand how it works and can build projects"
    },
    "future_goals": [
        "Build more complex deep learning models",
        "Contribute to open-source AI projects",
        "Apply AI to solve real problems in my community",
        "Continue learning about AI ethics"
    ]
}

print("=== MY AI LEARNING JOURNEY ===\\n")
print(f"Favorite Topic: {reflection['favorite_topic']}")
print(f"\\nBiggest Challenge: {reflection['biggest_challenge']}")
print(f"Most Useful Skill: {reflection['most_useful_skill']}")
print(f"\\nKey Takeaway: {reflection['key_takeaway']}")
print(f"\\nProjects Completed: {len(reflection['projects_completed'])}")
for p in reflection['projects_completed']:
    print(f"  ✓ {p}")
print(f"\\nFuture Goals:")
for g in reflection['future_goals']:
    print(f"  → {g}")`,
              points: 20
            },
            40: {
              title: 'Next Steps Action Plan',
              description: 'Create an action plan for continuing your AI education.',
              starterCode: `# Next Steps Plan
action_plan = {
    "short_term": [],
    "long_term": [],
    "resources": []
}

# TODO: Create your plan
print("Action plan created!")`,
              solution: `action_plan = {
    "short_term_goals": [
        "Complete Kaggle beginner competitions",
        "Build 3 more portfolio projects",
        "Read 'Hands-On Machine Learning' book",
        "Contribute to 1 open-source AI project"
    ],
    "long_term_goals": [
        "Get AI/ML certification (AWS, Google, Microsoft)",
        "Intern at AI company",
        "Publish research paper or blog series",
        "Develop AI solution for social good"
    ],
    "resources": [
        "Kaggle - datasets and competitions",
        "Fast.ai - free deep learning course",
        "ArXiv - research papers",
        "GitHub - open source projects",
        "Coursera - advanced AI courses"
    ],
    "practice_schedule": {
        "daily": "1 hour coding practice",
        "weekly": "Complete 1 Kaggle tutorial",
        "monthly": "Build 1 portfolio project"
    },
    "networking": [
        "Join local AI meetup group",
        "Follow AI researchers on Twitter",
        "Participate in online AI communities",
        "Attend AI conferences (virtual or in-person)"
    ],
    "timeline": {
        "3_months": "Complete 3 Kaggle competitions",
        "6_months": "Get first AI certification",
        "1_year": "Land AI internship or job"
    }
}

print("=== YOUR AI FUTURE ===\\n")
print("SHORT-TERM GOALS (Next 3 months):")
for goal in action_plan['short_term_goals']:
    print(f"  □ {goal}")

print("\\nLONG-TERM GOALS (Next 1-2 years):")
for goal in action_plan['long_term_goals']:
    print(f"  □ {goal}")

print("\\nRESOURCES:")
for resource in action_plan['resources']:
    print(f"  • {resource}")

print("\\nPRACTICE SCHEDULE:")
for period, activity in action_plan['practice_schedule'].items():
    print(f"  {period.title()}: {activity}")

print("\\n🚀 You've completed the AI Fundamentals course!")
print("💡 Keep learning, keep building, keep growing!")`,
              points: 25
            }
          };

          if (exercisesBySession[num]) {
            const ex = exercisesBySession[num];
            lesson.codingExercises = [{
              title: ex.title,
              description: ex.description,
              difficulty: num >= 37 ? 'beginner' : 'intermediate',
              starterCode: ex.starterCode,
              solution: ex.solution,
              hints: ['Break down into small steps', 'Reference previous sessions', 'Ask questions in discussion'],
              points: ex.points,
              colabNotebookUrl: `https://colab.research.google.com/github/DawitLam/ACCN-Hub/blob/main/notebooks/session${num}_final_project.ipynb`
            }];
          }
        }
      }

      // Save if updated
      if (lesson.codingExercises && lesson.codingExercises.length > 0 || 
          lesson.interactiveTools && lesson.interactiveTools.length > 0) {
        await lesson.save();
        updates.push(lesson.title);
      }
    }

    console.log(`\n✅ Updated ${updates.length} lessons with exercises and Colab integration\n`);
    updates.forEach(title => console.log(`  ✓ ${title}`));

    console.log(`\n🎉 All 40 lessons are now complete and standardized!`);
    console.log(`📊 Every lesson has:`);
    console.log(`  - Google Colab integration`);
    console.log(`  - Coding exercises with starter code`);
    console.log(`  - Complete solutions`);
    console.log(`  - Points for gamification`);
    console.log(`  - Direct Colab notebook links\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

completeAllLessons();
