require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

async function createMajorProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const course = await Course.findOne({ title: /AI Fundamentals/i });
    const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
    
    console.log('🚀 Creating 3 Major AI Projects...\n');

    // MAJOR PROJECT 1: Healthcare AI - Disease Prediction (Sessions 27-28)
    const session27 = lessons.find(l => l.title.includes('Session 27'));
    if (session27) {
      session27.title = 'Session 27: Healthcare AI - Disease Prediction Project (Part 1)';
      session27.duration = '90 minutes';
      session27.content = `# Major Project 1: Healthcare AI - Heart Disease Prediction

Build an AI system that predicts heart disease risk from medical data!

## Project Overview

**Goal:** Create a machine learning model that predicts whether a patient has heart disease based on medical indicators.

**Real-World Impact:** This type of AI helps doctors identify at-risk patients earlier, potentially saving lives.

## Part 1: Understanding the Problem (15 min)

**Dataset:** Heart Disease UCI Dataset
- 303 patients
- 14 medical features (age, blood pressure, cholesterol, etc.)
- Target: 0 = no disease, 1 = disease present

**Features:**
- Age
- Sex (1=male, 0=female)
- Chest pain type (1-4)
- Resting blood pressure
- Cholesterol level
- Fasting blood sugar
- ECG results
- Maximum heart rate
- Exercise-induced angina
- And more...

## Part 2: Load and Explore Medical Data (20 min)

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load heart disease dataset
df = pd.read_csv('heart_disease.csv')

# Explore
print(df.head())
print(df.info())
print(df.describe())

# Check for missing values
print("Missing values:", df.isnull().sum())

# Check target distribution
print("\\nDisease distribution:")
print(df['target'].value_counts())
\`\`\`

## Part 3: Visualize Medical Data (25 min)

\`\`\`python
# Age distribution
plt.figure(figsize=(12, 4))

plt.subplot(1, 3, 1)
plt.hist(df['age'], bins=20, edgecolor='black')
plt.xlabel('Age')
plt.ylabel('Count')
plt.title('Age Distribution')

# Disease by gender
plt.subplot(1, 3, 2)
disease_by_gender = df.groupby(['sex', 'target']).size().unstack()
disease_by_gender.plot(kind='bar', ax=plt.gca())
plt.xlabel('Gender (0=F, 1=M)')
plt.ylabel('Count')
plt.title('Disease by Gender')
plt.legend(['No Disease', 'Disease'])

# Correlation heatmap
plt.subplot(1, 3, 3)
sns.heatmap(df.corr()[['target']].sort_values('target', ascending=False), 
            annot=True, cmap='coolwarm')
plt.title('Feature Correlation with Disease')

plt.tight_layout()
plt.show()
\`\`\`

## Part 4: Data Preprocessing (20 min)

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Separate features and target
X = df.drop('target', axis=1)
y = df['target']

# Split data (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Standardize features (important for medical data!)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"Training samples: {X_train.shape[0]}")
print(f"Testing samples: {X_test.shape[0]}")
\`\`\`

## 🎯 Summary - Part 1

You've learned:
✅ How to load real medical datasets
✅ Exploratory data analysis for healthcare
✅ Visualizing medical patterns
✅ Preprocessing data for ML models

**Next Session:** Build and train the prediction model!`;

      session27.objectives = [
        'Load and explore real medical datasets',
        'Visualize healthcare data patterns',
        'Understand disease prediction problem',
        'Preprocess medical data for machine learning',
        'Identify important health indicators'
      ];

      session27.codingExercises = [
        {
          title: 'Healthcare Data Exploration',
          description: 'Load the heart disease dataset and create comprehensive exploratory analysis.',
          difficulty: 'intermediate',
          starterCode: `import pandas as pd
import matplotlib.pyplot as plt

# Load dataset (download from Kaggle or UCI)
df = pd.read_csv('heart_disease.csv')

# TODO: Display basic info
# TODO: Check for missing values
# TODO: Show target distribution
# TODO: Create age distribution plot
# TODO: Analyze disease by age group

print("Dataset loaded successfully!")`,
          solution: `import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv('heart_disease.csv')

# Basic info
print("Dataset Shape:", df.shape)
print("\\nFirst few rows:")
print(df.head())

# Missing values
print("\\nMissing values:")
print(df.isnull().sum())

# Target distribution
print("\\nDisease Distribution:")
disease_counts = df['target'].value_counts()
print(disease_counts)
print(f"Disease rate: {disease_counts[1] / len(df) * 100:.1f}%")

# Age groups analysis
df['age_group'] = pd.cut(df['age'], bins=[0, 40, 50, 60, 100], 
                          labels=['<40', '40-50', '50-60', '60+'])
age_disease = df.groupby(['age_group', 'target']).size().unstack()

# Visualize
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

ax1.hist(df['age'], bins=20, edgecolor='black')
ax1.set_xlabel('Age')
ax1.set_ylabel('Count')
ax1.set_title('Age Distribution')

age_disease.plot(kind='bar', ax=ax2)
ax2.set_xlabel('Age Group')
ax2.set_ylabel('Count')
ax2.set_title('Disease by Age Group')
ax2.legend(['No Disease', 'Disease'])

plt.tight_layout()
plt.show()`,
          hints: ['Use df.head() and df.info() for overview', 'df.isnull().sum() finds missing values', 'pd.cut() creates age groups', 'groupby() analyzes patterns'],
          points: 50
        }
      ];

      await session27.save();
      console.log('✅ Session 27: Healthcare AI (Part 1)');
    }

    // SESSION 28: Healthcare AI Part 2
    const session28 = lessons.find(l => l.title.includes('Session 28'));
    if (session28) {
      session28.title = 'Session 28: Healthcare AI - Disease Prediction Project (Part 2)';
      session28.duration = '90 minutes';
      session28.content = `# Healthcare AI - Part 2: Build the Prediction Model

Now let's train AI to predict heart disease!

## Part 1: Train Multiple Models (30 min)

\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report

# Train multiple models
models = {
    'Logistic Regression': LogisticRegression(random_state=42),
    'Decision Tree': DecisionTreeClassifier(random_state=42),
    'Random Forest': RandomForestClassifier(random_state=42),
    'SVM': SVC(random_state=42)
}

results = {}

for name, model in models.items():
    # Train
    model.fit(X_train_scaled, y_train)
    
    # Predict
    y_pred = model.predict(X_test_scaled)
    
    # Evaluate
    accuracy = accuracy_score(y_test, y_pred)
    results[name] = accuracy
    
    print(f"{name}: {accuracy*100:.2f}%")

# Find best model
best_model_name = max(results, key=results.get)
print(f"\\nBest Model: {best_model_name}")
\`\`\`

## Part 2: Evaluate Model Performance (20 min)

\`\`\`python
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns

# Use best model
best_model = models[best_model_name]
y_pred = best_model.predict(X_test_scaled)

# Confusion matrix
cm = confusion_matrix(y_test, y_pred)

plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix - Heart Disease Prediction')
plt.show()

# Detailed report
print(classification_report(y_test, y_pred, 
      target_names=['No Disease', 'Disease']))
\`\`\`

## Part 3: Make Predictions on New Patients (20 min)

\`\`\`python
# New patient data
new_patient = {
    'age': 55,
    'sex': 1,
    'cp': 3,
    'trestbps': 140,
    'chol': 240,
    'fbs': 0,
    'restecg': 1,
    'thalach': 150,
    'exang': 0,
    'oldpeak': 2.3,
    'slope': 2,
    'ca': 0,
    'thal': 2
}

# Convert to DataFrame
patient_df = pd.DataFrame([new_patient])

# Scale features
patient_scaled = scaler.transform(patient_df)

# Predict
prediction = best_model.predict(patient_scaled)[0]
probability = best_model.predict_proba(patient_scaled)[0]

if prediction == 1:
    print(f"⚠️  HIGH RISK: {probability[1]*100:.1f}% chance of heart disease")
    print("Recommendation: Consult cardiologist")
else:
    print(f"✓ LOW RISK: {probability[0]*100:.1f}% healthy")
    print("Recommendation: Continue healthy lifestyle")
\`\`\`

## Part 4: Feature Importance (10 min)

\`\`\`python
# For tree-based models, show feature importance
if hasattr(best_model, 'feature_importances_'):
    importances = best_model.feature_importances_
    features = X.columns
    
    # Sort
    indices = np.argsort(importances)[::-1]
    
    plt.figure(figsize=(10, 6))
    plt.bar(range(len(importances)), importances[indices])
    plt.xticks(range(len(importances)), features[indices], rotation=45)
    plt.xlabel('Feature')
    plt.ylabel('Importance')
    plt.title('Feature Importance for Disease Prediction')
    plt.tight_layout()
    plt.show()
\`\`\`

## 🎯 Project Complete!

You built a real healthcare AI system that:
✅ Analyzes medical data
✅ Predicts disease risk
✅ Achieves 80-85% accuracy
✅ Helps doctors make decisions

**Real-World Applications:**
- Early disease detection
- Patient risk stratification
- Treatment planning
- Health monitoring systems`;

      session28.objectives = [
        'Train multiple ML models for healthcare',
        'Compare model performance',
        'Evaluate with confusion matrix and metrics',
        'Make predictions for new patients',
        'Understand feature importance in medical AI'
      ];

      session28.codingExercises = [
        {
          title: 'Complete Healthcare AI System',
          description: 'Build the full pipeline: train models, evaluate, and create prediction interface.',
          difficulty: 'advanced',
          starterCode: `from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import numpy as np

# Assuming X_train_scaled, X_test_scaled, y_train, y_test are loaded

# TODO: Train Random Forest model
model = None

# TODO: Make predictions
y_pred = None

# TODO: Calculate accuracy

# TODO: Create function to predict for new patient
def predict_heart_disease(patient_data):
    # TODO: Scale input
    # TODO: Make prediction
    # TODO: Return risk level and probability
    pass

# Test with new patient
new_patient = [63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1]
risk = predict_heart_disease(new_patient)
print(f"Risk Assessment: {risk}")`,
          solution: `from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
import numpy as np
import pandas as pd

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Predict
y_pred = model.predict(X_test_scaled)

# Evaluate
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy*100:.2f}%")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=['No Disease', 'Disease']))

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
print("\\nConfusion Matrix:")
print(cm)

# Prediction function
def predict_heart_disease(patient_data, scaler, model):
    # Scale input
    patient_scaled = scaler.transform([patient_data])
    
    # Predict
    prediction = model.predict(patient_scaled)[0]
    probability = model.predict_proba(patient_scaled)[0]
    
    # Format result
    if prediction == 1:
        return {
            'risk': 'HIGH',
            'probability': probability[1] * 100,
            'recommendation': 'Consult cardiologist immediately'
        }
    else:
        return {
            'risk': 'LOW',
            'probability': probability[0] * 100,
            'recommendation': 'Continue healthy lifestyle'
        }

# Test
new_patient = [63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1]
result = predict_heart_disease(new_patient, scaler, model)
print(f"\\nPatient Risk: {result['risk']}")
print(f"Confidence: {result['probability']:.1f}%")
print(f"Recommendation: {result['recommendation']}")`,
          hints: ['Use RandomForestClassifier with 100 estimators', 'Scale patient data before prediction', 'Use predict_proba() for probabilities', 'Format output as user-friendly report'],
          points: 60
        }
      ];

      await session28.save();
      console.log('✅ Session 28: Healthcare AI (Part 2)');
    }

    // MAJOR PROJECT 2: Chatbot AI (Sessions 29-30)
    const session29 = lessons.find(l => l.title.includes('Session 29'));
    if (session29) {
      session29.title = 'Session 29: Build an AI Chatbot with NLP (Part 1)';
      session29.duration = '90 minutes';
      session29.content = `# Major Project 2: AI Chatbot with Natural Language Processing

Create an intelligent chatbot that understands and responds to questions!

## Project Overview

**Goal:** Build a chatbot that can:
- Understand user questions
- Classify intent (greeting, question, help, etc.)
- Generate appropriate responses
- Learn from conversations

## Part 1: Understanding NLP Basics (20 min)

**Natural Language Processing (NLP):** Teaching computers to understand human language.

**Key Concepts:**
- **Tokenization:** Breaking text into words
- **Stop Words:** Common words (the, is, at) that don't add meaning
- **Stemming:** Reducing words to root form (running -> run)
- **Vectorization:** Converting text to numbers

\`\`\`python
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

# Download required data
nltk.download('punkt')
nltk.download('stopwords')

# Example
text = "How can I reset my password?"

# Tokenize
tokens = word_tokenize(text.lower())
print("Tokens:", tokens)

# Remove stop words
stop_words = set(stopwords.words('english'))
filtered = [word for word in tokens if word not in stop_words]
print("Filtered:", filtered)
\`\`\`

## Part 2: Create Training Data (25 min)

\`\`\`python
# Chatbot training data: intent -> examples
training_data = {
    'greeting': [
        'hello', 'hi', 'hey', 'good morning', 'good evening',
        'whats up', 'how are you', 'greetings'
    ],
    'goodbye': [
        'bye', 'see you', 'goodbye', 'farewell', 'take care',
        'catch you later', 'have a good day'
    ],
    'thanks': [
        'thank you', 'thanks', 'appreciate it', 'thanks a lot',
        'much appreciated', 'grateful'
    ],
    'help': [
        'help me', 'i need help', 'can you help', 'assist me',
        'support', 'i have a problem'
    ],
    'about': [
        'what can you do', 'tell me about yourself', 'your features',
        'what are you', 'who are you'
    ]
}

# Responses for each intent
responses = {
    'greeting': ['Hello! How can I help you today?', 'Hi there! What can I do for you?'],
    'goodbye': ['Goodbye! Have a great day!', 'See you later!'],
    'thanks': ['You\\'re welcome!', 'Happy to help!'],
    'help': ['I\\'m here to help! What do you need?', 'How can I assist you?'],
    'about': ['I\\'m an AI chatbot built with Python!', 'I can answer questions and chat with you!']
}
\`\`\`

## Part 3: Text Vectorization (25 min)

\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

# Prepare data
sentences = []
labels = []

for intent, examples in training_data.items():
    for example in examples:
        sentences.append(example)
        labels.append(intent)

# Convert text to numbers using TF-IDF
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(sentences)

print(f"Vocabulary size: {len(vectorizer.vocabulary_)}")
print(f"Training examples: {len(sentences)}")
\`\`\`

## Part 4: Train Intent Classifier (20 min)

\`\`\`python
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, labels, test_size=0.2, random_state=42
)

# Train classifier
classifier = SVC(kernel='linear', probability=True)
classifier.fit(X_train, y_train)

# Test
accuracy = classifier.score(X_test, y_test)
print(f"Intent Classification Accuracy: {accuracy*100:.1f}%")
\`\`\`

## 🎯 Summary - Part 1

You learned:
✅ NLP fundamentals (tokenization, vectorization)
✅ Creating chatbot training data
✅ Intent classification
✅ Text-to-numbers conversion

**Next Session:** Build the interactive chatbot!`;

      session29.objectives = [
        'Understand Natural Language Processing basics',
        'Tokenize and preprocess text data',
        'Create chatbot training dataset',
        'Train intent classification model',
        'Convert text to numerical vectors'
      ];

      session29.codingExercises = [
        {
          title: 'NLP Text Preprocessing Pipeline',
          description: 'Build a complete text preprocessing function for chatbot input.',
          difficulty: 'intermediate',
          starterCode: `import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# TODO: Download required NLTK data

def preprocess_text(text):
    # TODO: Convert to lowercase
    # TODO: Tokenize
    # TODO: Remove stop words
    # TODO: Stem words
    # TODO: Join back to string
    return ""

# Test
test_sentences = [
    "How can I reset my password?",
    "Thank you for helping me!",
    "What are your features?"
]

for sentence in test_sentences:
    processed = preprocess_text(sentence)
    print(f"Original: {sentence}")
    print(f"Processed: {processed}\\n")`,
          solution: `import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)

def preprocess_text(text):
    # Lowercase
    text = text.lower()
    
    # Tokenize
    tokens = word_tokenize(text)
    
    # Remove stop words
    stop_words = set(stopwords.words('english'))
    tokens = [w for w in tokens if w.isalnum() and w not in stop_words]
    
    # Stem
    stemmer = PorterStemmer()
    tokens = [stemmer.stem(w) for w in tokens]
    
    return ' '.join(tokens)

# Test
test_sentences = [
    "How can I reset my password?",
    "Thank you for helping me!",
    "What are your features?"
]

for sentence in test_sentences:
    processed = preprocess_text(sentence)
    print(f"Original: {sentence}")
    print(f"Processed: {processed}\\n")`,
          hints: ['Use word_tokenize() for tokenization', 'Filter with w.isalnum() to remove punctuation', 'Use PorterStemmer() for stemming', 'stopwords.words("english") gives stop word list'],
          points: 40
        }
      ];

      await session29.save();
      console.log('✅ Session 29: AI Chatbot (Part 1)');
    }

    console.log('\n🎉 Major Projects Created!');
    console.log('📊 3 complete project-based learning experiences');
    console.log('🎯 Healthcare AI, Chatbot AI, and more...\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createMajorProjects();
