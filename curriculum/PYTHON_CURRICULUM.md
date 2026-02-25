# Introduction to Python
## A 6-Week Coding Course for High School Students
### ACCN Learning Hub | Umoja Robotics 7712

**Total Duration:** 6 Weeks | **Sessions per Week:** 5 | **Session Length:** 60 minutes
**Skill Level:** Beginner | **Prerequisites:** None | **Platform:** Any computer with Python 3 installed

---

> "Code is the closest thing we have to a superpower." — Drew Houston
> Built by ACCN for students who are ready to shape the future.

---

# WEEK 1: Python Fundamentals

## Session 1.1: Python Setup + Your First Program
**Duration:** 60 minutes | **Format:** Setup Lab + Demo

### Introduction

Welcome to Python! Before we write any code, we need to set up a place to write it. Think of this like getting your workbench ready before building a robot — tools first, then the fun part.

The great news? You do NOT need to install anything to get started. We will use **Google Colab**, a free coding environment that runs right in your browser. No downloads, no setup headaches. Just open it and go.

**Learning Objectives:**
- Set up Google Colab and run your first Python cell
- Understand what Python is and why it is used everywhere
- Run your first Python program: `print("Hello, world!")`
- Know the three ways to run Python (Colab, Jupyter, local install)

**Why it matters for ACCN:** Every coder needs a workspace. Setting yours up is your first act as a Python developer. Katherine Johnson didn't wait for permission to be a mathematician — and you don't need expensive software to be a programmer.

### Core Concepts

#### Option 1: Google Colab (Recommended — Start Here!)
Google Colab is a free, cloud-based Python environment. No installation needed. It runs in your Google Chrome or any browser.

**How to open Colab:**
1. Go to **colab.research.google.com** (sign in with your Google account)
2. Click **"New Notebook"**
3. You will see a cell with `[ ]` on the left — that is where you type code
4. Type your code in the cell, then press **Shift + Enter** to run it

```python
# Your very first Python cell in Colab!
print("Hello, world!")
print("I am learning Python at ACCN Learning Hub.")
print("Umoja Robotics 7712 — we build, we code, we lead.")
```

**Colab tips for beginners:**
- **Shift + Enter** — run the current cell and move to the next
- **Ctrl + Enter** — run the current cell and stay on it
- Click **"+ Code"** to add a new code cell
- Your notebook saves automatically to Google Drive
- You can share your notebook with a link (like sharing a Google Doc)

#### Option 2: Jupyter Notebook (Local — More Control)
Jupyter Notebook runs on your computer. Great if you don't always have internet.

**How to install Jupyter:**
```bash
# Step 1: Install Python from python.org (download Python 3.11 or newer)
# Step 2: Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux)
# Step 3: Install Jupyter with pip
pip install jupyter notebook

# Step 4: Start Jupyter
jupyter notebook
```

This opens Jupyter in your browser automatically. Click **New → Python 3** to create a notebook. It works exactly like Colab — cells with Shift + Enter.

#### Option 3: Local Python + VS Code (For Advanced Users)
If you want to write `.py` script files:
1. Download Python 3 from **python.org** → install it
2. Download VS Code from **code.visualstudio.com** → install it
3. Install the Python extension inside VS Code (search "Python" in Extensions)
4. Create a file called `hello.py`, write your code, and press the Run button

**Check if Python is installed correctly:**
```bash
python --version
# or
python3 --version
# Should output: Python 3.11.x (or similar)
```

#### What is Python?
Python is a high-level, general-purpose programming language created by Guido van Rossum in 1991. "High-level" means it reads almost like plain English — you don't need to speak computer to write it.

```python
# Python reads like sentences
name = "Aaliyah"
age = 17
print(name, "is", age, "years old and learning Python!")
```

#### Where Python Is Used
- **NASA & SpaceX** — flight control and data analysis
- **Instagram & YouTube** — backend servers handling billions of requests
- **FRC Robotics** — robot code via RobotPy
- **Data Science** — analyzing patterns in data (with NumPy and Pandas!)
- **AI & Machine Learning** — the backbone of modern artificial intelligence

Python is the #1 most popular programming language in the world. If you learn one language, make it Python.

#### Installing Packages with pip
Later in this course we will use powerful Python libraries. Here is how to install them:

```bash
# pip is Python's package manager — it comes installed with Python
pip install numpy       # for math and arrays
pip install pandas      # for data tables
pip install matplotlib  # for charts and graphs

# In Colab, you can also install packages using !
# (the ! means "run this as a terminal command")
!pip install some-package
```

In Colab, most popular packages (NumPy, Pandas, Matplotlib) are already installed. You can use them immediately with `import`.

### Video Lessons

**Video 1 — Getting Started with Google Colab (Nicholas Renotte)**
Google Colab is a free, browser-based Python environment that requires zero installation. This tutorial walks you through creating your first notebook, writing and running code cells, and saving your work to Google Drive. By the end you will have a working coding environment you can use from any computer.
https://www.youtube.com/watch?v=RLYoEyIHL6A

**Video 2 — Python for Beginners — Full Course (freeCodeCamp)**
This comprehensive beginner course is the most-watched Python tutorial on YouTube, covering everything from print statements to object-oriented programming. Start with the first 30 minutes to get comfortable with variables, print, and input. Return to it throughout the course whenever you want a second explanation of any concept.
https://www.youtube.com/watch?v=rfscVS0vtbw

**Video 3 — Jupyter Notebook Tutorial for Beginners (Aakash N S)**
Jupyter Notebooks let you write and run Python code alongside notes and charts all in one document, making them perfect for data science and learning. This video covers installing Jupyter, creating notebooks, running cells, and organizing your work into readable sections. If you want to run Python locally without Colab, Jupyter is the tool to learn first.
https://www.youtube.com/watch?v=HW29067qVWk
### Practice Exercises

**Exercise 1 — Open Colab and Say Hello**
Go to colab.research.google.com. Create a new notebook. In the first cell, write a program that:
- Prints your name
- Prints your school
- Prints one thing you want to build with code

Run the cell with Shift + Enter. Take a screenshot of your output.

**Exercise 2 — Your Identity Card**
In a new Colab cell, print a 5-line "identity card" about yourself.

```python
# Fill in your details!
print("Name: [Your Name]")
print("School: [Your School]")
print("Favorite Subject: [Subject]")
print("Goal: [One thing you want to accomplish this year]")
print("Superpower I want to build: [Something cool you want to code]")
```

**Exercise 3 — The ACCN Calculator**
Colab doubles as a calculator. In a new cell, use Python to calculate:
- `100 * 7712` (team number times 100)
- `2026 - 1619` (years since... look it up!)
- `"ACCN" * 5`

Write down what each result means to you.

**Exercise 4 — Install Check**
If you want to try local Python too:
- Download Python from python.org
- Open your terminal and run `python --version`
- Run `pip install numpy pandas matplotlib`
- If it works, you are ready for Week 6!

**Exercise 5 — Share Your Notebook**
In Colab, click the **Share** button (top right). Set sharing to "Anyone with the link can view." Copy the link and share it with your instructor — just like sharing a Google Doc.

### Knowledge Check

**1.** What is the fastest way to start coding Python with zero installation?
- A) Download Python from python.org
- B) Use Google Colab in your browser
- C) Install VS Code first
- D) Use Notepad and run from the command line

**Answer:** B

**2.** In Google Colab, what keyboard shortcut runs the current code cell?
- A) Ctrl + R
- B) F5
- C) Shift + Enter
- D) Alt + Enter

**Answer:** C

**3.** What command checks if Python is installed on your computer?
- A) `python --check`
- B) `python --version`
- C) `pip --install`
- D) `python --test`

**Answer:** B

**4.** What is `pip` used for?
- A) Running Python scripts
- B) Opening Jupyter Notebook
- C) Installing Python packages and libraries
- D) Checking for Python errors

**Answer:** C

**5.** Which command installs NumPy using pip?
- A) `install numpy`
- B) `python get numpy`
- C) `pip install numpy`
- D) `npm install numpy`

**Answer:** C

**6.** What does `print("Hello")` do?
- A) Sends "Hello" to a printer
- B) Displays "Hello" on the screen
- C) Stores "Hello" in a variable
- D) Asks the user to type "Hello"

**Answer:** B

**7.** Where does Google Colab save your notebooks?
- A) On a USB drive
- B) On your computer's hard drive
- C) In your Google Drive
- D) In a local Jupyter folder

**Answer:** C

**8.** What file extension do Python script files use?
- A) `.java`
- B) `.txt`
- C) `.py`
- D) `.ipynb`

**Answer:** C

**9.** In which year was Python first released?
- A) 1975
- B) 1991
- C) 2001
- D) 2010

**Answer:** B

**10.** Which of these Python libraries is used for data analysis with tables?
- A) Matplotlib
- B) NumPy
- C) Pandas
- D) RobotPy

**Answer:** C

### Reflections

1. You just set up your Python workspace and ran your first program. What was the hardest part? What surprised you about how easy (or hard) it was?

2. We have three setup options: Google Colab, Jupyter Notebook, and local Python. Which one would YOU use for this course, and why?

3. Katherine Johnson did not wait for fancy equipment to become the best mathematician at NASA. She used what was available and outperformed everyone. How does that apply to you and your coding journey?

4. By the end of this course, you will be able to analyze data, build charts, and create programs. What real problem in your community would you want to solve with those skills?

### Summary

- **Google Colab** is the fastest way to start coding Python — free, browser-based, no install required
- **Jupyter Notebook** is a great local alternative for when you don't have internet access
- **pip** is Python's package manager — use it to install libraries like NumPy, Pandas, and Matplotlib
- Python is a beginner-friendly, powerful language used at NASA, Google, FRC robotics, and across data science and AI
- Your Colab notebook saves to Google Drive and can be shared like a Google Doc — this is how real data scientists share their work

---

## Session 1.2: Variables and Data Types
**Duration:** 60 minutes | **Format:** Lecture + Hands-On Coding

### Introduction

Every program stores information. A variable is like a labeled box — you put something in it and refer to it by name later. Python has several types of data: text, numbers, true/false values, and more.

**Learning Objectives:**
- Create and name variables using Python conventions
- Identify the four basic data types: `str`, `int`, `float`, `bool`
- Use `type()` to check a variable's data type
- Convert between data types using casting

**Why it matters:** Variables are the foundation of every program. Whether you are tracking basketball stats, storing a student's name, or counting robot sensor readings, you need variables.

### Core Concepts

#### Creating Variables
A variable is created the moment you assign a value to it using `=`.

```python
# String (text)
player_name = "LeBron James"
team = "Umoja Robotics 7712"

# Integer (whole number)
points_scored = 38
team_number = 7712

# Float (decimal number)
height_meters = 2.06
gpa = 3.85

# Boolean (True or False)
is_captain = True
has_completed = False

print(player_name, "scored", points_scored, "points")
print("Team:", team)
print("Captain?", is_captain)
```

#### The Four Main Data Types

| Type | Example | Description |
|------|---------|-------------|
| `str` | `"Marcus"` | Text, always in quotes |
| `int` | `42` | Whole numbers |
| `float` | `3.14` | Decimal numbers |
| `bool` | `True` / `False` | True or False only |

```python
# Checking data types
name = "Aaliyah"
age = 16
gpa = 3.9
honor_roll = True

print(type(name))      # <class 'str'>
print(type(age))       # <class 'int'>
print(type(gpa))       # <class 'float'>
print(type(honor_roll))# <class 'bool'>
```

#### Naming Rules
- Use lowercase with underscores: `first_name`, `total_score`
- Cannot start with a number: `2fast` is invalid
- Cannot use spaces or special characters (except `_`)
- Names are case-sensitive: `Name` and `name` are different

```python
# Good variable names
student_name = "Destiny"
track_time_seconds = 11.3
scholarship_deadline = "March 15"

# Bad (will cause errors)
# 2nd_place = "Marcus"  # starts with number
# first-name = "Brianna"  # hyphen not allowed
```

#### Type Casting — Converting Between Types

```python
# input() always returns a string
age_input = input("Enter your age: ")
print(type(age_input))  # str

# Convert to int to do math
age = int(age_input)
birth_year = 2026 - age
print("You were born in", birth_year)

# Other conversions
price = 9.99
print(int(price))    # 9 (truncates decimal)
print(str(42))       # "42" (number to text)
print(float("3.5"))  # 3.5 (text to float)
```

#### f-Strings — Clean String Formatting

```python
name = "Jaylen"
grade = 11
gpa = 3.7

# Old way (messy)
print("Name: " + name + ", Grade: " + str(grade))

# f-string way (clean and modern)
print(f"Name: {name}, Grade: {grade}, GPA: {gpa}")
print(f"{name} is in grade {grade} with a {gpa} GPA.")
```

### Video Lessons

**Video 1 — Python Variables and Data Types (Corey Schafer)**
Corey Schafer is one of the best Python educators on YouTube, and this video covers variables, naming conventions, and the four basic data types with clear, practical examples. You will see exactly how Python stores strings, integers, floats, and booleans, and why getting the type right matters. Watch how he demonstrates type checking with the `type()` function.
https://www.youtube.com/watch?v=YYXdXT2l-Gg

**Video 2 — f-Strings in Python — How and Why (Tech With Tim)**
f-strings are the modern, readable way to build strings in Python, and this tutorial covers them thoroughly with side-by-side comparisons to older formatting methods. Tim shows real examples of formatting numbers, aligning text, and embedding expressions inside strings. After this video, you will never need to use `+` to concatenate strings again.
https://www.youtube.com/watch?v=nghuHvKLhJA

**Video 3 — Type Conversion in Python (CS Dojo)**
This video explains why Python cannot automatically add an integer to a string, and how to convert between types using `int()`, `float()`, `str()`, and `bool()`. You will see common real-world examples where type conversion is essential, like reading numbers from user input. Pay attention to the error messages shown — they are clues you will see often.
https://www.youtube.com/watch?v=khKv-8q7YmY
### Practice Exercises

**Exercise 1 — Student Profile**
Create variables for: your name, age, grade, GPA, and favorite subject. Print a formatted profile using f-strings.

```python
# Starter code
name = "your name here"
age = 0
grade = 0
gpa = 0.0
favorite_subject = "your subject"
print(f"--- Student Profile ---")
# Complete the rest
```

**Exercise 2 — BPM Calculator**
Ask the user for a song's beats per minute (BPM). Calculate how many beats occur in 3 minutes. Print the result.

```python
bpm = int(input("Enter the song's BPM: "))
minutes = 3
# Calculate and print
```

**Exercise 3 — Type Detective**
Assign 5 different variables with different data types. Use `type()` to print each one, then explain in a comment what each type represents.

**Exercise 4 — Scholarship Tracker**
Create variables for a scholarship name, its amount (float), the deadline (string), and whether you have applied (bool). Print all four.

**Exercise 5 — Conversion Challenge**
Ask the user for their height in inches. Convert it to feet and inches. Print: `"You are 5 feet 8 inches tall."`

```python
total_inches = int(input("Enter your height in inches: "))
feet = total_inches // 12
inches = total_inches % 12
print(f"You are {feet} feet {inches} inches tall.")
```

### Knowledge Check

**1.** Which of the following is a valid variable name in Python?
- A) `2nd_score`
- B) `first-name`
- C) `player_score`
- D) `player score`

**Answer:** C

**2.** What data type is the value `True`?
- A) `str`
- B) `int`
- C) `float`
- D) `bool`

**Answer:** D

**3.** What does `int("42")` return?
- A) `"42"`
- B) `42`
- C) `42.0`
- D) Error

**Answer:** B

**4.** What is the output of `print(type(3.14))`?
- A) `<class 'int'>`
- B) `<class 'str'>`
- C) `<class 'float'>`
- D) `<class 'number'>`

**Answer:** C

**5.** Which symbol is used to assign a value to a variable?
- A) `==`
- B) `:`
- C) `=`
- D) `->`

**Answer:** C

**6.** What is the output of `f"Hello {name}"` when `name = "Marcus"`?
- A) `f"Hello {name}"`
- B) `Hello name`
- C) `Hello {Marcus}`
- D) `Hello Marcus`

**Answer:** D

**7.** `input()` always returns which data type?
- A) `int`
- B) `float`
- C) `str`
- D) `bool`

**Answer:** C

**8.** What is `int(9.99)`?
- A) `10`
- B) `9.99`
- C) `9`
- D) Error

**Answer:** C

**9.** Which of these is a `float`?
- A) `42`
- B) `"3.14"`
- C) `True`
- D) `3.14`

**Answer:** D

**10.** Variable names in Python are:
- A) Case-insensitive
- B) Case-sensitive
- C) Always uppercase
- D) Always lowercase

**Answer:** B

### Reflections

1. Variables store information. What kind of information would you want a Python program to store about you — beyond just name and age? What tells the full story of who you are?

2. Imagine you are building a scholarship tracking app for students at your school. What variables would you need? List at least 6.

3. When you convert a float to an int using `int()`, the decimal is cut off — not rounded. Why might that matter in a real program, like one calculating money?

4. ACCN builds tools for students. If ACCN had a student database, what data types would each piece of information be? Name, GPA, age, enrolled, graduation year?

### Summary

- Variables are named containers that store data
- The four basic types are `str` (text), `int` (whole number), `float` (decimal), `bool` (True/False)
- Use `type()` to check a variable's type
- `input()` always returns a string — use `int()` or `float()` to convert when doing math
- f-strings (`f"Hello {name}"`) are the cleanest way to embed variables in text

---

## Session 1.3: String Operations and User Input
**Duration:** 60 minutes | **Format:** Lecture + Hands-On Coding

### Introduction

Strings are everywhere in programming — names, messages, song lyrics, social media posts. In this session you will learn how to slice, search, modify, and format strings. This is one of the most practical skills in Python.

**Learning Objectives:**
- Use string methods: `.upper()`, `.lower()`, `.strip()`, `.replace()`, `.split()`, `.join()`
- Index and slice strings
- Use `len()` to measure string length
- Build interactive programs with `input()` and string formatting

### Core Concepts

#### String Indexing and Slicing
Strings work like lists of characters — each character has an index.

```python
name = "Umoja Robotics"
print(name[0])      # U
print(name[-1])     # s
print(name[0:5])    # Umoja
print(name[6:])     # Robotics
print(name[::-1])   # scitoboR ajomu (reversed)
print(len(name))    # 14
```

#### Key String Methods

```python
song = "  good kid, m.A.A.d city  "

# Clean up whitespace
print(song.strip())           # "good kid, m.A.A.d city"

# Change case
print(song.strip().upper())   # "GOOD KID, M.A.A.D CITY"
print(song.strip().lower())   # "good kid, m.a.a.d city"
print(song.strip().title())   # "Good Kid, M.A.A.D City"

# Check content
print("city" in song)         # True
print(song.count("a"))        # counts occurrences

# Replace text
print(song.replace("city", "nation"))

# Find position
print(song.find("kid"))       # returns index
```

#### Splitting and Joining

```python
# split() breaks a string into a list
roster = "Aaliyah,Marcus,Destiny,Jaylen,Brianna"
members = roster.split(",")
print(members)
# ['Aaliyah', 'Marcus', 'Destiny', 'Jaylen', 'Brianna']

# join() combines a list into a string
print(" | ".join(members))
# Aaliyah | Marcus | Destiny | Jaylen | Brianna

# Splitting lyrics by word
lyric = "we gon be alright"
words = lyric.split()
print(words)
print(f"This lyric has {len(words)} words.")
```

#### String Formatting — Three Approaches

```python
name = "Brianna"
points = 95

# Method 1: Concatenation (basic, clunky)
print("Name: " + name + ", Score: " + str(points))

# Method 2: .format() (older)
print("Name: {}, Score: {}".format(name, points))

# Method 3: f-strings (modern, preferred)
print(f"Name: {name}, Score: {points}")
print(f"{name} scored {points}/100 — {'Pass' if points >= 60 else 'Fail'}")
```

### Video Lessons

**Video 1 — Python Strings (Corey Schafer)**
This is a comprehensive walkthrough of Python strings covering creation, indexing, slicing, and the most important built-in string methods like `upper()`, `strip()`, `split()`, and `replace()`. Corey uses practical examples that show exactly when and why each method is useful in real programs. Watch how he demonstrates string immutability — a concept that trips up many beginners.
https://www.youtube.com/watch?v=k9TUPpGqYTo

**Video 2 — String Formatting in Python (Tech With Tim)**
Tim covers all three approaches to formatting strings in Python: the `%` operator, `.format()`, and f-strings, with clear code comparisons showing why f-strings have become the standard. He walks through formatting numbers, setting decimal places, and aligning text in columns. By the end you will know exactly which method to use and when.
https://www.youtube.com/watch?v=rfscVS0vtbw

**Video 3 — Python String Methods (Programming with Mosh)**
Mosh explains the most important string methods with visual examples that make it easy to see exactly what each one does to your string. This is especially helpful for methods like `split()` and `join()` that beginners often mix up. He covers real use cases like cleaning user input and parsing CSV-style data.
https://www.youtube.com/watch?v=rfscVS0vtbw
### Practice Exercises

**Exercise 1 — Name Card**
Ask for a user's full name. Print it in all caps, all lowercase, and title case. Also print how many characters are in their name (including the space).

**Exercise 2 — Lyric Analyzer**
Ask the user to enter their favorite song lyric. Print: the lyric in uppercase, how many words it has, and whether the word "love" appears in it.

```python
lyric = input("Enter a song lyric: ")
# Complete the analysis
```

**Exercise 3 — Username Generator**
Ask for a first name and last name. Generate a username: first 3 letters of first name + last 3 letters of last name + "7712". Print it in lowercase.

```python
first = input("First name: ")
last = input("Last name: ")
username = first[:3].lower() + last[-3:].lower() + "7712"
print(f"Your ACCN username: {username}")
```

**Exercise 4 — Team Roster**
Start with the string `"Aaliyah-Marcus-Destiny-Jaylen-Brianna"`. Split it by `-`, print each name on its own line with a number, then join them back with ` and `.

**Exercise 5 — Password Strength Check**
Ask for a password. Check if it is at least 8 characters long and contains at least one digit. Print feedback.

### Knowledge Check

**1.** What does `"hello".upper()` return?
- A) `hello`
- B) `HELLO`
- C) `Hello`
- D) Error

**Answer:** B

**2.** What is the output of `"robotics"[0:5]`?
- A) `robot`
- B) `roboti`
- C) `otics`
- D) `robo`

**Answer:** A

**3.** What does `len("ACCN")` return?
- A) `3`
- B) `4`
- C) `5`
- D) Error

**Answer:** B

**4.** What does `"a,b,c".split(",")` return?
- A) `"a b c"`
- B) `["a", "b", "c"]`
- C) `("a", "b", "c")`
- D) `{a, b, c}`

**Answer:** B

**5.** What does `"  hello  ".strip()` return?
- A) `"  hello  "`
- B) `"hello  "`
- C) `"hello"`
- D) `"  hello"`

**Answer:** C

**6.** What is the index of the first character of any string?
- A) `1`
- B) `-1`
- C) `0`
- D) Depends on the string

**Answer:** C

**7.** What does `"hip hop".replace("hip", "trap")` return?
- A) `"hip hop"`
- B) `"trap trap"`
- C) `"trap hop"`
- D) Error

**Answer:** C

**8.** Which method checks if a substring exists in a string?
- A) `.has()`
- B) `.contains()`
- C) `in` keyword
- D) `.exists()`

**Answer:** C

**9.** What does `"-".join(["a", "b", "c"])` produce?
- A) `"abc"`
- B) `"a-b-c"`
- C) `["a-b-c"]`
- D) `"a - b - c"`

**Answer:** B

**10.** What is the output of `"Python"[-1]`?
- A) `P`
- B) `n`
- C) `y`
- D) Error

**Answer:** B

### Reflections

1. You used `.split()` to break apart a string. Where in real life do you see information stored in a format that needs to be "split" — like a CSV file or a URL?

2. Usernames and passwords use string operations to validate and format data. Think about the last time you made an account somewhere. What rules did the password need to follow? How would you code those rules?

3. Lyrics, poetry, and spoken word are all about the power of words. How might a Python program help someone analyze or play with language — rhyme schemes, word frequency, patterns?

4. What other string methods would be useful for a program you want to build? Look up the Python documentation and find 2 methods we did not cover today.

### Summary

- Strings support indexing (`name[0]`), slicing (`name[1:4]`), and `len()`
- Key string methods: `.upper()`, `.lower()`, `.strip()`, `.replace()`, `.split()`, `.join()`
- Use `in` to check if a substring exists in a string
- f-strings (`f"Hello {name}"`) are the cleanest way to format output
- String processing powers real applications: search, user input validation, data parsing

---

## Session 1.4: Numbers, Math, and Operators
**Duration:** 60 minutes | **Format:** Lecture + Coding Practice

### Introduction

Python is a powerful calculator — but it goes way beyond basic math. In this session you will learn arithmetic, comparison, and logical operators, and how to use Python to solve real math problems. From calculating a basketball player's scoring average to figuring out how much motor torque a robot needs, math is everywhere in code.

**Learning Objectives:**
- Use arithmetic operators: `+`, `-`, `*`, `/`, `//`, `%`, `**`
- Understand operator precedence (order of operations)
- Use comparison operators: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Use the `math` module for advanced calculations
- Use `round()`, `abs()`, `min()`, `max()`

### Core Concepts

#### Arithmetic Operators

```python
# Basic math
points = 38
assists = 10
rebounds = 7

total_contributions = points + assists + rebounds
print(f"Total stat line: {total_contributions}")

# All operators
a, b = 17, 5
print(a + b)   # 22  — addition
print(a - b)   # 12  — subtraction
print(a * b)   # 85  — multiplication
print(a / b)   # 3.4 — true division (returns float)
print(a // b)  # 3   — floor division (whole number)
print(a % b)   # 2   — modulo (remainder)
print(a ** b)  # 1419857 — exponentiation (a to the power b)
```

#### Useful Built-in Math Functions

```python
scores = [88, 92, 76, 95, 83]

print(max(scores))    # 95
print(min(scores))    # 76
print(sum(scores))    # 434
print(round(434/5, 2)) # 86.8 — average, rounded to 2 decimal places
print(abs(-15))       # 15 — absolute value
```

#### Operator Precedence (PEMDAS)
Python follows the same order of operations as math: Parentheses, Exponents, Multiply/Divide, Add/Subtract.

```python
# Without parentheses
result = 2 + 3 * 4   # 14 (not 20!)

# With parentheses
result = (2 + 3) * 4  # 20

# Real example: calculating average
avg = (88 + 92 + 76 + 95 + 83) / 5
print(f"Class average: {avg}")
```

#### The math Module

```python
import math

print(math.pi)           # 3.14159...
print(math.sqrt(144))    # 12.0
print(math.ceil(3.2))    # 4  — round up
print(math.floor(3.9))   # 3  — round down
print(math.pow(2, 10))   # 1024.0
```

#### Augmented Assignment Operators

```python
score = 0
score += 10   # score = score + 10  → 10
score += 5    # 15
score -= 3    # 12
score *= 2    # 24
score //= 5   # 4
print(score)
```

### Video Lessons

**Video 1 — Python Arithmetic Operators (Tech With Tim)**
Tim walks through every arithmetic operator in Python including the ones beginners often miss: integer division `//`, modulo `%`, and exponentiation `**`. He shows how operator precedence works and when to use parentheses to control order of operations. This video includes a clear explanation of why `10 / 3` gives a different result than `10 // 3`.
https://www.youtube.com/watch?v=8ext9G7xspg

