require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

// Session 1: Introduction to AI & Machine Learning (3 hours)
const day1Session1 = {
  title: "Session 1: Introduction to AI & Machine Learning",
  order: 1,
  duration: "3 hours",
  content: `# Introduction to Artificial Intelligence & Machine Learning

## Session Overview (3 Hours)
This comprehensive introduction will take you from complete beginner to understanding the core concepts of AI and Machine Learning.

---

## Part 1: What is Artificial Intelligence? (45 minutes)

### Definition
**Artificial Intelligence (AI)** is the simulation of human intelligence by machines. These machines are programmed to think, learn, and solve problems like humans do.

### Real-World Examples You Use Every Day:
- **Siri/Alexa/Google Assistant**: Voice recognition and natural language processing
- **Netflix Recommendations**: "You might also like..." - AI analyzing your preferences
- **Face ID on iPhone**: Computer vision recognizing your face
- **Gmail's Smart Reply**: AI suggesting quick email responses
- **Google Maps**: Predicting traffic and suggesting fastest routes
- **Spam Filters**: AI detecting and blocking spam emails
- **Autocorrect**: Your phone predicting and fixing typos

### The Three Types of AI:

#### 1. Narrow AI (Artificial Narrow Intelligence - ANI)
- **What it is**: AI designed for ONE specific task
- **Examples**: 
  - Chess programs that can beat world champions but can't do anything else
  - Facial recognition systems
  - Language translation apps
  - Self-driving car systems
- **Status**: This is what we have TODAY

#### 2. General AI (Artificial General Intelligence - AGI)
- **What it is**: AI that can learn and perform ANY intellectual task a human can do
- **Examples**: 
  - C-3PO from Star Wars
  - JARVIS from Iron Man
- **Status**: This does NOT exist yet (scientists predict 20-50+ years away)

#### 3. Super AI (Artificial Super Intelligence - ASI)
- **What it is**: AI that surpasses human intelligence in ALL ways
- **Examples**: 
  - Ultron from Avengers
  - Skynet from Terminator
- **Status**: Theoretical - may never exist or could be 100+ years away

### 🎯 **Quick Activity** (10 minutes):
**AI Detective Challenge**: Look around your home/school. Can you find 5 devices or apps using AI? 
Write them down and identify what type of AI task they perform.

---

## Part 2: History of AI - From Dreams to Reality (30 minutes)

### Timeline of AI Development:

**1950s - The Birth of AI**
- 1950: Alan Turing creates the "Turing Test" - Can a machine fool humans into thinking it's human?
- 1956: The term "Artificial Intelligence" is coined at Dartmouth Conference
- Scientists believed we'd have human-level AI by 1970s (they were very optimistic!)

**1960s-1970s - The First AI Winter**
- Early excitement → disappointment
- Computers were too slow and expensive
- AI research funding was cut dramatically
- Key lesson: Technology needs to catch up with ideas

**1980s-1990s - Expert Systems & Chess**
- 1985: Neural networks make a comeback
- 1997: IBM's Deep Blue defeats world chess champion Garry Kasparov
- Internet era begins - more data available

**2000s - The AI Renaissance**
- 2006: Geoffrey Hinton's "deep learning" breakthrough
- More computing power (GPUs originally made for video games)
- Big Data explosion - billions of images, videos, text
- Cloud computing makes AI accessible

**2010s - AI Everywhere**
- 2011: IBM Watson wins Jeopardy!
- 2012: Google's neural network learns to recognize cats from YouTube
- 2016: AlphaGo defeats world Go champion
- 2018: AI can generate realistic fake images and voices
- AI assistants in everyone's pocket

**2020s - The AI Boom**
- 2022: ChatGPT launches - 100 million users in 2 months
- 2023: AI can generate art, write code, create videos
- 2024: AI in healthcare, education, transportation
- 2025 (Now): You're learning to build AI!

### Why AI is Possible NOW (But Wasn't Before):

1. **Computing Power**: Modern computers are 1 MILLION times faster than 1990s computers
2. **Data**: Internet provides billions of examples for AI to learn from
3. **Algorithms**: Smarter math (deep learning, neural networks)
4. **Money**: Tech companies investing billions in AI research
5. **Open Source**: Anyone can access cutting-edge AI tools for FREE

---

## Part 3: Machine Learning - How AI Actually Learns (60 minutes)

### What is Machine Learning?

**Traditional Programming**:
- Programmer writes rules
- Computer follows rules exactly
- Example: IF temperature > 80°F THEN turn on AC

**Machine Learning**:
- Computer looks at examples
- Computer finds patterns automatically
- Computer makes its own rules
- Example: Show AI 10,000 photos of cats → AI learns what cats look like

### Real-Life Analogy:
**Teaching a Child to Identify Animals**

Traditional Programming Way:
- "A cat has 4 legs, fur, pointy ears, whiskers, meows..."
- Try to list EVERY rule (impossible!)

Machine Learning Way:
- Show child 100 photos of cats and say "cat"
- Show 100 photos of dogs and say "dog"
- Child automatically learns the patterns
- Child can now identify cats vs dogs they've never seen before

### The Three Ways Machines Learn:

#### 1. Supervised Learning (Learning with a Teacher)
**How it works**:
- Give AI labeled examples
- AI learns patterns
- AI can predict labels for new data

**Example**: Email Spam Filter
- Training: Show AI 10,000 emails labeled "spam" or "not spam"
- Learning: AI finds patterns (spam has words like "FREE", "WINNER", weird links)
- Using: AI can now detect spam in new emails

**Other Examples**:
- Face recognition (photos labeled with names)
- Medical diagnosis (X-rays labeled with diseases)
- House price prediction (houses labeled with prices)

#### 2. Unsupervised Learning (Learning by Exploration)
**How it works**:
- Give AI unlabeled data
- AI finds hidden patterns on its own
- AI groups similar things together

**Example**: Customer Segmentation for Online Store
- AI analyzes shopping habits
- AI discovers groups: "Weekend shoppers", "Sale hunters", "Premium buyers"
- Store can now target each group differently

**Other Examples**:
- Music recommendation (finding songs similar to ones you like)
- Fraud detection (finding unusual patterns in credit cards)
- Gene analysis (grouping similar DNA patterns)

#### 3. Reinforcement Learning (Learning by Trial and Error)
**How it works**:
- AI tries actions in an environment
- Good actions → Rewards
- Bad actions → Penalties
- AI learns to maximize rewards

**Example**: Teaching AI to Play Video Games
- AI tries random moves
- Winning → +10 points (reward)
- Losing → -10 points (penalty)
- AI plays millions of games
- AI learns winning strategies

**Other Examples**:
- Self-driving cars (reward: safe driving, penalty: accidents)
- Robot learning to walk (reward: moving forward, penalty: falling)
- AlphaGo (board game AI)

### 🎮 **Hands-On Activity** (20 minutes):
**Quick Draw with Google**
- Visit: https://quickdraw.withgoogle.com/
- Play the game - draw objects in under 20 seconds
- Watch AI guess what you're drawing in REAL-TIME
- Reflection: This is supervised learning! AI learned from millions of drawings.

---

## Part 4: AI in Action - Real Industry Applications (30 minutes)

### Healthcare & Medicine
**Disease Detection**:
- AI detects cancer in X-rays more accurately than doctors
- Analyzes skin photos to identify melanoma
- Predicts heart attacks before they happen

**Drug Discovery**:
- AI designs new medicines in weeks (used to take years)
- COVID-19 vaccine development accelerated by AI

**Example**: DeepMind's AlphaFold predicted protein structures - solving a 50-year-old biology problem!

### Transportation
**Self-Driving Cars**:
- Tesla Autopilot
- Waymo taxis (already operating in some cities)
- Uses: cameras, radar, lidar, GPS, AI algorithms

**Challenges**:
- How to handle unexpected situations?
- Ethics: Who does car save in unavoidable crash?
- Need 99.9999% accuracy (humans are 99% accurate)

### Entertainment & Creativity
**Music & Art**:
- AI composes original music
- AI generates artwork (DALL-E, Midjourney)
- AI creates movie scripts

**Gaming**:
- Intelligent NPCs (non-player characters)
- Procedurally generated worlds
- AI opponents that adapt to your playing style

### Education
**Personalized Learning**:
- Khan Academy's AI tutor
- Duolingo adapts to your learning speed
- AI detects when you're struggling and provides extra help

**THIS COURSE**:
- You're taking an AI-powered certification program!
- Your progress is tracked intelligently
- Adaptive assessments

### Business & Finance
**Stock Market**:
- 70% of trades are now done by AI algorithms
- AI predicts market trends
- Fraud detection in banking

**Customer Service**:
- Chatbots handle basic questions (90% of inquiries)
- AI routes complex issues to humans
- Available 24/7

---

## Part 5: Hands-On Demo - See AI in Action (15 minutes)

### Try These FREE AI Tools Right Now:

1. **Teachable Machine** (Google)
   - URL: https://teachablemachine.withgoogle.com/
   - Train AI using your webcam in 2 minutes!
   - No coding required

2. **AI Experiments** (Google)
   - URL: https://experiments.withgoogle.com/collection/ai
   - Play with 50+ AI demos

3. **ChatGPT**
   - URL: https://chat.openai.com/
   - Talk to AI - ask it anything!

### Your Challenge:
Pick ONE tool and spend 10 minutes exploring. Take a screenshot and share what you discovered!

---

## Part 6: Ethics & Concerns (Break Discussion - 20 minutes)

### Important Questions We Must Consider:

**Bias & Fairness**:
- If AI learns from biased data, it becomes biased
- Example: Facial recognition works worse for dark skin (because training data had mostly light-skinned faces)
- Example: Amazon's hiring AI was biased against women (learned from past male-dominated hiring)

**Privacy**:
- AI needs data to learn
- Who owns your data?
- Should companies be allowed to train AI on your photos/messages?

**Job Displacement**:
- AI will replace some jobs (drivers, cashiers, data entry)
- But AI will CREATE new jobs (AI trainers, ethics reviewers, prompt engineers)
- Human creativity and empathy still irreplaceable

**Deepfakes & Misinformation**:
- AI can create fake videos/audio that look real
- How do we know what's true anymore?
- Need for AI detection tools

**AI Safety**:
- What if AI systems malfunction?
- Self-driving car accidents
- Medical AI making wrong diagnoses
- Need for human oversight

### Our Responsibility as Future AI Developers:
✅ Build AI that's fair and unbiased
✅ Protect user privacy
✅ Be transparent about how AI works
✅ Always have human oversight
✅ Use AI for good, not harm

---

## Summary & Key Takeaways (10 minutes)

### What We Learned Today:

1. **AI Definition**: Machines that can think, learn, and solve problems
2. **Three Types**: Narrow AI (now), General AI (future), Super AI (maybe never)
3. **History**: From 1950s dreams to 2025 reality
4. **Machine Learning**: How AI actually learns from data
   - Supervised (with labels)
   - Unsupervised (find patterns)
   - Reinforcement (trial & error)
5. **Applications**: AI is everywhere - healthcare, transportation, entertainment, education
6. **Ethics**: We must build AI responsibly

### Prepare for Next Session:
- **Day 1 Session 2**: Deep Dive into Machine Learning Pipeline
- Come ready with questions!
- Install Anaconda (Python) if you haven't already
- Bring laptop/tablet

---

## Additional Resources (Optional Reading)

📚 **Videos to Watch**:
- "But what is a Neural Network?" by 3Blue1Brown (20 min)
- "The Wonderful and Terrifying Implications of Computers That Can Learn" TED Talk (12 min)

📚 **Articles**:
- "A Beginner's Guide to AI" - Google
- "Machine Learning for Kids" - MIT Media Lab

📚 **Books** (if you want to go deeper):
- "AI Superpowers" by Kai-Fu Lee
- "Life 3.0" by Max Tegmark

---

## 🎯 Homework Challenge (Optional):

1. **Find 3 AI applications** in your daily life that we didn't discuss today
2. **Try Teachable Machine** and create your own image classifier
3. **Interview an adult**: "How has AI changed your job in the last 5 years?"
4. **Write 3 questions** you have about AI to discuss next session

---

**Congratulations! You've completed Day 1, Session 1! 🎉**

You now understand:
- What AI really is (and isn't)
- How we got from 1950s computers to 2025 AI everywhere
- The three ways machines learn
- Real-world applications across industries
- Why ethics and responsibility matter

**Next up**: Day 1 Session 2 - The Machine Learning Pipeline (hands-on coding begins!)`,
  
  videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
  
  objectives: [
    "Define artificial intelligence and distinguish between Narrow, General, and Super AI",
    "Explain the historical development of AI from 1950s to present day",
    "Understand the three types of machine learning: supervised, unsupervised, and reinforcement learning",
    "Identify real-world AI applications across different industries",
    "Recognize ethical considerations in AI development and deployment"
  ],
  
  resources: [
    {
      title: "Neural Networks Explained - 3Blue1Brown",
      url: "https://www.youtube.com/watch?v=aircAruvnKk",
      type: "video"
    },
    {
      title: "Quick Draw with Google AI",
      url: "https://quickdraw.withgoogle.com/",
      type: "link"
    },
    {
      title: "Teachable Machine by Google",
      url: "https://teachablemachine.withgoogle.com/",
      type: "link"
    },
    {
      title: "AI Experiments by Google",
      url: "https://experiments.withgoogle.com/collection/ai",
      type: "link"
    },
    {
      title: "Elements of AI - Free Online Course",
      url: "https://www.elementsofai.com/",
      type: "document"
    }
  ],
  
  activities: [
    {
      title: "AI Detective Challenge",
      description: "Identify 5 AI-powered devices or applications in your environment. Document what type of AI task each one performs (classification, prediction, recommendation, etc.)",
      type: "text",
      required: true
    },
    {
      title: "Quick Draw Game",
      description: "Play Google's Quick Draw game for 10 minutes. Observe and document how the AI recognizes your drawings in real-time. What did it get right? What did it get wrong?",
      type: "interactive",
      required: true
    },
    {
      title: "Teachable Machine Exploration",
      description: "Use Google's Teachable Machine to train a simple image classifier using your webcam. Create 3 classes and train the model. Take a screenshot of your working model.",
      type: "interactive",
      required: false
    }
  ],
  
  quiz: [
    {
      question: "Which type of AI currently exists and powers most of today's applications like Siri, Netflix recommendations, and self-driving cars?",
      options: [
        "Artificial General Intelligence (AGI)",
        "Artificial Narrow Intelligence (ANI)",
        "Artificial Super Intelligence (ASI)",
        "Strong AI"
      ],
      correctAnswer: 1,
      explanation: "Narrow AI (ANI) is designed for specific tasks and is what we have today. General AI and Super AI don't exist yet.",
      points: 10
    },
    {
      question: "In supervised learning, what does the AI need in order to learn?",
      options: [
        "Only the input data without any labels",
        "Labeled examples showing both inputs and correct outputs",
        "A game environment with rewards and penalties",
        "Random data to explore on its own"
      ],
      correctAnswer: 1,
      explanation: "Supervised learning requires labeled training data - examples with both inputs (like images) and outputs (like labels or categories). This is like learning with a teacher who provides the correct answers.",
      points: 15
    },
    {
      question: "Which type of machine learning is used when AI plays millions of games to learn winning strategies through trial and error?",
      options: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Reinforcement Learning",
        "Transfer Learning"
      ],
      correctAnswer: 2,
      explanation: "Reinforcement Learning works through trial and error with rewards for good actions and penalties for bad ones. This is how AlphaGo and game-playing AIs learn.",
      points: 15
    },
    {
      question: "Why is AI possible NOW but wasn't successful in the 1970s? (Select the MAIN reason)",
      options: [
        "Scientists in the 1970s weren't smart enough",
        "AI algorithms were completely different back then",
        "Modern computers are vastly more powerful and we have access to massive amounts of data",
        "Only tech companies can afford AI research now"
      ],
      correctAnswer: 2,
      explanation: "The main breakthrough is the combination of powerful modern computers (1 million times faster), massive data from the internet, and improved algorithms like deep learning. The ideas existed in the 1970s but the technology couldn't support them.",
      points: 10
    },
    {
      question: "What is a major ethical concern when AI learns from biased historical data?",
      options: [
        "The AI will run too slowly",
        "The AI will perpetuate and amplify existing biases",
        "The AI will cost more money to train",
        "The AI won't be able to make any predictions"
      ],
      correctAnswer: 1,
      explanation: "AI learns patterns from data. If training data contains human biases (like racial or gender bias), the AI will learn and potentially amplify those biases, leading to unfair outcomes.",
      points: 10
    }
  ],
  
  quizSettings: {
    maxAttempts: 3,
    passingScore: 70,
    showCorrectAnswers: true,
    shuffleQuestions: false
  },
  
  requiredCompletion: {
    readContent: true,
    watchVideo: false,
    watchPercentage: 50,
    completeActivities: true,
    passQuiz: true
  }
};

