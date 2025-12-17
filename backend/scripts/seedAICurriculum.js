const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Import models
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const User = require('../models/User');

// AI Curriculum Data
const aiCourseData = {
  title: "AI Fundamentals Certification",
  description: "10-day intensive program covering AI, Machine Learning, Python, and hands-on projects. Earn industry-recognized certification.",
  track: "Coding",
  duration: "10 days × 3 hours = 30 hours",
  difficulty: "Beginner",
  prerequisites: "Basic computer literacy (no coding experience required)",
  tags: ["AI", "Machine Learning", "Python", "Data Science", "Deep Learning", "Ethics"],
  isPublished: true
};

const aiLessons = [
  // DAY 1 - SESSIONS
  {
    title: "Day 1 Session 1: What is AI?",
    order: 1,
    duration: "45 minutes",
    content: `# What is Artificial Intelligence?

## Learning Objectives
- Define AI, Machine Learning, and Deep Learning
- Understand the relationship between these concepts
- Identify AI applications in daily life

## Key Concepts

### The AI Hierarchy
- **Artificial Intelligence (AI)**: Machines that can perform tasks that typically require human intelligence
- **Machine Learning (ML)**: Subset of AI where computers learn from data without explicit programming
- **Deep Learning (DL)**: Subset of ML using neural networks with multiple layers

Think of it like Russian nesting dolls: AI contains ML, which contains DL.

## Real-World AI Examples
- Netflix recommendations
- Face ID on phones
- Voice assistants (Siri, Alexa)
- Spam email filters
- Autocorrect and predictive text
- Self-driving cars
- Medical diagnosis systems
`,
    videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
    objectives: [
      "Define AI, ML, and Deep Learning",
      "Explain the relationship between AI, ML, and DL",
      "Identify 10+ AI systems in daily life"
    ],
    resources: [
      {
        title: "But what is a neural network? | 3Blue1Brown",
        url: "https://www.youtube.com/watch?v=aircAruvnKk",
        type: "video"
      },
      {
        title: "What is Artificial Intelligence? | IBM Technology",
        url: "https://www.youtube.com/watch?v=2ePf9rue1Ao",
        type: "video"
      },
      {
        title: "IBM Learn Hub: What is AI?",
        url: "https://www.ibm.com/topics/artificial-intelligence",
        type: "document"
      },
      {
        title: "AI vs ML vs Deep Learning | NVIDIA",
        url: "https://blogs.nvidia.com/blog/whats-difference-artificial-intelligence-machine-learning-deep-learning-ai/",
        type: "document"
      }
    ],
    activities: [
      {
        title: "AI Scavenger Hunt",
        description: "Identify 10 AI systems you've used today. Record: System name, AI type (rule-based or learning-based), and how it helps you.",
        type: "text",
        required: true
      }
    ],
    quiz: [
      {
        question: "What is the relationship between AI, Machine Learning, and Deep Learning?",
        options: [
          "AI contains ML, which contains DL",
          "They are all the same thing",
          "ML contains AI, which contains DL",
          "They are completely separate fields"
        ],
        correctAnswer: 0,
        explanation: "AI is the broadest field, ML is a subset of AI, and DL is a subset of ML. Think of them as nested dolls.",
        points: 10
      },
      {
        question: "Which of these is NOT an example of AI?",
        options: [
          "Netflix recommendations",
          "A basic calculator",
          "Face recognition",
          "Voice assistants"
        ],
        correctAnswer: 1,
        explanation: "A basic calculator follows fixed rules without learning or adaptation, so it's not AI.",
        points: 10
      },
      {
        question: "True or False: All machine learning is deep learning",
        options: [
          "True",
          "False"
        ],
        correctAnswer: 1,
        explanation: "False. Deep learning is just one type of machine learning. There are many ML techniques that don't use deep neural networks.",
        points: 10
      }
    ],
    quizSettings: {
      maxAttempts: 3,
      passingScore: 70,
      showCorrectAnswers: true,
      shuffleOptions: true
    },
    requiredCompletion: {
      readContent: true,
      watchVideo: true,
      watchPercentage: 80,
      passQuiz: true,
      minimumScore: 70
    }
  },
  {
    title: "Day 1 Session 2: History & Evolution of AI",
    order: 2,
    duration: "45 minutes",
    content: `# History of Artificial Intelligence

## Timeline of AI Development

### 1950s: The Beginning
- **1950**: Alan Turing proposes the "Turing Test"
- **1956**: Term "Artificial Intelligence" coined at Dartmouth Conference
- **1957**: Perceptron invented (first neural network)

### 1960s-1970s: First AI Winter
- Initial optimism fades
- Limited computing power
- Funding cuts

### 1980s: Expert Systems Boom
- Rule-based AI systems
- Medical diagnosis tools
- Business applications

### 1990s-2000s: Machine Learning Era
- IBM Deep Blue beats chess champion (1997)
- Statistical methods replace rule-based systems
- Internet provides massive training data

### 2010s: Deep Learning Revolution
- ImageNet breakthrough (2012)
- AlphaGo beats world champion (2016)
- GPT and transformer models emerge

### 2020s: AI Everywhere
- ChatGPT and large language models
- AI in everyday applications
- Ethical AI discussions

## Key Milestones
1. Turing Test (1950)
2. ELIZA chatbot (1966)
3. Expert Systems (1980s)
4. Deep Blue vs Kasparov (1997)
5. ImageNet moment (2012)
6. AlphaGo (2016)
7. GPT-3 (2020)
8. ChatGPT (2022)
`,
    videoUrl: "https://www.youtube.com/watch?v=kWmX3pd1f10",
    objectives: [
      "Trace AI development from 1950s to present",
      "Identify major breakthroughs",
      "Understand AI winters and revivals"
    ],
    resources: [
      {
        title: "The History of AI | ColdFusion",
        url: "https://www.youtube.com/watch?v=kWmX3pd1f10",
        type: "video"
      },
      {
        title: "Stanford HAI: AI Timeline",
        url: "https://hai.stanford.edu/",
        type: "link"
      }
    ],
    activities: [
      {
        title: "AI Timeline Creation",
        description: "Create a visual timeline of AI history with at least 8 major events. Include year, event name, and why it was significant.",
        type: "text",
        required: true
      }
    ],
    quiz: [
      {
        question: "Who is considered the 'father of AI' and proposed the Turing Test?",
        options: [
          "Alan Turing",
          "John McCarthy",
          "Marvin Minsky",
          "Geoffrey Hinton"
        ],
        correctAnswer: 0,
        explanation: "Alan Turing proposed the Turing Test in 1950 as a measure of machine intelligence.",
        points: 10
      },
      {
        question: "What was the 'AI Winter'?",
        options: [
          "A period when AI research funding and interest declined",
          "A time when AI only worked in cold climates",
          "The winter when AI was invented",
          "A new AI algorithm"
        ],
        correctAnswer: 0,
        explanation: "AI Winters were periods (1970s and late 1980s) when interest and funding for AI research dramatically decreased due to unmet expectations.",
        points: 10
      }
    ],
    quizSettings: {
      maxAttempts: 3,
      passingScore: 70,
      showCorrectAnswers: true
    }
  },
  {
    title: "Day 1 Session 3: Types of AI",
    order: 3,
    duration: "45 minutes",
    content: `# Types of Artificial Intelligence

## Classification by Capability

### 1. Narrow AI (Weak AI)
- **Current state**: Most AI today
- **Capability**: Performs specific tasks
- **Examples**: 
  - Siri (voice assistant)
  - Tesla Autopilot
  - AlphaGo
  - Netflix recommendations
- **Limitation**: Can't transfer knowledge to other domains

### 2. General AI (Strong AI)
- **Status**: Theoretical, doesn't exist yet
- **Capability**: Human-level intelligence across all domains
- **Goal**: Learn and apply knowledge like humans
- **Timeline**: Experts disagree (10-100+ years)

### 3. Super AI
- **Status**: Hypothetical
- **Capability**: Surpasses human intelligence
- **Concerns**: Control, ethics, existential risk
- **Debate**: May never exist or could emerge suddenly

## Classification by Functionality

### Reactive Machines
- No memory or past experience
- Example: IBM Deep Blue (chess)
- Respond to current situation only

### Limited Memory
- Use past data to make decisions
- Example: Self-driving cars
- Most current AI systems

### Theory of Mind
- Understand emotions, beliefs, intentions
- Status: Research phase
- Goal: Social robots

### Self-Aware AI
- Conscious, self-aware machines
- Status: Science fiction
- Philosophical questions about consciousness
`,
    videoUrl: "https://www.youtube.com/watch?v=kWmX3pd1f10",
    objectives: [
      "Distinguish between Narrow, General, and Super AI",
      "Classify AI systems by capability",
      "Understand current limitations"
    ],
    resources: [
      {
        title: "Types of AI | IBM Technology",
        url: "https://www.youtube.com/watch?v=2ePf9rue1Ao",
        type: "video"
      },
      {
        title: "What is Artificial General Intelligence? | Google",
        url: "https://ai.google/discover/artificial-general-intelligence/",
        type: "document"
      }
    ],
    activities: [
      {
        title: "AI Classification Game",
        description: "Classify 15 given AI systems as Narrow, General, or Super AI. Explain your reasoning.",
        type: "interactive",
        required: true
      }
    ],
    quiz: [
      {
        question: "Which type of AI exists today?",
        options: [
          "Only Narrow AI",
          "Narrow AI and General AI",
          "All three types",
          "Only General AI"
        ],
        correctAnswer: 0,
        explanation: "Currently, only Narrow AI exists. General AI and Super AI are theoretical/hypothetical.",
        points: 10
      },
      {
        question: "What is the main characteristic of Narrow AI?",
        options: [
          "It can perform any intellectual task a human can",
          "It excels at specific tasks but can't transfer knowledge",
          "It is self-aware and conscious",
          "It can learn any new task instantly"
        ],
        correctAnswer: 1,
        explanation: "Narrow AI is specialized for specific tasks and cannot transfer its knowledge to other domains.",
        points: 10
      }
    ]
  },
  {
    title: "Day 1 Session 4: AI Applications & Quick Draw Game",
    order: 4,
    duration: "45 minutes",
    content: `# AI Applications Across Industries

## Healthcare
- **Medical Diagnosis**: Detect cancer, analyze X-rays
- **Drug Discovery**: Find new medicines faster
- **Personalized Treatment**: Customize care based on genetics
- **Example**: IBM Watson Health, Google DeepMind

## Transportation
- **Self-Driving Cars**: Tesla, Waymo
- **Traffic Optimization**: Reduce congestion
- **Route Planning**: Uber, Google Maps
- **Predictive Maintenance**: Prevent breakdowns

## Finance
- **Fraud Detection**: Spot suspicious transactions
- **Algorithmic Trading**: High-speed market analysis
- **Credit Scoring**: Assess loan risk
- **Chatbots**: Customer service automation

## Entertainment
- **Recommendations**: Netflix, Spotify, YouTube
- **Content Creation**: AI-generated art, music
- **Gaming**: NPC behavior, procedural generation
- **Personalization**: Tailored experiences

## Education
- **Adaptive Learning**: Customize lessons
- **Automated Grading**: Essay scoring
- **Virtual Tutors**: 24/7 help
- **Language Learning**: Duolingo

## Agriculture
- **Crop Monitoring**: Drone surveillance
- **Yield Prediction**: Forecast harvests
- **Pest Detection**: Early warning systems
- **Precision Farming**: Optimize resources

## Activity: Quick Draw with Google AI

Play Quick Draw: https://quickdraw.withgoogle.com/

This game demonstrates:
- How AI learns patterns
- Image recognition
- Real-time prediction
- Training data importance
`,
    videoUrl: "https://www.youtube.com/watch?v=kWmX3pd1f10",
    objectives: [
      "Identify AI applications in 6+ industries",
      "Experience AI pattern recognition firsthand",
      "Understand practical AI implementations"
    ],
    resources: [
      {
        title: "Quick Draw Game | Google AI",
        url: "https://quickdraw.withgoogle.com/",
        type: "link"
      },
      {
        title: "AI Applications Across Industries | Vox",
        url: "https://www.youtube.com/watch?v=kWmX3pd1f10",
        type: "video"
      },
      {
        title: "AI Use Cases | MIT Technology Review",
        url: "https://www.technologyreview.com/artificial-intelligence/",
        type: "document"
      }
    ],
    activities: [
      {
        title: "Quick Draw Challenge",
        description: "Play 10 rounds of Quick Draw. Record: What did you draw? Did AI guess correctly? How quickly did it guess?",
        type: "interactive",
        required: true
      },
      {
        title: "AI Myths Discussion",
        description: "Identify 3 common misconceptions about AI and explain the truth.",
        type: "text",
        required: false
      }
    ],
    homework: {
      title: "Day 1 Reflection & Python Prep",
      description: `1. Write 200 words reflecting on what surprised you most about AI today
2. Begin Python preparation for Day 3:
   - Option A: Codecademy "Learn Python 3" modules 1-4
   - Option B: DataCamp "Python Basics" course  
   - Option C: Watch "Python for Beginners" by Mosh (1 hour)
3. Install Python on your computer if not already installed`,
      required: true,
      submissionType: "text"
    },
    quiz: [
      {
        question: "Which industry does NOT commonly use AI?",
        options: [
          "Healthcare",
          "Agriculture", 
          "None - AI is used in all industries",
          "Entertainment"
        ],
        correctAnswer: 2,
        explanation: "AI is now used across virtually all industries in some form.",
        points: 10
      }
    ]
  },

  // DAY 2 - SESSIONS
  {
    title: "Day 2 Session 1: Machine Learning Pipeline",
    order: 5,
    duration: "45 minutes",
    content: `# The Machine Learning Pipeline

## Overview: How Machine Learning Works

Machine Learning is like teaching a child to recognize animals:
1. Show many examples (data)
2. Child learns patterns (training)
3. Test with new images (testing)
4. Child identifies new animals (prediction)

## The 5-Step ML Pipeline

### Step 1: Collect Data
- **Goal**: Gather relevant information
- **Example**: Photos of cats and dogs
- **Size matters**: More data = better learning
- **Quality matters**: Clean, labeled, representative

### Step 2: Prepare Data
- **Clean**: Remove errors, duplicates
- **Label**: Add correct answers (cat/dog)
- **Split**: Divide into training (80%) and testing (20%)
- **Format**: Convert to numbers computers understand

### Step 3: Choose a Model
- **Decision Trees**: Like flowcharts
- **Neural Networks**: Inspired by brains
- **Support Vector Machines**: Find boundaries
- **Many options**: Pick based on problem type

### Step 4: Train the Model
- **Feed training data**: Show examples
- **Model learns patterns**: Adjusts internal parameters
- **Iteration**: Repeat many times
- **Goal**: Minimize errors

### Step 5: Test & Deploy
- **Test on new data**: See if it generalizes
- **Measure accuracy**: How often correct?
- **Deploy**: Use in real world
- **Monitor**: Keep improving

## Visual Pipeline

\`\`\`
Data Collection → Data Preparation → Model Selection → Training → Testing → Deployment
     ↑                                                                          ↓
     └────────────────────────── Feedback Loop ──────────────────────────────┘
\`\`\`
`,
    videoUrl: "https://www.youtube.com/watch?v=nKW8Ndu7Mjw",
    objectives: [
      "Describe the 5 steps of ML pipeline",
      "Explain why each step is important",
      "Understand the feedback loop"
    ],
    resources: [
      {
        title: "A visual introduction to machine learning | R2D3",
        url: "http://www.r2d3.us/visual-intro-to-machine-learning-part-1/",
        type: "link"
      },
      {
        title: "Machine Learning Crash Course | Google",
        url: "https://developers.google.com/machine-learning/crash-course",
        type: "document"
      },
      {
        title: "Machine Learning Basics | Google Cloud",
        url: "https://www.youtube.com/watch?v=nKW8Ndu7Mjw",
        type: "video"
      }
    ],
    activities: [
      {
        title: "Paper Machine Learning",
        description: "Build a simple ML model using paper! Follow the worksheet to classify shapes manually, then see how computers do it.",
        type: "interactive",
        required: true
      }
    ],
    quiz: [
      {
        question: "Why do we split data into training and testing sets?",
        options: [
          "To see if the model can generalize to new data",
          "To make the dataset smaller",
          "Because we don't have enough data",
          "To train two different models"
        ],
        correctAnswer: 0,
        explanation: "We test on separate data to ensure the model learned patterns, not just memorized the training data.",
        points: 10
      },
      {
        question: "Which step comes FIRST in the ML pipeline?",
        options: [
          "Train the model",
          "Collect data",
          "Choose a model",
          "Test the model"
        ],
        correctAnswer: 1,
        explanation: "Everything starts with data collection. No data = no machine learning.",
        points: 10
      }
    ]
  },

  // Continue with more lessons...
  // (I'll create a shorter version for demonstration, but include structure for all 40 lessons)

  {
    title: "Day 2 Session 2: Types of Machine Learning",
    order: 6,
    duration: "45 minutes",
    content: `# Three Types of Machine Learning

## 1. Supervised Learning

**Definition**: Learning from labeled examples

**Analogy**: Learning with a teacher who provides correct answers

**Process**:
1. Give data WITH correct answers
2. Model learns patterns
3. Model predicts answers for new data

**Examples**:
- Email spam detection (spam/not spam labels)
- Image classification (cat/dog labels)
- Price prediction (historical prices)
- Medical diagnosis (disease/healthy labels)

**Two Types**:
- **Classification**: Predict categories (spam/not spam)
- **Regression**: Predict numbers (house price)

## 2. Unsupervised Learning

**Definition**: Learning from unlabeled data (no correct answers)

**Analogy**: Exploring data on your own to find patterns

**Process**:
1. Give data WITHOUT labels
2. Model finds hidden patterns
3. Groups similar things together

**Examples**:
- Customer segmentation (group similar customers)
- Anomaly detection (find unusual patterns)
- Recommendation systems (find similar items)
- Data compression

**Main Type**:
- **Clustering**: Group similar data points

## 3. Reinforcement Learning

**Definition**: Learning through trial and error with rewards

**Analogy**: Training a dog with treats

**Process**:
1. Agent takes actions
2. Environment gives rewards/penalties
3. Agent learns best actions

**Examples**:
- Game AI (AlphaGo, chess engines)
- Robotics (robot learning to walk)
- Self-driving cars (navigate safely)
- Resource optimization

**Key Concept**: Learn policy (strategy) to maximize reward

## Comparison Table

| Type | Labels? | Goal | Example |
|------|---------|------|---------|
| Supervised | Yes | Predict output | Spam detection |
| Unsupervised | No | Find patterns | Customer groups |
| Reinforcement | Rewards | Maximize reward | Game playing |
`,
    videoUrl: "https://www.youtube.com/watch?v=IHZwWFHWa-w",
    objectives: [
      "Distinguish supervised, unsupervised, and reinforcement learning",
      "Provide examples of each type",
      "Understand when to use each approach"
    ],
    resources: [
      {
        title: "Supervised vs Unsupervised Learning | CGP Grey",
        url: "https://www.youtube.com/watch?v=IHZwWFHWa-w",
        type: "video"
      },
      {
        title: "Reinforcement Learning Explained | Arxiv Insights",
        url: "https://www.youtube.com/watch?v=2pWv7GOvuf0",
        type: "video"
      }
    ],
    activities: [
      {
        title: "ML Type Classification Game",
        description: "Given 15 real-world scenarios, classify each as supervised, unsupervised, or reinforcement learning. Explain your reasoning.",
        type: "interactive",
        required: true
      }
    ],
    quiz: [
      {
        question: "Which type of ML uses labeled training data?",
        options: [
          "Supervised learning",
          "Unsupervised learning",
          "Reinforcement learning",
          "All of them"
        ],
        correctAnswer: 0,
        explanation: "Supervised learning requires labeled data (input + correct output pairs).",
        points: 10
      },
      {
        question: "AlphaGo learning to play Go is an example of:",
        options: [
          "Supervised learning",
          "Unsupervised learning",
          "Reinforcement learning",
          "None of these"
        ],
        correctAnswer: 2,
        explanation: "AlphaGo uses reinforcement learning, learning through playing millions of games and receiving rewards for winning.",
        points: 10
      },
      {
        question: "What does clustering (unsupervised learning) do?",
        options: [
          "Predicts future values",
          "Groups similar data points together",
          "Labels all data points",
          "Maximizes rewards"
        ],
        correctAnswer: 1,
        explanation: "Clustering finds natural groupings in data without predefined labels.",
        points: 10
      }
    ]
  },

  // DAY 2 Session 3 & 4
  {
    title: "Day 2 Session 3: Data Quality & Bias",
    order: 7,
    duration: "45 minutes",
    content: `# Data Quality & Bias in AI

## Why Data Quality Matters

**Golden Rule**: Garbage In = Garbage Out

Your AI is only as good as your data!

## The 3 V's of Quality Data

### 1. Volume
- Need sufficient examples
- Rule of thumb: 1000+ samples per category
- More data often beats better algorithms

### 2. Variety  
- Diverse representation
- Multiple scenarios covered
- Avoid sampling bias

### 3. Veracity
- Accurate and truthful
- Properly labeled
- No errors or corruption

## Common Data Problems

### Problem 1: Bias
Real example: Facial recognition failing for darker skin tones because training data was 80% lighter skin.

### Problem 2: Incompleteness
Missing values mean model can't make predictions.

### Problem 3: Noise
Errors and incorrect labels confuse the model.

### Problem 4: Privacy
Data must be collected ethically with proper consent.
`,
    videoUrl: "https://www.youtube.com/watch?v=TWWsW1w-BVo",
    objectives: [
      "Identify data quality issues",
      "Recognize bias in datasets",
      "Understand ethical data collection"
    ],
    resources: [
      {
        title: "Coded Bias Documentary Trailer",
        url: "https://www.youtube.com/watch?v=jZl55PsfZJQ",
        type: "video"
      },
      {
        title: "Google ML Data Prep Guide",
        url: "https://developers.google.com/machine-learning/data-prep",
        type: "document"
      }
    ],
    activities: [
      {
        title: "Data Bias Detective",
        description: "Analyze 3 provided datasets for bias problems. Who is underrepresented? What could go wrong?",
        type: "text",
        required: true
      }
    ],
    quiz: [
      {
        question: "What happens if your training data is biased?",
        options: [
          "The AI will also be biased",
          "The AI will automatically correct it",
          "Nothing, algorithms are neutral",
          "The AI will work better"
        ],
        correctAnswer: 0,
        explanation: "AI learns from data. Biased data creates biased AI. The algorithm cannot fix data problems.",
        points: 10
      }
    ]
  },
  {
    title: "Day 2 Session 4: Review & Drawize Game",
    order: 8,
    duration: "30 minutes",
    content: `# Day 2 Review & Interactive Game

## Quick Recap

✅ **ML Pipeline**: Data → Train → Test → Predict  
✅ **Supervised Learning**: Learning with labeled examples  
✅ **Unsupervised Learning**: Finding patterns without labels  
✅ **Reinforcement Learning**: Learning through rewards  
✅ **Data Quality**: Volume, Variety, Veracity  

## Drawize Multiplayer Game

**Play**: https://www.drawize.com/

Teams of 3-4 students play drawing/guessing game.

### Learning Connection:
- **Drawer** = Data source
- **Guessers** = Model learning patterns
- **Quick drawings** = Noisy data
- **Detailed drawings** = Quality data
- **Multiple rounds** = More training data

**Key Insight**: Just like you got better at guessing over time, AI models improve with more examples!

## Preview Day 3
Tomorrow we start coding in Python! Make sure you've completed the Python prep homework.
`,
    objectives: [
      "Reinforce Day 2 concepts through game play",
      "Connect game mechanics to ML concepts",
      "Prepare for Python introduction"
    ],
    resources: [
      {
        title: "Drawize Game",
        url: "https://www.drawize.com/",
        type: "link"
      }
    ],
    activities: [
      {
        title: "Drawize Session",
        description: "Play 6 rounds with your team. Record observations about how guessing improved over time.",
        type: "interactive",
        required: true
      }
    ],
    homework: {
      title: "Python Foundations (Required for Day 3)",
      description: `Complete ONE of these options before Day 3:

**Option A**: Codecademy "Learn Python 3" modules 1-4 (Variables, Lists, Loops, Conditionals)
**Option B**: DataCamp "Python Basics" course  
**Option C**: Watch "Python Tutorial for Beginners" by Mosh (1 hour) + complete 10 practice problems in LMS

Submit: Screenshot of completion OR completed practice problems`,
      required: true,
      dueDate: new Date(Date.now() + 86400000), // Tomorrow
      submissionType: "file"
    }
  },

  // DAY 3 - Python Foundations + AI Ethics
  {
    title: "Day 3 Session 1: Python Basics for AI",
    order: 9,
    duration: "45 minutes",
    content: `# Python Basics (Crash Course)

## Why Python for AI?
- Easy to learn and read
- Powerful AI libraries (TensorFlow, PyTorch, scikit-learn)
- Industry standard

## Essential Python Concepts

### 1. Variables
\`\`\`python
name = "Alice"
age = 15
temperature = 98.6
is_student = True
\`\`\`

### 2. Lists (Arrays)
\`\`\`python
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "orange"]
mixed = [1, "hello", True, 3.14]
\`\`\`

### 3. Loops
\`\`\`python
# For loop
for i in range(5):
    print(i)

# While loop
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

### 4. Conditionals
\`\`\`python
score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
else:
    print("C")
\`\`\`

### 5. Functions
\`\`\`python
def greet(name):
    return f"Hello, {name}!"

message = greet("Alice")
print(message)
\`\`\`

## Practice in Google Colab
All exercises run in your browser - no installation needed!
`,
    videoUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
    objectives: [
      "Write basic Python code",
      "Use variables, lists, and loops",
      "Understand functions"
    ],
    resources: [
      {
        title: "Python for Beginners | Programming with Mosh",
        url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
        type: "video"
      },
      {
        title: "Google Colab (Free Python Environment)",
        url: "https://colab.research.google.com/",
        type: "link"
      }
    ],
    activities: [
      {
        title: "Python Exercises in Colab",
        description: "Complete 5 coding exercises: variables, loops, conditionals, lists, functions",
        type: "interactive",
        required: true
      }
    ],
    quiz: [
      {
        question: "What does this code print? x = 5; print(x * 2)",
        options: ["5", "10", "52", "Error"],
        correctAnswer: 1,
        explanation: "x * 2 = 5 * 2 = 10",
        points: 10
      }
    ]
  },
  {
    title: "Day 3 Session 2: AI Ethics - Bias & Fairness",
    order: 10,
    duration: "45 minutes",
    content: `# AI Ethics: Bias & Fairness

## Why Ethics Matter

AI decisions affect real lives:
- Loan approvals
- Job applications
- Criminal sentencing
- Medical treatment

## Real-World Cases

### Case 1: Amazon Hiring Algorithm (2018)
- **Problem**: AI favored male candidates
- **Cause**: Historical data showed mostly men hired
- **Result**: Amazon scrapped the system
- **Lesson**: Past discrimination perpetuates through AI

### Case 2: COMPAS Recidivism (Criminal Justice)
- **Problem**: Higher false positive rates for Black defendants
- **Cause**: Biased historical arrest data
- **Impact**: Unfair sentencing recommendations

### Case 3: Healthcare Algorithm
- **Problem**: Underestimated care needs for Black patients
- **Cause**: Algorithm used healthcare spending as proxy
- **Impact**: Systematic healthcare disparities

## Ethical Principles

1. **Fairness**: Treat all groups equitably
2. **Transparency**: Explain how decisions are made
3. **Accountability**: Someone responsible for outcomes
4. **Privacy**: Protect personal data
5. **Benefit**: AI should help humanity

## Your Role as AI Developer

- Question your data sources
- Test for bias across demographics  
- Consider diverse perspectives
- Build in human oversight
- Advocate for ethical AI
`,
    videoUrl: "https://www.youtube.com/watch?v=TWWsW1w-BVo",
    objectives: [
      "Identify real-world AI bias cases",
      "Understand ethical AI principles",
      "Recognize responsibility as developers"
    ],
    resources: [
      {
        title: "Coded Bias Documentary",
        url: "https://www.youtube.com/watch?v=jZl55PsfZJQ",
        type: "video"
      },
      {
        title: "AI Ethics | MIT",
        url: "https://www.media.mit.edu/projects/ai-ethics/overview/",
        type: "document"
      }
    ],
    activities: [
      {
        title: "Ethics Debate",
        description: "Debate: 'Should AI be used in criminal sentencing?' Support your position with 3 arguments.",
        type: "text",
        required: true
      }
    ]
  },
  {
    title: "Day 3 Session 3: Python for Data (NumPy basics)",
    order: 11,
    duration: "30 minutes",
    content: `# NumPy: Python's Math Library

## What is NumPy?

**Numerical Python** - Fast math operations on arrays

## Why NumPy for AI?
- 50x faster than regular Python lists
- Handles matrices and vectors
- Foundation for Pandas, TensorFlow, PyTorch

## Basic Operations

\`\`\`python
import numpy as np

# Create array
arr = np.array([1, 2, 3, 4, 5])

# Math operations
print(arr * 2)      # [2, 4, 6, 8, 10]
print(arr + 10)     # [11, 12, 13, 14, 15]
print(np.mean(arr)) # 3.0
print(np.max(arr))  # 5

# 2D arrays (matrices)
matrix = np.array([[1, 2], [3, 4]])
print(matrix.shape) # (2, 2)
\`\`\`

## Common Functions
- \`np.mean()\` - Average
- \`np.std()\` - Standard deviation
- \`np.max()\` / \`np.min()\` - Max/min values
- \`np.sum()\` - Total
`,
    videoUrl: "https://www.youtube.com/watch?v=QUT1VHiLmmI",
    objectives: [
      "Use NumPy arrays",
      "Perform mathematical operations",
      "Understand array shapes"
    ],
    resources: [
      {
        title: "NumPy Tutorial | freeCodeCamp",
        url: "https://www.youtube.com/watch?v=QUT1VHiLmmI",
        type: "video"
      }
    ]
  },
  {
    title: "Day 3 Session 4: Hands-on Python Practice",
    order: 12,
    duration: "45 minutes",
    content: `# Practice Session: Build a Simple Classifier

## Project: Fruit Classifier

Build a simple rule-based classifier in Python!

\`\`\`python
def classify_fruit(weight, color):
    if weight > 200 and color == "yellow":
        return "Banana"
    elif weight < 150 and color == "red":
        return "Apple"
    elif color == "orange":
        return "Orange"
    else:
        return "Unknown"

# Test it
print(classify_fruit(250, "yellow"))  # Banana
print(classify_fruit(120, "red"))     # Apple
\`\`\`

## Your Task
Improve this classifier by:
1. Adding more fruits
2. Adding more features (shape, taste)
3. Testing edge cases
4. Making it more accurate

## Reflection
- Is this "AI"? (No - just rules!)
- How would machine learning differ?
- What if we had 1000 fruit types?
`,
    objectives: [
      "Write Python functions",
      "Understand rule-based vs ML systems",
      "Practice coding logic"
    ],
    activities: [
      {
        title: "Build Improved Classifier",
        description: "Expand the fruit classifier with 5+ fruits and 3+ features. Test with 10 examples.",
        type: "interactive",
        required: true
      }
    ]
  },

  // DAY 4 - Teachable Machine Part 1
  {
    title: "Day 4 Session 1: Introduction to Teachable Machine",
    order: 13,
    duration: "30 minutes",
    content: `# Google's Teachable Machine

## What is Teachable Machine?

**No-code AI tool** that lets you train models using your webcam!

**Website**: https://teachablemachine.withgoogle.com/

## What You Can Teach

1. **Image Classification**
   - Recognize objects
   - Detect gestures
   - Identify people

2. **Audio Classification**
   - Recognize sounds
   - Voice commands
   - Music genres

3. **Pose Detection**
   - Yoga poses
   - Dance moves
   - Sign language

## How It Works (Behind the Scenes)

1. You provide examples (data collection)
2. TM trains a neural network (transfer learning)
3. Model learns patterns (training)
4. You test it (inference)

## Why This Matters

- See ML pipeline in action
- No coding required
- Instant feedback
- Real neural network!
`,
    videoUrl: "https://www.youtube.com/watch?v=T2qQGqZxkD0",
    objectives: [
      "Understand Teachable Machine capabilities",
      "Connect to ML pipeline concepts",
      "Prepare for hands-on project"
    ],
    resources: [
      {
        title: "Teachable Machine Tutorial | Google",
        url: "https://www.youtube.com/watch?v=T2qQGqZxkD0",
        type: "video"
      },
      {
        title: "Teachable Machine",
        url: "https://teachablemachine.withgoogle.com/",
        type: "link"
      }
    ]
  },
  {
    title: "Day 4 Session 2: Image Classification Project",
    order: 14,
    duration: "60 minutes",
    content: `# Build Your First AI Model!

## Project: Gesture Recognition

### Step 1: Setup (5 min)
1. Go to teachablemachine.withgoogle.com
2. Click "Get Started"
3. Choose "Image Project" → "Standard"

### Step 2: Create Classes (10 min)
Create 3 classes:
- **Thumbs Up** 👍
- **Peace Sign** ✌️
- **Fist** ✊

### Step 3: Collect Data (20 min)
For each class:
1. Click "Webcam" button
2. Show the gesture
3. Hold "Hold to Record"
4. Capture 50+ images
5. Vary: lighting, angle, distance, background

**Pro Tip**: More variety = better model!

### Step 4: Train (2 min)
Click "Train Model" and wait...

### Step 5: Test (10 min)
Try your gestures. Does it work?

### Step 6: Improve (15 min)
If mistakes happen:
- Add more examples for that class
- Add "None" class for other gestures
- Retrain and test again

## Key Learnings
- More data = better accuracy
- Variety prevents overfitting
- Testing reveals weaknesses
`,
    objectives: [
      "Train an image classification model",
      "Collect quality training data",
      "Test and improve model"
    ],
    activities: [
      {
        title: "Gesture Recognition Model",
        description: "Train a 3-class gesture model with 50+ samples each. Record final accuracy and 3 lessons learned.",
        type: "interactive",
        required: true
      }
    ]
  },
  {
    title: "Day 4 Session 3: Audio Classification",
    order: 15,
    duration: "45 minutes",
    content: `# Train an Audio Classifier

## Project: Sound Detector

### Create Classes:
- **Clap** 👏
- **Snap** 🫰
- **Whistle** 😙
- **Background Noise**

### Training Tips:
1. Record 40+ samples per sound
2. Vary volume (quiet to loud)
3. Include background noise class
4. Test in different rooms

### Real-World Applications:
- Voice assistants (Alexa, Siri)
- Music recognition (Shazam)
- Medical monitors (cough detection)
- Wildlife monitoring (bird calls)

### Challenge:
Can you make it work with 3 different people's voices?
`,
    videoUrl: "https://www.youtube.com/watch?v=TOrVsLklltM",
    objectives: [
      "Build audio classification model",
      "Understand audio ML challenges",
      "Apply to real-world scenarios"
    ],
    activities: [
      {
        title: "Sound Classifier",
        description: "Train 4-class sound model. Test with 3 different people. Report accuracy for each person.",
        type: "interactive",
        required: true
      }
    ]
  },
  {
    title: "Day 4 Session 4: Export & Use Your Model",
    order: 16,
    duration: "30 minutes",
    content: `# Deploy Your AI Model

## Export Options

### 1. Save to Google Drive
- Keep for later
- Share with others
- Reload and retrain

### 2. Upload Model
- Get a shareable link
- Use in websites
- Embed in apps

### 3. Download
- TensorFlow format
- TensorFlow.js (web)
- TensorFlow Lite (mobile)

## Use Your Model

### Simple HTML Example:
\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image"></script>
<script>
  const URL = "YOUR_MODEL_URL";
  const model = await tmImage.load(URL + "model.json");
  // Now you can use it!
</script>
\`\`\`

## Reflection
You just trained real neural networks! 🎉

Next: Learn what's happening under the hood.
`,
    objectives: [
      "Export trained models",
      "Understand deployment options",
      "Connect to web integration"
    ],
    homework: {
      title: "Creative AI Model",
      description: `Create a unique Teachable Machine model:
- Choose any classification task (image, audio, or pose)
- Train with 4+ classes
- Export and save
- Submit: Model link + description + use case

Examples: Sign language alphabet, emotion detector, plant identifier`,
      required: true,
      submissionType: "link"
    }
  },

  // DAY 5 - Continue with pattern...
  {
    title: "Day 5 Session 1: Pose Detection with Teachable Machine",
    order: 17,
    duration: "45 minutes",
    content: `# Pose Detection AI

## What is Pose Detection?

AI that tracks body position and movement in real-time.

## Applications:
- Fitness apps (count reps)
- Physical therapy
- Gaming (motion controls)
- Sign language translation
- Sports analysis

## Project: Yoga Pose Classifier

### Poses to Detect:
- Tree Pose 🧘
- Warrior Pose 🤺
- Downward Dog 🐕
- Mountain Pose 🗻

### Training Process:
1. Teachable Machine → "Pose Project"
2. Record 30+ samples per pose
3. Vary: speed, direction, camera angle
4. Test with different clothing

### Challenge:
Works best when:
- Full body visible
- Good lighting
- Plain background
`,
    objectives: [
      "Build pose detection model",
      "Understand skeleton tracking",
      "Apply to real movements"
    ],
    resources: [
      {
        title: "Teachable Machine Pose",
        url: "https://teachablemachine.withgoogle.com/train/pose",
        type: "link"
      }
    ]
  },
  {
    title: "Day 5 Session 2: Introduction to Python Libraries",
    order: 18,
    duration: "30 minutes",
    content: `# Essential AI Libraries

## The Big Three

### 1. NumPy
**Purpose**: Fast math on arrays
\`\`\`python
import numpy as np
data = np.array([1,2,3,4,5])
print(data.mean())  # 3.0
\`\`\`

### 2. Pandas
**Purpose**: Work with datasets (tables)
\`\`\`python
import pandas as pd
df = pd.read_csv('data.csv')
print(df.head())
\`\`\`

### 3. Matplotlib
**Purpose**: Create visualizations
\`\`\`python
import matplotlib.pyplot as plt
plt.plot([1,2,3], [4,5,6])
plt.show()
\`\`\`

## Tomorrow's Focus: Pandas

We'll use Pandas to analyze real datasets!
`,
    objectives: [
      "Identify major AI libraries",
      "Understand their purposes",
      "See basic usage examples"
    ]
  },
  {
    title: "Day 5 Session 3: Transfer Learning Explained",
    order: 19,
    duration: "30 minutes",
    content: `# Transfer Learning: The Secret of Teachable Machine

## What is Transfer Learning?

Using a pre-trained model as a starting point for your task.

## Analogy

**Learning Spanish after knowing English**:
- Already know grammar concepts
- Understand sentence structure
- Just need new vocabulary

**Transfer Learning in AI**:
- Model already knows: edges, shapes, patterns
- Just learns: your specific classes
- Much faster than starting from scratch!

## How Teachable Machine Uses It

1. **Base Model**: MobileNet (trained on 1M images)
2. **Knows**: General visual features
3. **You Add**: Your specific classes
4. **Result**: Accurate model in minutes!

## Why It Matters
- Need less data (50 vs 10,000 images)
- Train faster (minutes vs days)
- Better accuracy
- Works on limited hardware

This is how modern AI works!
`,
    objectives: [
      "Understand transfer learning concept",
      "Explain why Teachable Machine works so well",
      "Recognize practical benefits"
    ]
  },
  {
    title: "Day 5 Session 4: Model Testing & Evaluation",
    order: 20,
    duration: "30 minutes",
    content: `# How Good is Your Model?

## Key Metrics

### Accuracy
**What**: % of correct predictions
**Formula**: (Correct / Total) × 100
**Example**: 85 right out of 100 = 85% accuracy

### Confusion Matrix
Shows where your model gets confused:

|           | Predicted Cat | Predicted Dog |
|-----------|---------------|---------------|
| **Actual Cat** | 45 ✅         | 5 ❌          |
| **Actual Dog** | 3 ❌          | 47 ✅         |

### Common Problems

**Overfitting**: 
- Works great on training data
- Fails on new data
- Solution: More variety in training

**Underfitting**:
- Poor on everything
- Solution: More data, better model

## Testing Best Practices

1. Test with NEW data (not training data)
2. Try edge cases
3. Test with different people/conditions
4. Measure accuracy honestly
`,
    objectives: [
      "Calculate model accuracy",
      "Read confusion matrices",
      "Identify overfitting"
    ]
  },

  // DAY 6 - Pandas Data Analysis
  {
    title: "Day 6 Session 1: Introduction to Pandas",
    order: 21,
    duration: "45 minutes",
    content: `# Pandas: Data Analysis in Python

## What is Pandas?

Python library for working with tabular data (like Excel, but way more powerful!)

## Basic Concepts

### DataFrame = Table
\`\`\`python
import pandas as pd

# Create from dictionary
data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [15, 16, 15],
    'Score': [95, 87, 92]
}
df = pd.DataFrame(data)
print(df)
\`\`\`

### Reading Data
\`\`\`python
# From CSV
df = pd.read_csv('data.csv')

# First 5 rows
print(df.head())

# Summary statistics
print(df.describe())

# Column info
print(df.info())
\`\`\`

### Basic Operations
\`\`\`python
# Get column
ages = df['Age']

# Filter rows
teenagers = df[df['Age'] < 18]

# Calculate average
avg_score = df['Score'].mean()
\`\`\`

## Why Pandas for AI?
- Load datasets
- Clean messy data
- Explore patterns
- Prepare for ML models
`,
    videoUrl: "https://www.youtube.com/watch?v=vmEHCJofslg",
    objectives: [
      "Create and manipulate DataFrames",
      "Read CSV files",
      "Perform basic data operations"
    ],
    resources: [
      {
        title: "Pandas Tutorial | freeCodeCamp",
        url: "https://www.youtube.com/watch?v=vmEHCJofslg",
        type: "video"
      },
      {
        title: "Google Colab Pandas Notebook",
        url: "https://colab.research.google.com/",
        type: "link"
      }
    ]
  },
  {
    title: "Day 6 Session 2: Data Exploration",
    order: 22,
    duration: "45 minutes",
    content: `# Exploring Real Datasets

## Dataset: Titanic Survival

Use famous Titanic dataset to practice!

### Load Data
\`\`\`python
import pandas as pd

url = 'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv'
df = pd.read_csv(url)

# Explore
print(df.head())
print(df.shape)  # (891, 12)
print(df.columns)
\`\`\`

### Ask Questions
\`\`\`python
# How many survived?
print(df['Survived'].value_counts())

# Average age?
print(df['Age'].mean())

# Survival rate by gender?
print(df.groupby('Sex')['Survived'].mean())

# Missing values?
print(df.isnull().sum())
\`\`\`

### Key Findings:
- Women survived more than men
- First class survived more
- Children had better chances

## Your Task
Explore the Titanic dataset and find 5 interesting patterns!
`,
    objectives: [
      "Load real dataset",
      "Calculate statistics",
      "Discover patterns"
    ],
    activities: [
      {
        title: "Titanic Data Analysis",
        description: "Answer 10 questions about Titanic dataset using Pandas. Find 5 interesting patterns.",
        type: "interactive",
        required: true
      }
    ]
  },
  {
    title: "Day 6 Session 3: Data Cleaning",
    order: 23,
    duration: "45 minutes",
    content: `# Cleaning Messy Data

## Real-World Data is MESSY!

Common problems:
- Missing values
- Duplicates
- Wrong data types
- Outliers
- Inconsistent formatting

## Fixing Missing Values

\`\`\`python
# See missing data
print(df.isnull().sum())

# Option 1: Drop rows with missing values
df_clean = df.dropna()

# Option 2: Fill with average
df['Age'].fillna(df['Age'].mean(), inplace=True)

# Option 3: Fill with most common value
df['Embarked'].fillna(df['Embarked'].mode()[0], inplace=True)
\`\`\`

## Removing Duplicates
\`\`\`python
df = df.drop_duplicates()
\`\`\`

## Fixing Data Types
\`\`\`python
df['Age'] = df['Age'].astype(int)
df['Date'] = pd.to_datetime(df['Date'])
\`\`\`

## Handling Outliers
\`\`\`python
# Remove extreme values
Q1 = df['Price'].quantile(0.25)
Q3 = df['Price'].quantile(0.75)
IQR = Q3 - Q1
df = df[(df['Price'] >= Q1 - 1.5*IQR) & (df['Price'] <= Q3 + 1.5*IQR)]
\`\`\`

Remember: 80% of data science is cleaning data!
`,
    objectives: [
      "Handle missing values",
      "Remove duplicates",
      "Fix data types"
    ]
  },
  {
    title: "Day 6 Session 4: Data Visualization with Matplotlib",
    order: 24,
    duration: "45 minutes",
    content: `# Visualizing Data

## Why Visualize?

"A picture is worth 1000 rows of data!"

## Basic Plots

### Line Plot
\`\`\`python
import matplotlib.pyplot as plt

plt.plot([1, 2, 3, 4], [1, 4, 9, 16])
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.title('My First Plot')
plt.show()
\`\`\`

### Bar Chart
\`\`\`python
df['Sex'].value_counts().plot(kind='bar')
plt.title('Passengers by Gender')
plt.show()
\`\`\`

### Histogram
\`\`\`python
df['Age'].plot(kind='hist', bins=20)
plt.title('Age Distribution')
plt.show()
\`\`\`

### Scatter Plot
\`\`\`python
plt.scatter(df['Age'], df['Fare'])
plt.xlabel('Age')
plt.ylabel('Fare')
plt.show()
\`\`\`

## Your Task
Create 5 visualizations from Titanic data that tell a story!
`,
    objectives: [
      "Create basic plots",
      "Choose appropriate chart types",
      "Tell stories with data"
    ],
    homework: {
      title: "Pandas Data Project",
      description: `Choose a dataset from Kaggle (or use provided options):
1. Load with Pandas
2. Clean the data
3. Find 5 insights
4. Create 5 visualizations
5. Write 1-page summary of findings

Submit: Colab notebook link`,
      required: true,
      submissionType: "link"
    }
  },

  // DAY 7 - ML Models
  {
    title: "Day 7 Session 1: Traditional ML Algorithms",
    order: 25,
    duration: "45 minutes",
    content: `# Machine Learning Algorithms

## Decision Trees

**Concept**: Series of yes/no questions

Example: Predicting if someone will buy ice cream
- Is it hot? → Yes
  - Is it sunny? → Yes → BUY ✓
  - Is it sunny? → No → DON'T BUY ✗
- Is it hot? → No → DON'T BUY ✗

**Pros**: Easy to understand, visualize
**Cons**: Can overfit

## k-Nearest Neighbors (kNN)

**Concept**: "Tell me who your neighbors are, I'll tell you who you are"

- Find k closest training examples
- Majority vote wins

**Example**: Is this fruit an apple?
- Look at 5 nearest fruits
- 4 are apples, 1 is orange
- Predict: Apple ✓

**Pros**: Simple, no training needed
**Cons**: Slow for large datasets

## Random Forest

**Concept**: Many decision trees voting together

Like asking 100 experts instead of 1!

**Pros**: Very accurate, handles complex data
**Cons**: Hard to interpret

These algorithms power many real-world AI systems!
`,
    objectives: [
      "Understand basic ML algorithms",
      "Compare strengths/weaknesses",
      "Know when to use each"
    ]
  },
  {
    title: "Day 7 Session 2: Build Your First Classifier with scikit-learn",
    order: 26,
    duration: "60 minutes",
    content: `# Hands-On: Train a Real ML Model!

## Project: Iris Flower Classifier

Classic ML dataset: Predict flower species from measurements.

### Step 1: Load Data
\`\`\`python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

# Load dataset
iris = load_iris()
X = iris.data  # Features: petal/sepal length/width
y = iris.target  # Labels: setosa, versicolor, virginica
\`\`\`

### Step 2: Split Data
\`\`\`python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
\`\`\`

### Step 3: Train Model
\`\`\`python
model = DecisionTreeClassifier()
model.fit(X_train, y_train)
\`\`\`

### Step 4: Test Model
\`\`\`python
accuracy = model.score(X_test, y_test)
print(f"Accuracy: {accuracy * 100}%")
\`\`\`

### Step 5: Make Predictions
\`\`\`python
new_flower = [[5.1, 3.5, 1.4, 0.2]]
prediction = model.predict(new_flower)
print(f"Species: {iris.target_names[prediction[0]]}")
\`\`\`

**You just trained a real ML model in 10 lines of code!** 🎉
`,
    objectives: [
      "Use scikit-learn library",
      "Train and test ML models",
      "Make predictions"
    ],
    activities: [
      {
        title: "Iris Classifier Project",
        description: "Build iris classifier. Try 3 different algorithms (Decision Tree, kNN, Random Forest). Compare accuracies.",
        type: "interactive",
        required: true
      }
    ]
  },
  {
    title: "Day 7 Session 3: Natural Language Processing Introduction",
    order: 27,
    duration: "45 minutes",
    content: `# NLP: Teaching Computers to Understand Language

## What is NLP?

**Natural Language Processing** = AI for human language

## Applications:
- Chatbots (ChatGPT, customer service)
- Translation (Google Translate)
- Sentiment analysis (positive/negative reviews)
- Autocomplete
- Voice assistants
- Text summarization

## Simple NLP Example: Sentiment Analysis

\`\`\`python
# Is this review positive or negative?

positive_words = ['good', 'great', 'love', 'excellent', 'amazing']
negative_words = ['bad', 'hate', 'terrible', 'awful', 'poor']

review = "This movie was great and amazing!"

pos_count = sum(word in review.lower() for word in positive_words)
neg_count = sum(word in review.lower() for word in negative_words)

if pos_count > neg_count:
    print("Positive review! 😊")
else:
    print("Negative review 😞")
\`\`\`

## Real NLP Models:
- BERT (Google)
- GPT (OpenAI)
- Transformers

Tomorrow: Build your own sentiment analyzer!
`,
    objectives: [
      "Understand NLP applications",
      "Build simple text classifier",
      "Recognize NLP in daily life"
    ]
  },
  {
    title: "Day 7 Session 4: Sentiment Analysis Project",
    order: 28,
    duration: "45 minutes",
    content: `# Build a Sentiment Analyzer

## Project: Movie Review Classifier

Predict if reviews are positive or negative.

### Using TextBlob (Simple)
\`\`\`python
from textblob import TextBlob

review = "This movie was absolutely fantastic!"
blob = TextBlob(review)

# Polarity: -1 (negative) to +1 (positive)
sentiment = blob.sentiment.polarity

if sentiment > 0:
    print("Positive ✓")
elif sentiment < 0:
    print("Negative ✗")
else:
    print("Neutral")
\`\`\`

### Test Dataset
Try with real IMDB movie reviews dataset!

### Challenge:
- Collect 20 reviews (10 positive, 10 negative)
- Test your sentiment analyzer
- Calculate accuracy
- Find cases where it fails

## Limitations:
- Sarcasm: "Oh great, another sequel" (negative, but words are positive)
- Context: "Not bad" (positive, but contains "bad")
- Slang: "This movie slaps!" (positive, but algorithm might miss it)

This is why we need advanced ML models!
`,
    objectives: [
      "Build sentiment analyzer",
      "Test on real reviews",
      "Understand NLP limitations"
    ],
    homework: {
      title: "Sentiment Analysis Project",
      description: `Build sentiment analyzer:
1. Collect 20 movie/product reviews (10 positive, 10 negative)
2. Use TextBlob or write your own
3. Test and calculate accuracy
4. Find 3 examples where it fails
5. Explain why it failed

Submit: Colab notebook + 1-page writeup`,
      required: true,
      submissionType: "link"
    }
  },

  // DAY 8 - Neural Networks & Deep Learning
  {
    title: "Day 8 Session 1: Introduction to Neural Networks",
    order: 29,
    duration: "45 minutes",
    content: `# Neural Networks: AI's Brain

## What is a Neural Network?

Computer system inspired by human brain neurons.

## Structure:

**Input Layer** → **Hidden Layers** → **Output Layer**

### Simple Example: AND Gate
\`\`\`
Input 1 ─┐
         ├─→ [Neuron] ─→ Output
Input 2 ─┘
\`\`\`

## How Neurons Work:

1. **Receive inputs** (numbers)
2. **Multiply by weights** (importance)
3. **Add them up**
4. **Apply activation function** (decide: fire or not?)
5. **Pass to next layer**

## Why "Deep" Learning?

**Deep** = Many hidden layers (10, 50, 100+ layers!)

More layers = Can learn more complex patterns

## Famous Deep Learning Wins:
- Image recognition (better than humans!)
- AlphaGo (beat world champion)
- ChatGPT (human-like text)
- Self-driving cars

## Interactive Demo:
Visit TensorFlow Playground: https://playground.tensorflow.org
Play with neural networks visually!
`,
    videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
    objectives: [
      "Understand neural network structure",
      "Visualize how neurons work",
      "Distinguish deep vs shallow networks"
    ],
    resources: [
      {
        title: "Neural Networks | 3Blue1Brown",
        url: "https://www.youtube.com/watch?v=aircAruvnKk",
        type: "video"
      },
      {
        title: "TensorFlow Playground",
        url: "https://playground.tensorflow.org",
        type: "link"
      }
    ]
  },
  {
    title: "Day 8 Session 2: Train Your First Neural Network",
    order: 30,
    duration: "60 minutes",
    content: `# Build a Neural Network with TensorFlow

## Project: Handwritten Digit Recognizer (MNIST)

Recognize digits 0-9 from images (like ZIP code reading!)

### Code:
\`\`\`python
import tensorflow as tf
from tensorflow import keras

# Load MNIST dataset (60k training images)
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()

# Normalize pixel values 0-255 → 0-1
X_train = X_train / 255.0
X_test = X_test / 255.0

# Build neural network
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),  # Flatten 28x28 image
    keras.layers.Dense(128, activation='relu'),   # Hidden layer: 128 neurons
    keras.layers.Dense(10, activation='softmax')  # Output: 10 digits
])

# Compile model
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train model
model.fit(X_train, y_train, epochs=5)

# Test accuracy
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"Test accuracy: {test_acc * 100}%")

# Make prediction
import numpy as np
prediction = model.predict(X_test[0:1])
print(f"Predicted digit: {np.argmax(prediction)}")
\`\`\`

**Result**: ~98% accuracy!

You just built a real deep learning model! 🧠
`,
    objectives: [
      "Build neural network with TensorFlow",
      "Train on real dataset",
      "Achieve 95%+ accuracy"
    ],
    activities: [
      {
        title: "MNIST Neural Network",
        description: "Build and train MNIST digit recognizer. Experiment with: number of neurons, number of layers, epochs. Find best accuracy.",
        type: "interactive",
        required: true
      }
    ]
  },
  {
    title: "Day 8 Session 3: Guest Speaker - AI Professional",
    order: 31,
    duration: "45 minutes",
    content: `# Industry Insights: Career in AI

## Guest Speaker Session

**Format**: Q&A with AI professional

### Topics:
- Education path (self-taught vs degree)
- Day-to-day work
- Skills needed
- Job opportunities
- Salary ranges
- Future of AI careers
- Advice for beginners

### Prepare Questions:
Think about:
- What interests you about AI?
- What concerns you?
- Career goals?

### Careers in AI:
- Machine Learning Engineer
- Data Scientist
- AI Researcher
- AI Ethics Specialist
- ML Operations Engineer
- Computer Vision Engineer
- NLP Specialist
- Robotics Engineer

The AI field is growing fast - thousands of jobs added yearly!
`,
    objectives: [
      "Learn about AI careers",
      "Understand required skills",
      "Network with professional"
    ]
  },
  {
    title: "Day 8 Session 4: Model Comparison & Selection",
    order: 32,
    duration: "30 minutes",
    content: `# Choosing the Right Model

## When to Use What?

### Decision Trees / Random Forests
**Good for**:
- Tabular data (spreadsheets)
- Feature importance needed
- Interpretability matters
**Examples**: Loan approval, medical diagnosis

### k-Nearest Neighbors
**Good for**:
- Small datasets
- Recommendation systems
- Simple classification
**Examples**: Movie recommendations

### Neural Networks
**Good for**:
- Images, audio, video
- Large datasets
- Complex patterns
- High accuracy needed
**Examples**: Face recognition, speech-to-text

### Gradient Boosting (XGBoost, LightGBM)
**Good for**:
- Kaggle competitions
- Structured data
- Need best accuracy
**Examples**: Click prediction, fraud detection

## Decision Framework:

1. **What type of data?**
   - Images/Audio → Neural Networks
   - Tables → Trees/Boosting

2. **How much data?**
   - Small (<1000) → kNN, Simple Trees
   - Large (>10k) → Deep Learning

3. **What's most important?**
   - Speed → kNN
   - Accuracy → Neural Networks
   - Interpretability → Decision Trees

No single "best" algorithm - depends on your problem!
`,
    objectives: [
      "Compare ML algorithms",
      "Choose appropriate models",
      "Understand tradeoffs"
    ]
  },

  // DAY 9 - Final Project Work
  {
    title: "Day 9 Session 1: Final Project Introduction",
    order: 33,
    duration: "30 minutes",
    content: `# Final Project: Build Your Own AI Application

## Project Requirements:

### Must Include:
1. **Real dataset** (50+ samples)
2. **Data cleaning & exploration**
3. **Trained ML model**
4. **Model evaluation** (accuracy, confusion matrix)
5. **Visualizations** (3+)
6. **Documentation** (what, why, how)

### Project Ideas:

**Level 1 (Beginner)**:
- Email spam classifier
- Iris flower prediction
- House price predictor
- Movie review sentiment

**Level 2 (Intermediate)**:
- Image classifier (cats vs dogs)
- Music genre classifier
- Fake news detector
- Handwriting recognizer

**Level 3 (Advanced)**:
- Multiple model comparison
- Real-time webcam classifier
- Chatbot
- Multi-class complex problem

### Grading Rubric (100 points):

**Technical (30pts)**:
- Data collection & quality
- Model choice & implementation
- Code quality

**Results (20pts)**:
- Model accuracy
- Proper evaluation
- Error analysis

**Ethics (15pts)**:
- Bias consideration
- Ethical implications
- Fairness discussion

**Data Quality (15pts)**:
- Cleaning process
- Feature engineering
- Data visualization

**Presentation (20pts)**:
- Clear documentation
- Visualizations
- Storytelling

Choose a project you're passionate about! 🚀
`,
    objectives: [
      "Understand project requirements",
      "Choose project topic",
      "Plan implementation"
    ]
  },
  {
    title: "Day 9 Session 2: Project Work Time",
    order: 34,
    duration: "90 minutes",
    content: `# Guided Project Development

## Milestone Checklist:

### Hour 1:
- [ ] Choose dataset
- [ ] Load and explore data
- [ ] Clean data
- [ ] Create 2 visualizations

### Hour 2:
- [ ] Split train/test sets
- [ ] Train first model
- [ ] Calculate accuracy
- [ ] Document process

## Available Datasets:

### Kaggle:
- Titanic (classic starter)
- MNIST (digits)
- Fashion MNIST (clothing)
- Spam email
- Movie reviews (IMDB)
- Iris flowers
- Wine quality
- Heart disease
- Housing prices

### Or collect your own!

## Get Help:

- Instructor available for questions
- Peer collaboration encouraged
- Online resources: Stack Overflow, documentation

## Remember:
Perfect is the enemy of done. Start simple, then improve!
`,
    objectives: [
      "Make significant project progress",
      "Complete data loading & cleaning",
      "Train initial model"
    ]
  },
  {
    title: "Day 9 Session 3: Model Optimization",
    order: 35,
    duration: "60 minutes",
    content: `# Improving Your Model

## Techniques to Boost Accuracy:

### 1. More/Better Data
- Collect more examples
- Balance classes
- Remove outliers
- Add relevant features

### 2. Feature Engineering
\`\`\`python
# Create new features from existing ones
df['age_group'] = pd.cut(df['age'], bins=[0, 18, 35, 60, 100])
df['bmi'] = df['weight'] / (df['height'] ** 2)
\`\`\`

### 3. Hyperparameter Tuning
\`\`\`python
# Try different settings
model1 = DecisionTreeClassifier(max_depth=5)
model2 = DecisionTreeClassifier(max_depth=10)
model3 = DecisionTreeClassifier(max_depth=20)
# Compare which works best
\`\`\`

### 4. Try Different Models
- Decision Tree: 85%
- Random Forest: 89%
- Neural Network: 92% ← Best!

### 5. Ensemble Methods
Combine multiple models for better results!

## Document Everything!
Keep notes on:
- What you tried
- What worked
- What didn't work
- Why you think it happened
`,
    objectives: [
      "Improve model accuracy",
      "Apply optimization techniques",
      "Document experiments"
    ]
  },
  {
    title: "Day 9 Session 4: Project Completion & Documentation",
    order: 36,
    duration: "60 minutes",
    content: `# Finishing Touches

## Documentation Template:

### 1. Project Title & Overview (5 mins)
- What problem are you solving?
- Why is it important?

### 2. Dataset Description (10 mins)
- Source
- Size (rows/columns)
- Features explained
- Target variable

### 3. Data Exploration (15 mins)
- Key statistics
- Visualizations
- Patterns discovered
- Data quality issues found

### 4. Data Cleaning (10 mins)
- Steps taken
- Values filled/removed
- Transformations applied

### 5. Model Development (15 mins)
- Model(s) chosen
- Why these models?
- Training process
- Challenges faced

### 6. Results (10 mins)
- Final accuracy
- Confusion matrix
- Error analysis
- Comparison (if multiple models)

### 7. Ethics & Bias (10 mins)
- Potential biases in data
- Fairness considerations
- Ethical implications
- Limitations

### 8. Conclusion (5 mins)
- What you learned
- Future improvements
- Real-world applications

## Checklist Before Submitting:
- [ ] Code runs without errors
- [ ] All visualizations displaying
- [ ] Comments in code
- [ ] README file completed
- [ ] Accuracy reported
- [ ] Ethics section written

Tomorrow: Present to class!
`,
    objectives: [
      "Complete project implementation",
      "Write comprehensive documentation",
      "Prepare for presentation"
    ],
    homework: {
      title: "Final Project Completion",
      description: `Submit complete AI project:

**Required Files**:
1. Jupyter Notebook (.ipynb) with code
2. README.md with full documentation
3. Presentation slides (optional but recommended)

**Submission**:
- Upload to Google Drive
- Share link with instructor
- Ensure "Anyone with link can view"

**Due**: Before Day 10 presentations

**Reminder**: Follow rubric (Technical 30pts, Results 20pts, Ethics 15pts, Data 15pts, Presentation 20pts)`,
      required: true,
      dueDate: new Date(Date.now() + 86400000),
      submissionType: "link"
    }
  },

  // DAY 10 - Presentations & Certification
  {
    title: "Day 10 Session 1: Project Presentations (Part 1)",
    order: 37,
    duration: "90 minutes",
    content: `# Final Project Showcase

## Presentation Format:

### Time: 5 minutes per student

### Structure:
1. **Problem** (30 sec)
   - What are you solving?
2. **Data** (1 min)
   - Dataset description
   - Key visualizations
3. **Model** (2 min)
   - Approach taken
   - Why this model?
   - Demo/results
4. **Results** (1 min)
   - Accuracy achieved
   - What worked/didn't work
5. **Impact** (30 sec)
   - Real-world applications
   - Ethical considerations

### Tips:
- Show your best visualizations
- Demo if possible!
- Be honest about challenges
- Explain what you learned

### Audience:
- Ask questions
- Give constructive feedback
- Take notes on interesting ideas

Remember: Everyone started as a beginner. Be proud of your work! 🎉
`,
    objectives: [
      "Present AI project professionally",
      "Demonstrate technical knowledge",
      "Answer questions confidently"
    ]
  },
  {
    title: "Day 10 Session 2: Project Presentations (Part 2)",
    order: 38,
    duration: "90 minutes",
    content: `# Presentations Continue

## Peer Feedback Form:

Rate each presentation (1-5):
- Technical Implementation
- Clarity of Explanation
- Visualization Quality
- Creativity
- Ethics Consideration

## Awards:

- 🏆 **Most Innovative**
- 📊 **Best Visualization**
- 🎯 **Highest Accuracy**
- ♻️ **Most Practical Application**
- 🤝 **Best Team Collaboration**
- 💡 **Most Creative Approach**

Winners announced at end of session!

## What We've Learned:
Look how far we've come in 10 days!
- AI fundamentals
- Machine learning types
- Python programming
- Data analysis (Pandas)
- Model building
- Neural networks
- Ethics & bias
- Real projects!
`,
    objectives: [
      "Complete all presentations",
      "Provide peer feedback",
      "Celebrate achievements"
    ]
  },
  {
    title: "Day 10 Session 3: Course Review & Certification",
    order: 39,
    duration: "45 minutes",
    content: `# Course Wrap-Up

## Journey Recap:

### Day 1: AI Foundations
What is AI, history, types, applications

### Day 2: Machine Learning Basics
ML pipeline, types of learning, data quality

### Day 3: Python & Ethics
Python fundamentals, AI ethics, NumPy

### Day 4: Teachable Machine
No-code AI, image/audio/pose classification

### Day 5: Transfer Learning
Advanced Teachable Machine, pose detection

### Day 6: Pandas
Data analysis, cleaning, visualization

### Day 7: ML Algorithms
Decision trees, scikit-learn, NLP, sentiment analysis

### Day 8: Neural Networks
Deep learning, TensorFlow, MNIST, guest speaker

### Day 9: Final Project
Hands-on AI application development

### Day 10: Presentations
Showcase and celebrate!

## Skills Acquired:
✅ AI/ML concepts
✅ Python programming
✅ Data analysis
✅ Model training
✅ Evaluation & testing
✅ Ethics & bias awareness
✅ Real project experience

## Certification Tiers:

### 🥇 AI Developer (Elite)
- 100% attendance (9-10 days)
- 85%+ final project score
- 85%+ average quiz score

### 🥈 AI Practitioner (Advanced)
- 85%+ attendance (8-9 days)
- 75%+ final project score
- 75%+ average quiz score

### 🥉 AI Literacy (Proficient)
- 80%+ attendance (8 days)
- 70%+ average quiz score
- Project submitted

All certificated issued within 48 hours!
`,
    objectives: [
      "Review complete curriculum",
      "Understand certification criteria",
      "Celebrate accomplishments"
    ]
  },
  {
    title: "Day 10 Session 4: Next Steps & Closing",
    order: 40,
    duration: "30 minutes",
    content: `# Your AI Journey Continues

## Keep Learning:

### Free Resources:
- **Coursera**: Andrew Ng's ML course
- **Fast.ai**: Practical deep learning
- **Kaggle**: Competitions & datasets
- **YouTube**: 3Blue1Brown, Two Minute Papers
- **Google Colab**: Free GPU for experimentation

### Practice Projects:
1. Improve your final project
2. Try Kaggle competitions
3. Contribute to open source
4. Build portfolio website
5. Write blog posts about what you learned

### Advanced Topics to Explore:
- Computer Vision
- Natural Language Processing
- Reinforcement Learning
- GANs (Generative AI)
- AI Ethics & Policy
- MLOps (deploying models)

## Career Paths:
- **Data Scientist**: $85k-$130k
- **ML Engineer**: $100k-$160k
- **AI Researcher**: $120k-$200k+
- **Robotics Engineer**: $90k-$140k

## Stay Connected:
- Join our alumni network
- LinkedIn group
- Discord community
- Monthly meetups

## Final Words:

**You are now part of the AI revolution!** 🚀

The skills you've learned will shape the future. Use them responsibly, ethically, and creatively.

**Thank you for an amazing 10 days!**

Questions? Comments? Feedback?

---

# 🎓 Congratulations Graduate! 🎉

*Certificate verification codes will be emailed within 48 hours.*
`,
    objectives: [
      "Identify next learning steps",
      "Understand career opportunities",
      "Feel empowered to continue AI journey"
    ]
  }
];