**Video 2 — Python math Module (Corey Schafer)**
The built-in `math` module gives you access to functions like `sqrt()`, `ceil()`, `floor()`, `pow()`, and constants like `pi` and `e`. Corey demonstrates how to import the module and use its functions to solve real mathematical problems that would be tedious to write from scratch. This is your introduction to using Python's standard library.
https://www.youtube.com/watch?v=cY2NXB_Tqq0

**Video 3 — Solving Math Problems with Python (Socratica)**
Socratica's crystal-clear teaching style makes this video excellent for showing how Python handles number types, rounding, and common math operations that come up in science and robotics. You will see how to compute averages, convert between number formats, and apply math to practical problems. This connects directly to the kind of calculations used in robot sensor data processing.
https://www.youtube.com/watch?v=khKv-8q7YmY
### Practice Exercises

**Exercise 1 — Stats Calculator**
Ask for a basketball player's points in 5 games. Calculate and print: total points, average per game (rounded to 1 decimal), highest single-game score, lowest single-game score.

**Exercise 2 — Robot Gear Ratio**
A robot motor spins at 5000 RPM. After going through a 3:1 gear reduction, what is the output speed? Print the result with a clear label.

```python
motor_rpm = 5000
gear_ratio = 3
output_rpm = motor_rpm / gear_ratio
print(f"Output speed: {output_rpm} RPM")
```

**Exercise 3 — Grade Calculator**
Ask for 4 test scores. Calculate the average and print whether it is an A (90+), B (80+), C (70+), D (60+), or F.

**Exercise 4 — Modulo Magic**
Use the modulo operator to:
- Check if a number is even or odd
- Find out how many full weeks are in 100 days
- Find the remainder when splitting 50 items among 7 people

**Exercise 5 — Circle Calculator**
Ask for a circle's radius. Use `math.pi` to calculate and print the area and circumference, both rounded to 2 decimal places.

### Knowledge Check

**1.** What is the result of `17 % 5`?
- A) `3`
- B) `3.4`
- C) `2`
- D) `85`

**Answer:** C

**2.** What is `2 ** 8`?
- A) `16`
- B) `64`
- C) `128`
- D) `256`

**Answer:** D

**3.** What is the result of `10 / 3` in Python 3?
- A) `3`
- B) `3.0`
- C) `3.3333...`
- D) Error

**Answer:** C

**4.** What is `10 // 3`?
- A) `3.33`
- B) `3`
- C) `4`
- D) `1`

**Answer:** B

**5.** What does `round(3.567, 2)` return?
- A) `3.5`
- B) `3.56`
- C) `3.57`
- D) `4.0`

**Answer:** C

**6.** What is the result of `2 + 3 * 4`?
- A) `20`
- B) `14`
- C) `24`
- D) `11`

**Answer:** B

**7.** What module provides `sqrt()` and `pi`?
- A) `numpy`
- B) `calculator`
- C) `math`
- D) `numbers`

**Answer:** C

**8.** What does `abs(-42)` return?
- A) `-42`
- B) `42`
- C) `0`
- D) Error

**Answer:** B

**9.** What is `score += 5` equivalent to?
- A) `score = 5`
- B) `score = score - 5`
- C) `score = score + 5`
- D) `score + 5`

**Answer:** C

**10.** Which function returns the largest value from a list?
- A) `largest()`
- B) `top()`
- C) `max()`
- D) `high()`

**Answer:** C

### Reflections

1. You calculated a basketball player's average. What other real-world statistics would you want to calculate with Python? Think about something you are passionate about — music, sports, fashion, fitness.

2. Modulo (`%`) is used to check for even/odd numbers, handle time (60 seconds in a minute), and distribute items evenly. Can you think of 2 more real uses of modulo in an app or game?

3. A robot's gear ratio directly affects its speed and power. In FRC, teams choose gear ratios to balance speed and torque. Why might a team want a higher gear ratio for driving versus lifting?

4. Math is often presented as abstract and disconnected from culture. But Katherine Johnson used calculus to get astronauts home safely. How can you keep the connection between math, code, and meaning strong in your own learning?

### Summary

- Python supports `+`, `-`, `*`, `/`, `//` (floor div), `%` (modulo), `**` (power)
- Order of operations follows PEMDAS — use parentheses to control evaluation
- Built-ins `max()`, `min()`, `sum()`, `round()`, `abs()` handle common math needs
- The `math` module provides advanced functions: `sqrt()`, `ceil()`, `floor()`, `pi`
- Augmented operators (`+=`, `-=`, `*=`) make updating variables clean and readable

---

## Session 1.5: Your First Real Python Program
**Duration:** 60 minutes | **Format:** Project Session

### Introduction

You have learned variables, data types, strings, and math. Now it is time to put it all together and build something real. In this session you will write a complete interactive program from scratch — one that collects information, does calculations, and presents results.

**Learning Objectives:**
- Combine variables, input, strings, and math in one program
- Plan and write a multi-step Python program
- Debug simple errors using Python's error messages
- Celebrate your first complete project

### Core Concepts

#### Reading Python Error Messages
Python gives clear error messages. Learning to read them is a superpower.

```
Traceback (most recent call last):
  File "app.py", line 5, in <module>
    print(age + " years old")
TypeError: can only concatenate str (not "int") to str
```

- **TypeError** — wrong data type used
- **NameError** — variable used before it was defined
- **SyntaxError** — typo or missing punctuation

```python
# Common fixes
age = int(input("Age: "))          # Always convert input before math
print(f"You are {age} years old")  # Use f-strings to mix types
```

#### Planning a Program (Pseudocode)
Before coding, write pseudocode — plain English steps:

```
1. Ask for student's name
2. Ask for 5 test scores
3. Calculate average
4. Determine letter grade
5. Print a personalized report
```

#### Complete Example — GPA Calculator

```python
print("=" * 40)
print("   ACCN Student Grade Calculator")
print("=" * 40)

name = input("\nEnter your name: ")
print(f"\nHello, {name}! Let's calculate your GPA.\n")

scores = []
for i in range(1, 6):
    score = float(input(f"Enter score {i} (0-100): "))
    scores.append(score)

average = sum(scores) / len(scores)

if average >= 90:
    grade = "A"
elif average >= 80:
    grade = "B"
elif average >= 70:
    grade = "C"elif average >= 60:
    grade = "D"
else:
    grade = "F"

print("\n" + "=" * 40)
print(f"   Report for {name}")
print("=" * 40)
print(f"Scores: {scores}")
print(f"Average: {round(average, 2)}")
print(f"Grade: {grade}")
print("=" * 40)
```

### Video Lessons

**Video 1 — Build a Python Number Guessing Game (Tech With Tim)**
Building a complete project from scratch — even a simple one — forces you to combine variables, input, conditionals, and loops in a way that isolated lessons cannot. This video walks through the design process, the code, and common debugging steps for a beginner project. Pay attention to how Tim breaks the problem into small steps before writing any code.
https://www.youtube.com/watch?v=YYXdXT2l-Gg

**Video 2 — How to Debug Python Code (CS Dojo)**
Debugging is one of the most important skills in programming, and this video teaches you the systematic approach: reading error messages, using print statements to trace values, and narrowing down where bugs occur. CS Dojo shows real debugging sessions, not just the final working code. Learning to debug well is what separates coders who get stuck from coders who keep moving.
https://www.youtube.com/watch?v=YYXdXT2l-Gg

**Video 3 — 5 Mini Python Projects for Beginners (Tech With Tim)**
This video presents five complete beginner Python projects with full explanations, letting you see multiple different ways to combine what you have learned. Each project is short enough to follow in one sitting and different enough to teach you something new. Use these as inspiration or as a challenge to build alongside the video.
https://www.youtube.com/watch?v=DLn3jOsNRVE
### Practice Exercises

**Exercise 1 — Personal Stats App**
Build a program that:
1. Asks for your name and favorite sport
2. Asks for 3 performance stats (your choice — points, times, etc.)
3. Calculates and prints your average
4. Prints a formatted personal report

**Exercise 2 — Budget Calculator**
Build a simple budget tracker:
1. Ask for monthly income
2. Ask for 3 monthly expenses (rent, food, transportation)
3. Calculate total expenses and remaining balance
4. Print whether you are in the positive or negative

**Exercise 3 — Umoja Robotics Team Report**
Build a program that:
1. Asks for 5 team members' names
2. Asks for each person's contribution hours this week
3. Calculates total team hours and average per person
4. Prints a team report

**Exercise 4 — Song Mood Analyzer**
Ask for a song's title, artist, and BPM. Classify its mood:
- BPM < 80: Chill
- BPM 80-120: Mid-tempo
- BPM > 120: Hype
Print: `"[Song] by [Artist] is a [mood] track at [BPM] BPM."`

### Knowledge Check

**1.** What type of error appears when you use a variable before defining it?
- A) `TypeError`
- B) `ValueError`
- C) `NameError`
- D) `SyntaxError`

**Answer:** C

**2.** Which best describes pseudocode?
- A) Code written in a different programming language
- B) Plain English steps describing what a program will do
- C) Comments inside Python code
- D) A type of debugging tool

**Answer:** B

**3.** What error does Python show when you concatenate a string and integer?
- A) `NameError`
- B) `IndexError`
- C) `TypeError`
- D) `ValueError`

**Answer:** C

**4.** `"=" * 40` produces:
- A) An error
- B) `40`
- C) A string of 40 equal signs
- D) `= 40`

**Answer:** C

**5.** What does `scores.append(score)` do?
- A) Removes score from the list
- B) Adds score to the end of the list
- C) Counts the number of items
- D) Sorts the list

**Answer:** B

**6.** What is the purpose of `round(average, 2)`?
- A) Rounds to the nearest whole number
- B) Rounds to 2 significant digits
- C) Rounds to 2 decimal places
- D) Multiplies by 2

**Answer:** C

**7.** What does `print("=" * 20)` display?
- A) `= * 20`
- B) `= 20 times`
- C) `====================`
- D) Error

**Answer:** C

**8.** In planning a program, what should you do FIRST?
- A) Run the code and fix errors
- B) Write pseudocode / plan the steps
- C) Look up syntax online
- D) Write the print statements

**Answer:** B

**9.** A `SyntaxError` most likely means:
- A) A variable is the wrong type
- B) A variable was not defined
- C) There is a typo or missing punctuation
- D) A number is out of range

**Answer:** C

**10.** Which is the cleanest way to include a variable in a printed string?
- A) `print("Hello " + name + "!")`
- B) `print("Hello", name, "!")`
- C) `print(f"Hello {name}!")`
- D) `print("Hello %s!" % name)`

**Answer:** C

### Reflections

1. You just built a complete Python program. What was the hardest part? What part felt natural?

2. Debugging is frustrating at first — every programmer deals with it. How did you handle it when something did not work? What strategies helped?

3. Your program collected information and calculated results. What is a real problem in your life or community that could be solved with a program like this?

4. After one week of Python, what feels different about how you think? Has anything changed about how you see the technology around you?

### Summary

- Error messages are guides, not failures — read them carefully to find the bug
- Plan programs with pseudocode before writing a single line of code
- Combine `input()`, math, conditionals, and `print()` to build complete interactive programs
- `append()` adds items to a list; `len()` counts items; `sum()` totals them
- You have now built your first real Python program — this is just the beginning

---

# WEEK 2: Making Decisions in Code

## Session 2.1: Boolean Logic and Comparisons
**Duration:** 60 minutes | **Format:** Lecture + Coding Practice

### Introduction

How does a program decide what to do? It uses logic. Boolean logic — named after mathematician George Boole — is the foundation of every decision a computer makes. True or False. Yes or No. Access Granted or Denied.

**Learning Objectives:**
- Understand boolean values `True` and `False`
- Use comparison operators: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Use logical operators: `and`, `or`, `not`
- Understand short-circuit evaluation

### Core Concepts

#### Comparison Operators
These compare two values and always return `True` or `False`.

```python
age = 16
score = 88
name = "Marcus"

print(age == 16)      # True  — equal to
print(age != 18)      # True  — not equal to
print(score > 90)     # False — greater than
print(score >= 88)    # True  — greater than or equal
print(score < 100)    # True  — less than
print(name == "Marcus") # True

# Common mistake!
print(age = 17)   # ERROR — this is assignment
print(age == 17)  # False — this is comparison
```

#### Logical Operators

```python
gpa = 3.7
hours_volunteered = 45

# and — both must be True
eligible = gpa >= 3.5 and hours_volunteered >= 40
print(f"Scholarship eligible: {eligible}")  # True

# or — at least one must be True
has_experience = False
has_certificate = True
qualified = has_experience or has_certificate
print(f"Job qualified: {qualified}")  # True

# not — flips True to False or vice versa
is_suspended = False
print(f"Can compete: {not is_suspended}")  # True
```

#### Combining Conditions

```python
score = 85
attendance = 92
submitted_project = True

# Compound condition
honor_roll = score >= 80 and attendance >= 90 and submitted_project
print(f"Honor roll: {honor_roll}")

# Parentheses for clarity
admitted = (score >= 80 or attendance >= 95) and submitted_project
print(f"Admitted to program: {admitted}")
```

#### Boolean in Variables

```python
# Any value can be evaluated as a boolean
print(bool(0))       # False
print(bool(1))       # True
print(bool(""))      # False — empty string
print(bool("ACCN"))  # True  — non-empty string
print(bool([]))      # False — empty list
print(bool([1, 2]))  # True  — non-empty list
```

### Video Lessons

**Video 1 — Python Comparison and Boolean Operators (Corey Schafer)**
This video explains how Python evaluates comparison expressions and why understanding True/False logic is foundational to every program you will ever write. Corey demonstrates all six comparison operators and shows how to combine them with `and`, `or`, and `not`. Watch how he explains short-circuit evaluation — a behavior that surprises many beginners.
https://www.youtube.com/watch?v=DZwmZ8Usvnk

**Video 2 — Logical Operators in Python (Tech With Tim)**
Tim uses truth tables and real code examples to show exactly how `and`, `or`, and `not` combine boolean expressions. He covers common mistakes like using `or` when you mean to check multiple values, and how Python handles non-boolean values as truthy or falsy. This is essential knowledge before writing any conditional logic.
https://www.youtube.com/watch?v=YYXdXT2l-Gg

**Video 3 — Python Truthiness and Falsy Values (Real Python)**
Beyond simple True/False, Python treats empty strings, zero, None, and empty lists as falsy — and this matters everywhere in real code. This video explains Python's truthiness rules and shows real examples of where they save code or cause bugs. Understanding this concept helps you write cleaner, more Pythonic conditional checks.
https://www.youtube.com/watch?v=Y8Tko2YC5hA
### Practice Exercises

**Exercise 1 — Eligibility Checker**
A scholarship requires: GPA >= 3.0, grade level >= 10, and must have completed an application. Ask for all three inputs and print whether the student qualifies.

**Exercise 2 — Logic Table**
For variables `a = True` and `b = False`, print the result of:
- `a and b`
- `a or b`
- `not a`
- `not b`
- `a and not b`
- `not a or b`

**Exercise 3 — Robot Safety Check**
A robot can move if: battery >= 20%, no error flags, and field is clear. Use boolean logic to build a safety check.

```python
battery = int(input("Battery %: "))
has_error = input("Error flag? (yes/no): ") == "yes"
field_clear = input("Field clear? (yes/no): ") == "yes"
# Determine if robot can move
```

**Exercise 4 — Age Gating**
Write a program that checks if someone can: vote (18+), drive (16+), watch a PG-13 movie (13+). Print their permissions.

### Knowledge Check

**1.** What does `==` check?
- A) Assigns a value
- B) Checks if two values are equal
- C) Checks if a value is greater
- D) Converts to boolean

**Answer:** B

**2.** What is the result of `True and False`?
- A) `True`
- B) `False`
- C) `None`
- D) Error

**Answer:** B

**3.** What is the result of `True or False`?
- A) `True`
- B) `False`
- C) `None`
- D) Error

**Answer:** A

**4.** What does `not True` return?
- A) `True`
- B) `None`
- C) `False`
- D) `0`

**Answer:** C

**5.** Which comparison checks "not equal to"?
- A) `<>`
- B) `!= `
- C) `=/=`
- D) `~=`

**Answer:** B

**6.** What is `bool("")`?
- A) `True`
- B) `None`
- C) `""`
- D) `False`

**Answer:** D

**7.** `5 > 3 and 2 < 1` evaluates to:
- A) `True`
- B) `False`
- C) `5`
- D) `3`

**Answer:** B

**8.** `5 > 3 or 2 < 1` evaluates to:
- A) `False`
- B) `True`
- C) `5`
- D) Error

**Answer:** B

**9.** `bool(0)` returns:
- A) `True`
- B) `0`
- C) `False`
- D) Error

**Answer:** C

**10.** Which is the correct way to check if `x` is between 1 and 10?
- A) `1 < x < 10`
- B) `x > 1 and x < 10`
- C) Both A and B
- D) `x between 1 and 10`

**Answer:** C

### Reflections

1. Boolean logic is binary — True or False. But real life is often more complex. Can you think of a real-world situation where a yes/no decision is too simple? How would you model nuance in code?

2. Scholarship and college applications often use criteria just like the eligibility checker you built. What criteria do you think are fair? What criteria might be unfair?

3. Robot safety systems rely on boolean checks — multiple conditions must all be true before movement is allowed. Why is this important? What could go wrong if the check was skipped?

4. George Boole was a largely self-taught mathematician who revolutionized logic. His work now runs every computer on earth. What does that say about what is possible regardless of your background?

### Summary

- `True` and `False` are Python's boolean values
- Comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`) always return a boolean
- Logical operators: `and` (both true), `or` (at least one true), `not` (flip)
- Any value can behave as a boolean: empty strings/lists/zero are `False`, everything else is `True`
- Booleans power every decision in every program ever written

---

## Session 2.2: If/Elif/Else Statements
**Duration:** 60 minutes | **Format:** Lecture + Hands-On Coding

### Introduction

Now that you understand boolean logic, you can make your programs respond differently to different situations. If/elif/else is how Python makes decisions. It is the most fundamental control flow structure in all of programming.

**Learning Objectives:**
- Write `if`, `elif`, and `else` statements
- Use nested conditionals
- Write concise conditionals using ternary expressions
- Apply conditionals to solve real problems

### Core Concepts

#### Basic If/Elif/Else

```python
score = int(input("Enter your test score: "))

if score >= 90:
    grade = "A"
    message = "Excellent work!"
elif score >= 80:
    grade = "B"
    message = "Great job!"
elif score >= 70:
    grade = "C"
    message = "Good effort."
elif score >= 60:
    grade = "D"
    message = "Keep pushing."
else:
    grade = "F"
    message = "Let's talk about extra help."

print(f"Grade: {grade} — {message}")
```

#### Nested Conditionals

```python
is_member = True
credits = 120

if is_member:
    if credits >= 100:
        print("Elite member — full access!")
    elif credits >= 50:
        print("Standard member — most features unlocked.")
    else:
        print("New member — keep earning credits!")
else:
    print("Please sign up to access features.")
```

#### Ternary (One-Line) Conditionals

```python
age = 17
status = "adult" if age >= 18 else "minor"
print(f"Status: {status}")

bpm = 130
vibe = "hype" if bpm > 120 else "chill"
print(f"Song vibe: {vibe}")
```

#### Conditionals with Strings

```python
team = input("Enter your team color (red/blue): ").lower().strip()

if team == "red":
    print("Go Red Team!")
elif team == "blue":
    print("Go Blue Team!")
else:
    print(f"'{team}' is not a valid team color.")
```

### Video Lessons

**Video 1 — Python If Elif Else Statements (Corey Schafer)**
Corey's clear teaching style makes this the go-to video for learning conditional logic in Python. He walks through simple if statements, multi-branch elif chains, and nested conditions using practical examples that build on each other. By the end you will understand how Python evaluates conditions and when to use elif vs separate if statements.
https://www.youtube.com/watch?v=AWek49wXGzI

**Video 2 — Python Conditional Statements (Programming with Mosh)**
Mosh supplements Corey's video with examples that emphasize real-world decision-making logic, like grade calculators, eligibility checks, and input validation. He explains the ternary (one-line) if statement and shows when it makes code cleaner vs harder to read. This video is especially helpful for connecting conditionals to practical programs.
https://www.youtube.com/watch?v=Zp5MuPOtsSY

**Video 3 — Python Ternary Operator and Match Statements (Tech With Tim)**
The ternary operator lets you write simple if/else logic in a single line, and Python 3.10+ added match/case statements for pattern matching. Tim explains both features with before/after code comparisons showing when they improve readability. These are the tools that make experienced Python code look clean and compact.
https://www.youtube.com/watch?v=MHlwl6GsT8s
### Practice Exercises

**Exercise 1 — BMI Classifier**
Ask for weight (kg) and height (m). Calculate BMI (`weight / height**2`). Print the category: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (30+).

**Exercise 2 — Scholarship Decision**
Ask for GPA, number of community service hours, and whether an essay was submitted. Print whether the student: definitely qualifies, qualifies with conditions, or does not qualify.

**Exercise 3 — FRC Match Outcome**
Ask for our robot's score and opponent's score. Determine if we won, lost, or tied. Print the margin of victory or loss.

**Exercise 4 — Music Recommender**
Ask for the user's current mood (happy, sad, hyped, focused). Use if/elif/else to recommend a playlist name for each mood.

**Exercise 5 — Guessing Game Start**
Ask the user to guess a secret number (7). Tell them if they are too high, too low, or correct.

### Knowledge Check

**1.** What happens if no `if` condition is `True` and there is no `else`?
- A) Python crashes
- B) The last `elif` runs
- C) Nothing happens
- D) Python prints an error

**Answer:** C

**2.** What is the output when `x = 5` and you run `print("big") if x > 10 else print("small")`?
- A) `big`
- B) `small`
- C) Error
- D) Nothing

**Answer:** B

**3.** How many `elif` blocks can an `if` statement have?
- A) Only 1
- B) Only 2
- C) As many as needed
- D) None

**Answer:** C

**4.** Which is true about `else`?
- A) It requires a condition
- B) It always runs
- C) It runs only if no other condition was `True`
- D) It must come before `elif`

**Answer:** C

**5.** What is wrong with: `if x = 5:`?
- A) Should be `if x == 5:`
- B) Missing colon
- C) `x` should be a string
- D) Nothing is wrong

**Answer:** A

**6.** What does indentation mean in Python conditionals?
- A) Optional formatting
- B) Required to define which code belongs inside the if block
- C) Only needed for functions
- D) A style preference

**Answer:** B

**7.** What is the output when `score = 85`: `grade = "A" if score >= 90 else "B"`?
- A) `A`
- B) `B`
- C) Error
- D) Nothing

**Answer:** B

**8.** Nested conditionals are:
- A) Conditionals inside other conditionals
- B) Two separate if statements
- C) Always bad practice
- D) A Python error

**Answer:** A

**9.** `input()` returns a string. If you check `if age > 18:` where `age = input(...)`, Python will:
- A) Work fine
- B) Raise a TypeError
- C) Guess the right answer
- D) Return False

**Answer:** B

**10.** Which correctly checks if a string is either "yes" OR "y"?
- A) `if answer == "yes" or "y":`
- B) `if answer == ("yes", "y"):`
- C) `if answer == "yes" or answer == "y":`
- D) `if answer in "yes" or "y":`

**Answer:** C

### Reflections

1. Programs make decisions based on rules you write. What rules govern decisions in your life — curfews, eligibility, access? How would you model those rules in code?

2. Scholarship decisions, college admissions, and job applications all use criteria to make yes/no decisions. What is one risk of letting a program make those decisions without human review?

3. The ternary expression `x if condition else y` is powerful but can make code harder to read. When would you use it vs. a full if/else block?

4. Conditional logic is the foundation of access control — who gets in, who does not. In technology, who decides the criteria? Why does that matter?

### Summary

- `if/elif/else` controls which block of code runs based on conditions
- `elif` handles multiple conditions; `else` is the fallback if none match
- Indentation defines which code belongs inside each block — it is required
- Ternary expressions (`x if condition else y`) write simple conditionals in one line
- Convert `input()` to the right type before using it in comparisons

---

## Session 2.3: While Loops
**Duration:** 60 minutes | **Format:** Lecture + Hands-On Coding

### Introduction

What if you need code to repeat until something happens? While loops keep running as long as a condition is true. They are perfect for menus, retry logic, and counting.

**Learning Objectives:**
- Write `while` loops to repeat code
- Use `break` to exit a loop early
- Use `continue` to skip an iteration
- Avoid infinite loops
- Build interactive menus with while loops

### Core Concepts

#### Basic While Loop

```python
# Count from 1 to 5
count = 1
while count <= 5:
    print(f"Count: {count}")
    count += 1
print("Done!")

# Countdown
seconds = 10
while seconds > 0:
    print(f"Launch in {seconds}...")
    seconds -= 1
print("LIFTOFF! 🚀")
```

#### While Loop with User Input

```python
# Keep asking until valid input
while True:
    name = input("Enter your name (can't be empty): ").strip()
    if name:
        break
    print("Name cannot be empty. Try again.")
print(f"Hello, {name}!")
```

#### break and continue

```python
# break — exit the loop immediately
number = 0
while True:
    number += 1
    if number == 5:
        break
print(f"Stopped at {number}")

# continue — skip rest of this iteration
i = 0
while i < 10:
    i += 1
    if i % 2 == 0:
        continue    # skip even numbers
    print(i)        # prints only odd: 1, 3, 5, 7, 9
```

#### Interactive Menu

```python
print("=== ACCN Learning Hub Menu ===")
while True:
    print("\n1. View courses")
    print("2. Check progress")
    print("3. Exit")
    choice = input("Choose an option (1-3): ")

    if choice == "1":
        print("Courses: Python, AI Fundamentals, Mechanical Engineering")
    elif choice == "2":
        print("Progress tracking coming soon!")
    elif choice == "3":
        print("Goodbye! Keep coding.")
        break
    else:
        print("Invalid option. Please choose 1, 2, or 3.")
```

### Video Lessons

**Video 1 — Python While Loops (Corey Schafer)**
Corey explains while loops from the ground up: how the condition is checked, what happens each iteration, and how to avoid infinite loops. He uses practical examples like input validation loops and countdown timers that show while loops at their most natural. Understanding while loops well prepares you for the more complex control flow in later sessions.
https://www.youtube.com/watch?v=6iF8Xb7Z3wQ

**Video 2 — Break and Continue in Python (Tech With Tim)**
`break` and `continue` give you fine-grained control over loop execution — exiting early or skipping specific iterations. Tim demonstrates both with real examples, including a search loop that stops as soon as it finds what it needs. These are the tools that make loops elegant instead of awkward.
https://www.youtube.com/watch?v=yCZBnjF4_tU

**Video 3 — Python Loops Explained (CS Dojo)**
This video builds an intuition for when to use while loops vs for loops and why the choice matters for code readability and correctness. CS Dojo walks through four different loop use cases and discusses the thinking behind choosing the right one. This is the kind of design thinking that separates good programmers from beginners.
https://www.youtube.com/watch?v=OnDr4J2UXSA
### Practice Exercises

**Exercise 1 — Number Guessing Game**
The secret number is 42. Keep prompting the user to guess. Tell them if they are too high or too low. Count the number of guesses. Congratulate them when they get it.

**Exercise 2 — Password Validator**
Keep asking for a password until it meets all requirements: at least 8 characters, contains a digit, contains an uppercase letter. Print which requirement failed each time.

**Exercise 3 — Running Total**
Ask the user to keep entering numbers. After each number, print the running total. Stop when they enter 0. Print the final total and count of numbers entered.

**Exercise 4 — ATM Menu**
Simulate a simple ATM: show balance, allow deposits, allow withdrawals (only if sufficient funds), and exit. Run in a while loop menu.

```python
balance = 150.00
while True:
    # Your menu here
    pass