async function updateDay1Session1() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find the AI course
    const course = await Course.findOne({ title: 'AI Fundamentals Certification' });
    if (!course) {
      console.log('❌ AI Course not found');
      process.exit(1);
    }

    console.log('📚 Found course:', course.title);
    console.log('   Course ID:', course._id);

    // Find and update Day 1 Session 1
    const existingLesson = await Lesson.findOne({
      course: course._id,
      order: 1
    });

    if (existingLesson) {
      console.log('\n🔄 Updating existing Day 1 Session 1...');
      
      await Lesson.findByIdAndUpdate(existingLesson._id, {
        ...day1Session1,
        course: course._id
      });
      
      console.log('✅ Day 1 Session 1 updated successfully!');
      console.log(`   Title: ${day1Session1.title}`);
      console.log(`   Duration: ${day1Session1.duration}`);
      console.log(`   Objectives: ${day1Session1.objectives.length}`);
      console.log(`   Resources: ${day1Session1.resources.length}`);
      console.log(`   Activities: ${day1Session1.activities.length}`);
      console.log(`   Quiz Questions: ${day1Session1.quiz.length}`);
    } else {
      console.log('❌ Day 1 Session 1 not found');
    }

    console.log('\n✨ Update complete!');
    console.log('\n📖 Students can now access the improved 3-hour lesson with:');
    console.log('   - Comprehensive content');
    console.log('   - Working YouTube video embed');
    console.log('   - Hands-on activities');
    console.log('   - Interactive quiz');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateDay1Session1();
