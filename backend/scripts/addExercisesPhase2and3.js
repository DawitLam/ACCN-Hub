require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

async function addExercisesPhase2and3() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const course = await Course.findOne({ title: /AI Fundamentals/i });
    const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
    
    console.log('📝 Adding exercises to Sessions 14-26 + Major Projects...\n');

    // SESSION 14: Image Classification Project
    const session14 = lessons.find(l => l.title.includes('Session 14'));
    if (session14 && (!session14.codingExercises || session14.codingExercises.length === 0)) {
      session14.codingExercises = [
        {
          title: 'Load and Test Teachable Machine Model',
          description: 'Export your Teachable Machine model and load it in Python to make predictions.',
          difficulty: 'intermediate',
          starterCode: `# Load Teachable Machine Model
# First: Train model at teachablemachine.withgoogle.com
# Then: Download as TensorFlow model

# TODO: Install tensorflow
# pip install tensorflow

import tensorflow as tf
import numpy as np
from PIL import Image

# TODO: Load your model
model = tf.keras.models.load_model('path/to/your/model')

# TODO: Load and preprocess test image
# img = Image.open('test_image.jpg')
# TODO: Resize to 224x224
# TODO: Convert to array and normalize

# TODO: Make prediction
# prediction = model.predict(img_array)
# print("Predicted class:", prediction)`,
          solution: `import tensorflow as tf
import numpy as np
from PIL import Image

# Load model
model = tf.keras.models.load_model('keras_model.h5')

# Load labels
with open('labels.txt', 'r') as f:
    labels = [line.strip() for line in f.readlines()]

# Load and preprocess image
img = Image.open('test.jpg').resize((224, 224))
img_array = np.array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)

# Predict
prediction = model.predict(img_array)
predicted_class = labels[np.argmax(prediction)]
confidence = np.max(prediction) * 100

print(f"Prediction: {predicted_class}")
print(f"Confidence: {confidence:.2f}%")`,
          hints: ['Download model as TensorFlow format', 'Resize images to 224x224', 'Normalize pixel values (divide by 255)', 'Use np.argmax to get predicted class'],
          points: 40
        }
      ];
      await session14.save();
      console.log('✅ Session 14: Image Classification Project');
    }

    // SESSION 21: Introduction to Pandas
    const session21 = lessons.find(l => l.title.includes('Session 21'));
    if (session21 && (!session21.codingExercises || session21.codingExercises.length === 0)) {
      session21.codingExercises = [
        {
          title: 'Pandas Basics - Read and Explore Data',
          description: 'Learn to load CSV files and explore data with Pandas.',
          difficulty: 'beginner',
          starterCode: `import pandas as pd

# TODO: Read CSV file
# df = pd.read_csv('data.csv')

# TODO: Display first 5 rows
# print(df.head())

# TODO: Show column names
# print(df.columns)

# TODO: Show data types
# print(df.dtypes)

# TODO: Show statistics
# print(df.describe())`,
          solution: `import pandas as pd

# Read CSV
df = pd.read_csv('students.csv')

# Display first 5 rows
print("First 5 rows:")
print(df.head())

# Column names
print("\\nColumns:", list(df.columns))

# Data types
print("\\nData types:")
print(df.dtypes)

# Statistics
print("\\nStatistics:")
print(df.describe())

# Shape
print(f"\\nDataset shape: {df.shape[0]} rows, {df.shape[1]} columns")`,
          hints: ['Use pd.read_csv() to load data', 'head() shows first rows', 'describe() gives statistics', 'shape gives (rows, columns)'],
          points: 25
        }
      ];
      await session21.save();
      console.log('✅ Session 21: Introduction to Pandas');
    }

    // SESSION 22: Data Exploration
    const session22 = lessons.find(l => l.title.includes('Session 22'));
    if (session22 && (!session22.codingExercises || session22.codingExercises.length === 0)) {
      session22.codingExercises = [
        {
          title: 'Explore and Filter Data',
          description: 'Practice filtering, sorting, and grouping data with Pandas.',
          difficulty: 'intermediate',
          starterCode: `import pandas as pd

data = {
    'name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'age': [15, 16, 15, 17, 16],
    'grade': [85, 92, 78, 95, 88],
    'subject': ['Math', 'Science', 'Math', 'Science', 'Math']
}

df = pd.DataFrame(data)

# TODO: Filter students with grade > 85
high_achievers = None

# TODO: Sort by grade (descending)
sorted_df = None

# TODO: Group by subject and calculate average grade
avg_by_subject = None

print("High achievers:", high_achievers)
print("Sorted:", sorted_df)
print("Average by subject:", avg_by_subject)`,
          solution: `import pandas as pd

data = {
    'name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'age': [15, 16, 15, 17, 16],
    'grade': [85, 92, 78, 95, 88],
    'subject': ['Math', 'Science', 'Math', 'Science', 'Math']
}

df = pd.DataFrame(data)

# Filter grade > 85
high_achievers = df[df['grade'] > 85]
print("High Achievers (>85):")
print(high_achievers[['name', 'grade']])

# Sort by grade
sorted_df = df.sort_values('grade', ascending=False)
print("\\nSorted by grade:")
print(sorted_df[['name', 'grade']])

# Group by subject
avg_by_subject = df.groupby('subject')['grade'].mean()
print("\\nAverage by subject:")
print(avg_by_subject)`,
          hints: ['Filter: df[df["column"] > value]', 'Sort: df.sort_values("column", ascending=False)', 'Group: df.groupby("column")["target"].mean()'],
          points: 30
        }
      ];
      await session22.save();
      console.log('✅ Session 22: Data Exploration');
    }

    // SESSION 23: Data Cleaning
    const session23 = lessons.find(l => l.title.includes('Session 23'));
    if (session23 && (!session23.codingExercises || session23.codingExercises.length === 0)) {
      session23.codingExercises = [
        {
          title: 'Clean Messy Data',
          description: 'Handle missing values, duplicates, and outliers in real-world data.',
          difficulty: 'intermediate',
          starterCode: `import pandas as pd
import numpy as np

data = {
    'name': ['Alice', 'Bob', 'Charlie', 'Bob', 'Eve', 'Frank'],
    'age': [15, np.nan, 15, 16, 200, 17],
    'grade': [85, 92, np.nan, 92, 88, 95]
}

df = pd.DataFrame(data)
print("Original data:")
print(df)

# TODO: Remove duplicates
# TODO: Handle missing values (drop or fill)
# TODO: Fix outliers (age = 200 is invalid)

print("\\nCleaned data:")
# print(cleaned_df)`,
          solution: `import pandas as pd
import numpy as np

data = {
    'name': ['Alice', 'Bob', 'Charlie', 'Bob', 'Eve', 'Frank'],
    'age': [15, np.nan, 15, 16, 200, 17],
    'grade': [85, 92, np.nan, 92, 88, 95]
}

df = pd.DataFrame(data)
print("Original data:")
print(df)
print(f"Shape: {df.shape}")

# Remove duplicates
df = df.drop_duplicates()

# Fill missing ages with median
df['age'].fillna(df['age'].median(), inplace=True)

# Remove rows with missing grades
df = df.dropna(subset=['grade'])

# Fix outliers (age > 100 is invalid)
df = df[df['age'] <= 100]

print("\\nCleaned data:")
print(df)
print(f"Shape: {df.shape}")`,
          hints: ['drop_duplicates() removes duplicate rows', 'fillna() fills missing values', 'dropna() removes rows with missing values', 'Filter outliers with df[df["age"] <= 100]'],
          points: 35
        }
      ];
      await session23.save();
      console.log('✅ Session 23: Data Cleaning');
    }

    // SESSION 24: Data Visualization
    const session24 = lessons.find(l => l.title.includes('Session 24'));
    if (session24 && (!session24.codingExercises || session24.codingExercises.length === 0)) {
      session24.codingExercises = [
        {
          title: 'Create Visualizations with Matplotlib',
          description: 'Build bar charts, line plots, and scatter plots to visualize data patterns.',
          difficulty: 'intermediate',
          starterCode: `import matplotlib.pyplot as plt
import numpy as np

# Sample data: student grades over 4 quarters
students = ['Alice', 'Bob', 'Charlie', 'Diana']
q1_grades = [85, 78, 92, 88]
q2_grades = [88, 82, 90, 91]

# TODO: Create bar chart comparing Q1 vs Q2
# TODO: Add labels, title, legend

# TODO: Create line plot showing grade trends

# plt.show()`,
          solution: `import matplotlib.pyplot as plt
import numpy as np

students = ['Alice', 'Bob', 'Charlie', 'Diana']
q1_grades = [85, 78, 92, 88]
q2_grades = [88, 82, 90, 91]

# Bar chart
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

x = np.arange(len(students))
width = 0.35

ax1.bar(x - width/2, q1_grades, width, label='Q1')
ax1.bar(x + width/2, q2_grades, width, label='Q2')
ax1.set_xlabel('Students')
ax1.set_ylabel('Grade')
ax1.set_title('Grade Comparison: Q1 vs Q2')
ax1.set_xticks(x)
ax1.set_xticklabels(students)
ax1.legend()

# Line plot
for i, student in enumerate(students):
    ax2.plot(['Q1', 'Q2'], [q1_grades[i], q2_grades[i]], marker='o', label=student)

ax2.set_xlabel('Quarter')
ax2.set_ylabel('Grade')
ax2.set_title('Grade Trends')
ax2.legend()

plt.tight_layout()
plt.show()`,
          hints: ['Use plt.bar() for bar charts', 'Use plt.plot() for line plots', 'Add labels with xlabel(), ylabel(), title()', 'Use legend() to show labels'],
          points: 30
        }
      ];
      await session24.save();
      console.log('✅ Session 24: Data Visualization');
    }

    // SESSION 25: Traditional ML Algorithms
    const session25 = lessons.find(l => l.title.includes('Session 25'));
    if (session25 && (!session25.codingExercises || session25.codingExercises.length === 0)) {
      session25.codingExercises = [
        {
          title: 'K-Nearest Neighbors Classifier',
          description: 'Implement a simple KNN classifier from scratch to understand how it works.',
          difficulty: 'advanced',
          starterCode: `import numpy as np

# Training data: [height, weight] -> class (0=child, 1=adult)
X_train = np.array([[100, 30], [120, 40], [150, 50], [170, 70], [180, 80]])
y_train = np.array([0, 0, 0, 1, 1])

# Test data
X_test = np.array([[110, 35], [175, 75]])

def euclidean_distance(point1, point2):
    # TODO: Calculate distance between two points
    return 0

def knn_predict(X_train, y_train, test_point, k=3):
    # TODO: Find k nearest neighbors
    # TODO: Return most common class
    return 0

# Test predictions
for test in X_test:
    prediction = knn_predict(X_train, y_train, test, k=3)
    print(f"Test {test}: Predicted class = {prediction}")`,
          solution: `import numpy as np

X_train = np.array([[100, 30], [120, 40], [150, 50], [170, 70], [180, 80]])
y_train = np.array([0, 0, 0, 1, 1])

X_test = np.array([[110, 35], [175, 75]])

def euclidean_distance(point1, point2):
    return np.sqrt(np.sum((point1 - point2)**2))

def knn_predict(X_train, y_train, test_point, k=3):
    # Calculate distances to all training points
    distances = []
    for i, train_point in enumerate(X_train):
        dist = euclidean_distance(train_point, test_point)
        distances.append((dist, y_train[i]))
    
    # Sort by distance
    distances.sort(key=lambda x: x[0])
    
    # Get k nearest neighbors
    k_nearest = [label for dist, label in distances[:k]]
    
    # Return most common class
    return max(set(k_nearest), key=k_nearest.count)

# Test
for test in X_test:
    prediction = knn_predict(X_train, y_train, test, k=3)
    class_name = "Child" if prediction == 0 else "Adult"
    print(f"Test {test}: {class_name}")`,
          hints: ['Use np.sqrt(np.sum((p1 - p2)**2)) for distance', 'Sort distances and get k smallest', 'Use max(set(list), key=list.count) for most common'],
          points: 45
        }
      ];
      await session25.save();
      console.log('✅ Session 25: Traditional ML Algorithms');
    }

    // SESSION 26: Build Your First Classifier
    const session26 = lessons.find(l => l.title.includes('Session 26'));
    if (session26 && (!session26.codingExercises || session26.codingExercises.length === 0)) {
      session26.codingExercises = [
        {
          title: 'Iris Flower Classifier with scikit-learn',
          description: 'Build a complete ML pipeline: load data, train model, evaluate accuracy.',
          difficulty: 'intermediate',
          starterCode: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

# Load famous Iris dataset
iris = load_iris()
X, y = iris.data, iris.target

# TODO: Split into training and testing sets (80/20)
X_train, X_test, y_train, y_test = None, None, None, None

# TODO: Create and train Decision Tree classifier
model = None

# TODO: Make predictions on test set
predictions = None

# TODO: Calculate accuracy
accuracy = None

print(f"Model Accuracy: {accuracy * 100:.2f}%")`,
          solution: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load Iris dataset
iris = load_iris()
X, y = iris.data, iris.target

print("Dataset info:")
print(f"Samples: {X.shape[0]}")
print(f"Features: {iris.feature_names}")
print(f"Classes: {iris.target_names}")

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)

# Evaluate
accuracy = accuracy_score(y_test, predictions)
print(f"\\nModel Accuracy: {accuracy * 100:.2f}%")

# Detailed report
print("\\nClassification Report:")
print(classification_report(y_test, predictions, target_names=iris.target_names))`,
          hints: ['Use train_test_split(X, y, test_size=0.2)', 'Create model: DecisionTreeClassifier()', 'Train: model.fit(X_train, y_train)', 'Predict: model.predict(X_test)'],
          points: 40
        }
      ];
      await session26.save();
      console.log('✅ Session 26: Build Your First Classifier');
    }

    console.log('\n🎉 Phase 2 & 3 Complete!');
    console.log('📊 Added exercises to Sessions 14, 21-26');
    console.log('🎯 Total new points: ~245\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addExercisesPhase2and3();