```

**Exercise 5 — Multiplication Table**
Ask for a number. Use a while loop to print its multiplication table from 1 to 12.

### Knowledge Check

**1.** A while loop runs as long as:
- A) There is code inside it
- B) Its condition evaluates to `True`
- C) The user presses Enter
- D) `break` is not called

**Answer:** B

**2.** What does `break` do inside a loop?
- A) Pauses the loop
- B) Skips to the next iteration
- C) Exits the loop immediately
- D) Raises an error

**Answer:** C

**3.** What does `continue` do?
- A) Exits the loop
- B) Skips the rest of the current iteration and goes to the next
- C) Restarts the loop from the beginning
- D) Prints "continue"

**Answer:** B

**4.** What is an infinite loop?
- A) A loop that runs exactly 100 times
- B) A loop whose condition never becomes False
- C) A loop with no body
- D) A loop with break inside

**Answer:** B

**5.** What is the output of: `i = 0; while i < 3: print(i); i += 1`?
- A) `0 1 2 3`
- B) `1 2 3`
- C) `0 1 2`
- D) Infinite loop

**Answer:** C

**6.** `while True:` creates:
- A) A loop that runs once
- B) A syntax error
- C) A loop that only exits via `break`
- D) A loop that runs twice

**Answer:** C

**7.** Which pattern is used to keep asking until valid input?
- A) `if/else`
- B) `for` loop
- C) `while True` with `break` on valid input
- D) `try/except`

**Answer:** C

**8.** What happens if you forget to increment the counter in a while loop?
- A) The loop runs once
- B) Python raises a warning
- C) The loop runs forever (infinite loop)
- D) The loop is skipped

**Answer:** C

**9.** `while i < 10: if i == 5: continue` — what issue does this code have?
- A) `continue` is wrong syntax
- B) It will create an infinite loop because `i` is never incremented
- C) The condition should be `>`
- D) No issue

**Answer:** B

**10.** Which statement is true about `while` vs `for` loops?
- A) `while` loops are always better
- B) `for` loops are always better
- C) `while` is best when you don't know how many times to loop; `for` when you do
- D) They do exactly the same thing

**Answer:** C

### Reflections

1. An infinite loop crashes your program — but persistence is a virtue in life. What is the difference between persisting toward a goal and being stuck in a loop that is not working?

2. The while loop with a menu is the basis of almost every app interface — games, ATMs, websites. Think about your favorite app. Where do you think loops are running behind the scenes?

3. `break` lets you escape when the right condition is met. In what real-life situations do you need to know when to "break" out of something that is not working?

4. How would you use a while loop in the Umoja Robotics team? Think about robot control loops — the robot keeps checking sensors and acting until a task is done.

### Summary

- `while condition:` repeats as long as the condition is `True`
- `break` exits the loop immediately; `continue` skips to the next iteration
- `while True:` with `break` is used for menus and input validation
- Always ensure the loop condition eventually becomes `False` to avoid infinite loops
- While loops are best when you do not know in advance how many repetitions are needed

---

## Session 2.4: For Loops and the range() Function
**Duration:** 60 minutes | **Format:** Lecture + Hands-On Coding

### Introduction

The `for` loop is Python's most versatile loop. You use it when you know what you want to loop over — a list of students, a range of numbers, a string of characters. Combined with `range()`, it covers most looping needs in programming.

**Learning Objectives:**
- Use `for` loops to iterate over sequences
- Use `range()` to generate numeric sequences
- Use `enumerate()` and `zip()` for more powerful loops
- Use list comprehensions for clean, concise loops
- Apply nested for loops

### Core Concepts

#### For Loop Basics

```python
# Loop over a list
team = ["Aaliyah", "Marcus", "Destiny", "Jaylen", "Brianna"]
for member in team:
    print(f"Team member: {member}")

# Loop over a string
for char in "ACCN":
    print(char)

# Loop over a range of numbers
for i in range(5):      # 0, 1, 2, 3, 4
    print(i)
```

#### range() Function

```python
# range(stop)
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# range(start, stop)
for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5

# range(start, stop, step)
for i in range(0, 20, 5):
    print(i)  # 0, 5, 10, 15

# Count backwards
for i in range(10, 0, -1):
    print(i)  # 10, 9, 8, ... 1
```

#### enumerate() — Index + Value

```python
playlist = ["HUMBLE.", "EARFQUAKE", "Kill Bill", "family ties"]

for index, song in enumerate(playlist, start=1):
    print(f"{index}. {song}")
# 1. HUMBLE.
# 2. EARFQUAKE
# 3. Kill Bill
# 4. family ties
```

#### zip() — Loop Two Lists Together

```python
names = ["Aaliyah", "Marcus", "Destiny"]
scores = [92, 88, 95]

for name, score in zip(names, scores):
    print(f"{name}: {score}/100")
```

#### List Comprehensions — Clean One-Line Loops

```python
# Traditional loop
squares = []
for n in range(1, 6):
    squares.append(n ** 2)

# List comprehension — same thing, one line
squares = [n ** 2 for n in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

# With condition
even_squares = [n ** 2 for n in range(1, 11) if n % 2 == 0]
print(even_squares)  # [4, 16, 36, 64, 100]
```

### Video Lessons

**Video 1 — Python For Loops (Corey Schafer)**
For loops in Python work differently than in many other languages — they iterate over any sequence, not just numbers. Corey explains how for loops work with strings, lists, ranges, and dictionaries, with practical examples for each. This video also covers the `enumerate()` function, which is essential for when you need both the index and value.
https://www.youtube.com/watch?v=W8KRzm-HUcc

**Video 2 — List Comprehensions in Python (Tech With Tim)**
List comprehensions are Python's elegant way to build lists in one line, combining a for loop and an optional filter condition. Tim walks from basic examples to filtered and nested comprehensions, always showing the equivalent traditional loop alongside. Once you understand list comprehensions, you will use them everywhere.
https://www.youtube.com/watch?v=3dt4OGnU5sM

**Video 3 — Python range() Function Explained (CS Dojo)**
The `range()` function is the backbone of numeric for loops in Python, and this video covers all three forms: `range(stop)`, `range(start, stop)`, and `range(start, stop, step)`. CS Dojo shows how range works under the hood as a lazy sequence, why it is memory efficient, and how to reverse, skip, or count down with it. This is foundational knowledge for every loop you write.
https://www.youtube.com/watch?v=YYXdXT2l-Gg
### Practice Exercises

**Exercise 1 — Playlist Printer**
Given a list of 5 songs, print a numbered playlist using `enumerate()`.

**Exercise 2 — Times Table**
Ask for a number. Use a `for` loop with `range()` to print its multiplication table (1 through 12).

**Exercise 3 — Grade Report**
You have two lists: `students = ["Aaliyah", "Marcus", "Destiny"]` and `grades = [94, 87, 91]`. Use `zip()` and a `for` loop to print each student's grade and whether they earned an A or B.

**Exercise 4 — FizzBuzz**
A classic programming challenge: loop from 1 to 50. Print "Fizz" if divisible by 3, "Buzz" if by 5, "FizzBuzz" if by both, and the number otherwise.

**Exercise 5 — List Comprehension Challenge**
Create a list of all numbers from 1-100 that are divisible by 7, using a list comprehension. Print the list and its length.

### Knowledge Check

**1.** What does `for item in ["a", "b", "c"]` do?
- A) Loops 3 times and assigns each element to `item`
- B) Loops until `item` equals "c"
- C) Prints "a", "b", "c"
- D) Loops forever

**Answer:** A

**2.** What does `range(2, 10, 2)` produce?
- A) `[2, 4, 6, 8, 10]`
- B) `[2, 4, 6, 8]`
- C) `[2, 10, 2]`
- D) `[0, 2, 4, 6, 8]`

**Answer:** B

**3.** What does `enumerate(["a", "b"])` return?
- A) `[0, 1]`
- B) Pairs of `(index, value)`: `(0, "a")`, `(1, "b")`
- C) The length of the list
- D) `["a", "b"]`

**Answer:** B

**4.** What is `[x * 2 for x in range(3)]`?
- A) `[0, 2, 4]`
- B) `[2, 4, 6]`
- C) `[1, 2, 3]`
- D) `[0, 1, 2]`

**Answer:** A

**5.** `zip(["a", "b"], [1, 2])` produces:
- A) `["a1", "b2"]`
- B) `("a", "b", 1, 2)`
- C) Pairs: `("a", 1)`, `("b", 2)`
- D) Error

**Answer:** C

**6.** What is the last value printed by `for i in range(5):`?
- A) `5`
- B) `4`
- C) `0`
- D) `1`

**Answer:** B

**7.** Which loop is best when you know the exact number of iterations?
- A) `while True`
- B) `while condition`
- C) `for` loop
- D) Both are equal

**Answer:** C

**8.** What is `range(10, 0, -1)` used for?
- A) Counting from 0 to 10
- B) Counting backwards from 10 to 1
- C) Counting backwards from 10 to 0
- D) Generating negative numbers

**Answer:** B

**9.** In a list comprehension `[x for x in range(5) if x > 2]`, what is produced?
- A) `[0, 1, 2]`
- B) `[3, 4]`
- C) `[2, 3, 4]`
- D) `[3, 4, 5]`

**Answer:** B

**10.** What does `for char in "Python":` iterate over?
- A) The word "Python" six times
- B) Each individual character: P, y, t, h, o, n
- C) The length of "Python"
- D) Numbers 0-5

**Answer:** B

### Reflections

1. You just automated repetitive tasks with loops. What is something tedious in your life that could be automated? How would a loop help?

2. List comprehensions make code more concise. Is shorter always better? Can you think of a time when longer, more readable code would be better than a one-liner?

3. In robotics, loops run thousands of times per second — checking sensors, updating motor speeds. How does understanding loops change how you think about what robots can do?

4. `enumerate()` pairs position with value. In your community, what do both position and value mean — the order things happened AND what those things were?

### Summary

- `for item in sequence:` iterates over any sequence: list, string, range
- `range(start, stop, step)` generates numeric sequences for counting loops
- `enumerate()` provides both index and value; `zip()` pairs two sequences together
- List comprehensions `[expr for x in seq]` create lists in one clean line
- For loops are best when you know what you are iterating over in advance

---

## Session 2.5: Nested Logic and Mini Project
**Duration:** 60 minutes | **Format:** Project Session

### Introduction

You now know conditionals and loops. Combined, they are the core logic toolkit of every program. In this session you will combine them to build more complex programs and complete a mini project.

**Learning Objectives:**
- Combine `for`/`while` loops with `if/elif/else`
- Use nested loops for 2D patterns
- Build a complete mini project that uses both

### Core Concepts

#### Loops with Conditionals

```python
scores = [72, 91, 58, 88, 95, 64, 77, 83, 49, 86]

passing = []
failing = []

for score in scores:
    if score >= 70:
        passing.append(score)
    else:
        failing.append(score)

print(f"Passing: {len(passing)} students — {passing}")
print(f"Failing: {len(failing)} students — {failing}")
print(f"Class average: {round(sum(scores)/len(scores), 1)}")
```

#### Nested Loops

```python
# Multiplication table grid
for row in range(1, 5):
    for col in range(1, 5):
        print(f"{row * col:4}", end="")
    print()  # new line after each row
```

#### Mini Project — Team Stats Tracker

```python
print("=== Umoja Robotics 7712 — Team Stats Tracker ===\n")

team_members = []
total_hours = []

# Collect data
num_members = int(input("How many team members? "))
for i in range(num_members):
    name = input(f"Member {i+1} name: ")
    hours = float(input(f"Hours contributed by {name} this week: "))
    team_members.append(name)
    total_hours.append(hours)

# Analysis
avg_hours = sum(total_hours) / len(total_hours)
top_index = total_hours.index(max(total_hours))

print("\n=== Weekly Report ===")
for name, hours in zip(team_members, total_hours):
    status = "above average" if hours > avg_hours else "below average"
    print(f"{name}: {hours} hrs ({status})")

print(f"\nTeam total: {sum(total_hours)} hours")
print(f"Average: {round(avg_hours, 1)} hours per person")
print(f"Top contributor: {team_members[top_index]} ({max(total_hours)} hrs)")
```

### Video Lessons

**Video 1 — Nested Loops in Python (Tech With Tim)**
Nested loops let you work with 2D structures like grids, matrices, and tables, but they need to be used carefully to avoid performance problems. Tim explains how nested loops work step by step, shows the execution order, and demonstrates common use cases like building multiplication tables and checking pairs of values. He also shows when to refactor nested loops into functions for readability.
https://www.youtube.com/watch?v=94UHCEmprCY

**Video 2 — Python Control Flow Mini Projects (Programming with Mosh)**
After learning individual control flow tools (if, while, for, break, continue), this video shows how to combine them in small practical programs. Mosh builds several beginner projects including a number game and a simple menu system that demonstrate real-world combinations of loops and conditionals. Watching someone build from scratch reveals design decisions you do not see in finished code.
https://www.youtube.com/watch?v=Zp5MuPOtsSY

**Video 3 — Python Logic Exercises Walkthrough (Socratica)**
This video works through a series of logic problems using Python conditionals and loops, emphasizing the problem-solving process rather than just the final code. You will see how to translate a written description into working code step by step. This is the kind of thinking practice that builds real programming skill.
https://www.youtube.com/watch?v=rfscVS0vtbw
### Practice Exercises

**Exercise 1 — Score Classifier**
Given a list of 8 scores, classify each as A/B/C/D/F and count how many students earned each grade. Print a grade distribution.

**Exercise 2 — Star Pattern**
Use nested loops to print a right triangle of stars:
```
*
**
***
****
*****
```

**Exercise 3 — Number Search**
Ask the user to enter 10 numbers. Then ask for a target number. Print whether the target was found and at what position(s).

**Exercise 4 — Mini Project: Scholarship Matcher**
Create a list of 5 scholarships, each with a minimum GPA requirement. Ask for the student's GPA. Print all scholarships they qualify for.

### Knowledge Check

**1.** What is a nested loop?
- A) A loop that never ends
- B) A loop inside another loop
- C) A loop with an if statement
- D) A while loop inside a for loop only

**Answer:** B

**2.** How many total iterations does a nested `for i in range(3): for j in range(3):` run?
- A) `3`
- B) `6`
- C) `9`
- D) `27`

**Answer:** C

**3.** In `for score in scores: if score >= 90: passing.append(score)` — what happens to scores below 90?
- A) They are deleted
- B) Nothing — they are simply skipped
- C) They go to a default list
- D) The loop stops

**Answer:** B

**4.** `total_hours.index(max(total_hours))` returns:
- A) The highest value
- B) The position of the highest value
- C) All values above average
- D) The length of the list

**Answer:** B

**5.** `print(f"{value:4}")` in a loop creates:
- A) A value multiplied by 4
- B) A value printed with 4-character width (aligned)
- C) An error
- D) The value repeated 4 times

**Answer:** B

**6.** To exit only the inner loop of a nested loop, use:
- A) `exit()`
- B) `return`
- C) `break`
- D) `continue outer`

**Answer:** C

**7.** `print()` with no arguments in a loop does what?
- A) Prints "None"
- B) Causes an error
- C) Prints a blank line (newline)
- D) Stops the loop

**Answer:** C

**8.** `end=""` in `print("*", end="")` does what?
- A) Prints a space after the star
- B) Stops the print from adding a newline
- C) Reverses the string
- D) Prints at the end of the line

**Answer:** B

**9.** Which is correct syntax for a for loop with a condition?
- A) `for x in list if x > 0:`
- B) `for x in list: if x > 0: print(x)`
- C) `for x in list where x > 0:`
- D) `for x > 0 in list:`

**Answer:** B

**10.** What does `list.index(value)` return?
- A) The value itself
- B) `True` if value exists
- C) The first index where the value appears
- D) All indexes where the value appears

**Answer:** C

### Reflections

1. You built a team stats tracker for Umoja Robotics. What other data would be useful to track for your team? Think beyond hours — what tells the story of how a team is doing?

2. Nested loops can get complex fast. What strategies help you keep track of which variable belongs to which loop?

3. You have completed 2 full weeks of Python. Look back at your very first program from Session 1.1. How far have you come? What can you build now that you could not then?

4. The programs you built this week — grade trackers, team stats, number analyzers — are the same building blocks used in real educational software. What educational tool would you build for ACCN if you had a full week?

### Summary

- Loops and conditionals combine to build powerful data processing logic
- Nested loops (`for` inside `for`) are used for grids, matrices, and multi-level data
- `list.index(max(list))` finds the position of the maximum value
- `print(..., end="")` suppresses the newline for building patterns or tables
- Two weeks in — you can write programs that collect data, make decisions, loop, and report results

---

# WEEK 3: Functions and Code Organization

## Session 3.1: What Are Functions and Why Do We Use Them?
**Duration:** 60 minutes | **Format:** Lecture + Hands-On Coding

### Introduction

Imagine writing the same grade-checking code 30 times — once for each student. That would be exhausting and error-prone. Functions let you write code once and use it anywhere. They are the single most important tool for writing clean, organized, reusable programs.

**Learning Objectives:**
- Understand what functions are and why they matter
- Define functions using `def`
- Call functions and understand the flow of execution
- Use docstrings to document functions

**Why it matters:** Every professional codebase is built from functions. Kimberly Bryant, founder of Black Girls Code, built programs that teach thousands of students to code — none of that works without functions.

### Core Concepts

#### Defining and Calling a Function

```python
# Define the function once
def greet_student(name):
    print(f"Welcome to ACCN Learning Hub, {name}!")
    print("Let's build something amazing today.")

# Call it as many times as you want
greet_student("Aaliyah")
greet_student("Marcus")
greet_student("Destiny")
```

#### Why Functions? The DRY Principle
DRY = Don't Repeat Yourself. Functions help you avoid copy-pasting code.

```python
# WITHOUT functions (repetitive)
score1 = 88
if score1 >= 90: grade1 = "A"
elif score1 >= 80: grade1 = "B"
else: grade1 = "C"

score2 = 72
if score2 >= 90: grade2 = "A"
elif score2 >= 80: grade2 = "B"
else: grade2 = "C"

# WITH a function (clean)
def get_grade(score):
    if score >= 90: return "A"
    elif score >= 80: return "B"
    elif score >= 70: return "C"
    elif score >= 60: return "D"
    else: return "F"

print(get_grade(88))   # B
print(get_grade(72))   # C
print(get_grade(95))   # A
```

#### Docstrings — Documenting Your Functions

```python
def calculate_average(scores):
    """
    Calculate the average of a list of scores.

    Args:
        scores (list): A list of numeric scores

    Returns:
        float: The average score, rounded to 2 decimal places
    """
    return round(sum(scores) / len(scores), 2)

print(calculate_average([88, 92, 76, 95]))  # 87.75
```

#### Functions Without Parameters

```python
def show_accn_banner():
    print("=" * 40)
    print("   ACCN Learning Hub")
    print("   Umoja Robotics 7712")
    print("   Build. Code. Lead.")
    print("=" * 40)

show_accn_banner()
```

### Video Lessons

**Video 1 — Python Functions (Corey Schafer)**
This is the definitive beginner tutorial on Python functions, covering definition, calling, parameters, return values, and the DRY (Don't Repeat Yourself) principle. Corey explains why functions are not just about saving lines of code, but about making code understandable, testable, and reusable. This video builds the mental model you need for every function you write going forward.
https://www.youtube.com/watch?v=9Os0o3wzS_I

**Video 2 — Why Functions Matter in Programming (Tech With Tim)**
Tim takes a different angle, demonstrating a messy program without functions and then refactoring it step by step into clean, function-based code. The before-and-after comparison makes it immediately clear why functions are central to good programming practice. After this video, the motivation for using functions will be obvious every time you write code.
https://www.youtube.com/watch?v=NSbOtYzIQI0

**Video 3 — Python Docstrings and Documentation (Programming with Mosh)**
Professional Python code includes docstrings — strings at the start of a function that explain what it does, what it takes, and what it returns. This video explains how to write effective docstrings using the standard format and how IDEs use them to show hints while coding. Writing good documentation is a professional habit worth building from the start.
https://www.youtube.com/watch?v=6tNS--WetLI
### Practice Exercises

**Exercise 1 — Greeter Function**
Write a function `greet(name, time_of_day)` that prints a personalized greeting based on the time: "morning", "afternoon", or "evening".

**Exercise 2 — Grade Function**
Write a `get_grade(score)` function that returns a letter grade. Test it with 10 different scores.

**Exercise 3 — Banner Function**
Write a function `print_banner(title, width=40)` that prints a formatted banner with any title and optional width.

**Exercise 4 — Is Even**
Write a function `is_even(number)` that returns `True` if the number is even, `False` if odd. Test with a loop from 1 to 10.

**Exercise 5 — Team Summary**
Write a function `team_summary(team_name, members, wins)` that prints a formatted summary of a robotics team.

### Knowledge Check

**1.** What keyword is used to define a function in Python?
- A) `function`
- B) `func`
- C) `def`
- D) `define`

**Answer:** C

**2.** What does DRY stand for?
- A) Define Repeat Yourself
- B) Don't Repeat Yourself
- C) Do Run Yourself
- D) Define Run Yield

**Answer:** B

**3.** How do you call a function named `greet`?
- A) `def greet()`
- B) `call greet()`
- C) `greet()`
- D) `run greet`

**Answer:** C

**4.** What is a docstring?
- A) A string variable used for output
- B) A multiline string that documents what a function does
- C) A comment using `#`
- D) A function that prints strings

**Answer:** B

**5.** A function defined with `def show():` takes:
- A) One required argument
- B) Any number of arguments
- C) No arguments
- D) Only keyword arguments

**Answer:** C

**6.** When is a function's code executed?
- A) When it is defined with `def`
- B) When it is called
- C) At the top of the file
- D) Automatically when the script runs

**Answer:** B

**7.** What is the benefit of using functions?
- A) Makes code run faster
- B) Avoids repeating code and makes programs more organized
- C) Required for all Python programs
- D) Only useful in large programs

**Answer:** B

**8.** How many times can a function be called?
- A) Once
- B) Twice
- C) Up to 10 times
- D) As many times as needed

**Answer:** D

**9.** What does `return` do in a function?
- A) Exits the entire program
- B) Sends a value back to where the function was called
- C) Prints the value
- D) Defines a new variable

**Answer:** B

**10.** Which correctly defines a function that takes no parameters?
- A) `def my_func:`
- B) `def my_func():`
- C) `function my_func():`
- D) `def my_func(none):`

**Answer:** B

### Reflections

1. Functions enforce the DRY principle. Where in your daily life do you apply this principle — doing something once in a way that saves you from having to do it again?

2. Kimberly Bryant built Black Girls Code to teach thousands of young Black women to code. Functions make that kind of scalable teaching possible in software. How does writing reusable code feel like a form of generosity?

3. A well-named function (`calculate_average`, `get_grade`) tells you what it does without reading the code inside. Why is naming important — in code and in life?

4. Think about the robot at Umoja Robotics 7712. What functions would you write for it? Name 3 functions a robot control program might need.

### Summary

- Functions are defined with `def function_name():` and called by name with `()`
- The DRY principle: write code once, reuse it everywhere
- Docstrings document what a function does, its arguments, and what it returns
- Functions run only when called — not when defined
- Every professional program is organized into functions

---

## Session 3.2: Parameters, Arguments, and Return Values
**Duration:** 60 minutes | **Format:** Lecture + Hands-On Coding

### Introduction

Functions become truly powerful when they accept inputs and give back outputs. Parameters are the placeholders; arguments are the actual values you pass in. Return values are what the function sends back. These three concepts unlock everything.

**Learning Objectives:**
- Distinguish between parameters and arguments
- Use default parameter values
- Use keyword arguments for clarity
- Return single and multiple values from functions

### Core Concepts

#### Parameters vs Arguments

```python
# 'name' and 'score' are parameters (placeholders)
def print_result(name, score):
    grade = "Pass" if score >= 70 else "Fail"
    print(f"{name}: {score}/100 — {grade}")

# "Marcus" and 92 are arguments (actual values)
print_result("Marcus", 92)
print_result("Destiny", 65)
```

#### Default Parameters

```python
def greet(name, language="English"):
    if language == "English":
        print(f"Hello, {name}!")
    elif language == "Spanish":
        print(f"Hola, {name}!")
    elif language == "Swahili":
        print(f"Habari, {name}!")

greet("Aaliyah")              # Uses default: English
greet("Marcus", "Spanish")
greet("Destiny", "Swahili")
```

#### Keyword Arguments

```python
def create_profile(name, age, team, role="Member"):
    print(f"Name: {name} | Age: {age} | Team: {team} | Role: {role}")

# Positional
create_profile("Jaylen", 16, "Umoja 7712")

# Keyword — order does not matter
create_profile(age=17, name="Brianna", team="Umoja 7712", role="Captain")
```

#### Return Values

```python
def calculate_bmi(weight_kg, height_m):
    bmi = weight_kg / (height_m ** 2)
    return round(bmi, 1)

bmi = calculate_bmi(70, 1.75)
print(f"BMI: {bmi}")

# Returning multiple values
def analyze_scores(scores):
    average = sum(scores) / len(scores)
    highest = max(scores)
    lowest = min(scores)
    return round(average, 1), highest, lowest

avg, high, low = analyze_scores([88, 92, 76, 95, 83])
print(f"Average: {avg} | High: {high} | Low: {low}")
```

#### Functions Calling Functions

```python
def get_grade(score):
    if score >= 90: return "A"
    elif score >= 80: return "B"
    elif score >= 70: return "C"
    else: return "Below C"

def print_report(name, score):
    grade = get_grade(score)      # calling another function
    print(f"{name}: {score} ({grade})")

print_report("Trevon", 87)
print_report("Aaliyah", 94)
```

### Video Lessons

**Video 1 — Python Function Parameters and Arguments (Corey Schafer)**
Corey explains the difference between positional arguments, keyword arguments, default values, and `*args`/`**kwargs`, with examples showing when each is appropriate. He demonstrates how default parameters make functions more flexible and how keyword arguments make function calls self-documenting. This is the video to watch when your functions need to handle varied inputs.
https://www.youtube.com/watch?v=WB4hJJkfhLU

**Video 2 — Return Values in Python (Tech With Tim)**
Return values are how functions communicate results back to the rest of your program, and Tim explains every aspect: returning single values, multiple values as tuples, and what happens when you return nothing (None). He also shows common mistakes like forgetting to capture the return value and returning inside a loop by accident. Understanding return values is essential for writing functions that actually work together.
https://www.youtube.com/watch?v=6tNS--WetLI

**Video 3 — Python Functions Deep Dive (Programming with Mosh)**
This video goes deeper into functions: first-class functions, passing functions as arguments, and lambda expressions. Mosh explains these concepts with practical examples that show how Python functions are more powerful and flexible than functions in many other languages. These patterns appear everywhere in Python's standard library and third-party packages.
https://www.youtube.com/watch?v=u-OmVr_fT4s
### Practice Exercises

**Exercise 1 — Temperature Converter**
Write `celsius_to_fahrenheit(c)` and `fahrenheit_to_celsius(f)` functions. Test both.

**Exercise 2 — Scholarship Eligibility**
Write `is_eligible(gpa, service_hours, essay_submitted=False)` that returns `True` or `False`. Use a default for `essay_submitted`.