async function seedAICurriculum() {
  try {
    console.log('🌱 Starting AI Curriculum Seed...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find instructor (or use first admin/instructor)
    let instructor = await User.findOne({ role: 'instructor' });
    
    if (!instructor) {
      console.log('⚠️  No instructor found. Creating default instructor...');
      instructor = await User.create({
        firstName: 'Admin',
        lastName: 'Instructor',
        email: 'instructor@accn-hub.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5lEJq1w5wYqK2', // 'Password123!'
        role: 'instructor'
      });
      console.log('✅ Default instructor created\n');
    }

    // Check if AI course already exists and remove it
    const existingCourse = await Course.findOne({ title: aiCourseData.title });
    
    if (existingCourse) {
      console.log('⚠️  AI Certification course already exists. Removing old data...');
      // Delete all lessons for this course
      await Lesson.deleteMany({ course: existingCourse._id });
      // Delete the course
      await Course.findByIdAndDelete(existingCourse._id);
      console.log('✅ Old course and lessons removed.\n');
    }

    // Create the AI Certification Course
    console.log('📚 Creating AI Certification Course...');
    const course = await Course.create({
      ...aiCourseData,
      instructor: instructor._id
    });
    console.log(`✅ Course created: ${course.title}`);
    console.log(`   Course ID: ${course._id}\n`);

    // Create lessons
    console.log('📝 Creating lessons...\n');
    const createdLessons = [];

    for (const lessonData of aiLessons) {
      const lesson = await Lesson.create({
        ...lessonData,
        course: course._id
      });
      
      createdLessons.push(lesson._id);
      console.log(`   ✅ ${lesson.title}`);
    }

    // Update course with lesson references
    course.lessons = createdLessons;
    await course.save();
    
    console.log(`\n✅ Added ${createdLessons.length} lessons to course\n`);

    // Summary
    console.log('📊 Seed Summary:');
    console.log(`   Course: ${course.title}`);
    console.log(`   Instructor: ${instructor.firstName} ${instructor.lastName}`);
    console.log(`   Lessons: ${createdLessons.length} created`);
    console.log(`   Status: ${course.isPublished ? 'Published' : 'Draft'}`);
    console.log(`\n🎉 AI Curriculum seed completed successfully!`);
    console.log(`\n📖 Complete 10-Day Curriculum (${aiLessons.length} lessons):`)
    console.log(`   ✅ Day 1: AI Foundations (4 sessions)`);
    console.log(`   ✅ Day 2: Machine Learning Basics (4 sessions)`);
    console.log(`   ✅ Day 3: Python & AI Ethics (4 sessions)`);
    console.log(`   ✅ Day 4: Teachable Machine Image/Audio (4 sessions)`);
    console.log(`   ✅ Day 5: Pose Detection & Transfer Learning (4 sessions)`);
    console.log(`   ✅ Day 6: Pandas Data Analysis (4 sessions)`);
    console.log(`   ✅ Day 7: ML Algorithms & NLP (4 sessions)`);
    console.log(`   ✅ Day 8: Neural Networks & Deep Learning (4 sessions)`);
    console.log(`   ✅ Day 9: Final Project Development (4 sessions)`);
    console.log(`   ✅ Day 10: Presentations & Certification (4 sessions)`);
    console.log(`\n⏱️  Total: 30 hours of content (3 hours/day × 10 days)`);
    console.log(`🚀 Students can now enroll at: http://localhost:3000`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed Error:', error);
    process.exit(1);
  }
}

// Run seed
seedAICurriculum();
