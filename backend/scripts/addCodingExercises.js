require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');

async function addCodingExercisesToSession1() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find Session 1
    const lesson = await Lesson.findOne({ title: /Session 1/i });
    
    if (!lesson) {
      console.log('❌ Session 1 not found!');
      process.exit(1);
    }

    console.log(`📝 Adding coding exercises to: ${lesson.title}\n`);

    // Add coding exercises
    lesson.codingExercises = [
      {
        title: 'Exercise 1: AI Classification Function',
        description: 'Create a simple function that determines if a system qualifies as "intelligent" based on three criteria: ability to learn, ability to adapt, and ability to solve problems.',
        difficulty: 'beginner',
        starterCode: `# Exercise 1: Create an AI Intelligence Classifier
# A system is considered intelligent if it can learn, adapt, AND solve problems

def is_ai_intelligent(can_learn, can_adapt, can_solve_problems):
    """
    Determines if a system qualifies as artificially intelligent.
    
    Parameters:
    - can_learn (bool): Can the system learn from data?
    - can_adapt (bool): Can the system adapt to new situations?
    - can_solve_problems (bool): Can the system solve problems?
    
    Returns:
    - bool: True if intelligent, False otherwise
    """
    # YOUR CODE HERE
    pass

# Test your function (Do not modify)
print("Test 1:", is_ai_intelligent(True, True, True))   # Should print: True
print("Test 2:", is_ai_intelligent(False, False, False)) # Should print: False
print("Test 3:", is_ai_intelligent(True, False, True))  # Should print: False
print("Test 4:", is_ai_intelligent(True, True, False))  # Should print: False`,
        solution: `def is_ai_intelligent(can_learn, can_adapt, can_solve_problems):
    """
    Determines if a system qualifies as artificially intelligent.
    All three capabilities are required for true AI.
    """
    return can_learn and can_adapt and can_solve_problems`,
        testCases: [
          {
            input: 'is_ai_intelligent(True, True, True)',
            expectedOutput: 'True',
            description: 'System with all AI capabilities should return True'
          },
          {
            input: 'is_ai_intelligent(False, False, False)',
            expectedOutput: 'False',
            description: 'System with no AI capabilities should return False'
          },
          {
            input: 'is_ai_intelligent(True, False, True)',
            expectedOutput: 'False',
            description: 'System missing one capability should return False'
          }
        ],
        hints: [
          'Think about what logical operator combines multiple boolean conditions',
          'All three conditions must be True for the system to be intelligent',
          'The "and" operator returns True only if all conditions are True'
        ],
        colabNotebookUrl: 'https://colab.research.google.com/drive/1example-session1-exercise1',
        points: 20
      },
      {
        title: 'Exercise 2: AI Type Classifier',
        description: 'Build a function that classifies an AI system as Narrow, General, or Super based on its characteristics.',
        difficulty: 'beginner',
        starterCode: `# Exercise 2: Classify AI Types
# Narrow AI: Performs one specific task
# General AI: Can perform any intellectual task (not yet achieved)
# Super AI: Surpasses human intelligence (theoretical)

def classify_ai_type(num_tasks, matches_human_level, exceeds_human_intelligence):
    """
    Classifies an AI system type.
    
    Parameters:
    - num_tasks (int): Number of different tasks the AI can perform
    - matches_human_level (bool): Does it match human-level intelligence?
    - exceeds_human_intelligence (bool): Does it exceed human intelligence?
    
    Returns:
    - str: 'Narrow AI', 'General AI', or 'Super AI'
    """
    # YOUR CODE HERE
    pass

# Test cases
print(classify_ai_type(1, False, False))      # Should return: 'Narrow AI'
print(classify_ai_type(100, True, False))     # Should return: 'General AI'
print(classify_ai_type(1000, True, True))     # Should return: 'Super AI'`,
        solution: `def classify_ai_type(num_tasks, matches_human_level, exceeds_human_intelligence):
    """
    Classifies an AI system based on its capabilities.
    """
    if exceeds_human_intelligence:
        return 'Super AI'
    elif matches_human_level and num_tasks > 50:
        return 'General AI'
    else:
        return 'Narrow AI'`,
        testCases: [
          {
            input: 'classify_ai_type(1, False, False)',
            expectedOutput: 'Narrow AI',
            description: 'Single-task AI without human-level intelligence'
          },
          {
            input: 'classify_ai_type(100, True, False)',
            expectedOutput: 'General AI',
            description: 'Multi-task AI at human level'
          },
          {
            input: 'classify_ai_type(1000, True, True)',
            expectedOutput: 'Super AI',
            description: 'AI exceeding human intelligence'
          }
        ],
        hints: [
          'Check for Super AI first (highest level)',
          'General AI requires both human-level intelligence AND many tasks',
          'Everything else is Narrow AI (our current technology)'
        ],
        colabNotebookUrl: 'https://colab.research.google.com/drive/1example-session1-exercise2',
        points: 25
      },
      {
        title: 'Exercise 3: AI Application Counter',
        description: 'Write a program that counts how many AI applications you use in a day from a given list.',
        difficulty: 'beginner',
        starterCode: `# Exercise 3: Count AI Applications in Daily Life
# Help users discover how much AI they already use!

def count_ai_usage(applications_used):
    """
    Counts and categorizes AI applications used daily.
    
    Parameters:
    - applications_used (list): List of application names
    
    Returns:
    - dict: Count by category and total
    """
    # AI applications database
    ai_apps = {
        'voice_assistant': ['Siri', 'Alexa', 'Google Assistant'],
        'recommendation': ['Netflix', 'Spotify', 'YouTube', 'Amazon'],
        'communication': ['Gmail Smart Reply', 'Autocorrect', 'Grammarly'],
        'navigation': ['Google Maps', 'Waze'],
        'security': ['Face ID', 'Spam Filter']
    }
    
    # Initialize counters
    count_by_category = {
        'voice_assistant': 0,
        'recommendation': 0,
        'communication': 0,
        'navigation': 0,
        'security': 0
    }
    
    # YOUR CODE HERE: Count apps by category
    
    # Calculate total
    total = sum(count_by_category.values())
    
    return {
        'by_category': count_by_category,
        'total': total
    }

# Test your function
daily_apps = ['Siri', 'Netflix', 'Gmail Smart Reply', 'Google Maps', 'Face ID']
result = count_ai_usage(daily_apps)
print(f"Total AI apps used: {result['total']}")
print(f"Breakdown: {result['by_category']}")`,
        solution: `def count_ai_usage(applications_used):
    ai_apps = {
        'voice_assistant': ['Siri', 'Alexa', 'Google Assistant'],
        'recommendation': ['Netflix', 'Spotify', 'YouTube', 'Amazon'],
        'communication': ['Gmail Smart Reply', 'Autocorrect', 'Grammarly'],
        'navigation': ['Google Maps', 'Waze'],
        'security': ['Face ID', 'Spam Filter']
    }
    
    count_by_category = {
        'voice_assistant': 0,
        'recommendation': 0,
        'communication': 0,
        'navigation': 0,
        'security': 0
    }
    
    # Count each app by category
    for app in applications_used:
        for category, apps_list in ai_apps.items():
            if app in apps_list:
                count_by_category[category] += 1
                break
    
    total = sum(count_by_category.values())
    
    return {
        'by_category': count_by_category,
        'total': total
    }`,
        testCases: [
          {
            input: "count_ai_usage(['Siri', 'Netflix'])",
            expectedOutput: "{'by_category': {'voice_assistant': 1, 'recommendation': 1, ...}, 'total': 2}",
            description: 'Should count one voice assistant and one recommendation app'
          }
        ],
        hints: [
          'Loop through each application in the applications_used list',
          'For each app, check which category it belongs to',
          'Increment the counter for that category',
          'Use nested loops: outer loop for apps, inner loop for categories'
        ],
        colabNotebookUrl: 'https://colab.research.google.com/drive/1example-session1-exercise3',
        points: 30
      }
    ];

    // Add interactive tools
    lesson.interactiveTools = [
      {
        name: 'teachable_machine',
        url: 'https://teachablemachine.withgoogle.com/',
        description: 'Train your own AI model to recognize images, sounds, or poses - no coding required!',
        instructions: `1. Go to Teachable Machine website
2. Click "Get Started"
3. Choose "Image Project"
4. Create 2 classes (e.g., "Happy" and "Sad" faces)
5. Use your webcam to capture 20+ examples of each
6. Click "Train Model"
7. Test your model with new images!
8. Reflect: How accurate is your model? What makes it better?`
      },
      {
        name: 'tensorflow_playground',
        url: 'https://playground.tensorflow.org/',
        description: 'Visualize how neural networks learn! Adjust parameters and see the results in real-time.',
        instructions: `1. Open TensorFlow Playground
2. Keep the default settings (circle dataset)
3. Click the Play button (▶) to start training
4. Watch the neural network learn to separate the colors!
5. Experiment: Add more layers, change neurons, try different datasets
6. Challenge: Can you classify the spiral dataset?`
      }
    ];

    // Enhance activities with more details
    lesson.activities = []

   lesson.activities.push({
      title: 'AI Detective Challenge',
      description: 'Identify 10 AI systems you\'ve used today. For each one, determine: (1) What type of AI is it? (2) What data does it learn from? (3) How does it help you?',
      type: 'individual',
      duration: '15 minutes',
      required: true
    });

    lesson.activities.push({
      title: 'Build Your First AI Model',
      description: 'Use Google Teachable Machine to create an image classifier. Train it to recognize different objects or emotions. Share your results with classmates!',
      type: 'hands-on',
      duration: '30 minutes',
      required: true
    });

    await lesson.save();

    console.log('✅ Successfully added:');
    console.log(`   - ${lesson.codingExercises.length} coding exercises`);
    console.log(`   - ${lesson.interactiveTools.length} interactive tools`);
    console.log(`   - ${lesson.activities.length} activities`);
    console.log(`\nTotal points available: ${lesson.codingExercises.reduce((sum, ex) => sum + ex.points, 0)}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addCodingExercisesToSession1();