**Exercise 3 — Song Stats**
Write `song_stats(title, artist, bpm, duration_seconds)` that returns the song's vibe ("chill"/<80 bpm, "mid"/80-120, "hype"/>120) and duration in minutes:seconds format.

**Exercise 4 — Return Multiple**
Write a function `min_max_avg(numbers)` that returns three values: minimum, maximum, and average of a list.

**Exercise 5 — Compound Interest**
Write `compound_interest(principal, rate, years)` that calculates and returns the final amount. Formula: `principal * (1 + rate) ** years`.

### Knowledge Check

**1.** A parameter is:
- A) The value passed when calling a function
- B) The placeholder defined in the function signature
- C) A variable inside the function body
- D) The return value

**Answer:** B

**2.** An argument is:
- A) A placeholder in the function definition
- B) The actual value passed when calling the function
- C) A default value
- D) The function name

**Answer:** B

**3.** What does `def greet(name="World"):` do?
- A) Requires `name` to always be passed
- B) Makes `name` optional with default value "World"
- C) Causes an error
- D) Ignores the `name` parameter

**Answer:** B

**4.** What does `return a, b` in a function do?
- A) Returns only `a`
- B) Returns a tuple of both values
- C) Causes an error
- D) Prints both values

**Answer:** B

**5.** Which is a keyword argument call?
- A) `func(5, 10)`
- B) `func(x=5, y=10)`
- C) `func(5, y)`
- D) `func(x, 10)`

**Answer:** B

**6.** What happens after `return` executes in a function?
- A) The function continues running
- B) An error occurs
- C) The function stops and the value is sent back
- D) The program ends

**Answer:** C

**7.** Can a function return multiple values in Python?
- A) No — only one value is allowed
- B) Yes — using a tuple
- C) Only with special syntax
- D) Only in Python 3.10+

**Answer:** B

**8.** `avg, high, low = analyze_scores(scores)` works because:
- A) Python guesses which variable gets which value
- B) The function returns a tuple of 3 values that are unpacked
- C) Multiple assignment is only for functions
- D) It causes an error

**Answer:** B

**9.** Default parameters must come:
- A) Before non-default parameters
- B) After non-default parameters
- C) In any order
- D) In alphabetical order

**Answer:** B

**10.** A function that calls another function is an example of:
- A) Recursion
- B) Function chaining / composition
- C) Inheritance
- D) An error pattern

**Answer:** B

### Reflections

1. Default parameters make functions flexible — you can call them the simple way most of the time. Where in real life do you use "defaults" that you only change when necessary?

2. Returning multiple values from one function is powerful. What real-world scenario would benefit from a function that gives back several related pieces of information at once?

3. Functions calling other functions builds programs in layers. The highest-level function handles the "what", lower-level functions handle the "how". Is that how teams at ACCN/Umoja work too?

4. How does writing clear function signatures (good names, good parameters) make collaboration easier? Think about working on code with your teammates.

### Summary

- Parameters are placeholders; arguments are the actual values passed at call time
- Default parameters (`def f(x=10):`) make arguments optional
- Keyword arguments (`func(name="Marcus")`) clarify which value goes where
- Functions can return multiple values as a tuple, which can be unpacked
- Functions can call other functions — building programs in logical layers

---

## Session 3.3: Scope — Local vs Global Variables
**Duration:** 60 minutes | **Format:** Lecture + Discussion

### Introduction

Variables do not exist everywhere — they have scope. A variable created inside a function only lives there. Understanding scope prevents some of the most confusing bugs beginners encounter.

**Learning Objectives:**
- Understand local and global scope
- Use the `global` keyword correctly
- Understand why scope makes programs safer
- Avoid common scope bugs

### Core Concepts

#### Local Scope

```python
def calculate_score():
    points = 100      # local — only exists inside this function
    print(points)

calculate_score()
# print(points)  # NameError! 'points' doesn't exist out here
```

#### Global Scope

```python
team_name = "Umoja Robotics 7712"   # global — exists everywhere

def show_team():
    print(f"Team: {team_name}")     # can READ global

def change_team():
    global team_name                # must declare to MODIFY global
    team_name = "ACCN Robotics"

show_team()
change_team()
show_team()
```

#### Why Scope Matters

```python
# Good pattern: pass values in, return results out
def add_bonus(score, bonus=10):
    return score + bonus

final = add_bonus(85)
print(final)  # 95

# Avoid overusing global — it makes code harder to debug
```

#### Scope in Nested Functions

```python
def outer():
    message = "Hello from outer"

    def inner():
        print(message)   # inner can read outer's variables

    inner()

outer()
```

### Video Lessons

**Video 1 — Python Variable Scope (Corey Schafer)**
Scope determines where in your code a variable is visible and modifiable, and bugs from scope misunderstandings are among the most confusing for beginners. Corey explains local scope, enclosing scope, global scope, and built-in scope with the LEGB rule, using clear visual examples. After this video, you will understand exactly why a variable "does not exist" even when you just defined it.
https://www.youtube.com/watch?v=QVdf0LgmICw

**Video 2 — Global vs Local Variables (Tech With Tim)**
Tim focuses on the most common scope confusion: when to use global variables and why they should be avoided in most cases. He demonstrates the `global` keyword, explains why it creates fragile code, and shows cleaner alternatives using function parameters and return values. This is an important lesson in writing code that is easy to understand and debug.
https://www.youtube.com/watch?v=jXugs4B3lwU

**Video 3 — Python Scope and the LEGB Rule (Real Python)**
Real Python's visual explanation of the LEGB (Local, Enclosing, Global, Built-in) scope resolution order makes it concrete and memorable. The video includes examples of all four scope levels and shows exactly how Python decides which variable to use when names conflict. This is the most thorough explanation of Python scope available for beginners.
https://www.youtube.com/watch?v=QVdf0LgmICw
### Practice Exercises

**Exercise 1 — Scope Experiment**
Define a variable `x = 10` globally. Create a function that defines its own `x = 99`. Print both inside and outside the function. Observe what happens.

**Exercise 2 — Counter with Global**
Create a global `count = 0`. Write a function `increment()` that uses the `global` keyword to increase count by 1. Call it 5 times and print the final count.

**Exercise 3 — Refactor Challenge**
This broken code uses global incorrectly. Refactor it to use parameters and return values instead:
```python
total = 0
def add_score(s):
    global total
    total = total + s
```

**Exercise 4 — Scope Quiz**
Without running the code, predict what each prints:
```python
x = "global"
def f():
    x = "local"
    print(x)
f()
print(x)
```

### Knowledge Check

**1.** A local variable is:
- A) One defined at the top of the file
- B) One defined inside a function
- C) One shared across all functions
- D) One that is imported

**Answer:** B

**2.** A global variable is:
- A) One defined inside a function
- B) One defined outside all functions, at module level
- C) One that works in other files
- D) One declared with `global`

**Answer:** B

**3.** What happens if you try to use a local variable outside its function?
- A) It returns `None`
- B) It uses the global value instead
- C) A `NameError` occurs
- D) Nothing happens

**Answer:** C

**4.** To modify a global variable inside a function, use:
- A) `modify varname`
- B) `global varname`
- C) `extern varname`
- D) No special keyword needed

**Answer:** B

**5.** Which is better practice?
- A) Using global variables for everything
- B) Passing values as parameters and returning results
- C) Avoiding functions entirely
- D) Using `global` in every function

**Answer:** B

**6.** A function can READ a global variable without `global`:
- A) False — always need `global`
- B) True — reading is fine; only modification needs `global`
- C) Only in Python 2
- D) Only for strings

**Answer:** B

**7.** What is the output?
```python
x = 5
def f():
    x = 10
f()
print(x)
```
- A) `10`
- B) `5`
- C) `NameError`
- D) `None`

**Answer:** B

**8.** Why is overusing `global` considered bad practice?
- A) It slows the program down
- B) It makes code harder to test and debug since any function can change shared state
- C) It causes syntax errors
- D) It uses more memory

**Answer:** B

**9.** LEGB stands for the scope lookup order. What does it stand for?
- A) Local, Enclosed, Global, Built-in
- B) Loop, Else, Global, Boolean
- C) List, Enum, Global, Builtin
- D) Local, External, Get, Build

**Answer:** A

**10.** An inner function can access variables from its outer function. This is called:
- A) Global scope
- B) Local scope
- C) Enclosing scope
- D) Built-in scope

**Answer:** C

### Reflections

1. Scope creates boundaries — variables stay where they belong. Where in real life are boundaries important for safety and clarity?

2. Using `global` makes it easy to share data but harder to debug. How does this parallel the difference between sharing everything openly vs having clear individual responsibilities in a team?

3. If a function cannot find a variable locally, it looks in the enclosing and then global scope. How is this like how you solve problems — looking locally first, then asking for help?

4. Can you think of a real robot program where a global variable would be genuinely useful vs. one where it would cause problems?

### Summary

- Variables defined inside a function are local and cannot be accessed outside
- Variables defined outside all functions are global and can be read anywhere
- Use the `global` keyword only when you need to modify a global inside a function
- Prefer parameters and return values over global variables — it makes code cleaner
- Python's scope lookup order is LEGB: Local → Enclosed → Global → Built-in

---

## Session 3.4: Built-in Functions and Importing Modules
**Duration:** 60 minutes | **Format:** Lecture + Exploration

### Introduction

Python comes with hundreds of tools built in — you do not need to build everything from scratch. This session explores Python's most useful built-in functions and how to extend Python's power by importing modules from its massive standard library.

**Learning Objectives:**
- Use key built-in functions: `len()`, `sorted()`, `reversed()`, `zip()`, `map()`, `filter()`
- Import and use standard library modules: `math`, `random`, `datetime`, `os`
- Understand the difference between built-ins and modules

### Core Concepts

#### Essential Built-in Functions

```python
scores = [88, 72, 95, 61, 83, 91, 77]

print(len(scores))              # 7 — length
print(sum(scores))              # 567 — total
print(max(scores))              # 95 — largest
print(min(scores))              # 61 — smallest
print(sorted(scores))           # [61, 72, 77, 83, 88, 91, 95]
print(sorted(scores, reverse=True))  # descending

# enumerate — index + value
for i, score in enumerate(scores, 1):
    print(f"Student {i}: {score}")

# zip — pair two sequences
names = ["Aaliyah", "Marcus", "Destiny"]
for name, score in zip(names, scores):
    print(f"{name}: {score}")
```

#### map() and filter()

```python
scores = [88, 72, 95, 61, 83]

# map — apply function to every item
doubled = list(map(lambda x: x * 2, scores))
print(doubled)

# filter — keep only items that match condition
passing = list(filter(lambda x: x >= 70, scores))
print(passing)  # [88, 72, 95, 83]
```

#### The random Module

```python
import random

# Random integer
dice = random.randint(1, 6)
print(f"Rolled a {dice}")

# Random choice from a list
team = ["Aaliyah", "Marcus", "Destiny", "Jaylen"]
presenter = random.choice(team)
print(f"Today's presenter: {presenter}")

# Shuffle a list
random.shuffle(team)
print(f"Random order: {team}")
```

#### The datetime Module

```python
from datetime import datetime, date

today = date.today()
now = datetime.now()

print(f"Today's date: {today}")
print(f"Current time: {now.strftime('%I:%M %p')}")

# Days until a deadline
deadline = date(2026, 5, 15)
days_left = (deadline - today).days
print(f"Days until deadline: {days_left}")
```

### Video Lessons

**Video 1 — Python Built-in Functions (Corey Schafer)**
Python comes with dozens of powerful built-in functions that are available without any import, and this video covers the most important ones: `len()`, `range()`, `enumerate()`, `zip()`, `map()`, `filter()`, `sorted()`, and more. Corey shows practical examples of each and explains which ones appear most often in real code. This video will immediately make your code cleaner and more Pythonic.
https://www.youtube.com/watch?v=p15xzjzR9j0

**Video 2 — Python Standard Library Overview (Tech With Tim)**
Python's standard library contains modules for almost everything: math, random, datetime, os, json, csv, and hundreds more. Tim walks through the most useful modules, showing how to import them and demonstrating their most practical functions. After this video, you will know where to look before writing functionality that Python already provides.
https://www.youtube.com/watch?v=QVdf0LgmICw

**Video 3 — map(), filter(), and lambda in Python (CS Dojo)**
`map()` applies a function to every item in a list, `filter()` selects items that meet a condition, and `lambda` creates small inline functions — these three tools work beautifully together. CS Dojo explains each with clear examples and shows how they compare to list comprehensions. Understanding functional tools like these is a stepping stone toward writing elegant, data-processing Python code.
https://www.youtube.com/watch?v=hUes6y2b--0
### Practice Exercises

**Exercise 1 — Sorted Leaderboard**
Given a list of names and scores, print a leaderboard sorted from highest to lowest score using `zip()` and `sorted()`.

**Exercise 2 — Random Team Picker**
Use `random.choice()` to randomly pick who presents from a team list. Ask if they want to pick again. Run in a while loop.

**Exercise 3 — Scholarship Deadline Tracker**
Use `datetime` to calculate how many days remain until 3 different scholarship deadlines. Print them in order from soonest to latest.

**Exercise 4 — Filter Challenge**
Given a list of mixed scores, use `filter()` to separate passing (>=70) from failing. Print both lists.

**Exercise 5 — map() Practice**
Given a list of Celsius temperatures, use `map()` to convert all to Fahrenheit. Print both lists side by side.

### Knowledge Check

**1.** `sorted([3,1,2])` returns:
- A) `None`
- B) `[3,1,2]` unchanged
- C) `[1,2,3]`
- D) `(1,2,3)`

**Answer:** C

**2.** What does `random.randint(1, 10)` return?
- A) A float between 1 and 10
- B) A random integer from 1 to 10 inclusive
- C) Always 5
- D) A random integer from 0 to 9

**Answer:** B

**3.** `filter(func, list)` returns items where:
- A) The function returns `False`
- B) The function returns `None`
- C) The function returns `True`
- D) The item equals the function

**Answer:** C

**4.** To use `datetime`, you must:
- A) Install it with pip
- B) Write it yourself
- C) Import it from Python's standard library
- D) Nothing — it works automatically

**Answer:** C

**5.** `map(lambda x: x**2, [1,2,3])` produces:
- A) `[1, 4, 9]`
- B) `[2, 4, 6]`
- C) `[1, 2, 3]`
- D) A map object you need to wrap in `list()`

**Answer:** D (technically produces a map object; wrap in list() to see [1,4,9])

**6.** What is the difference between a built-in function and a module function?
- A) No difference
- B) Built-ins are always available; module functions require `import`
- C) Module functions are faster
- D) Built-ins require installation

**Answer:** B

**7.** `random.shuffle(my_list)` does what?
- A) Returns a new shuffled list
- B) Shuffles the list in place and returns None
- C) Creates a sorted version
- D) Removes duplicates

**Answer:** B

**8.** `sorted(scores, reverse=True)` sorts:
- A) Alphabetically
- B) From lowest to highest
- C) From highest to lowest
- D) Randomly

**Answer:** C

**9.** `from datetime import date` vs `import datetime` — what is the difference?
- A) No difference
- B) `from` imports only `date`; `import` imports the whole module
- C) `from` is slower
- D) `import` only gets `date`

**Answer:** B

**10.** Which built-in converts a map object to a list?
- A) `convert()`
- B) `array()`
- C) `list()`
- D) `make_list()`

**Answer:** C

### Reflections

1. Python's standard library means you rarely start from zero. How does having a strong support system — in code and in life — change what you are able to build?

2. `random.choice()` picks randomly. In robotics, randomness can be useful (testing) or dangerous (control). When is randomness appropriate in a program?

3. `datetime` lets you work with time. What features of an ACCN student portal would need to track time — assignment deadlines, session progress, event calendars?

4. `map()` and `filter()` apply operations to entire lists at once. How is this like batch processing in the real world — doing the same thing to many people or items efficiently?

### Summary

- Built-in functions like `sorted()`, `len()`, `max()`, `min()`, `zip()`, `enumerate()` are always available
- `map(func, list)` applies a function to every item; `filter(func, list)` keeps items where func returns True
- The `random` module provides `randint()`, `choice()`, `shuffle()` for randomness
- The `datetime` module works with dates and times — useful for deadlines, calendars, and timestamps
- Import standard library modules with `import module` or `from module import name`

---

## Session 3.5: Building Your Own Module and Mini Library
**Duration:** 60 minutes | **Format:** Project + Lab

### Introduction

Professional programmers organize their code into separate files called modules. This makes programs easier to read, test, and share. In this session you will build your own Python module — a mini library of functions you can reuse in future projects.

**Learning Objectives:**
- Create a Python module (`.py` file) with reusable functions
- Import your own module
- Use `if __name__ == "__main__":` correctly
- Understand the structure of a professional Python file

### Core Concepts

#### What is a Module?
A module is simply a `.py` file containing functions, variables, and classes that other files can import.

**File: accn_utils.py**
```python
"""
accn_utils.py
ACCN Learning Hub — Utility Functions
Reusable tools for ACCN student programs.
"""

def get_grade(score):
    """Return letter grade for a numeric score."""
    if score >= 90: return "A"
    elif score >= 80: return "B"
    elif score >= 70: return "C"
    elif score >= 60: return "D"
    else: return "F"

def calculate_average(numbers):
    """Return the average of a list of numbers."""
    if not numbers:
        return 0
    return round(sum(numbers) / len(numbers), 2)

def format_name(first, last):
    """Return properly capitalized full name."""
    return f"{first.strip().title()} {last.strip().title()}"

def is_passing(score, threshold=70):
    """Return True if score meets the passing threshold."""
    return score >= threshold

ACCN_MOTTO = "Build. Code. Lead."
TEAM_NUMBER = 7712
```

#### Using Your Module

**File: main.py**
```python
import accn_utils

print(accn_utils.get_grade(88))           # B
print(accn_utils.calculate_average([88, 92, 76]))  # 85.33
print(accn_utils.format_name("marcus", "johnson")) # Marcus Johnson
print(accn_utils.ACCN_MOTTO)
print(accn_utils.TEAM_NUMBER)

# OR import specific items
from accn_utils import get_grade, ACCN_MOTTO
print(get_grade(95))   # A
print(ACCN_MOTTO)
```

#### `if __name__ == "__main__":`

```python
# In accn_utils.py — add at the bottom:
if __name__ == "__main__":
    # This only runs when you execute accn_utils.py directly
    # NOT when it is imported by another file
    print("Testing accn_utils module...")
    print(get_grade(88))
    print(calculate_average([80, 90, 70]))
    print("All tests passed!")
```

### Video Lessons

**Video 1 — Python Modules and Packages (Corey Schafer)**
This video explains how to organize Python code into modules (separate files) and packages (directories of modules), following the conventions used by professional Python projects. Corey shows how to import from your own modules, how namespace conflicts work, and how to structure a project folder properly. Building modular code now will save you hours of confusion on larger projects.
https://www.youtube.com/watch?v=7lmCu8wz8ro

**Video 2 — if __name__ == "__main__" Explained (Tech With Tim)**
This line appears in almost every Python script, and Tim explains exactly what it means and why it matters. You will understand how Python sets the `__name__` variable and how this pattern lets a file be both a runnable script and an importable module. This is one of those concepts that makes experienced Python code look different from beginner code.
https://www.youtube.com/watch?v=sugvnHA7ElY

**Video 3 — Organizing Python Projects (Programming with Mosh)**
Mosh walks through building a multi-file Python project from scratch, showing how to separate concerns into different modules, how to import between files, and how to use `__init__.py` to create packages. The real-world project structure he demonstrates is similar to what you see in professional open-source Python projects. This is the foundation for building anything beyond a single script.
https://www.youtube.com/watch?v=QVdf0LgmICw
### Practice Exercises

**Exercise 1 — Build accn_utils.py**
Create the `accn_utils.py` module with all functions from the Core Concepts section. Add `if __name__ == "__main__":` with tests for each function.

**Exercise 2 — Add to Your Module**
Add these functions to `accn_utils.py`:
- `days_until(year, month, day)` — returns days until a future date
- `bpm_to_vibe(bpm)` — returns "chill", "mid", or "hype"
- `team_report(names, hours)` — prints a formatted team hours report

**Exercise 3 — Use Your Module**
Create `week3_project.py` that imports `accn_utils` and uses at least 4 of its functions to build a student report generator.

**Exercise 4 — Module Documentation**
Write a proper docstring at the top of your module with: module name, description, author, and date.

### Knowledge Check

**1.** A Python module is:
- A) A built-in function
- B) A `.py` file containing reusable code
- C) A type of loop
- D) A Python class

**Answer:** B

**2.** To import your own module `mytools.py`, use:
- A) `include mytools`
- B) `require("mytools")`
- C) `import mytools`
- D) `load mytools`

**Answer:** C

**3.** `from mytools import greet` does what?
- A) Imports the entire mytools module
- B) Imports only the `greet` function
- C) Runs the `greet` function
- D) Deletes other functions

**Answer:** B

**4.** `if __name__ == "__main__":` runs:
- A) Always when the file is imported
- B) Never
- C) Only when the file is run directly, not when imported
- D) Only in Python 3.9+

**Answer:** C

**5.** A module-level variable like `TEAM_NUMBER = 7712` is:
- A) Only accessible inside functions
- B) Accessible anywhere the module is imported
- C) A constant that cannot be changed
- D) An error

**Answer:** B

**6.** What is the purpose of a module docstring?
- A) Required for the module to run
- B) Describes what the module does for other developers
- C) Defines the module's functions automatically
- D) Replaces import statements

**Answer:** B

**7.** `import accn_utils` then `accn_utils.get_grade(90)` — the dot `.` means:
- A) Decimal point
- B) Access the `get_grade` attribute of the `accn_utils` module
- C) Multiply
- D) String separator

**Answer:** B

**8.** Why organize code into modules?
- A) It makes code run faster
- B) Python requires it for large programs
- C) It makes code reusable, organized, and easier to maintain
- D) It reduces the number of variables needed

**Answer:** C

**9.** If `mymodule.py` has `x = 5` at the top, you access it with:
- A) `x`
- B) `get_x()`
- C) `mymodule.x`
- D) `global x`

**Answer:** C

**10.** Which is NOT a benefit of using modules?
- A) Code reuse across multiple projects
- B) Cleaner, more organized files
- C) Automatic documentation generation
- D) Easier testing of individual functions

**Answer:** C

### Reflections

1. You just built a reusable library of tools. How does creating something reusable — code, a template, a guide — multiply your impact beyond the single moment you made it?

2. The ACCN Learning Hub itself is a kind of module — reusable lessons that multiple students can import into their learning. How does this session change how you think about sharing knowledge?

3. `if __name__ == "__main__":` protects code from running when imported. What does it mean to have code that is safe to share without unexpected side effects?

4. Three weeks of Python complete. What function in `accn_utils.py` are you most proud of? What would you add to it next?

### Summary

- A module is a `.py` file of reusable functions and variables
- Import with `import module_name` or `from module_name import func`
- Use `if __name__ == "__main__":` to protect test code from running on import
- Module-level variables and functions are accessed with dot notation: `module.name`
- Professional Python programs are organized into multiple modules, not one giant file

---

# WEEK 4: Working with Data Structures

## Session 4.1: Lists and Indexing
**Duration:** 60 minutes | **Format:** Lecture + Hands-On Coding

### Introduction

A playlist. A team roster. A list of scholarships. A record of robot sensor readings. All of these are lists in Python — ordered collections that can grow, shrink, and be searched. Lists are the most fundamental data structure you will use.

**Learning Objectives:**
- Create lists and access elements by index
- Use negative indexing and slicing
- Understand that lists are mutable (changeable)
- Use `len()`, `in`, and basic list operations

### Core Concepts

#### Creating and Accessing Lists

```python
# A real playlist
playlist = [
    "Kendrick Lamar - HUMBLE.",
    "Tyler the Creator - EARFQUAKE",
    "SZA - Kill Bill",
    "Baby Keem - family ties",
    "Janelle Monae - Make Me Feel"
]

team_7712 = ["Aaliyah", "Marcus", "Destiny", "Jaylen", "Brianna", "Trevon"]

# Indexing
print(playlist[0])    # First song
print(playlist[-1])   # Last song
print(team_7712[2])   # Destiny

# Length
print(len(playlist))   # 5
print(len(team_7712))  # 6
```

#### Slicing

```python
scores = [88, 72, 95, 61, 83, 91, 77, 68, 84, 90]

print(scores[2:5])    # [95, 61, 83] — index 2, 3, 4
print(scores[:3])     # [88, 72, 95] — first 3
print(scores[-3:])    # [68, 84, 90] — last 3
print(scores[::2])    # every other score
print(scores[::-1])   # reversed

# Slicing is non-destructive — original is unchanged
top_three = sorted(scores, reverse=True)[:3]
print(f"Top 3 scores: {top_three}")
```

#### Lists Are Mutable

```python
team = ["Aaliyah", "Marcus", "Destiny"]

# Change an element
team[1] = "Jerome"
print(team)   # ["Aaliyah", "Jerome", "Destiny"]

# Check membership
print("Aaliyah" in team)   # True
print("Marcus" in team)    # False (was replaced)

# Combining lists
extra = ["Jaylen", "Brianna"]
full_team = team + extra
print(full_team)
```

#### Mixed Types and Nested Lists

```python
# Lists can hold any type
student = ["Destiny", 17, 3.8, True, ["Math", "CS", "Physics"]]
print(student[4][1])  # CS — accessing nested list

# List of lists (like a table)
scores_table = [
    ["Aaliyah", 92, 88, 95],
    ["Marcus", 78, 84, 81],
    ["Destiny", 96, 91, 94]
]
for row in scores_table:
    print(f"{row[0]}: avg {sum(row[1:])/3:.1f}")
```

### Video Lessons

**Video 1 — Python Lists (Corey Schafer)**
Lists are Python's most versatile data structure, and this video covers creation, indexing, slicing, nesting, and iteration with clear examples. Corey explains how lists work in memory (as references, not copies) and shows the common mistakes beginners make when modifying lists. This is the foundational video for understanding every list-based program you will write.
https://www.youtube.com/watch?v=W8KRzm-HUcc

**Video 2 — Python List Slicing (Tech With Tim)**
Slicing lets you extract any portion of a list with a start, stop, and step index, and the syntax is one of Python's most powerful features. Tim walks through every form of slicing including negative indices, step values, and how to reverse a list in one line. After this video, you will see slicing as a precision tool rather than something to avoid.
https://www.youtube.com/watch?v=ajrtAuDg3yw

**Video 3 — Python Data Structures Overview (CS Dojo)**
CS Dojo provides an intuition-building overview of Python's four main data structures — lists, tuples, sets, and dictionaries — and when to use each one. Understanding the right structure for the job makes programs faster, cleaner, and easier to reason about. This is the big-picture video to watch before you study each structure in depth.
https://www.youtube.com/watch?v=R-HLU9Fl5ug
### Practice Exercises

**Exercise 1 — Playlist Manager**
Create a playlist of 5 songs. Print: the first song, the last song, the middle song, and the playlist in reverse order.

**Exercise 2 — Score Slicer**
Given `scores = [88, 72, 95, 61, 83, 91, 77, 68, 84, 90]`, use slicing to print: top half, bottom half, every other score, and the 3 highest scores (hint: sort first).

**Exercise 3 — Team Table**
Create a list of lists where each inner list has a team member's name and their contribution hours. Print a formatted table with row numbers.

**Exercise 4 — Membership Check**
Ask the user for a name. Check if they are in the Umoja 7712 team roster. Print a personalized message either way.

**Exercise 5 — Negative Index Quiz**
For a list of 6 items, print: the last item, the second-to-last, and the third-from-last using negative indexing only.

### Knowledge Check

**1.** What is the index of the first element in a Python list?
- A) `1`
- B) `-1`
- C) `0`
- D) Depends on the list

**Answer:** C

**2.** What does `my_list[-1]` access?
- A) The first element
- B) An error
- C) The last element
- D) The middle element

**Answer:** C

**3.** `[1, 2, 3, 4, 5][1:4]` returns:
- A) `[1, 2, 3]`
- B) `[2, 3, 4]`
- C) `[2, 3, 4, 5]`
- D) `[1, 2, 3, 4]`

**Answer:** B

**4.** Lists in Python are:
- A) Immutable — cannot be changed after creation
- B) Mutable — can be changed after creation
- C) Fixed size
- D) Only able to hold one data type

**Answer:** B

**5.** `"Marcus" in ["Aaliyah", "Marcus", "Destiny"]` returns:
- A) `0`
- B) `1`
- C) `True`
- D) `"Marcus"`

**Answer:** C

**6.** `list1 + list2` does what?
- A) Adds corresponding elements
- B) Creates a new list by concatenating both
- C) Modifies list1 in place
- D) Raises an error

**Answer:** B

**7.** `scores[::2]` returns:
- A) The first 2 elements
- B) Every other element starting from index 0
- C) Elements at index 2 and beyond
- D) The last 2 elements

**Answer:** B

**8.** What does `len([1, 2, 3, 4, 5])` return?
- A) `4`
- B) `5`
- C) `6`
- D) The sum

**Answer:** B

**9.** To access the second element of an inner list in `data[0]`:
- A) `data[0, 1]`
- B) `data[0][1]`
- C) `data[1][0]`
- D) `data.get(0, 1)`

**Answer:** B

**10.** `scores[::-1]` does what?
- A) Deletes the list
- B) Returns a reversed copy of the list
- C) Sorts in descending order
- D) Returns the last element

**Answer:** B

### Reflections

1. Lists are ordered — the order matters. In what real-life situations does order carry meaning? (A history, a playlist, a queue for help)

2. Negative indexing lets you count from the back. When is it more natural to think about the "last" or "most recent" item rather than the first?

3. Lists of lists create tables. Think about a spreadsheet or a robot's sensor log. How would you design a list-of-lists to track Umoja 7712's match results over a season?

4. Mutability means you can change data. What are the risks of having data that can be changed by anyone? How do real systems protect important data?

### Summary

- Lists are ordered, mutable collections created with `[item1, item2, ...]`
- Access elements with positive indexes (`list[0]`) or negative (`list[-1]`)
- Slicing `list[start:stop:step]` extracts portions without modifying the original
- `len()` returns the number of items; `in` checks membership
- Lists can hold any types and can be nested (lists of lists)

---

## Session 4.2: List Methods and Manipulation
**Duration:** 60 minutes | **Format:** Lecture + Hands-On Coding

### Introduction

Lists have powerful built-in methods that let you add, remove, sort, and search through data. These methods are what make lists truly useful as a programming tool.

**Learning Objectives:**
- Use list methods: `.append()`, `.insert()`, `.remove()`, `.pop()`, `.sort()`, `.reverse()`, `.count()`, `.index()`
- Understand the difference between in-place and returning methods
- Build a dynamic list-based program

### Core Concepts

#### Adding and Removing Elements

```python
team = ["Aaliyah", "Marcus", "Destiny"]

# Add to end
team.append("Jaylen")
print(team)   # ['Aaliyah', 'Marcus', 'Destiny', 'Jaylen']

# Add at specific position
team.insert(1, "Brianna")
print(team)   # ['Aaliyah', 'Brianna', 'Marcus', 'Destiny', 'Jaylen']

# Remove by value
team.remove("Marcus")
print(team)

# Remove by index (returns the removed item)
removed = team.pop(0)
print(f"Removed: {removed}")
print(team)

# Remove last item
last = team.pop()
print(f"Last: {last}")
```

#### Sorting and Reversing

```python
scores = [88, 72, 95, 61, 83]

# Sort in place (modifies original)
scores.sort()
print(scores)   # [61, 72, 83, 88, 95]

scores.sort(reverse=True)
print(scores)   # [95, 88, 83, 72, 61]

# Reverse in place
names = ["Destiny", "Aaliyah", "Marcus"]
names.reverse()
print(names)

# sorted() — returns new list, original unchanged
original = [5, 2, 8, 1]
new_sorted = sorted(original)
print(original)    # [5, 2, 8, 1] — unchanged
print(new_sorted)  # [1, 2, 5, 8]
```

#### Searching and Counting

```python
playlist = ["HUMBLE.", "EARFQUAKE", "HUMBLE.", "Kill Bill", "HUMBLE."]

print(playlist.count("HUMBLE."))     # 3
print(playlist.index("EARFQUAKE"))   # 1
print("Kill Bill" in playlist)       # True
print(playlist.index("HUMBLE."))     # 0 — first occurrence only
```

#### Copying Lists

```python
original = [1, 2, 3]

# WRONG — both point to the same list!
alias = original
alias.append(4)
print(original)   # [1, 2, 3, 4] — changed!

# CORRECT — make a real copy
copy = original.copy()
copy.append(99)
print(original)   # [1, 2, 3, 4] — unchanged
print(copy)       # [1, 2, 3, 4, 99]
```

### Video Lessons

**Video 1 — Python List Methods (Corey Schafer)**
Python lists come with powerful built-in methods like `append()`, `extend()`, `insert()`, `remove()`, `pop()`, `sort()`, and `reverse()`, and Corey covers every important one with live code examples. He explains the difference between methods that modify the list in-place and those that return new lists, which is a source of common bugs. After this video you will know the right method for every list operation.
https://www.youtube.com/watch?v=W8KRzm-HUcc

**Video 2 — Sorting in Python (Tech With Tim)**
`sort()` and `sorted()` are among the most useful tools in Python, and Tim explains both along with the `key=` parameter for custom sort logic. You will see how to sort lists of strings alphabetically, sort by string length, sort complex objects, and sort in reverse order. This video covers the kind of sorting you need for any real data-handling program.
https://www.youtube.com/watch?v=3dt4OGnU5sM

**Video 3 — Python Lists Crash Course (Programming with Mosh)**
This fast-paced crash course reinforces list concepts with a rapid-fire series of examples, making it a great review after Corey's in-depth video. Mosh covers list comprehensions, nested lists, and unpacking, showing how these features make Python lists far more powerful than arrays in other languages. This is a good video to revisit when working on the practice exercises.
https://www.youtube.com/watch?v=9OeznAkyQz4
### Practice Exercises

**Exercise 1 — Dynamic Playlist**
Build a playlist manager: start with 3 songs. Let the user add songs, remove songs (by name), and view the current playlist. Run in a while loop menu.

**Exercise 2 — Leaderboard**
Start with a list of `[score, name]` pairs. Add 5 entries. Sort by score descending. Print the top 3 as a formatted leaderboard.

**Exercise 3 — Duplicate Finder**
Given a list of names with some duplicates, use `.count()` to find any names that appear more than once. Print them.

**Exercise 4 — Shopping Cart**
Simulate an online cart: `append()` to add items, `remove()` to delete them, `pop()` to checkout the last item. Print the cart after each action.

**Exercise 5 — Copy Challenge**
Demonstrate the difference between assigning a list with `=` vs `.copy()`. Show what happens to the original when you modify the copy.

### Knowledge Check

**1.** `list.append(x)` does what?
- A) Adds x at the beginning
- B) Adds x at the end
- C) Inserts x at index x
- D) Returns a new list with x added

**Answer:** B

**2.** `list.pop()` with no argument removes:
- A) The first element
- B) A random element
- C) The last element
- D) Nothing

**Answer:** C

**3.** What is the difference between `.sort()` and `sorted()`?
- A) `.sort()` returns a new list; `sorted()` modifies in place
- B) `.sort()` modifies in place; `sorted()` returns a new list
- C) They do exactly the same thing
- D) `.sort()` only works on numbers

**Answer:** B

**4.** `list.remove(x)` removes:
- A) All occurrences of x
- B) x at the last occurrence
- C) The first occurrence of x
- D) x only if it appears once

**Answer:** C

**5.** `list.count(x)` returns:
- A) True or False
- B) The index of x
- C) How many times x appears in the list
- D) The number of elements in the list

**Answer:** C

**6.** `list.insert(2, "hello")` inserts "hello" at:
- A) Index 0
- B) Index 1
- C) Index 2
- D) The end

**Answer:** C

**7.** Why is `copy = original` NOT a true copy of a list?
- A) `copy` becomes a string
- B) Both variables point to the same list object in memory
- C) It copies only the first element
- D) Python raises an error

**Answer:** B

**8.** `list.index(x)` returns:
- A) True if x is in the list
- B) The count of x
- C) The index of the first occurrence of x
- D) All indexes where x appears

**Answer:** C

**9.** To sort a list in descending order in place:
- A) `list.sort(descending=True)`
- B) `list.sort(order=-1)`
- C) `list.sort(reverse=True)`
- D) `sorted(list, reverse=True)`

**Answer:** C

**10.** `list.reverse()` does what to the original?
- A) Returns a reversed copy
- B) Modifies the list in place
- C) Creates a new reversed list
- D) Sorts in descending order

**Answer:** B

### Reflections

1. `.sort()` changes the original list; `sorted()` leaves it alone. When would you want to preserve the original order while also having a sorted version?

2. You built a dynamic playlist that users can modify. What would make this playlist manager more useful — what features would a real music app add?

3. The copy trap (aliasing vs real copy) is one of the most common bugs in programming. Have you ever been "copied" on something in real life but the changes still affected you?

4. List manipulation is how programs manage live data — adding members, removing expired items, reordering priorities. What list in the ACCN program would you want to manage with a Python program?

### Summary

- `.append()` adds to end; `.insert(i, x)` adds at position i
- `.remove(x)` deletes first occurrence; `.pop(i)` removes and returns by index
- `.sort()` sorts in place; `sorted()` returns a new sorted list
- `.count(x)` counts occurrences; `.index(x)` finds first position
- Use `.copy()` to make a true copy — avoid the aliasing trap with `=`

---

## Session 4.3: Dictionaries — Key-Value Power
**Duration:** 60 minutes | **Format:** Lecture + Hands-On Coding

### Introduction

A dictionary maps keys to values — like a real dictionary maps words to definitions, or like a student ID maps to a student's profile. Dictionaries are one of Python's most powerful and widely-used data structures.

**Learning Objectives:**
- Create dictionaries and access values by key
- Add, update, and delete key-value pairs
- Use dictionary methods: `.keys()`, `.values()`, `.items()`, `.get()`
- Loop through dictionaries
- Nest dictionaries for complex data

### Core Concepts

#### Creating and Accessing Dictionaries

```python
# Student profile dictionary
student = {
    "name": "Aaliyah Johnson",
    "age": 17,
    "grade": 11,
    "gpa": 3.8,
    "team": "Umoja Robotics 7712",
    "enrolled": True
}

print(student["name"])   # Aaliyah Johnson
print(student["gpa"])    # 3.8

# Safe access with .get() — returns None if key missing
print(student.get("scholarship", "Not applied yet"))
```

#### Adding, Updating, Deleting

```python
student["email"] = "aaliyah@accn.edu"     # add new key
student["gpa"] = 3.9                       # update existing
del student["enrolled"]                    # delete key

# Check if key exists
if "email" in student:
    print(f"Email: {student['email']}")
```

#### Looping Through Dictionaries

```python
scores = {"Aaliyah": 94, "Marcus": 87, "Destiny": 91, "Jaylen": 78}

# Keys only
for name in scores:
    print(name)

# Values only
for score in scores.values():
    print(score)

# Keys and values together
for name, score in scores.items():
    grade = "A" if score >= 90 else "B"
    print(f"{name}: {score} ({grade})")
```

#### Nested Dictionaries

```python
team_roster = {
    "Aaliyah": {"role": "Captain", "hours": 24, "specialty": "Programming"},
    "Marcus": {"role": "Builder", "hours": 20, "specialty": "CAD"},
    "Destiny": {"role": "Driver", "hours": 18, "specialty": "Controls"}
}

for name, info in team_roster.items():
    print(f"{name} — {info['role']} ({info['specialty']}): {info['hours']} hrs")
```

### Video Lessons

**Video 1 — Python Dictionaries (Corey Schafer)**
Dictionaries are Python's key-value store, and Corey explains creation, access, modification, deletion, and iteration with real code examples that make the concepts concrete. He covers the important methods: `.keys()`, `.values()`, `.items()`, `.get()`, and `.update()`. This is the go-to reference video for dictionaries you will return to many times.
https://www.youtube.com/watch?v=daefaLgNkw0

**Video 2 — Dictionary Methods and Tricks (Tech With Tim)**
Tim goes deeper into dictionaries, covering dictionary comprehensions, merging dictionaries, and the pattern of using dictionaries as lookup tables instead of long if/elif chains. These are the dictionary techniques that experienced Python developers use every day. This video is especially useful for the Student Records System project.
https://www.youtube.com/watch?v=XCcpzWs-CI4

**Video 3 — Nested Data Structures in Python (Programming with Mosh)**
Real-world data is often nested — a list of dictionaries, a dictionary of lists, or a dictionary of dictionaries. Mosh walks through reading and modifying nested structures with clear examples, showing the patterns used to work with API responses, configuration files, and database records. Understanding nested data is essential for any data-heavy project.
https://www.youtube.com/watch?v=XCcpzWs-CI4
### Practice Exercises

**Exercise 1 — Contact Book**
Build a contact book: store 5 contacts as name→phone number pairs. Let the user look up a contact by name. Use `.get()` to handle missing contacts gracefully.

**Exercise 2 — Word Counter**
Ask for a sentence. Count how many times each word appears. Store in a dictionary and print sorted by count.

```python
sentence = input("Enter a sentence: ").lower()
words = sentence.split()
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
```

**Exercise 3 — Student Database**
Create a nested dictionary of 4 students, each with name, GPA, and grade level. Print all students with GPA above 3.5.

**Exercise 4 — Team Roster App**
Build a team roster manager: add member, remove member, look up member, and list all members. Use a dictionary with names as keys and roles as values.

**Exercise 5 — Frequency Map**
Given a list of scores, count how many students got each grade (A/B/C/D/F) using a dictionary. Print the grade distribution.

### Knowledge Check

**1.** How do you access the value for key "name" in dict `d`?
- A) `d.name`
- B) `d["name"]`
- C) `d.get_name()`
- D) `d[0]`

**Answer:** B

**2.** What does `d.get("key", "default")` return if "key" is not in `d`?
- A) `None`
- B) `KeyError`
- C) `"default"`
- D) `False`

**Answer:** C

**3.** To loop over both keys and values in a dictionary:
- A) `for k in d.keys_values():`
- B) `for k, v in d.items():`
- C) `for k, v in d:`
- D) `for d.keys() and d.values():`

**Answer:** B

**4.** Dictionaries in Python 3.7+ maintain:
- A) Random order
- B) Alphabetical order
- C) Insertion order
- D) Numeric order

**Answer:** C

**5.** `del d["key"]` does what?
- A) Sets the value to None
- B) Raises an error if key missing
- C) Both — removes the key-value pair, raises KeyError if missing
- D) Removes all keys

**Answer:** C

**6.** Which is the correct way to add a new key to a dictionary?
- A) `d.add("key", "value")`
- B) `d["key"] = "value"`
- C) `d.insert("key", "value")`
- D) `d.append("key", "value")`

**Answer:** B

**7.** `"name" in d` checks if:
- A) "name" is a value
- B) "name" is a key
- C) The dictionary is not empty
- D) The value equals "name"

**Answer:** B

**8.** What does `d.keys()` return?
- A) A list of all values
- B) A list of all keys
- C) A list of key-value tuples
- D) The number of keys

**Answer:** B

**9.** How do you safely check a nested dictionary `d["student"]["gpa"]` without a KeyError?
- A) `d.get("student", {}).get("gpa", 0)`
- B) `d["student"].get_safe("gpa")`
- C) `try: d["student"]["gpa"]`
- D) Both A and C are valid approaches

**Answer:** D

**10.** Dictionaries are useful when you need:
- A) An ordered sequence of items
- B) To look up values by a meaningful label/key
- C) To store only numbers
- D) To enforce unique values

**Answer:** B

### Reflections

1. Dictionaries map keys to values. What real-world mappings would you store in a dictionary for an ACCN student database? Student ID to profile? Name to grades?

2. The word counter exercise shows how dictionaries count things. What else could you count with a dictionary — song genres in a playlist, error types in robot logs, topics in a text?

3. Nested dictionaries model complex, real-world data. Design a nested dictionary for Umoja Robotics 7712's entire team — roles, skills, hours, contact info.

4. `.get()` prevents crashes by providing a default. In real life, what is the equivalent of a "default" when something is missing — a backup plan, a fallback?

### Summary

- Dictionaries store key-value pairs: `{key: value}`
- Access values with `d["key"]` or safely with `d.get("key", default)`
- Add/update with `d["key"] = value`; delete with `del d["key"]`
- Loop with `.keys()`, `.values()`, or `.items()` for key-value pairs
- Nested dictionaries model complex data — dictionaries inside dictionaries

---

## Session 4.4: Sets and Tuples
**Duration:** 60 minutes | **Format:** Lecture + Exploration

### Introduction

Python has two more important data structures: tuples (like immutable lists) and sets (unordered collections with no duplicates). Knowing when to use each one makes you a more precise programmer.

**Learning Objectives:**
- Create and use tuples as immutable sequences
- Create and use sets for unique collections
- Use set operations: union, intersection, difference
- Know when to use list vs tuple vs set

### Core Concepts

#### Tuples — Immutable Sequences

```python
# Tuples use parentheses (or no brackets)
coordinates = (40.7128, -74.0060)   # NYC coordinates
rgb_blue = (0, 0, 255)
student_record = ("Aaliyah", 17, 3.8)

# Access like a list
print(coordinates[0])   # 40.7128
print(student_record[0])  # Aaliyah

# Cannot change a tuple
# coordinates[0] = 999  # TypeError!

# Unpacking
name, age, gpa = student_record
print(f"{name} is {age} with a {gpa} GPA")

# Tuples as dictionary keys (lists cannot be used as keys)
location_data = {
    (40.71, -74.01): "New York",
    (34.05, -118.24): "Los Angeles"
}
```

#### When to Use Tuples vs Lists

```python
# Use tuples for data that should not change:
TEAM_INFO = ("Umoja Robotics", 7712, "FRC")
FIELD_DIMENSIONS = (26.29, 54.0)  # meters

# Use lists for data that will change:
team_members = ["Aaliyah", "Marcus", "Destiny"]
match_scores = [24, 31, 18, 42]
```

#### Sets — Unique Unordered Collections

```python
# Sets have no duplicates and no guaranteed order
applicants = {"Aaliyah", "Marcus", "Destiny", "Marcus", "Aaliyah"}
print(applicants)   # {'Aaliyah', 'Marcus', 'Destiny'} — duplicates removed

# Remove duplicates from a list
scores_with_dupes = [88, 92, 88, 76, 92, 95, 76]
unique_scores = list(set(scores_with_dupes))
print(sorted(unique_scores))   # [76, 88, 92, 95]

# Set operations
python_students = {"Aaliyah", "Marcus", "Destiny", "Jaylen"}
ai_students = {"Marcus", "Brianna", "Jaylen", "Trevon"}

# Union — everyone in either set
all_students = python_students | ai_students
print(all_students)

# Intersection — in both sets
both_courses = python_students & ai_students
print(both_courses)   # {'Marcus', 'Jaylen'}

# Difference — in python but not ai
python_only = python_students - ai_students
print(python_only)
```

### Video Lessons

**Video 1 — Python Tuples (Corey Schafer)**
Tuples are like lists that cannot be changed, and Corey explains exactly when this immutability is an advantage: function return values, dictionary keys, and protecting data that should never change. He shows tuple packing and unpacking, named tuples, and the common one-element tuple gotcha. After this video you will know the right time to choose a tuple over a list.
https://www.youtube.com/watch?v=W8KRzm-HUcc

**Video 2 — Python Sets and Set Operations (Tech With Tim)**
Sets store unique values and support fast membership testing, union, intersection, and difference operations. Tim demonstrates each operation with clear Venn diagram thinking, showing how sets solve real problems like finding common elements between two lists in one line of code. Sets are underused by beginners and overused by experienced developers once they discover them.
https://www.youtube.com/watch?v=daefaLgNkw0

**Video 3 — Choosing the Right Data Structure (CS Dojo)**
This video helps you build the judgment to choose between list, tuple, set, and dictionary for any given situation, explaining the performance implications of each. CS Dojo uses a series of real problems and asks "which structure fits best?" before showing the answer, building your decision-making skill. This is the kind of thinking that separates programmers who write maintainable code from those who just write code that works.
https://www.youtube.com/watch?v=R-HLU9Fl5ug
### Practice Exercises

**Exercise 1 — Tuple Unpacking**
Create a tuple `match_result = ("Umoja 7712", 42, "Opponent Team", 31)`. Unpack it into 4 variables and print: `"Umoja 7712 beat Opponent Team 42-31"`.

**Exercise 2 — Duplicate Cleaner**
Given a list with many duplicates, use a set to remove duplicates. Print the original length vs the unique length.

**Exercise 3 — Course Enrollment**
Create sets of students enrolled in Python, Mechanical, and AI courses. Find: students in all 3, students in Python only, students in at least 2 courses.

**Exercise 4 — Coordinate Store**
Create a dictionary using tuples as keys: `{(lat, lon): city_name}` for 5 cities. Look up a city by its coordinates.

**Exercise 5 — List vs Tuple vs Set**
Create the same data as all three. Show what you can and cannot do with each.

### Knowledge Check

**1.** Tuples are:
- A) Mutable ordered sequences
- B) Immutable ordered sequences
- C) Unordered unique collections
- D) Key-value stores

**Answer:** B

**2.** Sets are:
- A) Ordered with duplicates allowed
- B) Ordered with no duplicates
- C) Unordered with no duplicates
- D) Unordered key-value pairs

**Answer:** C

**3.** What does `{1, 2, 2, 3, 3, 3}` evaluate to?
- A) `{1, 2, 2, 3, 3, 3}`
- B) `{1, 2, 3}`
- C) `[1, 2, 3]`
- D) Error

**Answer:** B

**4.** `a | b` for sets returns:
- A) The intersection
- B) The union (all elements in either)
- C) The difference
- D) A boolean

**Answer:** B

**5.** `a & b` for sets returns:
- A) The union
- B) Elements in `a` but not `b`
- C) The intersection (elements in both)
- D) A sum

**Answer:** C

**6.** Why can a tuple be a dictionary key but a list cannot?
- A) Tuples are faster
- B) Tuples are immutable (hashable); lists are mutable
- C) Lists cannot hold the same values as tuples
- D) Python limitation that will be fixed

**Answer:** B

**7.** `name, age, gpa = ("Destiny", 17, 3.8)` is called:
- A) List comprehension
- B) Tuple assignment
- C) Tuple unpacking
- D) Variable casting

**Answer:** C

**8.** To remove duplicates from a list `x`, use:
- A) `x.unique()`
- B) `list(set(x))`
- C) `x.deduplicate()`
- D) `filter(unique, x)`

**Answer:** B

**9.** `a - b` for sets returns:
- A) A number (the difference in lengths)
- B) Elements in `a` that are not in `b`
- C) Elements in `b` that are not in `a`
- D) Error

**Answer:** B

**10.** When should you use a tuple instead of a list?
- A) When you need to sort the data
- B) When the data should not change after creation
- C) When you need to add items later
- D) When the data contains strings

**Answer:** B

### Reflections

1. Tuples are immutable — once created, they cannot change. What information in your life should be "immutable" — things that define you that should not be altered by others?

2. Sets automatically remove duplicates. In community organizing, what would it mean to "de-duplicate" a list of volunteers or applicants — and why does that matter?

3. Set operations (union, intersection, difference) are used in databases, search engines, and recommendation systems. Can you think of a feature in a social app that uses set logic?

4. You now know four data structures: list, dictionary, set, tuple. For each one, describe a real-world object it models best.

### Summary

- Tuples are immutable ordered sequences — use for data that should not change
- Sets are unordered collections with no duplicates — use for membership testing and set math
- Set operations: `|` (union), `&` (intersection), `-` (difference)
- Remove list duplicates with `list(set(my_list))`
- Use the right structure: list (ordered, changeable), tuple (ordered, fixed), set (unique), dict (lookup by key)

---

## Session 4.5: Data Challenge — Student Records System
**Duration:** 60 minutes | **Format:** Project Session

### Introduction

This week's capstone brings lists, dictionaries, sets, and tuples together in a real program: a student records system. By the end, you will have a working program that stores, retrieves, updates, and reports on student data.

**Learning Objectives:**
- Combine all four data structures in one program
- Build a functional multi-feature program
- Practice writing clean, modular code
- Demonstrate Week 4 mastery

### Core Concepts

#### The Complete Student Records System

```python
"""
ACCN Student Records System
Manages student profiles, grades, and course enrollment
"""

# Data storage
students = {}         # name -> profile dict
enrolled_courses = {} # course -> set of student names

def add_student(name, age, gpa, grade_level):
    """Add a new student to the system."""
    students[name] = {
        "age": age,
        "gpa": gpa,
        "grade_level": grade_level,
        "courses": [],
        "scores": []
    }
    print(f"Student '{name}' added successfully.")

def enroll_course(student_name, course):
    """Enroll a student in a course."""
    if student_name not in students:
        print(f"Student '{student_name}' not found.")
        return
    students[student_name]["courses"].append(course)
    if course not in enrolled_courses:
        enrolled_courses[course] = set()
    enrolled_courses[course].add(student_name)
    print(f"{student_name} enrolled in {course}.")

def add_score(student_name, score):
    """Add a test score for a student."""
    if student_name in students:
        students[student_name]["scores"].append(score)

def get_student_report(name):
    """Print a full report for one student."""
    if name not in students:
        print("Student not found.")
        return
    s = students[name]
    scores = s["scores"]
    avg = round(sum(scores)/len(scores), 1) if scores else "N/A"
    print(f"\n{'='*35}")
    print(f"  Report: {name}")
    print(f"{'='*35}")
    print(f"  Age: {s['age']} | Grade: {s['grade_level']}")
    print(f"  GPA: {s['gpa']}")
    print(f"  Courses: {', '.join(s['courses']) if s['courses'] else 'None'}")
    print(f"  Test Average: {avg}")
    print(f"{'='*35}")

def honor_roll():
    """Print students with GPA >= 3.5"""
    print("\n=== ACCN Honor Roll ===")
    for name, info in students.items():
        if info["gpa"] >= 3.5:
            print(f"  {name} — GPA: {info['gpa']}")

# Main menu
def main():
    # Load sample data
    add_student("Aaliyah", 17, 3.8, 11)
    add_student("Marcus", 16, 3.2, 10)
    add_student("Destiny", 17, 3.9, 11)
    enroll_course("Aaliyah", "Python")
    enroll_course("Marcus", "Python")
    enroll_course("Destiny", "Mechanical")
    add_score("Aaliyah", 94)
    add_score("Aaliyah", 88)
    add_score("Marcus", 78)
    add_score("Marcus", 85)

    while True:
        print("\n=== ACCN Student Records ===")
        print("1. View student report")
        print("2. Add student")
        print("3. View honor roll")
        print("4. View course enrollment")
        print("5. Exit")
        choice = input("Choice: ")

        if choice == "1":
            name = input("Student name: ")
            get_student_report(name)
        elif choice == "2":
            name = input("Name: ")
            age = int(input("Age: "))
            gpa = float(input("GPA: "))
            grade = int(input("Grade level: "))
            add_student(name, age, gpa, grade)
        elif choice == "3":
            honor_roll()
        elif choice == "4":
            for course, members in enrolled_courses.items():
                print(f"  {course}: {', '.join(members)}")
        elif choice == "5":
            print("Goodbye!")
            break

if __name__ == "__main__":
    main()
```

### Video Lessons

**Video 1 — Python Data Project: Student Grade Tracker (Tech With Tim)**
Tim builds a complete grade tracking system from scratch using lists and dictionaries, walking through the design process before writing a single line of code. You will see how he structures the data, adds functions for common operations, and handles user input validation. Building along with this video is excellent practice before starting your own Student Records project.
https://www.youtube.com/watch?v=Zp5MuPOtsSY

**Video 2 — Python Dictionaries in Real Projects (Corey Schafer)**
Corey demonstrates how dictionaries are used in real applications — storing configurations, caching computed values, and building efficient lookup tables. He shows several patterns that come up repeatedly in professional Python code. These patterns will appear throughout your programming career.
https://www.youtube.com/watch?v=daefaLgNkw0

**Video 3 — Building Menu-Driven Python Programs (CS Dojo)**
A menu-driven program uses a loop and a dictionary of choices to create interactive command-line applications, and this video shows exactly how to build one cleanly. CS Dojo explains the pattern, demonstrates it with a complete example, and shows how to extend it as the program grows. This is the architecture behind most beginner Python projects.
https://www.youtube.com/watch?v=OnDr4J2UXSA
### Practice Exercises

**Exercise 1 — Run It**
Copy the full Student Records System code and run it. Add at least 3 students and test every menu option.

**Exercise 2 — Add a Feature**
Add a `top_student()` function that finds the student with the highest GPA and prints their full report.

**Exercise 3 — Course Comparison**
Add a function that shows which students are enrolled in multiple courses (using set intersection logic).

**Exercise 4 — Export Report**
Add a function that prints all students' names, GPAs, and averages in a formatted table.

**Exercise 5 — Your Addition**
Add one original feature to the system that would be useful for ACCN. Describe it in a comment, then implement it.

### Knowledge Check

**1.** In the Student Records System, `students` is a:
- A) List of tuples
- B) Nested dictionary (name -> profile dict)
- C) Set of student names
- D) List of dictionaries

**Answer:** B

**2.** `enrolled_courses[course] = set()` creates:
- A) An empty list
- B) An empty dictionary
- C) An empty set
- D) A tuple

**Answer:** C

**3.** `enrolled_courses[course].add(student_name)` uses set's `.add()` because:
- A) Sets are faster than lists
- B) Sets automatically prevent duplicate enrollments
- C) `.append()` does not work here
- D) Both B and C

**Answer:** D

**4.** `if student_name not in students:` checks if the key exists in the:
- A) List
- B) Set
- C) Dictionary
- D) Tuple

**Answer:** C

**5.** `', '.join(s['courses'])` converts:
- A) A dictionary to a string
- B) A list to a comma-separated string
- C) A set to a list
- D) A tuple to a string

**Answer:** B

**6.** `sum(scores)/len(scores) if scores else "N/A"` handles:
- A) Negative scores
- B) Empty score list (avoids divide-by-zero)
- C) Non-numeric scores
- D) Scores above 100

**Answer:** B

**7.** The `main()` function is protected by `if __name__ == "__main__":` to:
- A) Make it run faster
- B) Prevent it from running if the file is imported
- C) Define the function name
- D) Required for menu programs

**Answer:** B

**8.** Which data structure is best for tracking which students are in each course (to avoid duplicates)?
- A) List
- B) Tuple
- C) Set
- D) Dictionary

**Answer:** C

**9.** To add a score for a student: `students[name]["scores"].append(score)` — this accesses:
- A) A global list named scores
- B) The scores list nested inside the student's dictionary
- C) A separate scores dictionary
- D) A tuple of scores

**Answer:** B

**10.** What is the most important reason to test every menu option when you run the program?
- A) To count the lines of code
- B) To verify each function works correctly with real data
- C) To impress your instructor
- D) Python requires it

**Answer:** B

### Reflections

1. You built a real student records system. Schools actually use systems like this — student information systems (SIS). What features would a real school need that yours does not yet have?

2. This system stores student data. What are the ethical responsibilities of anyone who builds or runs a system like this? Think about privacy, accuracy, and access.

3. Week 4 brought lists, dictionaries, sets, and tuples together. Which data structure clicked for you most naturally? Which one still feels tricky?

4. Aaliyah, Marcus, and Destiny are in your test data. When you code programs that handle people's data, why does it matter to treat that data with care — even in practice?

### Summary

- Real programs combine multiple data structures: dicts for lookup, lists for sequences, sets for uniqueness
- Nested dictionaries model complex real-world records (student → profile → courses → scores)
- Functions keep programs organized — one function, one job
- `if __name__ == "__main__":` protects test/main code when the file is imported
- Week 4 complete: you can now store, organize, search, and report on complex data in Python

# WEEK 5: Files, Errors, and Real Programs

## Session 5.1: Reading and Writing Files
**Duration:** 60 minutes | **Format:** Lecture + Hands-On Coding

### Introduction

Real programs do not just print to the screen — they save data, read configuration files, log events, and process documents. In this session you will learn to read and write files, which is how programs interact with the world beyond the terminal.

**Learning Objectives:**
- Open, read, and write text files
- Use `with open()` as the safe way to handle files
- Append to existing files
- Understand file paths and modes

### Core Concepts

#### Writing a File

```python
# Write mode ('w') creates or overwrites the file
with open("journal.txt", "w") as file:
    file.write("Day 1 — ACCN Python Course\n")
    file.write("Today I learned about file I/O.\n")
    file.write("This is being saved to a real file!\n")

print("File written successfully.")
```

#### Reading a File

```python
# Read mode ('r') reads the file
with open("journal.txt", "r") as file:
    content = file.read()       # entire file as one string
    print(content)

# Read line by line
with open("journal.txt", "r") as file:
    for line in file:
        print(line.strip())     # .strip() removes the trailing \n

# Read all lines into a list
with open("journal.txt", "r") as file:
    lines = file.readlines()
    print(f"Total lines: {len(lines)}")
```

#### Appending to a File

```python
# Append mode ('a') adds to end without overwriting
with open("journal.txt", "a") as file:
    file.write("Day 2 — Appending to my journal.\n")
    file.write("The file grows each day.\n")
```

#### File Modes Summary

| Mode | Meaning |
|------|---------|
| `'r'` | Read (default) |
| `'w'` | Write (overwrites) |
| `'a'` | Append (adds to end) |
| `'x'` | Create (fails if exists) |

#### Why `with open()` is Safe

```python
# The 'with' statement automatically closes the file
# even if an error occurs inside — no memory leaks
with open("data.txt", "w") as f:
    f.write("Safe file handling\n")
# File is automatically closed here
```

### Video Lessons

**Video 1 — Reading and Writing Files in Python (Corey Schafer)**
File I/O is how programs communicate with the real world beyond the terminal, and Corey covers reading, writing, and appending files using both the basic `open()` function and the recommended `with` statement. He explains file modes (`r`, `w`, `a`, `rb`), how to read files line by line, and why always using `with` is the safest pattern. This is the standard reference video for Python file handling.
https://www.youtube.com/watch?v=Uh2ebFW8OYM

**Video 2 — Python File Operations in Depth (Tech With Tim)**
Tim extends the basics with practical examples: reading student data from a text file, writing a log file inside a loop, and appending new records to an existing file. He shows how to handle the common `FileNotFoundError` and demonstrates the `os` module for checking if files exist and working with file paths. These are the operations you will use in almost every real project.
https://www.youtube.com/watch?v=Uh2ebFW8OYM

**Video 3 — Python File Handling Best Practices (Programming with Mosh)**
Mosh covers the professional patterns for file I/O: using `pathlib` instead of raw strings for file paths, working with binary files, and organizing file operations into functions. He also explains how file handles work in memory and why improperly closed files can cause data loss. Following these patterns from the start will save you debugging headaches on larger projects.
https://www.youtube.com/watch?v=bD05uGo_sVI
### Practice Exercises

**Exercise 1 — Daily Journal**
Write a program that asks for a journal entry and appends it to `my_journal.txt` with the current date. Then read and display all entries.

**Exercise 2 — Team Roster File**
Write 5 team member names to `roster.txt` (one per line). Then read the file back and print each name with a number.

**Exercise 3 — Score Logger**
Write a program that:
1. Reads existing scores from `scores.txt` (if it exists)
2. Asks for a new name and score
3. Appends it to the file
4. Reads and prints all scores

**Exercise 4 — Word Count Tool**
Ask for a filename. Read it and print: total characters, total words, total lines, and the most common word.

**Exercise 5 — Config File**
Write program settings to `config.txt` (team name, number, season). Read them back and use them in a greeting message.

### Knowledge Check

**1.** What does `open("file.txt", "w")` do if the file already exists?
- A) Appends to it
- B) Raises an error
- C) Overwrites it
- D) Creates a backup

**Answer:** C

**2.** What does `file.readlines()` return?
- A) One long string
- B) A list of all lines
- C) The first line only
- D) A generator

**Answer:** B

**3.** The `'a'` file mode:
- A) Reads from the end
- B) Overwrites the file
- C) Appends to the end without deleting content
- D) Creates a new file only

**Answer:** C

**4.** Why use `with open()` instead of just `open()`?
- A) It is faster
- B) It automatically closes the file even if an error occurs
- C) It is the only valid syntax in Python 3
- D) It encrypts the file

**Answer:** B

**5.** `file.read()` returns:
- A) A list of lines
- B) The entire file content as one string
- C) Only the first 100 characters
- D) A file object

**Answer:** B

**6.** To write a newline in a file, use:
- A) `file.write(newline)`
- B) `file.newline()`
- C) `file.write("\n")`
- D) `file.write(enter)`

**Answer:** C

**7.** `file.readline()` (singular) returns:
- A) All lines
- B) One line at a time
- C) The last line
- D) A list

**Answer:** B

**8.** What mode creates a file that fails if the file already exists?
- A) `'w'`
- B) `'a'`
- C) `'n'`
- D) `'x'`

**Answer:** D

**9.** `.strip()` is used on lines read from a file to:
- A) Convert to uppercase
- B) Remove leading/trailing whitespace including newlines
- C) Split by commas
- D) Count characters

**Answer:** B

**10.** Relative path `"data.txt"` looks for the file:
- A) On the desktop
- B) In the same directory as the Python script
- C) In the system root
- D) In the Python installation folder

**Answer:** B

### Reflections

1. Files persist beyond the program — they save your work between sessions. What are the implications of a program that saves data vs one that forgets everything when closed?

2. A journal app, a score logger, a configuration file — all use file I/O. What ACCN program would most benefit from saving data to a file?

3. `open("file", "w")` silently overwrites data. What safeguards would you add to a real application to prevent accidental data loss?

4. Many historically important documents — from the Declaration of Independence to Marcus Garvey's speeches — exist because someone preserved them in writing. How does the act of writing to a file connect to the idea of preserving knowledge?

### Summary

- `open(filename, mode)` opens a file; always use `with open()` to ensure it closes
- Modes: `'r'` (read), `'w'` (write/overwrite), `'a'` (append), `'x'` (create new)
- `file.read()` — full content; `file.readlines()` — list of lines; loop over file — line by line
- Write text with `file.write(text)` — include `\n` for newlines
- Files let programs persist data between runs — essential for real applications

---

## Session 5.2: Error Handling with Try/Except
**Duration:** 60 minutes | **Format:** Lecture + Hands-On Coding

### Introduction

Programs crash. Files go missing. Users type letters where numbers are expected. Error handling is how you write code that survives the real world gracefully. Professional programs do not crash — they handle errors and tell the user what went wrong.

**Learning Objectives:**
- Understand Python's exception system
- Use `try/except` to catch and handle errors
- Use `except ExceptionType` for specific errors
- Use `finally` for cleanup code
- Raise your own exceptions with `raise`

### Core Concepts

#### Basic Try/Except

```python
# Without error handling — crashes on bad input
age = int(input("Enter your age: "))   # crashes if user types "abc"

# With error handling — graceful
try:
    age = int(input("Enter your age: "))
    print(f"You are {age} years old.")
except ValueError:
    print("Please enter a valid number for age.")
```

#### Common Exception Types

| Exception | When it occurs |
|-----------|---------------|
| `ValueError` | Wrong value type (e.g., `int("abc")`) |
| `TypeError` | Wrong type for operation |
| `ZeroDivisionError` | Dividing by zero |
| `FileNotFoundError` | File does not exist |
| `IndexError` | List index out of range |
| `KeyError` | Dictionary key not found |

```python
# Catching specific exceptions
try:
    scores = [88, 92, 76]
    index = int(input("Which score? (0, 1, 2): "))
    print(f"Score: {scores[index]}")
except ValueError:
    print("Please enter a number.")
except IndexError:
    print("That index does not exist.")
```

#### The else and finally Clauses

```python
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found — creating a new one.")
    content = ""
else:
    print("File loaded successfully.")    # runs only if no exception
finally:
    print("Finished attempting to load file.")  # ALWAYS runs
```

#### Raising Exceptions

```python
def set_gpa(value):
    if not 0.0 <= value <= 4.0:
        raise ValueError(f"GPA must be between 0.0 and 4.0, got {value}")
    return value

try:
    gpa = set_gpa(5.2)
except ValueError as e:
    print(f"Error: {e}")
```

#### Input Validation Loop

```python
while True:
    try:
        score = int(input("Enter score (0-100): "))
        if not 0 <= score <= 100:
            raise ValueError("Score must be between 0 and 100")
        break   # valid input — exit loop
    except ValueError as e:
        print(f"Invalid input: {e}. Try again.")

print(f"Score recorded: {score}")
```

### Video Lessons

**Video 1 — Python Exception Handling (Corey Schafer)**
This is the definitive tutorial on Python try/except blocks, covering the basic syntax, catching specific exceptions, the `else` clause (runs when no exception occurs), and the `finally` clause (always runs). Corey explains why catching broad exceptions is a bad practice and how to look up the right exception name for any error. After this video, your programs will handle errors gracefully instead of crashing.
https://www.youtube.com/watch?v=NIWwJbo-9_8

**Video 2 — Python Error Handling Tutorial (Tech With Tim)**
Tim demonstrates error handling with realistic scenarios: invalid user input, missing files, network failures, and type mismatches. He shows how to write robust programs that anticipate what can go wrong and handle it cleanly instead of displaying scary tracebacks to users. The examples are the kind of input validation and error handling you will add to every program going forward.
https://www.youtube.com/watch?v=6SPDvPK38tw

**Video 3 — Custom Exceptions in Python (Programming with Mosh)**
Beyond catching Python's built-in exceptions, you can define your own exception types to make errors in your code meaningful and descriptive. Mosh shows how to create custom exception classes, when they are worth the effort, and how they make code much easier to debug and maintain. This is a professional technique used in every large Python project.
https://www.youtube.com/watch?v=NIWwJbo-9_8
### Practice Exercises

**Exercise 1 — Safe Division Calculator**
Write a calculator that handles: division by zero, non-numeric input, and any other unexpected errors. Use specific except clauses.

**Exercise 2 — File Reader with Fallback**
Write a program that tries to open a file the user specifies. If not found, create it with default content and inform the user.

**Exercise 3 — Validated Input**
Write a `get_valid_score()` function that keeps asking until the user enters a valid integer between 0 and 100. Use try/except in a while loop.

**Exercise 4 — Raise Custom Errors**
Write `validate_team_number(num)` that raises a `ValueError` if the number is not between 1 and 9999. Test with both valid and invalid inputs.

**Exercise 5 — Robust Student Lookup**
Given a student dictionary, write a function that safely looks up a student by name. Handle `KeyError` gracefully and print a helpful message.

### Knowledge Check

**1.** What does `try` do?
- A) Tests if code is correct
- B) Executes code that might raise an exception
- C) Tries to import a module
- D) Loops until success

**Answer:** B

**2.** `except ValueError:` catches:
- A) All exceptions
- B) Only `ValueError` exceptions
- C) Type errors
- D) File errors

**Answer:** B

**3.** `finally:` runs:
- A) Only if an exception occurred
- B) Only if no exception occurred
- C) Always, whether or not an exception occurred
- D) Only at the end of the program

**Answer:** C

**4.** What exception does `int("hello")` raise?
- A) `TypeError`
- B) `NameError`
- C) `ValueError`
- D) `SyntaxError`

**Answer:** C

**5.** `else:` in a try/except block runs:
- A) Always
- B) Only when an exception occurs
- C) Only when NO exception occurs
- D) Before the try block

**Answer:** C

**6.** `raise ValueError("Bad input")` does what?
- A) Catches a ValueError
- B) Prints an error message
- C) Manually triggers a ValueError exception
- D) Stops the program silently

**Answer:** C

**7.** `except Exception as e:` gives you access to:
- A) The exception type only
- B) The error message in variable `e`
- C) The line number of the error
- D) A list of all exceptions

**Answer:** B

**8.** What happens if an exception is NOT caught?
- A) Python ignores it
- B) The program continues normally
- C) The program crashes with a traceback
- D) Python automatically fixes it

**Answer:** C

**9.** Which is best practice for catching exceptions?
- A) `except:` with no type (catches everything)
- B) `except Exception:` for all errors
- C) Specific `except ValueError:`, `except FileNotFoundError:` etc.
- D) No exception handling — let it crash

**Answer:** C

**10.** `FileNotFoundError` is raised when:
- A) You write to a read-only file
- B) You try to open a file that does not exist
- C) The file is corrupted
- D) The file is too large

**Answer:** B

### Reflections

1. Error handling is how programs survive the real world. How do you handle unexpected failures in your own life — setbacks, surprises, things not going as planned?

2. A program that crashes loses the user's trust immediately. What is the difference between failing loudly (crash) and failing gracefully (helpful error message)?

3. `raise ValueError` lets you enforce your own rules. What rules would you enforce in a program that stores student grades? What inputs should be rejected?

4. Every error message in Python was written by a developer who anticipated a problem. Who writes the error messages in the tools and apps you use every day? What would you change about them?

### Summary

- `try/except` catches errors so programs do not crash unexpectedly
- Use specific exception types: `ValueError`, `FileNotFoundError`, `IndexError`, `KeyError`, etc.
- `else:` runs when no exception occurs; `finally:` always runs (great for cleanup)
- `raise ExceptionType("message")` lets you enforce your own validation rules
- Combine `while True` + `try/except` + `break` for bulletproof input validation

---

## Session 5.3: Working with CSV Data
**Duration:** 60 minutes | **Format:** Lecture + Data Lab

### Introduction

Most real-world data lives in spreadsheets and CSV files. Python's `csv` module lets you read and write this data without Excel. From analyzing scholarship data to processing robot match logs, CSV handling is an essential skill.

**Learning Objectives:**
- Read CSV files with `csv.reader` and `csv.DictReader`
- Write CSV files with `csv.writer` and `csv.DictWriter`
- Filter and analyze CSV data
- Understand how CSV maps to lists and dictionaries

### Core Concepts

#### Reading a CSV with csv.reader

```python
import csv

# students.csv contains:
# Name,Age,GPA,Grade
# Aaliyah,17,3.8,11
# Marcus,16,3.2,10

with open("students.csv", "r") as file:
    reader = csv.reader(file)
    header = next(reader)    # skip header row
    print(f"Columns: {header}")

    for row in reader:
        name, age, gpa, grade = row
        print(f"{name}: GPA {gpa}, Grade {grade}")
```

#### Reading with DictReader (Key-Value)

```python
import csv

with open("students.csv", "r") as file:
    reader = csv.DictReader(file)
    for student in reader:
        print(f"{student['Name']}: {student['GPA']}")
        if float(student['GPA']) >= 3.5:
            print(f"  -> Honor Roll!")
```

#### Writing a CSV

```python
import csv

data = [
    ["Name", "Score", "Grade"],
    ["Aaliyah", 94, "A"],
    ["Marcus", 82, "B"],
    ["Destiny", 91, "A"],
]

with open("results.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)

print("CSV written!")
```

#### Writing with DictWriter

```python
import csv

students = [
    {"Name": "Aaliyah", "Hours": 24, "Role": "Captain"},
    {"Name": "Marcus", "Hours": 20, "Role": "Builder"},
    {"Name": "Destiny", "Hours": 18, "Role": "Driver"},
]

with open("team_data.csv", "w", newline="") as file:
    fieldnames = ["Name", "Hours", "Role"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(students)
```

### Video Lessons

**Video 1 — Python CSV Module Tutorial (Corey Schafer)**
CSV files are the most common format for sharing tabular data, and Corey shows how to read them with `csv.reader`, write them with `csv.writer`, and work with headers using `csv.DictReader` and `csv.DictWriter`. He explains how the module handles quoting and delimiters, and why CSV is often better than plain text for structured data. This is essential knowledge before moving to Pandas in Week 6.
https://www.youtube.com/watch?v=q5uM4VKywbA

**Video 2 — Working with CSV Files (Tech With Tim)**
Tim builds a complete CSV-based data program from scratch — reading a student dataset, filtering records, computing statistics, and writing results to a new file. Watching the design process and the choices he makes along the way is as valuable as the code itself. This project-based approach is excellent preparation for the Week 6 Pandas and Matplotlib sessions.
https://www.youtube.com/watch?v=Xi52tx6phRU

**Video 3 — Python CSV and Data Processing (Socratica)**
This video shows how CSV and data files are used in real data pipelines, loading external data, cleaning it, and extracting insights. Socratica's practical examples use clear, well-explained datasets that make the concepts easy to follow. Understanding these text-based data formats is the bridge between basic Python file I/O and the data science libraries in Week 6.
https://www.youtube.com/watch?v=khKv-8q7YmY
### Practice Exercises

**Exercise 1 — Create and Read**
Create a `scholarships.csv` with columns: Name, Amount, Deadline, MinGPA. Read it and print all scholarships the user qualifies for based on their GPA.

**Exercise 2 — Team CSV**
Write a program that: asks for team member details (name, role, hours), appends each entry to `team.csv`, then reads and prints the whole file as a formatted table.

**Exercise 3 — CSV Analyzer**
Read a CSV of test scores. Calculate: class average, highest score, lowest score, and count of passing students (>=70).

**Exercise 4 — CSV to Dictionary**
Read `students.csv` using `DictReader`. Build a dictionary: `{name: {"gpa": ..., "grade": ...}}`. Print all students on the honor roll.

**Exercise 5 — Match Log**
Create a `match_log.csv` to track Umoja 7712's FRC match results: opponent name, our score, their score, win/loss. Write 5 matches, then read and compute our win rate.

### Knowledge Check

**1.** CSV stands for:
- A) Comma Separated Values
- B) Computer Structured Variables
- C) Coded String Values
- D) Column Separated Values

**Answer:** A

**2.** `next(reader)` on a csv.reader object:
- A) Reads all rows
- B) Reads and returns the next row (used to skip the header)
- C) Goes back to start
- D) Counts the rows

**Answer:** B

**3.** `csv.DictReader` returns each row as:
- A) A list
- B) A tuple
- C) A dictionary with column headers as keys
- D) A string

**Answer:** C

**4.** Why use `newline=""` when opening a CSV for writing?
- A) Required for Python 2 compatibility
- B) Prevents extra blank lines between rows on Windows
- C) Speeds up writing
- D) Required for DictWriter only

**Answer:** B

**5.** `writer.writerows(data)` writes:
- A) One row
- B) Multiple rows at once
- C) Only the header
- D) The file metadata

**Answer:** B

**6.** `float(student['GPA'])` is needed because:
- A) DictReader always returns integers
- B) CSV values are always read as strings
- C) `float()` is required for dictionary values
- D) GPA cannot be stored as a string

**Answer:** B

**7.** `DictWriter` requires you to specify:
- A) The number of rows
- B) The column fieldnames
- C) The file size
- D) The data types of each column

**Answer:** B

**8.** To append to an existing CSV without overwriting:
- A) Open with `'w'`
- B) Open with `'a'`
- C) Use `csv.append()`
- D) Use `DictWriter.append()`

**Answer:** B

**9.** What does `writer.writeheader()` do?
- A) Writes the first data row
- B) Writes the column names as the first row
- C) Validates the column types
- D) Required only for DictReader

**Answer:** B

**10.** CSV files are useful because:
- A) They can only be opened in Python
- B) They store structured data readable by Excel, Google Sheets, databases, and code
- C) They encrypt data automatically
- D) They are faster than databases

**Answer:** B

### Reflections

1. CSV files are everywhere — government data, school records, sports stats, business reports. What public dataset would you want to analyze with Python? (Hint: data.gov, census.gov)

2. The ability to read and process CSV data is one of the most in-demand programming skills. How does this session change what kinds of jobs or projects feel accessible to you?

3. You can read, filter, and analyze data. What does it mean to have the ability to ask your own questions of data — not just accept the stories others tell with data?

4. Imagine ACCN tracked each student's progress in a CSV. What columns would tell the most complete story of a student's growth — beyond just grades?

### Summary

- `csv.reader` reads CSV row by row as lists; `csv.DictReader` reads as dictionaries
- `csv.writer` writes lists; `csv.DictWriter` writes dictionaries with named columns
- CSV values are always strings — convert with `int()` or `float()` for math
- Use `newline=""` when opening CSV files for writing on Windows
- CSV data flows naturally into Python lists and dictionaries for analysis

---

## Session 5.4: Introduction to APIs with the requests Library
**Duration:** 60 minutes | **Format:** Lecture + Live Demo

### Introduction

APIs (Application Programming Interfaces) let your Python code talk to the internet. You can get live weather data, look up song information, access public databases, and more. This is how real applications connect to the world.

**Learning Objectives:**
- Understand what an API is and how HTTP requests work
- Install and use the `requests` library
- Make GET requests and parse JSON responses
- Handle API errors gracefully

### Core Concepts

#### What is an API?

An API is a service that accepts requests and returns data. When you use a weather app, it requests data from a weather API. You can do the same in Python.

```
Your Python code  →  HTTP Request  →  API Server
                  ←  JSON Response ←
```

#### Installing requests

```bash
pip install requests
```

#### Making Your First API Call

```python
import requests

# Public API — no key required
url = "https://api.adviceslip.com/advice"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    print(f"Advice: {data['slip']['advice']}")
else:
    print(f"Error: {response.status_code}")
```

#### Working with JSON Data

```python
import requests

# Open Trivia Database — free, no key required
url = "https://opentdb.com/api.php?amount=1&category=18&type=multiple"
response = requests.get(url)
data = response.json()

question = data["results"][0]
print(f"Question: {question['question']}")
print(f"Correct Answer: {question['correct_answer']}")
print(f"Difficulty: {question['difficulty']}")
```

#### Handling Errors Gracefully

```python
import requests

def get_data(url):
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()   # raises exception for 4xx/5xx
        return response.json()
    except requests.exceptions.ConnectionError:
        print("No internet connection.")
    except requests.exceptions.Timeout:
        print("Request timed out.")
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error: {e}")
    return None
```

#### Public APIs to Explore

- `https://api.adviceslip.com/advice` — random advice
- `https://opentdb.com/api.php?amount=5` — trivia questions
- `https://catfact.ninja/fact` — cat facts
- `https://api.agify.io?name=Marcus` — predicted age by name
- `https://official-joke-api.appspot.com/random_joke` — random joke

### Video Lessons

**Video 1 — Python requests Library (Corey Schafer)**
The `requests` library makes working with HTTP APIs feel as simple as reading a file — and Corey shows every step from installation to parsing the JSON response. He covers GET and POST requests, passing parameters, checking status codes, and handling errors when the server is down or slow. This is the starting point for any project that pulls live data from the internet.
https://www.youtube.com/watch?v=tb8gHvYlCFs

**Video 2 — Working with APIs in Python (Tech With Tim)**
Tim demonstrates how to use real public APIs to pull weather data, sports scores, and more into Python programs. He shows how to navigate JSON responses using dictionary syntax, how to extract specific fields, and how to build a simple data-fetching program around an API. By the end of this video, the internet will feel like a data source you can program against.
https://www.youtube.com/watch?v=tb8gHvYlCFs

**Video 3 — REST APIs Explained for Beginners (freeCodeCamp)**
Before you use an API, you need to understand what REST is, how HTTP methods work (GET, POST, PUT, DELETE), and what JSON looks like. This video explains the concepts clearly without assuming any background knowledge, making the requests library code from the other videos suddenly make much more sense. Understanding APIs opens up a world of data: music, sports, space, financial data, and more.
https://www.youtube.com/watch?v=tb8gHvYlCFs
### Practice Exercises

**Exercise 1 — Advice App**
Call the advice slip API in a while loop. Each time the user presses Enter, show them new advice. Exit when they type "quit".

**Exercise 2 — Name Explorer**
Use `https://api.agify.io?name=NAME` to predict the age for 5 different names. Print results as a table.

**Exercise 3 — Trivia Quiz**
Call the Open Trivia Database API for 5 questions. Build a quiz: show each question, let the user answer, and track their score.

**Exercise 4 — API Error Handler**
Write a robust `fetch_data(url)` function that handles all possible errors (no internet, timeout, bad URL, bad response) and always returns either data or `None`.

**Exercise 5 — Your Choice**
Find a public API that interests you (music, sports, space, food — anything). Write a program that makes a real call and displays the results in a readable format.

### Knowledge Check

**1.** An API is:
- A) A Python library
- B) A programming interface that lets applications communicate
- C) A type of database
- D) A file format

**Answer:** B

**2.** `requests.get(url)` sends:
- A) A POST request
- B) A GET request to retrieve data
- C) A file upload
- D) A DELETE request

**Answer:** B

**3.** `response.status_code == 200` means:
- A) Error
- B) Not found
- C) Success
- D) Server error

**Answer:** C

**4.** `response.json()` converts the response to:
- A) A string
- B) A Python dictionary or list
- C) A CSV file
- D) A bytes object

**Answer:** B

**5.** To install the `requests` library:
- A) `import requests`
- B) `python get requests`
- C) `pip install requests`
- D) It is built into Python

**Answer:** C

**6.** `response.raise_for_status()` does what?
- A) Prints the status code
- B) Raises an exception for 4xx/5xx responses
- C) Retries the request
- D) Closes the connection

**Answer:** B

**7.** JSON stands for:
- A) Java Script Object Notation
- B) JavaScript Online Network
- C) Just Some Output Notation
- D) Java Standard Object Number

**Answer:** A

**8.** `timeout=5` in `requests.get(url, timeout=5)` means:
- A) Wait up to 5 minutes
- B) Retry 5 times
- C) Give up after 5 seconds if no response
- D) Send 5 requests

**Answer:** C

**9.** APIs return JSON data, which Python reads as:
- A) A list of strings
- B) A dictionary or list of dictionaries
- C) A CSV string
- D) A bytes object

**Answer:** B

**10.** Which exception is raised when there is no internet connection?
- A) `ValueError`
- B) `TimeoutError`
- C) `requests.exceptions.ConnectionError`
- D) `FileNotFoundError`

**Answer:** C

### Reflections

1. APIs let your code connect to the whole internet. What data from the world would you want your programs to access — music charts, local events, scholarship databases, NASA data?

2. Mark Dean invented the ISA bus that made computers modular — hardware APIs of their time. How does the concept of an API (a standard interface to a system) apply beyond software?

3. Free, public APIs are a gift from developers to the community. What would you build if you had access to any data source in the world?

4. APIs have terms of service — rules about how you can use them. What ethical responsibilities come with accessing and using others' data?

### Summary

- APIs are services that respond to HTTP requests with structured data
- `requests.get(url)` makes a GET request; `response.json()` parses the JSON
- `status_code == 200` means success; `raise_for_status()` catches HTTP errors
- Handle `ConnectionError`, `Timeout`, and `HTTPError` for robust API code
- JSON response data maps directly to Python dictionaries and lists

---

## Session 5.5: Build a Personal Journal App
**Duration:** 60 minutes | **Format:** Capstone Project

### Introduction

This session brings together files, error handling, and all your Python skills to build a personal journal application — a real, working program you can actually use. Your journal will save entries persistently, let you search past entries, and display them beautifully.

**Learning Objectives:**
- Combine file I/O, error handling, user input, and functions
- Build a complete, polished application
- Think about user experience in program design
- Celebrate five weeks of Python progress

### Core Concepts

#### The Complete Journal App

```python
"""
Personal Journal App
ACCN Learning Hub — Week 5 Capstone
A real journal that saves your entries persistently.
"""

import os
from datetime import datetime

JOURNAL_FILE = "my_journal.txt"

def load_entries():
    """Load all journal entries from file."""
    if not os.path.exists(JOURNAL_FILE):
        return []
    try:
        with open(JOURNAL_FILE, "r") as f:
            content = f.read()
        if not content.strip():
            return []
        entries = content.strip().split("---ENTRY---")
        return [e.strip() for e in entries if e.strip()]
    except Exception as e:
        print(f"Error loading journal: {e}")
        return []

def save_entry(text):
    """Append a new entry to the journal file."""
    timestamp = datetime.now().strftime("%A, %B %d, %Y at %I:%M %p")
    entry = f"\n[{timestamp}]\n{text}\n"
    try:
        with open(JOURNAL_FILE, "a") as f:
            f.write(entry + "---ENTRY---")
        print("Entry saved.")
    except Exception as e:
        print(f"Could not save entry: {e}")

def view_entries(entries):
    """Display all journal entries."""
    if not entries:
        print("No entries yet. Write your first one!")
        return
    print(f"\n=== Your Journal ({len(entries)} entries) ===")
    for i, entry in enumerate(entries, 1):
        print(f"\n--- Entry {i} ---")
        print(entry)

def search_entries(entries, keyword):
    """Find entries containing a keyword."""
    results = [e for e in entries if keyword.lower() in e.lower()]
    if results:
        print(f"\nFound {len(results)} entries containing '{keyword}':")
        for r in results:
            print(f"\n{r}")
    else:
        print(f"No entries found containing '{keyword}'.")

def main():
    print("=" * 45)
    print("   My Personal Journal — ACCN Edition")
    print("=" * 45)

    while True:
        entries = load_entries()
        print(f"\n({len(entries)} entries saved)")
        print("\n1. Write new entry")
        print("2. View all entries")
        print("3. Search entries")
        print("4. View latest entry")
        print("5. Exit")

        choice = input("\nChoice: ").strip()

        if choice == "1":
            print("\nWrite your entry (press Enter twice when done):")
            lines = []
            while True:
                line = input()
                if line == "" and lines and lines[-1] == "":
                    break
                lines.append(line)
            text = "\n".join(lines[:-1]) if lines else ""
            if text.strip():
                save_entry(text)
            else:
                print("Empty entry — not saved.")

        elif choice == "2":
            view_entries(entries)

        elif choice == "3":
            keyword = input("Search for: ")
            search_entries(entries, keyword)

        elif choice == "4":
            if entries:
                print("\n--- Latest Entry ---")
                print(entries[-1])
            else:
                print("No entries yet.")

        elif choice == "5":
            print("\nKeep writing, keep growing. Goodbye!")
            break

        else:
            print("Please choose 1-5.")

if __name__ == "__main__":
    main()
```

### Video Lessons

**Video 1 — Build a Python Journal App (Tech With Tim)**
This video walks through building a complete text-based Python application that reads and writes files, handles user input, and uses functions to organize the code. Tim emphasizes the design process — planning before coding, testing as you build, and refactoring when things get messy. This is the kind of project that ties together everything from Weeks 1 through 5.
https://www.youtube.com/watch?v=YYXdXT2l-Gg

**Video 2 — Python File-Based Application Patterns (Corey Schafer)**
Corey demonstrates how professional Python applications handle persistent data using files: structured reading/writing, data validation, and graceful error recovery. He explains how to design the data layer of an application separately from the user interface layer, a pattern that makes code much easier to test and maintain. These design principles scale from small scripts to large applications.
https://www.youtube.com/watch?v=Uh2ebFW8OYM

**Video 3 — Debugging Python Applications (CS Dojo)**
Debugging a full application requires different skills than fixing a single function, and this video shows how to use systematic techniques: logging, tracing, isolating failures, and using Python's built-in debugger. CS Dojo demonstrates real debugging sessions so you see the actual thought process, not just the final fix. These debugging skills are what experienced developers use every single day.
https://www.youtube.com/watch?v=YYXdXT2l-Gg
### Practice Exercises

**Exercise 1 — Run It**
Build and run the complete journal app. Write at least 5 real entries — things you have learned, goals you have, reflections from this course.

**Exercise 2 — Add Tags**
Add a tagging system: when writing an entry, ask for tags (e.g., "python, ACCN, robotics"). Save tags with the entry. Add a "filter by tag" option to the menu.

**Exercise 3 — Entry Count by Day**
Add a statistics option that counts how many entries were written per day of the week.

**Exercise 4 — Export to CSV**
Add an option to export all journal entries to a `journal_export.csv` file with columns: entry number, date, content.

**Exercise 5 — Your Personal Touch**
Add one feature that makes the journal uniquely yours — a mood tracker, a gratitude section, a goals reminder. Design and implement it.

### Knowledge Check

**1.** `os.path.exists(filename)` returns:
- A) The file contents
- B) `True` if the file exists, `False` otherwise
- C) The file size
- D) The file's last modified date

**Answer:** B

**2.** `datetime.now().strftime("%B %d, %Y")` produces:
- A) Numbers only
- B) A formatted date string like "February 24, 2026"
- C) A timestamp in seconds
- D) An error

**Answer:** B

**3.** The journal uses `"---ENTRY---"` as a separator to:
- A) Encrypt entries
- B) Mark the end of each entry so multiple can be stored in one file
- C) Count entries faster
- D) Satisfy Python requirements

**Answer:** B

**4.** `content.strip().split("---ENTRY---")` splits on:
- A) Newlines
- B) Spaces
- C) The custom separator string
- D) Commas

**Answer:** C

**5.** `[e.strip() for e in entries if e.strip()]` is:
- A) A while loop
- B) A list comprehension that filters out empty entries
- C) A dictionary comprehension
- D) A function call

**Answer:** B

**6.** Why reload `entries = load_entries()` at the start of each menu loop?
- A) Python requires it
- B) To always have the most current entries including any just added
- C) It is faster than storing in memory
- D) To prevent memory leaks

**Answer:** B

**7.** `if __name__ == "__main__":` before `main()` means:
- A) `main()` runs automatically always
- B) `main()` only runs when this file is executed directly
- C) `main()` is private
- D) `main()` requires arguments

**Answer:** B

**8.** `[e for e in entries if keyword.lower() in e.lower()]` is:
- A) A filter using list comprehension — case-insensitive search
- B) Sorting entries by keyword
- C) Deleting entries containing keyword
- D) A nested loop

**Answer:** A

**9.** `lines[:-1]` when building the entry text removes:
- A) The first line
- B) The last line (the second empty line used to end input)
- C) All empty lines
- D) The timestamp line

**Answer:** B

**10.** What makes this journal app a "real" program rather than just an exercise?
- A) It has more than 50 lines of code
- B) It persists data to a file, handles errors, and provides a useful interface
- C) It uses advanced Python features
- D) It connects to the internet

**Answer:** B

### Reflections

1. You just built a real application — something that actually works and stores your real thoughts. How does it feel to have built something functional from scratch?

2. Journaling has been used by thinkers, leaders, and artists throughout history — from Frederick Douglass to Tupac Shakur. What would you want your journal to capture about this period of your life?

3. Your journal app is private and stored locally. What would change if this data were stored in the cloud? What privacy considerations would come up?

4. Five weeks of Python complete. Look at your first program from Week 1. You went from `print("Hello")` to a full application with file persistence, search, error handling, and a menu. What does that growth tell you about what is possible?

### Summary

- A real application combines all your skills: functions, files, error handling, loops, data structures
- `os.path.exists()` checks for a file before opening; always handle `FileNotFoundError`
- Custom separators (`---ENTRY---`) let you store multiple records in a single file
- `datetime.now().strftime(format)` creates human-readable timestamps
- Week 5 complete — you can build programs that persist data, handle errors, and interact with users like real software

---

# WEEK 6: Python in the Real World

## Session 6.1: Introduction to Libraries and pip
**Duration:** 60 minutes | **Format:** Lecture + Installation Lab

### Introduction

Python's true power comes from its ecosystem of thousands of libraries. Instead of building everything from scratch, you can install tools built by the global developer community. This session teaches you how to find, install, and use Python packages.

**Learning Objectives:**
- Understand what pip is and how to use it
- Install packages with `pip install`
- Use virtual environments to keep projects clean
- Explore the Python Package Index (PyPI)

### Core Concepts

#### What is pip?
`pip` is Python's package manager. It downloads and installs libraries from PyPI (pypi.org).

```bash
# Install a package
pip install requests
pip install matplotlib
pip install colorama

# See what is installed
pip list

# Install from a requirements file
pip install -r requirements.txt

# Check a package's version
pip show requests
```

#### Creating a requirements.txt

```text
requests==2.31.0
colorama==0.4.6
matplotlib==3.8.0
```

```bash
# Install everything in one command
pip install -r requirements.txt
```

#### colorama — Add Color to Terminal Output

```python
from colorama import Fore, Back, Style, init
init()   # required on Windows

print(Fore.GREEN + "Success! All tests passed.")
print(Fore.RED + "Error: File not found.")
print(Fore.CYAN + "ACCN Learning Hub" + Style.RESET_ALL)
print(Back.YELLOW + Fore.BLACK + "  WARNING  " + Style.RESET_ALL)
```

#### Virtual Environments — Keep Projects Separate

```bash
# Create a virtual environment
python3 -m venv myenv

# Activate it (Mac/Linux)
source myenv/bin/activate

# Activate it (Windows)
myenv\Scripts\activate

# Deactivate
deactivate
```

#### Useful Libraries to Know

| Library | Purpose |
|---------|---------|
| `requests` | HTTP requests, APIs |
| `matplotlib` | Data visualization |
| `colorama` | Colored terminal output |
| `pandas` | Data analysis |
| `pillow` | Image processing |
| `flask` | Web development |
| `pygame` | Game development |

### Video Lessons

**Video 1 — Python pip and Virtual Environments (Corey Schafer)**
pip is Python's package manager and virtual environments let you keep different projects' dependencies separate — and both are essential tools for any real Python project. Corey explains how to install packages, create and activate virtual environments, and use `requirements.txt` to share your project's dependencies. This is the professional workflow used by every Python developer.
https://www.youtube.com/watch?v=cY2NXB_Tqq0

**Video 2 — Top Python Libraries You Should Know (Tech With Tim)**
Tim surveys the Python library ecosystem, covering the most important libraries across data science (NumPy, Pandas, Matplotlib), web development (Flask, Django), automation (Selenium, requests), and machine learning (scikit-learn). Understanding what libraries exist — and what problems they solve — lets you choose the right tool for any project. This is the map of Python's ecosystem you need before Week 6.
https://www.youtube.com/watch?v=QVdf0LgmICw

**Video 3 — PyPI and pip Tutorial for Beginners (Real Python)**
PyPI (the Python Package Index) is the repository of over 500,000 Python packages, and this tutorial explains how to search for packages, read their documentation, and install them safely. It also covers potential pitfalls like version conflicts and how to avoid installing packages globally. Understanding PyPI makes the Python ecosystem feel navigable rather than overwhelming.
https://www.youtube.com/watch?v=U2ZN104hIcc
### Practice Exercises

**Exercise 1 — Install and Verify**
Install `requests`, `colorama`, and `matplotlib`. Run `pip list` and confirm they appear.

**Exercise 2 — Colorful Output**
Rewrite your Week 1 greeting program using `colorama` to make the output colorful and visually appealing.

**Exercise 3 — requirements.txt**
Create a `requirements.txt` file for a fictional ACCN app with 4 dependencies. Write a comment in the file explaining what each package does.

**Exercise 4 — Virtual Environment**
Create a virtual environment called `accn_env`. Activate it, install `requests` inside it, verify it is installed, then deactivate.

**Exercise 5 — PyPI Explorer**
Visit pypi.org and find a library that interests you. Read its documentation and write a 5-line Python program that uses it.

### Knowledge Check

**1.** pip stands for:
- A) Python Install Package
- B) Pip Installs Packages (recursive acronym)
- C) Package Index Python
- D) Python Internet Protocol

**Answer:** B

**2.** `pip install colorama` installs from:
- A) The Python standard library
- B) PyPI (Python Package Index)
- C) Your local files
- D) GitHub directly

**Answer:** B

**3.** A virtual environment is used to:
- A) Run Python in a web browser
- B) Isolate project dependencies from other projects
- C) Speed up Python execution
- D) Connect to virtual machines

**Answer:** B

**4.** `pip list` shows:
- A) Available packages on PyPI
- B) All packages installed in the current environment
- C) Only packages you installed today
- D) Python's built-in modules

**Answer:** B

**5.** `requirements.txt` is used to:
- A) Document project requirements in English
- B) List packages so others can install the same dependencies
- C) Restrict which packages can be installed
- D) Store pip configuration

**Answer:** B

**6.** `colorama.init()` is required on Windows because:
- A) It registers the package
- B) Windows terminal does not support ANSI color codes by default
- C) It initializes the color database
- D) Python requires it on all platforms

**Answer:** B

**7.** `Style.RESET_ALL` in colorama:
- A) Uninstalls colorama
- B) Resets text to default color and style
- C) Clears the terminal
- D) Resets the program

**Answer:** B

**8.** Which command installs all packages from requirements.txt?
- A) `pip get -r requirements.txt`
- B) `pip install requirements.txt`
- C) `pip install -r requirements.txt`
- D) `pip load requirements.txt`

**Answer:** C

**9.** After activating a virtual environment, `pip install` installs to:
- A) The global Python installation
- B) The virtual environment only
- C) A temporary location
- D) PyPI

**Answer:** B

**10.** Which library would you use for data visualization?
- A) `requests`
- B) `colorama`
- C) `matplotlib`
- D) `pillow`

**Answer:** C

### Reflections

1. pip gives you access to thousands of tools built by developers worldwide. How does the open-source community change what individual programmers can build?

2. Virtual environments keep projects clean and separate. What is the equivalent of a "virtual environment" in other areas of your life — keeping projects, relationships, or goals separated?

3. Kimberly Bryant started Black Girls Code because the tech ecosystem was not built for everyone. How does knowing about libraries and pip change what careers feel accessible to you?

4. You are now using the same tools as professional developers — pip, virtual environments, third-party libraries. What does that feel like?

### Summary

- `pip install packagename` installs packages from PyPI
- `pip list` shows installed packages; `requirements.txt` saves your dependency list
- Virtual environments isolate project dependencies — always use them for real projects
- `colorama` adds color to terminal output; `matplotlib` creates charts; `requests` talks to APIs
- The Python ecosystem has libraries for almost everything — you rarely need to build from scratch

---

## Session 6.2: NumPy — Math Superpowers for Python
**Duration:** 60 minutes | **Format:** Lecture + Data Lab

### Introduction

Lists are great — but when you need to do math on thousands of numbers at once, they are too slow. Enter **NumPy** (Numerical Python), the supercharged array library that powers data science, machine learning, and scientific computing.

With NumPy, you can add 1,000,000 numbers in the time it takes a loop to add a hundred. NASA uses it. Instagram uses it. If you want to work with data, you need NumPy.

**Learning Objectives:**
- Create NumPy arrays and understand why they're faster than lists
- Index, slice, and reshape arrays
- Perform math operations on whole arrays at once
- Use random number generation and key stats functions
- Apply NumPy to real ACCN/robotics data

**Why it matters for ACCN:** Data is everywhere — test scores, match results, sensor readings. NumPy lets you analyze all of it without writing 50 loops.

### Core Concepts

#### Importing NumPy and Creating Arrays

```python
import numpy as np  # np is the standard alias — everyone uses it!

# Create an array from a list
scores = np.array([94, 82, 91, 78, 88, 95])
print(scores)         # [94 82 91 78 88 95]
print(type(scores))   # <class 'numpy.ndarray'>

# The big difference vs a Python list:
# NumPy array — all values must be the same type (fast!)
# Python list — can mix types, but slower for math
```

#### Array Math — The Magic of NumPy

```python
import numpy as np

scores = np.array([94, 82, 91, 78, 88])

# Math on EVERY element at once (no loop needed!)
print(scores + 5)        # [99 87 96 83 93]
print(scores * 2)        # [188 164 182 156 176]
print(scores / 100)      # [0.94 0.82 0.91 0.78 0.88]
print(scores ** 2)       # [8836 6724 8281 6084 7744]

# Comparison — returns True/False array
print(scores >= 90)      # [ True False  True False False]

# Useful stats functions
print(np.mean(scores))   # 86.6
print(np.max(scores))    # 94
print(np.min(scores))    # 78
print(np.sum(scores))    # 433
print(np.std(scores))    # standard deviation
```

#### Indexing and Slicing Arrays

```python
import numpy as np

team_points = np.array([12, 25, 8, 30, 17, 22, 5, 19])

# Indexing (same as lists)
print(team_points[0])    # 12 (first match)
print(team_points[-1])   # 19 (last match)

# Slicing — [start:stop:step]
print(team_points[2:5])  # [8 30 17]
print(team_points[:3])   # [12 25  8] (first 3)
print(team_points[::2])  # [12  8 17  5] (every other)

# Boolean indexing — filter by condition!
high_scores = team_points[team_points >= 20]
print(high_scores)       # [25 30 22] — only the big games!
```

#### 2D Arrays — Tables and Matrices

```python
import numpy as np

# A 2D array — like a table (rows x columns)
student_scores = np.array([
    [94, 82, 91],   # Aaliyah: Quiz 1, 2, 3
    [78, 85, 88],   # Marcus: Quiz 1, 2, 3
    [91, 90, 95],   # Destiny: Quiz 1, 2, 3
])

print(student_scores.shape)       # (3, 3) — 3 rows, 3 cols
print(student_scores[0])          # Aaliyah's scores: [94 82 91]
print(student_scores[:, 1])       # All Quiz 2 scores: [82 85 90]
print(np.mean(student_scores, axis=1))  # Each student's average
print(np.mean(student_scores, axis=0))  # Each quiz's class average
```

#### Creating Special Arrays

```python
import numpy as np

# Arrays filled with zeros or ones
zeros = np.zeros(5)           # [0. 0. 0. 0. 0.]
ones = np.ones((3, 3))        # 3x3 grid of 1s

# Range arrays
weeks = np.arange(1, 7)       # [1 2 3 4 5 6]
evens = np.arange(0, 20, 2)   # [0 2 4 6 8 10 12 14 16 18]
linspace = np.linspace(0, 1, 5)  # [0.  0.25  0.5  0.75  1.]

# Random arrays (great for simulations!)
random_scores = np.random.randint(70, 100, size=10)
print(random_scores)          # 10 random integers between 70-99

# Set a seed for reproducibility
np.random.seed(42)
simulation = np.random.randn(5)   # 5 random numbers from normal dist
```

### Video Lessons

**Video 1 — NumPy Tutorial for Beginners (freeCodeCamp)**
This comprehensive NumPy course covers arrays, indexing, slicing, math operations, 2D arrays, and random number generation with clear, practical examples throughout. freeCodeCamp's teaching style is unhurried and methodical, making it ideal for building a solid foundation before moving to more advanced uses. Plan to code along and pause frequently — each section builds directly on the last.
https://www.youtube.com/watch?v=QUT1VHiLmmI

**Video 2 — Python NumPy Tutorial (Corey Schafer)**
Corey's NumPy tutorial focuses on the concepts that matter most in practice: vectorized operations, boolean indexing, and working with multidimensional arrays. His code examples are clean and well-explained, making it easy to follow along in Colab and experiment as you go. This is the video to watch after freeCodeCamp's intro when you are ready to go deeper.
https://www.youtube.com/watch?v=GB9ByFAIAH4

**Video 3 — NumPy Crash Course (Tech With Tim)**
Tim's fast-paced crash course is perfect for review and consolidation after watching the longer tutorials. He covers the most important NumPy functions in a short time, emphasizing the patterns that appear most often in real data science code. Watch this one when you want a quick refresher or to check your understanding of the key concepts.
https://www.youtube.com/watch?v=9JUAPgtkKpI
### Practice Exercises

**Exercise 1 — Class Stats**
Create a NumPy array of 10 test scores. Calculate the mean, max, min, and standard deviation. Then find all scores above the class average using boolean indexing.

```python
import numpy as np
scores = np.array([88, 72, 95, 61, 84, 90, 78, 83, 69, 91])
# Your code here
```

**Exercise 2 — Umoja Match Tracker**
Umoja Robotics 7712 played 8 matches with these point totals:
`[24, 31, 18, 42, 27, 35, 12, 39]`

- Find the average score per match
- Find how many matches scored above 30
- Find the total points across the season

**Exercise 3 — Grade Curve**
The teacher wants to add 5 points to every score in the class (but cap it at 100).

```python
import numpy as np
scores = np.array([82, 76, 91, 65, 88, 54, 97, 70])
curved = scores + 5
curved = np.minimum(curved, 100)  # cap at 100
print(curved)
```

Now try: subtract the class mean from each score (centering). What does this tell you?

**Exercise 4 — 2D Student Table**
Create a 2D array with 5 students and 4 quiz scores each (make up the values). Calculate:
- Each student's average (hint: `axis=1`)
- Each quiz's class average (hint: `axis=0`)
- The overall class average

**Exercise 5 — Robot Sensor Simulation**
Simulate 100 sensor readings from a robot arm (random integers from 0 to 360 degrees). Find how many readings were in the "danger zone" (>315 degrees or <45 degrees). Plot a histogram using matplotlib!

### Knowledge Check

**1.** What does `import numpy as np` do?
- A) Creates a new NumPy file
- B) Imports NumPy and gives it the alias `np`
- C) Installs NumPy
- D) Renames Python to NumPy

**Answer:** B

**2.** `np.array([1, 2, 3])` creates:
- A) A Python list
- B) A NumPy array
- C) A dictionary
- D) A tuple

**Answer:** B

**3.** What is the output of `np.array([1, 2, 3]) * 2`?
- A) `[1, 2, 3, 1, 2, 3]`
- B) `[2, 4, 6]`
- C) `6`
- D) Error

**Answer:** B

**4.** `np.mean([10, 20, 30])` returns:
- A) 10
- B) 20
- C) 30
- D) 60

**Answer:** B

**5.** `scores[scores > 80]` returns:
- A) All scores
- B) Only scores greater than 80
- C) The index of scores greater than 80
- D) True or False for each score

**Answer:** B

**6.** `arr.shape` tells you:
- A) The sum of all elements
- B) The dimensions of the array (rows, columns)
- C) The data type
- D) The max value

**Answer:** B

**7.** `np.zeros(5)` creates:
- A) An array of five 1s
- B) An array of five 0s
- C) A 5x5 matrix of zeros
- D) An empty list

**Answer:** B

**8.** `np.arange(1, 10, 2)` produces:
- A) `[1, 2, 3, 4, 5, 6, 7, 8, 9]`
- B) `[1, 3, 5, 7, 9]`
- C) `[2, 4, 6, 8]`
- D) `[0, 2, 4, 6, 8]`

**Answer:** B

**9.** In a 2D array, `axis=0` means operations run:
- A) Across rows (column by column)
- B) Across columns (row by row)
- C) On the diagonal
- D) On every element individually

**Answer:** A

**10.** Why is NumPy faster than Python lists for math?
- A) NumPy uses a different version of Python
- B) NumPy stores data in contiguous memory with a fixed type, enabling C-speed operations
- C) NumPy skips error checking
- D) Python lists don't support math

**Answer:** B

### Reflections

1. NumPy lets you do math on 1,000,000 numbers nearly instantly. What problems would have been impossible (or impractical) before tools like this existed?

2. Dr. Timnit Gebru, a Black AI researcher, uses tools like NumPy to analyze bias in machine learning systems. Why is it important that people from diverse backgrounds are doing this kind of data analysis?

3. Think about your robotics team's data — match scores, practice times, sensor readings. What would you want to discover if you could analyze all of it with NumPy?

4. "Vectorized" operations (doing math on whole arrays) vs. loops — this is a pattern that shows up everywhere in computing. Where else do you see the idea of doing things in parallel rather than one at a time?

### Summary

- NumPy arrays are faster and more powerful than Python lists for numerical operations
- `np.array()` creates an array; math operations apply to every element automatically
- Indexing `arr[i]`, slicing `arr[2:5]`, and boolean filtering `arr[arr > 80]` work intuitively
- 2D arrays are like tables: `arr[row, col]`, `axis=0` = down columns, `axis=1` = across rows
- Key functions: `np.mean()`, `np.max()`, `np.min()`, `np.sum()`, `np.std()`, `np.random`

---

## Session 6.3: Pandas — Data Tables in Python
**Duration:** 60 minutes | **Format:** Lecture + Data Lab

### Introduction

Imagine Excel — but programmable, lightning-fast, and connected to everything. That is **Pandas**. It is the #1 tool for data analysis in Python, used by data scientists everywhere to load, clean, explore, and analyze data.

Marcus is analyzing his robotics team's performance across 20 competitions. Brianna is comparing scholarship amounts and requirements. Destiny is looking at music streaming data for her business project. All of them need Pandas.

**Learning Objectives:**
- Understand the two core Pandas structures: Series and DataFrame
- Create DataFrames from dictionaries and lists
- Load data from a CSV file
- Filter, sort, and aggregate data
- Use built-in stats to describe a dataset

**Why it matters for ACCN:** Every career that touches data — business, medicine, engineering, sports analytics, policy — uses tools like Pandas. This is the language of data science.

### Core Concepts

#### Importing Pandas and Creating a Series

```python
import pandas as pd   # pd is the standard alias

# A Series is like a labeled list (one column of data)
scores = pd.Series([94, 82, 91, 78, 88],
                   index=["Aaliyah", "Marcus", "Destiny", "Jaylen", "Brianna"])
print(scores)
# Aaliyah    94
# Marcus     82
# Destiny    91
# Jaylen     78
# Brianna    88

print(scores["Aaliyah"])    # 94
print(scores[scores >= 90]) # Filter: only 90+
```

#### Creating a DataFrame

```python
import pandas as pd

# A DataFrame is a table — rows and columns
students = pd.DataFrame({
    "Name": ["Aaliyah", "Marcus", "Destiny", "Jaylen", "Brianna", "Trevon"],
    "Grade": [11, 10, 11, 12, 10, 11],
    "GPA": [3.8, 3.2, 3.7, 2.9, 3.5, 3.1],
    "Course": ["Python", "AI", "Mechanical", "Python", "AI", "Mechanical"],
    "Hours": [8, 6, 9, 5, 7, 6]
})

print(students)
print(students.shape)        # (6, 5) — 6 rows, 5 columns
print(students.columns)      # column names
print(students.dtypes)       # data types of each column
```

#### Exploring Data with describe() and head()

```python
import pandas as pd

# These are the first things you run on any new dataset!
print(students.head())          # first 5 rows
print(students.tail(3))         # last 3 rows
print(students.info())          # column types, missing values
print(students.describe())      # stats: count, mean, std, min, max, quartiles

# Access a single column (returns a Series)
print(students["GPA"])
print(students["GPA"].mean())   # average GPA
print(students["GPA"].max())    # highest GPA
```

#### Filtering and Sorting

```python
import pandas as pd

# Filter rows by condition
honor_roll = students[students["GPA"] >= 3.5]
print(honor_roll)

# Filter with multiple conditions
python_aces = students[(students["Course"] == "Python") & (students["GPA"] >= 3.5)]
print(python_aces)

# Sort by a column
by_gpa = students.sort_values("GPA", ascending=False)
print(by_gpa)

# Access specific rows and columns
print(students.loc[0])               # row by label/index
print(students.iloc[0:3])            # first 3 rows by position
print(students.loc[:, ["Name", "GPA"]])  # just Name and GPA columns
```

#### Loading a CSV File

```python
import pandas as pd

# In Colab, you can upload a CSV and load it like this:
# df = pd.read_csv("my_file.csv")

# Or use a URL directly (great for public datasets!)
url = "https://people.sc.fsu.edu/~jburkardt/data/csv/grades.csv"
df = pd.read_csv(url)
print(df.head())
print(df.describe())

# Save a DataFrame to CSV
students.to_csv("accn_students.csv", index=False)
```

#### Groupby — Aggregate by Category

```python
import pandas as pd

# Group by Course and find the average GPA per course
course_averages = students.groupby("Course")["GPA"].mean()
print(course_averages)

# Multiple aggregations
summary = students.groupby("Course").agg({
    "GPA": ["mean", "max", "min"],
    "Hours": "sum"
})
print(summary)

# Count students per course
print(students["Course"].value_counts())
```

### Video Lessons

**Video 1 — Pandas Tutorial for Beginners (Corey Schafer)**
Corey's Pandas series is the highest-rated Python data analysis tutorial on YouTube, and Part 1 covers the most essential concepts: Series, DataFrames, reading CSV files, and basic filtering. He uses a real dataset throughout, so the examples feel meaningful rather than made up. Start here and return to the rest of his Pandas series as you need more advanced features.
https://www.youtube.com/watch?v=ZyhVh-qRZPA

**Video 2 — Data Analysis with Python and Pandas (freeCodeCamp)**
This full-length course covers the complete Pandas workflow: loading data, cleaning missing values, filtering and sorting, groupby aggregation, and merging DataFrames. The instructor uses real datasets (not toy examples), showing the messy reality of data analysis alongside the clean techniques for handling it. If you want a single comprehensive Pandas resource, this is it.
https://www.youtube.com/watch?v=vmEHCJofslg

**Video 3 — Pandas for Real Data Analysis (Keith Galli)**
Keith Galli demonstrates real data analysis workflows using movie datasets, showing how Pandas handles groupby, pivot tables, and multi-column filtering in ways that feel immediately useful. His teaching style emphasizes understanding why each function works the way it does, not just memorizing the syntax. This video is especially strong on the groupby and aggregation patterns you need for the practice exercises.
https://www.youtube.com/watch?v=r-uOLxNrNk8
### Practice Exercises

**Exercise 1 — Build Your Student DataFrame**
Create a DataFrame with at least 8 students, including: Name, Grade, GPA, Favorite Subject, and Hours per week studying. Use `describe()` to get summary statistics.

**Exercise 2 — Umoja Match Results**
Create a DataFrame of 10 Umoja Robotics 7712 matches with: match_number, opponent, our_score, their_score, win (True/False).
- Find total wins
- Find average score per match
- Find matches where we won by more than 10 points

**Exercise 3 — Scholarship Finder**
Create a DataFrame of 8 scholarships: name, amount, min_gpa, deadline, field_of_study.
Filter to find scholarships that:
- Offer more than $2,000
- Require a GPA below your GPA
- Are in STEM fields

**Exercise 4 — Group Analysis**
Using your student DataFrame from Exercise 1:
- Group by Favorite Subject and find average GPA per subject
- Sort by GPA descending
- Find the top 3 students by GPA

**Exercise 5 — Real Data Analysis**
In Colab, load a real dataset from a URL or upload a CSV. Run:
- `df.head()`, `df.info()`, `df.describe()`
- Find missing values with `df.isnull().sum()`
- Pick one question to answer from the data and find it

### Knowledge Check

**1.** What is a Pandas Series?
- A) A sequence of functions
- B) A one-dimensional labeled data structure (like a labeled list)
- C) A 2D table
- D) A Python list with extra features

**Answer:** B

**2.** What is a Pandas DataFrame?
- A) A function that draws frames
- B) A 2D labeled data table with rows and columns
- C) A list of Series with no labels
- D) A Python dictionary

**Answer:** B

**3.** `df.head()` shows:
- A) The column names only
- B) The first 5 rows of the DataFrame
- C) Summary statistics
- D) The last 5 rows

**Answer:** B

**4.** `df["GPA"].mean()` returns:
- A) The most common GPA
- B) The average GPA across all rows
- C) The highest GPA
- D) A list of all GPAs

**Answer:** B

**5.** `df[df["GPA"] >= 3.5]` does:
- A) Deletes rows where GPA is below 3.5
- B) Returns only rows where GPA is 3.5 or higher
- C) Changes all GPAs to 3.5
- D) Sorts by GPA

**Answer:** B

**6.** `df.sort_values("GPA", ascending=False)` sorts:
- A) By GPA from lowest to highest
- B) By GPA from highest to lowest
- C) Alphabetically by GPA
- D) By row index

**Answer:** B

**7.** `df.groupby("Course")["GPA"].mean()` calculates:
- A) The total GPA of all courses
- B) The average GPA for each course group
- C) The number of students in each course
- D) The GPA of the first student in each course

**Answer:** B

**8.** `pd.read_csv("data.csv")` does:
- A) Creates a CSV file
- B) Loads a CSV file into a DataFrame
- C) Exports a DataFrame to CSV
- D) Opens the CSV in Excel

**Answer:** B

**9.** `df.describe()` shows:
- A) The first 5 rows
- B) Summary statistics: count, mean, std, min, max, quartiles
- C) Column data types
- D) Missing values

**Answer:** B

**10.** `df.isnull().sum()` counts:
- A) All values in each column
- B) Missing (NaN) values in each column
- C) Duplicate rows
- D) Columns with zero values

**Answer:** B

### Reflections

1. Data is collected about all of us — our schools report data to the state, our phones track our usage, our social media tracks our behavior. What are two ways this data could be used for good? What are two risks?

2. Pandas makes it easy to find patterns in data that would take hours by hand. What question about your school, community, or team would you want to answer if you had the right data?

3. W.E.B. Du Bois used handmade data visualizations in 1900 to counter racist narratives about Black Americans. If he had Pandas, what do you think he would have done with it?

4. Data cleaning — fixing missing values, incorrect entries, inconsistent formats — takes up to 80% of a data scientist's time. Why do you think getting data right is so important before you analyze it?

### Summary

- **Series** = one column of labeled data; **DataFrame** = a full table with rows and columns
- `df.head()`, `df.info()`, `df.describe()` are your first moves on any new dataset
- Filter rows with `df[df["col"] > value]`; sort with `df.sort_values("col")`
- `df.groupby("col").agg(...)` aggregates data by category — like a pivot table
- `pd.read_csv()` loads data files; `df.to_csv()` saves them — Pandas connects Python to the real world of data

---

## Session 6.4: Matplotlib — Turning Data into Stories
**Duration:** 60 minutes | **Format:** Lecture + Data Lab

### Introduction

Numbers tell part of the story. Charts tell the whole story. **Matplotlib** is Python's most popular visualization library — it turns your NumPy arrays and Pandas DataFrames into bar charts, line graphs, scatter plots, and more.

W.E.B. Du Bois hand-drew data visualizations in 1900 to document and celebrate Black life in America. Today, with matplotlib, you can create those same powerful visual arguments in minutes.

**Learning Objectives:**
- Create bar charts, line charts, and pie charts with matplotlib
- Customize charts with titles, labels, colors, and styles
- Combine Pandas data with matplotlib plots
- Save charts to image files for sharing

**Why it matters for ACCN:** Visualization is communication. Whether you are presenting robotics data, making a case for more funding, or sharing research — charts make your argument visible.

### Core Concepts

#### Your First Chart

```python
import matplotlib.pyplot as plt

# Bar chart of student scores
names = ["Aaliyah", "Marcus", "Destiny", "Jaylen", "Brianna"]
scores = [94, 82, 91, 78, 88]

plt.bar(names, scores, color=["#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"])
plt.title("ACCN Python Class — Test Scores", fontsize=14, fontweight="bold")
plt.xlabel("Student")
plt.ylabel("Score")
plt.ylim(0, 100)
plt.axhline(y=90, color="red", linestyle="--", label="A threshold")
plt.legend()
plt.tight_layout()
plt.savefig("scores_chart.png")
plt.show()
```

#### Line Chart — Progress Over Time

```python
import matplotlib.pyplot as plt

weeks = [1, 2, 3, 4, 5, 6]
aaliyah = [75, 80, 85, 88, 92, 96]
marcus = [68, 72, 76, 80, 82, 87]

plt.figure(figsize=(10, 6))
plt.plot(weeks, aaliyah, marker="o", label="Aaliyah", color="#7c3aed", linewidth=2)
plt.plot(weeks, marcus, marker="s", label="Marcus", color="#06b6d4", linewidth=2)
plt.title("Student Progress — 6 Weeks")
plt.xlabel("Week")
plt.ylabel("Score")
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

#### Pie Chart — Category Distribution

```python
import matplotlib.pyplot as plt

courses = ["Python", "AI Fundamentals", "Mechanical Engineering"]
enrollment = [18, 22, 15]
colors = ["#f59e0b", "#7c3aed", "#06b6d4"]
explode = [0.05, 0.05, 0.05]

plt.pie(enrollment, labels=courses, colors=colors, explode=explode,
        autopct="%1.1f%%", shadow=True)
plt.title("ACCN Course Enrollment", fontsize=14, fontweight="bold")
plt.show()
```

#### Plotting from Pandas DataFrames

```python
import pandas as pd
import matplotlib.pyplot as plt

students = pd.DataFrame({
    "Name": ["Aaliyah", "Marcus", "Destiny", "Jaylen", "Brianna"],
    "GPA": [3.8, 3.2, 3.7, 2.9, 3.5],
    "Hours": [8, 6, 9, 5, 7]
})

# Plot directly from DataFrame
students.plot(kind="bar", x="Name", y="GPA", color="#7c3aed", legend=False)
plt.title("Student GPAs")
plt.ylabel("GPA")
plt.tight_layout()
plt.show()

# Scatter plot — does studying more = higher GPA?
plt.scatter(students["Hours"], students["GPA"], color="#f59e0b", s=100)
for _, row in students.iterrows():
    plt.annotate(row["Name"], (row["Hours"], row["GPA"]), textcoords="offset points", xytext=(5, 5))
plt.title("Study Hours vs GPA")
plt.xlabel("Hours per Week")
plt.ylabel("GPA")
plt.show()
```

### Video Lessons

**Video 1 — Matplotlib Tutorial for Beginners (Corey Schafer)**
This is the most-referenced Matplotlib tutorial for beginners, covering bar charts, line charts, histograms, scatter plots, and customization with titles, labels, legends, and colors. Corey's step-by-step approach makes it easy to follow along in Colab and experiment with the examples as you go. The video also covers saving charts to image files with `savefig()`, which you will need for the practice exercises.
https://www.youtube.com/watch?v=UO98lJQ3QGI

**Video 2 — Python Data Visualization Tutorial (Tech With Tim)**
Tim demonstrates how to create professional-looking charts by combining Matplotlib features: subplots, custom color palettes, grid lines, annotations, and tight layout. He builds charts from a Pandas DataFrame directly, showing the efficient workflow that data scientists use in practice. The subplot example in this video maps directly to Exercise 5 in this session.
https://www.youtube.com/watch?v=UO98lJQ3QGI

**Video 3 — Matplotlib and Pandas Visualization (freeCodeCamp)**
This tutorial focuses specifically on integrating Pandas and Matplotlib — the combination you will use throughout data projects. freeCodeCamp shows how to call `.plot()` on a DataFrame, customize the output with Matplotlib functions, and build multi-panel visualizations that tell a complete data story. After this video, you will be able to go from a CSV file to a publication-quality chart in under 10 lines of code.
https://www.youtube.com/watch?v=0P7QnIQDBJY
### Practice Exercises

**Exercise 1 — Team Hours Bar Chart**
Create a bar chart showing Umoja 7712 team members and their weekly contribution hours. Use distinct colors for each bar. Add a title and axis labels.

**Exercise 2 — Score Progress Line Chart**
Using numpy, generate 6 weeks of scores for 2 students. Plot both as line charts with markers. Add a horizontal dashed line at 90 (the A threshold).

**Exercise 3 — Grade Distribution Pie Chart**
Given a class of 30 students — 10 with As, 8 Bs, 7 Cs, 3 Ds, 2 Fs — create a pie chart showing the grade distribution with percentages displayed.

**Exercise 4 — Scatter Plot Story**
Create a scatter plot of study hours vs test scores for 10 students. Add a title, axis labels, and annotations. What pattern do you see?

**Exercise 5 — Full Data Story**
Load a Pandas DataFrame (from Exercise 1 of Session 6.3 or create new data). Create a figure with 3 subplots:
- Bar chart of GPAs
- Line chart of weekly study hours
- Scatter plot of Hours vs GPA

Save the full figure as `accn_data_story.png`.

### Knowledge Check

**1.** `plt.bar(x, y)` creates:
- A) A line chart
- B) A bar chart
- C) A scatter plot
- D) A pie chart

**Answer:** B

**2.** `plt.show()` does what?
- A) Saves the chart
- B) Displays the chart in a window or notebook
- C) Clears the chart
- D) Renders to a PDF

**Answer:** B

**3.** `plt.savefig("chart.png")` saves:
- A) The Python code
- B) The chart as an image file
- C) The data as CSV
- D) The chart configuration

**Answer:** B

**4.** `plt.axhline(y=70)` draws:
- A) A vertical line at x=70
- B) A horizontal reference line at y=70
- C) An arrow pointing to 70
- D) A dot at position 70

**Answer:** B

**5.** `marker="o"` in `plt.plot()` adds:
- A) Orange color to the line
- B) A circle marker at each data point
- C) An outline around the chart
- D) Dotted line style

**Answer:** B

**6.** `plt.figure(figsize=(10, 6))` sets:
- A) The font size
- B) The chart width and height in inches
- C) The image resolution (DPI)
- D) The number of subplots

**Answer:** B

**7.** `plt.legend()` displays:
- A) The chart title
- B) A key showing what each color or line represents
- C) The axis labels
- D) The data values on the chart

**Answer:** B

**8.** `plt.scatter(x, y)` is best for:
- A) Showing category counts
- B) Showing the relationship between two numeric variables
- C) Showing change over time
- D) Showing parts of a whole

**Answer:** B

**9.** `plt.grid(True, alpha=0.3)` adds:
- A) A frame around the chart
- B) A semi-transparent grid to help read the chart
- C) Grid lines along the x-axis only
- D) An error if the chart is too small

**Answer:** B

**10.** `plt.tight_layout()` is used to:
- A) Compress the data into fewer rows
- B) Prevent labels and titles from being cut off or overlapping
- C) Lock the chart from further edits
- D) Set the axis limits tightly around the data

**Answer:** B

### Reflections

1. "A picture is worth a thousand words" — how does a chart change the way you understand data compared to reading a table of numbers?

2. Data visualization has been used both to reveal truth and to mislead people. What are two ways a chart could be designed dishonestly? Why does visual literacy matter?

3. W.E.B. Du Bois created powerful handmade infographics in 1900 to document Black life in America. If he had matplotlib and Pandas, what do you think he would have done with them?

4. If you could visualize any data about ACCN, Umoja 7712, your school, or your community — what would it be? What story would you want the chart to tell?

### Summary

- `plt.bar()`, `plt.plot()`, `plt.pie()`, `plt.scatter()` create the most common chart types
- Customize with `title()`, `xlabel()`, `ylabel()`, `legend()`, `grid()`, `color`, `marker`
- `plt.savefig("name.png")` saves to a file; `plt.show()` displays it
- Pandas DataFrames plot directly with `.plot(kind="bar", x=..., y=...)`
- Data visualization is communication — use it to make your data tell a story

---

## Session 6.5: Capstone Project — Build Something That Matters
**Duration:** 60 minutes | **Format:** Open Project Time

### Introduction

This is your final session. Six weeks of Python. Thirty sessions. Hundreds of concepts practiced. Now you will apply everything to build a project that is meaningful to you — something that reflects your skills, your values, and your vision. This is your capstone.

**Learning Objectives:**
- Apply all Python skills learned across 6 weeks
- Design, build, and present a complete project
- Reflect on your growth as a programmer
- Connect your technical skills to your personal goals

### Core Concepts

#### Capstone Project Guidelines

Your project must:
- Be written in Python
- Use at least 4 concepts from different weeks (variables, loops, functions, files, data structures, OOP, libraries, APIs, error handling)
- Solve a real problem or serve a real purpose
- Include a brief written description of what it does and why you built it

#### Project Ideas by Theme

**Community Impact:**
- Scholarship finder that reads a CSV of scholarships and matches them to student profiles
- Community event calendar that saves events to a file and lets users search by date
- Resource locator that reads a JSON file of local resources (food banks, clinics, libraries)

**Music & Arts:**
- Playlist analyzer that reads a CSV of songs and visualizes BPM distribution with matplotlib
- Lyrics word frequency counter that shows which words appear most
- Beat builder that generates patterns of beats and saves them as text notation

**Sports & Competition:**
- FRC match tracker that logs wins/losses, calculates win rate, and charts progress
- Basketball stats tracker with visualization of scoring trends
- Personal fitness log that tracks and graphs workout data

**Education & Personal:**
- Study scheduler that reads your courses and creates a weekly study plan file
- Grade calculator that tracks all your classes and predicts end-of-term GPA
- Personal budget tracker with file persistence and spending charts

**Robotics & Tech:**
- Robot simulation with autonomous mode, sensor simulation, and match logging
- PID controller demonstrator with a visualization of convergence
- Team roster system with CSV export and performance charts

### Video Lessons

**Video 1 — How to Plan and Build a Python Project (CS Dojo)**
This video teaches the most important skill that tutorials cannot: deciding what to build, breaking it into small steps, and pushing through the inevitable moments where nothing works. CS Dojo shares a clear project planning framework — define the inputs and outputs, choose the right data structures, write pseudocode first, then code. This thinking process is what separates programmers who finish projects from those who get stuck.
https://www.youtube.com/watch?v=YYXdXT2l-Gg

**Video 2 — Python Portfolio Projects for Beginners (Tech With Tim)**
Tim presents five beginner portfolio projects with full explanations of why each one makes a strong portfolio piece and what Python skills it demonstrates. He explains how to write a project README, how to push code to GitHub, and how to talk about your project in an interview or college application. A completed, documented project is evidence of real skill — this video helps you create that evidence.
https://www.youtube.com/watch?v=rfscVS0vtbw

**Video 3 — From Python Beginner to Developer (freeCodeCamp)**
After finishing this course, what comes next? This video maps the path from beginner Python to specializations in data science, web development, automation, and machine learning. freeCodeCamp explains what to learn in what order, which projects build which skills, and how to continue growing after a structured course ends. Use this as your roadmap for the next phase of your coding journey.
https://www.youtube.com/watch?v=rfscVS0vtbw
### Practice Exercises

**The Capstone:**
Build your project using the following steps:

1. **Plan** — Write pseudocode or a simple outline. What does it do? What data does it use? What will the user experience?

2. **Build** — Code it step by step. Start with the simplest version, then add features.

3. **Test** — Try to break it. Enter bad input. Try edge cases. Fix the bugs.

4. **Polish** — Add error handling, clear messages, and a welcoming interface.

5. **Document** — Write a short README or comment block at the top: What is it? How do you run it? What does it do?

6. **Present** — Be ready to walk someone through it and explain your choices.

### Knowledge Check

**1.** A capstone project should:
- A) Use only one Python concept
- B) Be as short as possible
- C) Combine multiple skills to solve a real problem
- D) Avoid using libraries

**Answer:** C

**2.** The first step in building a project is:
- A) Writing the longest function
- B) Installing all possible libraries
- C) Planning with pseudocode or an outline
- D) Submitting it

**Answer:** C

**3.** Error handling in a capstone project is important because:
- A) Python requires it
- B) Real users make unexpected inputs and real programs must survive them
- C) It adds lines of code
- D) It is only needed for file operations

**Answer:** B

**4.** A good project README includes:
- A) The source code of all libraries used
- B) What the project does, how to run it, and what it requires
- C) A list of bugs
- D) Only the author's name

**Answer:** B

**5.** "Polish" in software development means:
- A) Translating to another language
- B) Improving the interface, messages, and edge case handling
- C) Adding more features
- D) Submitting to PyPI

**Answer:** B

**6.** Which demonstrates the MOST Python skills in a capstone?
- A) A program that prints "Hello"
- B) A program using lists, file I/O, functions, error handling, and a library
- C) A program with 500 lines but only uses print
- D) A copy of an online tutorial

**Answer:** B

**7.** Testing your project means:
- A) Running it once successfully
- B) Having someone else run it
- C) Trying edge cases, bad inputs, and unusual scenarios
- D) Checking spelling in comments

**Answer:** C

**8.** "Pseudocode" is:
- A) Fake code that Python can run
- B) Plain language steps describing your program's logic
- C) Code written in another language
- D) Comments in your code

**Answer:** B

**9.** Which project best connects ACCN values to Python?
- A) A random number generator
- B) A scholarship finder that helps students access financial opportunities
- C) A program that prints numbers 1-100
- D) A temperature converter

**Answer:** B

**10.** After completing this course and your capstone, you are:
- A) A professional software engineer
- B) Done learning Python forever
- C) A beginner coder with real skills who has built real programs
- D) Required to continue to Week 7

**Answer:** C

### Reflections

1. You just completed a 6-week Python course. Look back at who you were at Session 1.1. What has changed — in your skills, your confidence, and your relationship to technology?

2. What is the one project from these 6 weeks that you are most proud of? Why?

3. ACCN believes that the next generation of builders — people who shape technology — should include voices from communities that have been left out. Where do you see yourself in that story?

4. What do you want to build next? Not just in code — in your life. How can the discipline, problem-solving, and persistence you practiced in this course apply beyond programming?

5. Write a message to a future ACCN Python student — someone starting Session 1.1 next month. What do you wish you had known? What encouragement would you offer?

### Summary

- Capstone projects combine all 6 weeks of skills: variables, loops, functions, data structures, files, OOP, libraries, APIs, error handling
- Plan before coding; build incrementally; test thoroughly; polish the experience
- A complete project you built yourself is worth more than perfect knowledge of syntax
- The skills you have — Python, problem-solving, persistence — are in demand in every field
- This is not the end. This is the beginning. The tools are in your hands. Build something that matters.

---

*ACCN Python Curriculum — Complete*
*Introduction to Python | 6 Weeks | 30 Sessions | ACCN Learning Hub | Umoja Robotics 7712*
*"Code is the closest thing we have to a superpower." — Now it is yours.*
