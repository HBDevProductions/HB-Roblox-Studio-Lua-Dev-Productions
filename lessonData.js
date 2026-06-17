const LESSONS = [
  // ─────────────── MODULE 0: FOUNDATIONS ───────────────
  {
    id: "hello-world",
    title: "Hello, World!",
    module: "Foundations",
    moduleIndex: 0,
    description: "Your first Lua script — printing to the Output window.",
    difficulty: "beginner",
    estimatedMinutes: 10,
    steps: [
      { id: "hw-1", title: "Print a message", instruction: "Use `print()` to display \"Hello, World!\".", hint: "print(\"Hello, World!\")", starterCode: "-- Type your first line of Lua below\n", expectedOutput: "Hello, World!", validation: { type: "output", expected: "Hello, World!" } },
      { id: "hw-2", title: "Print your name", instruction: "Print any name using `print()`.", hint: "print(\"Alex\")", starterCode: "-- Print your name\n", expectedOutput: null, validation: { type: "contains_function", func: "print" } },
      { id: "hw-3", title: "Multiple prints", instruction: "Print \"I am learning Lua\" then \"This is awesome!\".", hint: "Two separate print() calls.", starterCode: "-- Print two messages\n", expectedOutput: "I am learning Lua\nThis is awesome!", validation: { type: "output", expected: "I am learning Lua\nThis is awesome!" } }
    ]
  },
  {
    id: "variables",
    title: "Variables & Types",
    module: "Foundations",
    moduleIndex: 0,
    description: "Store data using variables — numbers, strings, and booleans.",
    difficulty: "beginner",
    estimatedMinutes: 15,
    steps: [
      { id: "var-1", title: "Create a variable", instruction: "Create `local playerName = \"YourName\"` and print it.", hint: "Use the local keyword.", starterCode: "-- Create a variable and print it\n", expectedOutput: null, validation: { type: "contains_keyword", keyword: "local" } },
      { id: "var-2", title: "Number variables", instruction: "Create `health = 100` and `speed = 16`. Print both.", hint: "Numbers don't need quotes.", starterCode: "-- Create number variables\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["health", "speed", "print"] } },
      { id: "var-3", title: "String concatenation", instruction: "Create `firstName` and `lastName`, print them joined with `..`.", hint: "firstName .. \" \" .. lastName", starterCode: "-- Combine strings with ..\n", expectedOutput: null, validation: { type: "contains_keyword", keyword: ".." } },
      { id: "var-4", title: "Boolean values", instruction: "Create `isAlive = true` and print it.", hint: "Booleans: true or false, no quotes.", starterCode: "-- Create a boolean\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["true", "print"] } }
    ]
  },
  {
    id: "comments",
    title: "Comments & Code Style",
    module: "Foundations",
    moduleIndex: 0,
    description: "Write clean, readable code with comments and good naming conventions.",
    difficulty: "beginner",
    estimatedMinutes: 10,
    steps: [
      { id: "cmt-1", title: "Single-line comment", instruction: "Write a comment above a print statement explaining what it does.", hint: "-- This is a comment", starterCode: "-- Write a comment then print something\n", expectedOutput: null, validation: { type: "contains_function", func: "print" } },
      { id: "cmt-2", title: "Multi-line comment", instruction: "Write a multi-line comment using --[[ and ]] then print \"Done!\".", hint: "--[[ multi line ]]", starterCode: "-- Write a multi-line comment\n", expectedOutput: "Done!", validation: { type: "output", expected: "Done!" } },
      { id: "cmt-3", title: "Commenting out code", instruction: "Write two print statements but comment out the second one. Only the first should run.", hint: "-- comment out with --", starterCode: "print(\"First\")\n-- print(\"Second\")\n", expectedOutput: "First", validation: { type: "output", expected: "First" } }
    ]
  },
  {
    id: "math-operators",
    title: "Math Operators",
    module: "Foundations",
    moduleIndex: 0,
    description: "Perform arithmetic in Lua — addition, subtraction, multiplication, division, and more.",
    difficulty: "beginner",
    estimatedMinutes: 15,
    steps: [
      { id: "math-1", title: "Basic arithmetic", instruction: "Create two variables, add them together, and print the result. Example: 10 + 5 = 15.", hint: "local result = 10 + 5", starterCode: "-- Add two numbers and print the result\n", expectedOutput: "15", validation: { type: "output", expected: "15" } },
      { id: "math-2", title: "Multiplication", instruction: "Print the result of 7 * 8.", hint: "print(7 * 8)", starterCode: "-- Multiply two numbers\n", expectedOutput: "56", validation: { type: "output", expected: "56" } },
      { id: "math-3", title: "Division & modulo", instruction: "Print 10 / 4, then print 10 % 3 (remainder).", hint: "% gives the remainder", starterCode: "-- Division and modulo\n", expectedOutput: "2.5\n1", validation: { type: "output", expected: "2.5\n1" } },
      { id: "math-4", title: "Power (exponent)", instruction: "Print 2 ^ 10 (2 to the power of 10).", hint: "Use the ^ operator", starterCode: "-- Print 2 to the power of 10\n", expectedOutput: "1024", validation: { type: "output", expected: "1024" } }
    ]
  },
  {
    id: "string-basics",
    title: "String Basics",
    module: "Foundations",
    moduleIndex: 0,
    description: "Work with text — length, case, and common string operations.",
    difficulty: "beginner",
    estimatedMinutes: 15,
    steps: [
      { id: "str-1", title: "String length", instruction: "Create `local word = \"Roblox\"` and print its length using `#word`.", hint: "# gives the length of a string", starterCode: "-- Get the length of a string\n", expectedOutput: "6", validation: { type: "output", expected: "6" } },
      { id: "str-2", title: "Uppercase", instruction: "Print \"hello\" converted to uppercase using `string.upper()`.", hint: "print(string.upper(\"hello\"))", starterCode: "-- Convert to uppercase\n", expectedOutput: "HELLO", validation: { type: "output", expected: "HELLO" } },
      { id: "str-3", title: "Lowercase", instruction: "Print \"ROBLOX\" converted to lowercase.", hint: "string.lower()", starterCode: "-- Convert to lowercase\n", expectedOutput: "roblox", validation: { type: "output", expected: "roblox" } },
      { id: "str-4", title: "String repeat", instruction: "Print \"ha\" repeated 3 times using `string.rep()`.", hint: "string.rep(\"ha\", 3)", starterCode: "-- Repeat a string\n", expectedOutput: "hahaha", validation: { type: "output", expected: "hahaha" } }
    ]
  },
  {
    id: "type-conversion",
    title: "Type Conversion",
    module: "Foundations",
    moduleIndex: 0,
    description: "Convert between strings, numbers, and other types in Lua.",
    difficulty: "beginner",
    estimatedMinutes: 15,
    steps: [
      { id: "tc-1", title: "tostring()", instruction: "Convert the number 42 to a string and print its type using `type()`.", hint: "type(tostring(42)) returns 'string'", starterCode: "-- Convert number to string\n", expectedOutput: "string", validation: { type: "output", expected: "string" } },
      { id: "tc-2", title: "tonumber()", instruction: "Convert the string \"99\" to a number, add 1, and print the result.", hint: "tonumber(\"99\") + 1", starterCode: "-- Convert string to number\n", expectedOutput: "100", validation: { type: "output", expected: "100" } },
      { id: "tc-3", title: "type() function", instruction: "Print the type of: 42, \"hello\", true, nil — each on its own line.", hint: "type(42) returns 'number'", starterCode: "-- Check the type of different values\n", expectedOutput: "number\nstring\nboolean\nnil", validation: { type: "output", expected: "number\nstring\nboolean\nnil" } }
    ]
  },
  {
    id: "nil-values",
    title: "Nil & Undefined Values",
    module: "Foundations",
    moduleIndex: 0,
    description: "Understand nil — Lua's way of representing nothing or an absent value.",
    difficulty: "beginner",
    estimatedMinutes: 10,
    steps: [
      { id: "nil-1", title: "What is nil?", instruction: "Create a variable `x` without assigning a value, then print it.", hint: "local x  -- automatically nil", starterCode: "-- Create an unassigned variable and print it\n", expectedOutput: "nil", validation: { type: "output", expected: "nil" } },
      { id: "nil-2", title: "Checking for nil", instruction: "Create `local item = nil`. Write an if statement: if item == nil, print \"Item is empty!\".", hint: "if item == nil then", starterCode: "local item = nil\n-- Check if item is nil\n", expectedOutput: "Item is empty!", validation: { type: "output", expected: "Item is empty!" } }
    ]
  },

  // ─────────────── MODULE 1: CONTROL FLOW ───────────────
  {
    id: "conditionals",
    title: "If / Else Logic",
    module: "Control Flow",
    moduleIndex: 1,
    description: "Make decisions in your code with if, elseif, and else.",
    difficulty: "beginner",
    estimatedMinutes: 20,
    steps: [
      { id: "if-1", title: "Basic if statement", instruction: "Create `score = 85`. If score >= 50, print \"You passed!\".", hint: "if score >= 50 then ... end", starterCode: "local score = 85\n-- Write your if statement\n", expectedOutput: "You passed!", validation: { type: "output", expected: "You passed!" } },
      { id: "if-2", title: "If / Else", instruction: "Set `score = 30`. Print \"Try again!\" when score < 50.", hint: "else clause before end", starterCode: "local score = 30\n-- If/else\n", expectedOutput: "Try again!", validation: { type: "output", expected: "Try again!" } },
      { id: "if-3", title: "Elseif chains", instruction: "Grading: >=90 'A', >=80 'B', >=70 'C', else 'F'. Score = 75.", hint: "Use elseif for each grade", starterCode: "local score = 75\n-- Build your grading system\n", expectedOutput: "C", validation: { type: "output", expected: "C" } }
    ]
  },
  {
    id: "logical-operators",
    title: "Logical Operators",
    module: "Control Flow",
    moduleIndex: 1,
    description: "Combine conditions using and, or, and not.",
    difficulty: "beginner",
    estimatedMinutes: 15,
    steps: [
      { id: "lo-1", title: "and operator", instruction: "Create `health = 80` and `armor = 50`. If both > 0, print \"Player is alive!\".", hint: "if health > 0 and armor > 0 then", starterCode: "local health = 80\nlocal armor = 50\n-- Use 'and'\n", expectedOutput: "Player is alive!", validation: { type: "output", expected: "Player is alive!" } },
      { id: "lo-2", title: "or operator", instruction: "Create `hasKey = false` and `hasPickaxe = true`. If either is true, print \"Can open the door!\".", hint: "if hasKey or hasPickaxe then", starterCode: "local hasKey = false\nlocal hasPickaxe = true\n-- Use 'or'\n", expectedOutput: "Can open the door!", validation: { type: "output", expected: "Can open the door!" } },
      { id: "lo-3", title: "not operator", instruction: "Create `isDead = false`. If not isDead, print \"Still fighting!\".", hint: "if not isDead then", starterCode: "local isDead = false\n-- Use 'not'\n", expectedOutput: "Still fighting!", validation: { type: "output", expected: "Still fighting!" } }
    ]
  },
  {
    id: "loops",
    title: "For Loops",
    module: "Control Flow",
    moduleIndex: 1,
    description: "Repeat actions with numeric for loops.",
    difficulty: "beginner",
    estimatedMinutes: 20,
    steps: [
      { id: "loop-1", title: "Basic for loop", instruction: "Print numbers 1 through 5.", hint: "for i = 1, 5 do print(i) end", starterCode: "-- Print 1 to 5\n", expectedOutput: "1\n2\n3\n4\n5", validation: { type: "output", expected: "1\n2\n3\n4\n5" } },
      { id: "loop-2", title: "Loop with step", instruction: "Count from 0 to 10 in steps of 2.", hint: "for i = 0, 10, 2 do", starterCode: "-- Count by 2s\n", expectedOutput: "0\n2\n4\n6\n8\n10", validation: { type: "output", expected: "0\n2\n4\n6\n8\n10" } },
      { id: "loop-3", title: "Countdown", instruction: "Count down from 5 to 1 using a for loop with a negative step.", hint: "for i = 5, 1, -1 do", starterCode: "-- Countdown from 5\n", expectedOutput: "5\n4\n3\n2\n1", validation: { type: "output", expected: "5\n4\n3\n2\n1" } }
    ]
  },
  {
    id: "while-loops",
    title: "While & Repeat Loops",
    module: "Control Flow",
    moduleIndex: 1,
    description: "Loop while a condition is true, or repeat until a condition is met.",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    steps: [
      { id: "wl-1", title: "While loop", instruction: "Use a while loop to count from 1 to 3.", hint: "while count <= 3 do ... count = count + 1 end", starterCode: "-- Count 1 to 3 with while\n", expectedOutput: "1\n2\n3", validation: { type: "output", expected: "1\n2\n3" } },
      { id: "wl-2", title: "Repeat-until", instruction: "Use a repeat-until loop to count from 1 to 3.", hint: "repeat ... until count > 3", starterCode: "-- Count with repeat-until\n", expectedOutput: "1\n2\n3", validation: { type: "output", expected: "1\n2\n3" } },
      { id: "wl-3", title: "Break statement", instruction: "Loop from 1 to 10. When i equals 4, use break to exit. Print i each iteration.", hint: "if i == 4 then break end", starterCode: "-- Break out of a loop\n", expectedOutput: "1\n2\n3", validation: { type: "output", expected: "1\n2\n3" } }
    ]
  },
  {
    id: "nested-loops",
    title: "Nested Loops",
    module: "Control Flow",
    moduleIndex: 1,
    description: "Put loops inside loops to handle grid-like patterns and multi-dimensional data.",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    steps: [
      { id: "nl-1", title: "Nested for loop", instruction: "Create a 2x3 grid: loop rows 1-2, columns 1-3, print \"Row R Col C\" for each.", hint: "for r = 1, 2 do  for c = 1, 3 do", starterCode: "-- Nested loops for a grid\n", expectedOutput: "Row 1 Col 1\nRow 1 Col 2\nRow 1 Col 3\nRow 2 Col 1\nRow 2 Col 2\nRow 2 Col 3", validation: { type: "output", expected: "Row 1 Col 1\nRow 1 Col 2\nRow 1 Col 3\nRow 2 Col 1\nRow 2 Col 2\nRow 2 Col 3" } },
      { id: "nl-2", title: "Multiplication table row", instruction: "Print the 3-times table from 3x1 to 3x5.", hint: "for i = 1, 5 do print(3 * i) end", starterCode: "-- 3 times table\n", expectedOutput: "3\n6\n9\n12\n15", validation: { type: "output", expected: "3\n6\n9\n12\n15" } }
    ]
  },
  {
    id: "continue-pattern",
    title: "Loop Control Patterns",
    module: "Control Flow",
    moduleIndex: 1,
    description: "Use break and conditional skipping to control loop execution flow.",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    steps: [
      { id: "cp-1", title: "Skip even numbers", instruction: "Loop 1–6. Print only odd numbers by using 'if i % 2 ~= 0'.", hint: "~= means not equal", starterCode: "-- Print only odd numbers 1-6\n", expectedOutput: "1\n3\n5", validation: { type: "output", expected: "1\n3\n5" } },
      { id: "cp-2", title: "Find first match", instruction: "Loop through {3, 7, 2, 9, 1}. Print the first value greater than 5, then break.", hint: "if val > 5 then print(val) break end", starterCode: "local nums = {3, 7, 2, 9, 1}\n-- Find first > 5\n", expectedOutput: "7", validation: { type: "output", expected: "7" } }
    ]
  },

  // ─────────────── MODULE 2: FUNCTIONS ───────────────
  {
    id: "functions",
    title: "Functions",
    module: "Functions",
    moduleIndex: 2,
    description: "Create reusable blocks of code with functions and parameters.",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    steps: [
      { id: "fn-1", title: "Create a function", instruction: "Write a function `greet` that prints \"Welcome to Roblox!\". Call it.", hint: "local function greet() ... end", starterCode: "-- Define and call a function\n", expectedOutput: "Welcome to Roblox!", validation: { type: "output", expected: "Welcome to Roblox!" } },
      { id: "fn-2", title: "Parameters", instruction: "Create `greetPlayer(name)` that prints \"Hello, \" .. name. Call with \"Steve\".", hint: "local function greetPlayer(name)", starterCode: "-- Function with a parameter\n", expectedOutput: "Hello, Steve", validation: { type: "output", expected: "Hello, Steve" } },
      { id: "fn-3", title: "Return values", instruction: "Write `add(a, b)` returning the sum. Print add(10, 25).", hint: "return a + b", starterCode: "-- Function that returns a value\n", expectedOutput: "35", validation: { type: "output", expected: "35" } },
      { id: "fn-4", title: "Multiple parameters", instruction: "Create `calculateDamage(base, mult)` returning base * mult. Print calculateDamage(25, 1.5).", hint: "return baseDamage * multiplier", starterCode: "-- Damage calculator\n", expectedOutput: "37.5", validation: { type: "output", expected: "37.5" } }
    ]
  },
  {
    id: "multiple-returns",
    title: "Multiple Return Values",
    module: "Functions",
    moduleIndex: 2,
    description: "Lua functions can return more than one value at a time.",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    steps: [
      { id: "mr-1", title: "Return two values", instruction: "Write `getStats()` that returns 100, 50 (health, mana). Print both.", hint: "return 100, 50  then local h, m = getStats()", starterCode: "-- Return two values from a function\n", expectedOutput: "100\n50", validation: { type: "output", expected: "100\n50" } },
      { id: "mr-2", title: "Swap values", instruction: "Write `swap(a, b)` that returns b, a. Print swap(1, 2).", hint: "return b, a", starterCode: "-- Swap two values\n", expectedOutput: "2\n1", validation: { type: "output", expected: "2\n1" } }
    ]
  },
  {
    id: "variadic-functions",
    title: "Variadic Functions",
    module: "Functions",
    moduleIndex: 2,
    description: "Write functions that accept any number of arguments using `...`.",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    steps: [
      { id: "vf-1", title: "Using ...", instruction: "Write a function `sum(...)` that uses `select('#', ...)` and adds all arguments. Print sum(1,2,3,4,5).", hint: "local args = {...} then loop with ipairs", starterCode: "-- Variadic sum function\n", expectedOutput: "15", validation: { type: "output", expected: "15" } },
      { id: "vf-2", title: "Count arguments", instruction: "Write `countArgs(...)` that returns the number of args passed. Print countArgs(10,20,30).", hint: "return select('#', ...)", starterCode: "-- Count arguments\n", expectedOutput: "3", validation: { type: "output", expected: "3" } }
    ]
  },
  {
    id: "closures",
    title: "Closures & Upvalues",
    module: "Functions",
    moduleIndex: 2,
    description: "Functions that remember variables from their enclosing scope.",
    difficulty: "advanced",
    estimatedMinutes: 20,
    steps: [
      { id: "cl-1", title: "Basic closure", instruction: "Write a function `makeCounter()` that returns a function. Each call to the inner function increments and prints a count starting at 0.", hint: "local count = 0  return function() count = count + 1 print(count) end", starterCode: "-- Create a counter closure\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["function", "return", "local"] } },
      { id: "cl-2", title: "Closure with initial value", instruction: "Write `makeAdder(n)` returning a function that adds n to its argument. Print makeAdder(5)(10).", hint: "return function(x) return n + x end", starterCode: "-- Adder closure\n", expectedOutput: "15", validation: { type: "output", expected: "15" } }
    ]
  },
  {
    id: "recursion",
    title: "Recursion",
    module: "Functions",
    moduleIndex: 2,
    description: "Functions that call themselves to solve problems.",
    difficulty: "advanced",
    estimatedMinutes: 25,
    steps: [
      { id: "rec-1", title: "Factorial", instruction: "Write a recursive `factorial(n)` function. Print factorial(5).", hint: "if n <= 1 then return 1 else return n * factorial(n-1) end", starterCode: "-- Recursive factorial\n", expectedOutput: "120", validation: { type: "output", expected: "120" } },
      { id: "rec-2", title: "Fibonacci", instruction: "Write `fib(n)` returning the nth Fibonacci number. Print fib(7).", hint: "return fib(n-1) + fib(n-2)", starterCode: "-- Fibonacci recursion\n", expectedOutput: "13", validation: { type: "output", expected: "13" } }
    ]
  },
  {
    id: "higher-order",
    title: "Higher-Order Functions",
    module: "Functions",
    moduleIndex: 2,
    description: "Pass functions as arguments and return functions from functions.",
    difficulty: "advanced",
    estimatedMinutes: 20,
    steps: [
      { id: "ho-1", title: "Pass function as argument", instruction: "Write `applyTwice(f, x)` that calls f(f(x)). Create `double(n)` returning n*2. Print applyTwice(double, 3).", hint: "return f(f(x))", starterCode: "-- Higher-order applyTwice\n", expectedOutput: "12", validation: { type: "output", expected: "12" } },
      { id: "ho-2", title: "Map over table", instruction: "Write `map(t, f)` that applies f to each element and returns a new table. Map a double function over {1,2,3,4} and print each result.", hint: "for i, v in ipairs(t) do result[i] = f(v) end", starterCode: "-- Map function\n", expectedOutput: "2\n4\n6\n8", validation: { type: "output", expected: "2\n4\n6\n8" } }
    ]
  },

  // ─────────────── MODULE 3: TABLES & DATA STRUCTURES ───────────────
  {
    id: "tables",
    title: "Tables & Arrays",
    module: "Tables & Data",
    moduleIndex: 3,
    description: "Store collections of data using Lua tables.",
    difficulty: "intermediate",
    estimatedMinutes: 25,
    steps: [
      { id: "tbl-1", title: "Create a table", instruction: "Create `fruits = {\"Apple\", \"Banana\", \"Cherry\"}`. Print the first item.", hint: "Lua arrays start at index 1", starterCode: "-- Create a table and access an element\n", expectedOutput: "Apple", validation: { type: "output", expected: "Apple" } },
      { id: "tbl-2", title: "Loop through a table", instruction: "Use ipairs to loop through fruits and print each.", hint: "for index, fruit in ipairs(fruits) do", starterCode: "local fruits = {\"Apple\", \"Banana\", \"Cherry\"}\n-- Loop and print each\n", expectedOutput: "Apple\nBanana\nCherry", validation: { type: "output", expected: "Apple\nBanana\nCherry" } },
      { id: "tbl-3", title: "Dictionary tables", instruction: "Create `player = {name=\"Hero\", health=100, level=5}`. Print player's name.", hint: "player.name", starterCode: "-- Dictionary-style table\n", expectedOutput: "Hero", validation: { type: "output", expected: "Hero" } }
    ]
  },
  {
    id: "table-manipulation",
    title: "Table Manipulation",
    module: "Tables & Data",
    moduleIndex: 3,
    description: "Add, remove, and sort elements in tables.",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    steps: [
      { id: "tm-1", title: "table.insert", instruction: "Create `items = {}`. Insert \"Sword\" then \"Shield\" then \"Potion\". Print each using ipairs.", hint: "table.insert(items, \"Sword\")", starterCode: "local items = {}\n-- Insert items and print them\n", expectedOutput: "Sword\nShield\nPotion", validation: { type: "output", expected: "Sword\nShield\nPotion" } },
      { id: "tm-2", title: "table.remove", instruction: "Start with `{\"A\",\"B\",\"C\",\"D\"}`. Remove the 2nd element. Print what remains.", hint: "table.remove(t, 2)", starterCode: "local t = {\"A\", \"B\", \"C\", \"D\"}\n-- Remove element at index 2\n", expectedOutput: "A\nC\nD", validation: { type: "output", expected: "A\nC\nD" } },
      { id: "tm-3", title: "Table length", instruction: "Create a table with 5 items and print its length using #.", hint: "print(#myTable)", starterCode: "-- Create a 5-element table and print its length\n", expectedOutput: "5", validation: { type: "output", expected: "5" } },
      { id: "tm-4", title: "table.concat", instruction: "Join `{\"Hello\", \"World\", \"Lua\"}` with a space separator and print.", hint: "table.concat(t, \" \")", starterCode: "local words = {\"Hello\", \"World\", \"Lua\"}\n-- Concatenate with a space\n", expectedOutput: "Hello World Lua", validation: { type: "output", expected: "Hello World Lua" } }
    ]
  },
  {
    id: "table-sorting",
    title: "Table Sorting",
    module: "Tables & Data",
    moduleIndex: 3,
    description: "Sort tables using table.sort with default and custom comparators.",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    steps: [
      { id: "ts-1", title: "Default sort", instruction: "Sort `{5, 3, 9, 1, 7}` and print each number.", hint: "table.sort(nums)", starterCode: "local nums = {5, 3, 9, 1, 7}\n-- Sort and print\n", expectedOutput: "1\n3\n5\n7\n9", validation: { type: "output", expected: "1\n3\n5\n7\n9" } },
      { id: "ts-2", title: "Reverse sort", instruction: "Sort `{5, 3, 9, 1, 7}` in descending order using a custom comparator.", hint: "table.sort(nums, function(a, b) return a > b end)", starterCode: "local nums = {5, 3, 9, 1, 7}\n-- Sort descending\n", expectedOutput: "9\n7\n5\n3\n1", validation: { type: "output", expected: "9\n7\n5\n3\n1" } }
    ]
  },
  {
    id: "nested-tables",
    title: "Nested Tables",
    module: "Tables & Data",
    moduleIndex: 3,
    description: "Tables inside tables — the basis for complex game data structures.",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    steps: [
      { id: "nt-1", title: "Table of tables", instruction: "Create a `players` table holding two player tables each with a name and score. Print both player names.", hint: "players = {{name=\"Alice\",score=100},{name=\"Bob\",score=200}}", starterCode: "-- Table of player objects\n", expectedOutput: "Alice\nBob", validation: { type: "output", expected: "Alice\nBob" } },
      { id: "nt-2", title: "Access nested values", instruction: "From the above players table, print the score of the second player.", hint: "players[2].score", starterCode: "local players = {{name=\"Alice\",score=100},{name=\"Bob\",score=200}}\n-- Print Bob's score\n", expectedOutput: "200", validation: { type: "output", expected: "200" } }
    ]
  },
  {
    id: "pairs-ipairs",
    title: "pairs vs ipairs",
    module: "Tables & Data",
    moduleIndex: 3,
    description: "Understand the difference between pairs (dictionary) and ipairs (array) iteration.",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    steps: [
      { id: "pi-1", title: "ipairs for arrays", instruction: "Use ipairs on `{\"a\",\"b\",\"c\"}` and print each value.", hint: "for i, v in ipairs(t) do", starterCode: "local t = {\"a\", \"b\", \"c\"}\n-- Use ipairs\n", expectedOutput: "a\nb\nc", validation: { type: "output", expected: "a\nb\nc" } },
      { id: "pi-2", title: "pairs for dictionaries", instruction: "Create `stats = {hp=100, mp=50, atk=30}`. Use pairs to print all values (order may vary).", hint: "for k, v in pairs(stats) do", starterCode: "-- Use pairs on a dictionary\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["pairs", "print"] } }
    ]
  },

  // ─────────────── MODULE 4: STRING ADVANCED ───────────────
  {
    id: "string-formatting",
    title: "String Formatting",
    module: "Strings & Math",
    moduleIndex: 4,
    description: "Format strings with string.format() for polished output.",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    steps: [
      { id: "sf-1", title: "string.format basics", instruction: "Use string.format to print \"Score: 42\" where 42 is a variable.", hint: "string.format(\"Score: %d\", score)", starterCode: "local score = 42\n-- Format and print\n", expectedOutput: "Score: 42", validation: { type: "output", expected: "Score: 42" } },
      { id: "sf-2", title: "Float formatting", instruction: "Print 3.14159 rounded to 2 decimal places using string.format.", hint: "%.2f formats a float", starterCode: "local pi = 3.14159\n-- Print with 2 decimal places\n", expectedOutput: "3.14", validation: { type: "output", expected: "3.14" } },
      { id: "sf-3", title: "Player info string", instruction: "Format a string: \"Player: Alex | Level: 5 | HP: 100\" using variables and string.format.", hint: "string.format(\"Player: %s | Level: %d | HP: %d\", name, level, hp)", starterCode: "local name = \"Alex\"\nlocal level = 5\nlocal hp = 100\n-- Format the player info string\n", expectedOutput: "Player: Alex | Level: 5 | HP: 100", validation: { type: "output", expected: "Player: Alex | Level: 5 | HP: 100" } }
    ]
  },
  {
    id: "string-find-sub",
    title: "String Search & Slice",
    module: "Strings & Math",
    moduleIndex: 4,
    description: "Search inside strings and extract substrings.",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    steps: [
      { id: "ss-1", title: "string.find", instruction: "Find the position of \"World\" in \"Hello World\". Print the start index.", hint: "string.find(\"Hello World\", \"World\") returns 7", starterCode: "-- Find 'World' in 'Hello World'\n", expectedOutput: "7", validation: { type: "output", expected: "7" } },
      { id: "ss-2", title: "string.sub", instruction: "Extract \"Roblox\" from \"I love Roblox!\" using string.sub.", hint: "string.sub(str, 8, 13)", starterCode: "local str = \"I love Roblox!\"\n-- Extract 'Roblox'\n", expectedOutput: "Roblox", validation: { type: "output", expected: "Roblox" } },
      { id: "ss-3", title: "string.gsub", instruction: "Replace all 'o' with '0' in \"Roblox is cool\". Print the result.", hint: "string.gsub(str, \"o\", \"0\")", starterCode: "local str = \"Roblox is cool\"\n-- Replace o with 0\n", expectedOutput: "R0bl0x is c00l", validation: { type: "output", expected: "R0bl0x is c00l" } }
    ]
  },
  {
    id: "math-library",
    title: "Math Library",
    module: "Strings & Math",
    moduleIndex: 4,
    description: "Use Lua's built-in math functions for game calculations.",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    steps: [
      { id: "ml-1", title: "math.floor and math.ceil", instruction: "Print math.floor(4.7) then math.ceil(4.2).", hint: "floor rounds down, ceil rounds up", starterCode: "-- Floor and ceil\n", expectedOutput: "4\n5", validation: { type: "output", expected: "4\n5" } },
      { id: "ml-2", title: "math.max and math.min", instruction: "Print math.max(10, 25, 7) then math.min(10, 25, 7).", hint: "max/min work with multiple args", starterCode: "-- Max and min\n", expectedOutput: "25\n7", validation: { type: "output", expected: "25\n7" } },
      { id: "ml-3", title: "math.abs", instruction: "Print math.abs(-42).", hint: "abs returns the absolute value", starterCode: "-- Absolute value\n", expectedOutput: "42", validation: { type: "output", expected: "42" } },
      { id: "ml-4", title: "math.sqrt", instruction: "Print math.sqrt(144).", hint: "sqrt of 144 is 12", starterCode: "-- Square root\n", expectedOutput: "12.0", validation: { type: "output", expected: "12.0" } }
    ]
  },
  {
    id: "random-numbers",
    title: "Random Numbers",
    module: "Strings & Math",
    moduleIndex: 4,
    description: "Generate random numbers for loot drops, spawning, and game mechanics.",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    steps: [
      { id: "rn-1", title: "math.random", instruction: "Print a random number between 1 and 6 (dice roll). Use math.randomseed(42) first for consistency.", hint: "math.random(1, 6)", starterCode: "math.randomseed(42)\n-- Roll a dice\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["math.random", "print"] } },
      { id: "rn-2", title: "Random loot", instruction: "Create a loot table {\"Sword\",\"Shield\",\"Potion\",\"Gold\"}. Use math.random to pick and print a random item. Seed with 42.", hint: "loot[math.random(1, #loot)]", starterCode: "math.randomseed(42)\nlocal loot = {\"Sword\", \"Shield\", \"Potion\", \"Gold\"}\n-- Pick random loot\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["math.random", "loot", "print"] } }
    ]
  },

  // ─────────────── MODULE 5: OOP & METATABLES ───────────────
  {
    id: "metatables-intro",
    title: "Metatables Intro",
    module: "OOP & Metatables",
    moduleIndex: 5,
    description: "Unlock powerful table behaviors using metatables and metamethods.",
    difficulty: "advanced",
    estimatedMinutes: 25,
    steps: [
      { id: "mt-1", title: "setmetatable", instruction: "Create a table `t = {}`. Set a metatable with `__index` returning 0 for any missing key. Print t.missing.", hint: "setmetatable(t, {__index = function() return 0 end})", starterCode: "-- Metatable with __index\n", expectedOutput: "0", validation: { type: "output", expected: "0" } },
      { id: "mt-2", title: "__tostring", instruction: "Create a `point = {x=3, y=4}`. Set a metatable so tostring(point) returns \"(3, 4)\". Print it.", hint: "__tostring = function(p) return '(' .. p.x .. ', ' .. p.y .. ')' end", starterCode: "-- __tostring metamethod\n", expectedOutput: "(3, 4)", validation: { type: "output", expected: "(3, 4)" } },
      { id: "mt-3", title: "__add", instruction: "Create two vector tables `v1={x=1,y=2}` and `v2={x=3,y=4}`. Add them with a __add metamethod and print the result as '4, 6'.", hint: "__add = function(a,b) return {x=a.x+b.x, y=a.y+b.y} end", starterCode: "-- Vector addition with __add\n", expectedOutput: "4, 6", validation: { type: "output", expected: "4, 6" } }
    ]
  },
  {
    id: "oop-classes",
    title: "Object-Oriented Programming",
    module: "OOP & Metatables",
    moduleIndex: 5,
    description: "Build reusable class-like structures in Lua using metatables.",
    difficulty: "advanced",
    estimatedMinutes: 30,
    steps: [
      { id: "oop-1", title: "Basic class", instruction: "Create an `Animal` class with a `new(name)` constructor and a `speak()` method that prints the animal's name. Call it with 'Dog'.", hint: "Animal.__index = Animal  function Animal.new(name) ... end", starterCode: "-- OOP Animal class\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["function", "setmetatable", "print"] } },
      { id: "oop-2", title: "Inheritance", instruction: "Create a `Dog` class that inherits from `Animal`. Override `speak()` to print name .. \" says: Woof!\". Print for Dog.new(\"Rex\").", hint: "setmetatable(Dog, {__index = Animal})", starterCode: "-- Inheritance\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["setmetatable", "function", "print"] } }
    ]
  },
  {
    id: "module-pattern",
    title: "Module Pattern",
    module: "OOP & Metatables",
    moduleIndex: 5,
    description: "Organize code into reusable modules using tables and return statements.",
    difficulty: "advanced",
    estimatedMinutes: 20,
    steps: [
      { id: "mod-1", title: "Create a module", instruction: "Create a `MathUtils` table with an `add(a,b)` function. Return the table. Call MathUtils.add(3, 7) and print the result.", hint: "local MathUtils = {}  function MathUtils.add(a,b) return a+b end  return MathUtils", starterCode: "-- Module pattern\n", expectedOutput: "10", validation: { type: "output", expected: "10" } },
      { id: "mod-2", title: "Private state", instruction: "Create a module with a private counter variable. Expose increment() and getCount() functions. Call increment 3 times then print getCount().", hint: "local count = 0  function M.increment() count = count + 1 end", starterCode: "-- Module with private state\n", expectedOutput: "3", validation: { type: "output", expected: "3" } }
    ]
  },

  // ─────────────── MODULE 6: ROBLOX STUDIO ───────────────
  {
    id: "roblox-instances",
    title: "Roblox Instances",
    module: "Roblox Studio",
    moduleIndex: 6,
    description: "Create and manipulate Parts, Models, and other instances.",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    steps: [
      { id: "inst-1", title: "Create a Part", instruction: "Create `Instance.new(\"Part\")`, set its Parent to workspace. Print \"Part created!\".", hint: "local part = Instance.new(\"Part\")", starterCode: "-- Create a Part in workspace\n", expectedOutput: "Part created!", validation: { type: "contains_all", keywords: ["Instance.new", "workspace", "print"] } },
      { id: "inst-2", title: "Set properties", instruction: "Create a Part, set Name to \"MyBlock\", BrickColor, Size. Print the part's Name.", hint: "part.Name = \"MyBlock\"", starterCode: "-- Create and customize a Part\n", expectedOutput: "MyBlock", validation: { type: "contains_all", keywords: ["Instance.new", "BrickColor", "Vector3", "Name"] } },
      { id: "inst-3", title: "Position a Part", instruction: "Create a Part with Position = Vector3.new(0,10,0), Anchored = true. Print \"Floating block ready!\".", hint: "part.Position = Vector3.new(0, 10, 0)", starterCode: "-- Create a floating anchored Part\n", expectedOutput: "Floating block ready!", validation: { type: "contains_all", keywords: ["Position", "Anchored", "Vector3"] } }
    ]
  },
  {
    id: "roblox-services",
    title: "Roblox Services",
    module: "Roblox Studio",
    moduleIndex: 6,
    description: "Access core Roblox services with game:GetService().",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    steps: [
      { id: "svc-1", title: "GetService basics", instruction: "Get the Players service and print its Name.", hint: "local Players = game:GetService(\"Players\")", starterCode: "-- Get a Roblox service\n", expectedOutput: "Players", validation: { type: "contains_all", keywords: ["GetService", "Players", "print"] } },
      { id: "svc-2", title: "Workspace service", instruction: "Get the Workspace service and print its Name.", hint: "game:GetService(\"Workspace\")", starterCode: "-- Get the Workspace service\n", expectedOutput: "Workspace", validation: { type: "output", expected: "Workspace" } },
      { id: "svc-3", title: "Multiple services", instruction: "Get Players, Lighting, and ReplicatedStorage. Print their names on separate lines.", hint: "GetService for each", starterCode: "-- Get three services and print names\n", expectedOutput: "Players\nLighting\nReplicatedStorage", validation: { type: "output", expected: "Players\nLighting\nReplicatedStorage" } }
    ]
  },
  {
    id: "events",
    title: "Events & Signals",
    module: "Roblox Studio",
    moduleIndex: 6,
    description: "React to player actions and game events.",
    difficulty: "advanced",
    estimatedMinutes: 25,
    steps: [
      { id: "evt-1", title: "Touched event", instruction: "Create a Part with a Touched event that prints \"Part was touched!\".", hint: "part.Touched:Connect(function() ... end)", starterCode: "-- Create a part with a Touched event\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["Touched", "Connect", "function"] } },
      { id: "evt-2", title: "PlayerAdded event", instruction: "Listen for Players.PlayerAdded and print the player's name.", hint: "Players.PlayerAdded:Connect(function(player) print(player.Name) end)", starterCode: "-- Listen for new players\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["PlayerAdded", "Connect", "GetService"] } },
      { id: "evt-3", title: "Custom event handler", instruction: "Create `onPlayerJoin(player)` that prints \"Welcome, \" .. player.Name. Connect to PlayerAdded.", hint: "local function onPlayerJoin(player) ... end", starterCode: "-- Custom event handler function\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["function", "onPlayerJoin", "Connect", "PlayerAdded"] } }
    ]
  },
  {
    id: "remote-events",
    title: "RemoteEvents",
    module: "Roblox Studio",
    moduleIndex: 6,
    description: "Send data between the server and clients using RemoteEvents.",
    difficulty: "advanced",
    estimatedMinutes: 25,
    steps: [
      { id: "re-1", title: "Create RemoteEvent", instruction: "Create a RemoteEvent named \"DamageEvent\" in ReplicatedStorage and print its Name.", hint: "Instance.new(\"RemoteEvent\")", starterCode: "-- Create a RemoteEvent\n", expectedOutput: "DamageEvent", validation: { type: "contains_all", keywords: ["RemoteEvent", "ReplicatedStorage", "Name"] } },
      { id: "re-2", title: "FireAllClients", instruction: "Get the RemoteEvent and write code to FireAllClients with a message \"Game Start!\".", hint: "remoteEvent:FireAllClients(\"Game Start!\")", starterCode: "-- Fire all clients\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["FireAllClients", "RemoteEvent"] } },
      { id: "re-3", title: "OnServerEvent", instruction: "Connect an OnServerEvent listener that prints the received message.", hint: "remoteEvent.OnServerEvent:Connect(function(player, msg) print(msg) end)", starterCode: "-- Listen for server events\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["OnServerEvent", "Connect", "function"] } }
    ]
  },
  {
    id: "gui-basics",
    title: "GUI Basics",
    module: "Roblox Studio",
    moduleIndex: 6,
    description: "Build in-game UI with ScreenGui, Frames, and TextLabels.",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    steps: [
      { id: "gui-1", title: "Create a ScreenGui", instruction: "Create a ScreenGui, parent to StarterGui, and print its Name.", hint: "Instance.new(\"ScreenGui\")", starterCode: "-- Create a ScreenGui\n", expectedOutput: "ScreenGui", validation: { type: "contains_all", keywords: ["ScreenGui", "StarterGui"] } },
      { id: "gui-2", title: "Add a TextLabel", instruction: "Add a TextLabel inside a ScreenGui. Set Text to \"Hello UI!\". Print the Text.", hint: "Instance.new(\"TextLabel\")", starterCode: "-- Create a TextLabel\n", expectedOutput: "Hello UI!", validation: { type: "contains_all", keywords: ["TextLabel", "Text"] } },
      { id: "gui-3", title: "Add a TextButton", instruction: "Create a TextButton with Text \"Click Me!\". Connect a MouseButton1Click event that prints \"Clicked!\".", hint: "button.MouseButton1Click:Connect(function() print(\"Clicked!\") end)", starterCode: "-- Interactive button\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["TextButton", "MouseButton1Click", "Connect"] } }
    ]
  },
  {
    id: "tweenservice",
    title: "TweenService",
    module: "Roblox Studio",
    moduleIndex: 6,
    description: "Smoothly animate properties using Roblox's TweenService.",
    difficulty: "advanced",
    estimatedMinutes: 25,
    steps: [
      { id: "tw-1", title: "Get TweenService", instruction: "Get TweenService using GetService and print its Name.", hint: "game:GetService(\"TweenService\")", starterCode: "-- Get TweenService\n", expectedOutput: "TweenService", validation: { type: "output", expected: "TweenService" } },
      { id: "tw-2", title: "Create a Tween", instruction: "Create a TweenInfo with Time=1, EasingStyle Quad, EasingDirection Out. Print \"Tween ready!\".", hint: "TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)", starterCode: "-- Create TweenInfo\n", expectedOutput: "Tween ready!", validation: { type: "contains_all", keywords: ["TweenInfo", "EasingStyle"] } },
      { id: "tw-3", title: "Play a Tween", instruction: "Create a Part, tween its Position to Vector3.new(0,20,0), then play it and print \"Playing!\".", hint: "tween:Play()", starterCode: "-- Tween a part's position\n", expectedOutput: "Playing!", validation: { type: "contains_all", keywords: ["TweenService", "Play", "Vector3"] } }
    ]
  },
  {
    id: "datastoreservice",
    title: "DataStoreService",
    module: "Roblox Studio",
    moduleIndex: 6,
    description: "Save and load player data across sessions using DataStoreService.",
    difficulty: "advanced",
    estimatedMinutes: 30,
    steps: [
      { id: "ds-1", title: "Get a DataStore", instruction: "Get DataStoreService and call GetDataStore(\"PlayerData\"). Print \"DataStore ready!\".", hint: "game:GetService(\"DataStoreService\")", starterCode: "-- Get a DataStore\n", expectedOutput: "DataStore ready!", validation: { type: "contains_all", keywords: ["DataStoreService", "GetDataStore"] } },
      { id: "ds-2", title: "SetAsync", instruction: "Save a player's score: store:SetAsync(\"Player_1_score\", 500). Print \"Saved!\".", hint: "dataStore:SetAsync(key, value)", starterCode: "-- Save data with SetAsync\n", expectedOutput: "Saved!", validation: { type: "contains_all", keywords: ["SetAsync", "print"] } },
      { id: "ds-3", title: "GetAsync", instruction: "Retrieve the score with GetAsync and print it.", hint: "local score = dataStore:GetAsync(key)", starterCode: "-- Load data with GetAsync\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["GetAsync", "print"] } }
    ]
  },
  {
    id: "character-humanoid",
    title: "Character & Humanoid",
    module: "Roblox Studio",
    moduleIndex: 6,
    description: "Control player characters and humanoids in your game.",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    steps: [
      { id: "ch-1", title: "Get a character", instruction: "Get the LocalPlayer's Character and print its Name.", hint: "game.Players.LocalPlayer.Character", starterCode: "-- Get the player character\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["Character", "LocalPlayer", "print"] } },
      { id: "ch-2", title: "Access Humanoid", instruction: "Get the Humanoid from the character and print its Health.", hint: "character:FindFirstChildOfClass(\"Humanoid\")", starterCode: "-- Access the Humanoid\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["Humanoid", "Health"] } },
      { id: "ch-3", title: "WalkSpeed", instruction: "Get the humanoid and set its WalkSpeed to 32. Print \"Speed doubled!\".", hint: "humanoid.WalkSpeed = 32", starterCode: "-- Double player walk speed\n", expectedOutput: "Speed doubled!", validation: { type: "contains_all", keywords: ["WalkSpeed", "Humanoid"] } }
    ]
  },
  {
    id: "collision-detection",
    title: "Collision & Physics",
    module: "Roblox Studio",
    moduleIndex: 6,
    description: "Handle collisions, physics, and CanCollide properties.",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    steps: [
      { id: "col-1", title: "CanCollide", instruction: "Create a Part, set CanCollide = false. Print \"Ghost mode!\".", hint: "part.CanCollide = false", starterCode: "-- Set CanCollide\n", expectedOutput: "Ghost mode!", validation: { type: "contains_all", keywords: ["CanCollide", "print"] } },
      { id: "col-2", title: "Anchored parts", instruction: "Create two Parts: one Anchored, one not. Print \"Static\" for anchored and \"Dynamic\" for the other.", hint: "part.Anchored = true/false", starterCode: "-- Anchored vs dynamic\n", expectedOutput: "Static\nDynamic", validation: { type: "output", expected: "Static\nDynamic" } },
      { id: "col-3", title: "Density & mass", instruction: "Create a Part, access its CustomPhysicalProperties, and set Density to 2. Print \"Heavy part!\".", hint: "PhysicalProperties.new(density, ...)", starterCode: "-- Custom physics properties\n", expectedOutput: "Heavy part!", validation: { type: "contains_all", keywords: ["CustomPhysicalProperties", "print"] } }
    ]
  },
  {
    id: "sound-service",
    title: "Sound & Music",
    module: "Roblox Studio",
    moduleIndex: 6,
    description: "Play sounds and music in your Roblox games.",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    steps: [
      { id: "snd-1", title: "Create a Sound", instruction: "Create a Sound instance in workspace with SoundId \"rbxassetid://0\". Print its Name.", hint: "Instance.new(\"Sound\")", starterCode: "-- Create a Sound\n", expectedOutput: "Sound", validation: { type: "contains_all", keywords: ["Sound", "SoundId"] } },
      { id: "snd-2", title: "Play a sound", instruction: "Create a Sound, call :Play() on it, and print \"Playing sound!\".", hint: "sound:Play()", starterCode: "-- Play a sound\n", expectedOutput: "Playing sound!", validation: { type: "contains_all", keywords: ["Sound", "Play", "print"] } }
    ]
  },
  {
    id: "lighting-effects",
    title: "Lighting & Effects",
    module: "Roblox Studio",
    moduleIndex: 6,
    description: "Customize ambient lighting and add atmospheric effects.",
    difficulty: "intermediate",
    estimatedMinutes: 15,
    steps: [
      { id: "lt-1", title: "Get Lighting", instruction: "Get Lighting service and print its Brightness.", hint: "game:GetService(\"Lighting\")", starterCode: "-- Access the Lighting service\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["Lighting", "Brightness", "print"] } },
      { id: "lt-2", title: "Change sky color", instruction: "Set Lighting.Ambient to Color3.fromRGB(50, 50, 100). Print \"Night mode!\".", hint: "Lighting.Ambient = Color3.fromRGB(50, 50, 100)", starterCode: "-- Set ambient color\n", expectedOutput: "Night mode!", validation: { type: "contains_all", keywords: ["Lighting", "Ambient", "Color3"] } }
    ]
  },

  // ─────────────── MODULE 7: GAME SYSTEMS ───────────────
  {
    id: "leaderstats",
    title: "Leaderboard (leaderstats)",
    module: "Game Systems",
    moduleIndex: 7,
    description: "Create an in-game leaderboard with stats like coins and score.",
    difficulty: "advanced",
    estimatedMinutes: 25,
    steps: [
      { id: "ls-1", title: "Create leaderstats", instruction: "In a PlayerAdded event, create a 'leaderstats' Folder parented to the player. Print \"Leaderboard created!\".", hint: "Instance.new(\"Folder\") with Name = \"leaderstats\"", starterCode: "-- Create leaderstats\n", expectedOutput: "Leaderboard created!", validation: { type: "contains_all", keywords: ["leaderstats", "PlayerAdded", "Folder"] } },
      { id: "ls-2", title: "Add IntValue", instruction: "Add an IntValue named 'Coins' inside leaderstats with Value = 0. Print \"Coins stat added!\".", hint: "Instance.new(\"IntValue\")", starterCode: "-- Add a stat value\n", expectedOutput: "Coins stat added!", validation: { type: "contains_all", keywords: ["IntValue", "leaderstats", "Coins"] } },
      { id: "ls-3", title: "Award points", instruction: "Write a function `awardCoins(player, amount)` that adds amount to the player's Coins stat. Print the new total.", hint: "player.leaderstats.Coins.Value += amount", starterCode: "-- Award coins function\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["function", "Coins", "Value"] } }
    ]
  },
  {
    id: "round-system",
    title: "Round System",
    module: "Game Systems",
    moduleIndex: 7,
    description: "Build a round-based game loop with countdown timers.",
    difficulty: "advanced",
    estimatedMinutes: 30,
    steps: [
      { id: "rs-1", title: "Game states", instruction: "Create a table of game states: LOBBY, INTERMISSION, ROUND, ENDING. Print each state.", hint: "local States = {LOBBY=1, INTERMISSION=2, ROUND=3, ENDING=4}", starterCode: "-- Define game states\n", expectedOutput: "LOBBY\nINTERMISSION\nROUND\nENDING", validation: { type: "output", expected: "LOBBY\nINTERMISSION\nROUND\nENDING" } },
      { id: "rs-2", title: "Countdown timer", instruction: "Write a `countdown(seconds)` function that prints each second remaining from `seconds` down to 1.", hint: "for t = seconds, 1, -1 do print(t) end", starterCode: "-- Countdown function\n", expectedOutput: "3\n2\n1", validation: { type: "output", expected: "3\n2\n1" } },
      { id: "rs-3", title: "Round manager", instruction: "Simulate a round: print \"Round starting!\", then countdown from 3, then print \"Round over!\".", hint: "Combine the countdown function with round messages", starterCode: "-- Simulate a round\n", expectedOutput: "Round starting!\n3\n2\n1\nRound over!", validation: { type: "output", expected: "Round starting!\n3\n2\n1\nRound over!" } }
    ]
  },
  {
    id: "inventory-system",
    title: "Inventory System",
    module: "Game Systems",
    moduleIndex: 7,
    description: "Build a simple item inventory for players.",
    difficulty: "advanced",
    estimatedMinutes: 30,
    steps: [
      { id: "inv-1", title: "Create inventory", instruction: "Create an `Inventory` module with `new()` that returns an empty items table and add/remove functions. Print \"Inventory ready!\".", hint: "local Inventory = {}  function Inventory.new() return {items={}} end", starterCode: "-- Inventory system\n", expectedOutput: "Inventory ready!", validation: { type: "contains_all", keywords: ["function", "table", "print"] } },
      { id: "inv-2", title: "Add items", instruction: "Create an inventory, add \"Sword\" and \"Potion\". Print the number of items.", hint: "table.insert(inv.items, item)", starterCode: "-- Add items to inventory\n", expectedOutput: "2", validation: { type: "output", expected: "2" } },
      { id: "inv-3", title: "Check for item", instruction: "Write `hasItem(inv, name)` that returns true if the item exists. Print the result for \"Sword\".", hint: "for _, v in ipairs(inv.items) do if v == name then return true end end", starterCode: "local inv = {items = {\"Sword\", \"Potion\"}}\n-- Check for item\n", expectedOutput: "true", validation: { type: "output", expected: "true" } }
    ]
  },
  {
    id: "combat-system",
    title: "Combat System",
    module: "Game Systems",
    moduleIndex: 7,
    description: "Design a simple turn-based combat system.",
    difficulty: "advanced",
    estimatedMinutes: 30,
    steps: [
      { id: "cb-1", title: "Player stats", instruction: "Create a player table: {name=\"Hero\", hp=100, atk=15, def=5}. Print each stat.", hint: "Access each field with dot notation", starterCode: "-- Player stats table\n", expectedOutput: "Hero\n100\n15\n5", validation: { type: "output", expected: "Hero\n100\n15\n5" } },
      { id: "cb-2", title: "Damage calculation", instruction: "Write `calculateDamage(attacker, defender)` returning math.max(0, attacker.atk - defender.def). Print attack from {atk=20} vs {def=5}.", hint: "math.max(0, atk - def)", starterCode: "-- Damage calculation\n", expectedOutput: "15", validation: { type: "output", expected: "15" } },
      { id: "cb-3", title: "Attack function", instruction: "Write `attack(attacker, defender)` that reduces defender.hp by damage and prints \"ATTACKER hit DEFENDER for X damage!\".", hint: "defender.hp = defender.hp - damage", starterCode: "-- Attack function\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["function", "hp", "damage", "print"] } }
    ]
  },
  {
    id: "spawn-system",
    title: "Spawn & Respawn",
    module: "Game Systems",
    moduleIndex: 7,
    description: "Handle player spawning, respawning, and SpawnLocations.",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    steps: [
      { id: "sp-1", title: "Create SpawnLocation", instruction: "Create a SpawnLocation Part, set Anchored = true, AllowTeamChangeOnTouch = false. Print \"Spawn set!\".", hint: "Instance.new(\"SpawnLocation\")", starterCode: "-- Create a SpawnLocation\n", expectedOutput: "Spawn set!", validation: { type: "contains_all", keywords: ["SpawnLocation", "Anchored"] } },
      { id: "sp-2", title: "Respawn player", instruction: "Write `respawnPlayer(player)` that loads the character. Print \"Respawning player!\".", hint: "player:LoadCharacter()", starterCode: "-- Respawn function\n", expectedOutput: "Respawning player!", validation: { type: "contains_all", keywords: ["function", "LoadCharacter", "print"] } }
    ]
  },
  {
    id: "team-system",
    title: "Teams",
    module: "Game Systems",
    moduleIndex: 7,
    description: "Implement teams using Roblox's Teams service.",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    steps: [
      { id: "tm-1", title: "Create teams", instruction: "Get Teams service. Create two Teams: \"Red\" and \"Blue\" with BrickColor. Print \"Teams created!\".", hint: "game:GetService(\"Teams\")", starterCode: "-- Create Red and Blue teams\n", expectedOutput: "Teams created!", validation: { type: "contains_all", keywords: ["Teams", "BrickColor", "print"] } },
      { id: "tm-2", title: "Assign player to team", instruction: "Write code to assign a player to the Red team by setting player.Team.", hint: "player.Team = redTeam", starterCode: "-- Assign a team\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["Team", "player", "function"] } }
    ]
  },
  {
    id: "badge-system",
    title: "Badge System",
    module: "Game Systems",
    moduleIndex: 7,
    description: "Award and check badges using BadgeService.",
    difficulty: "advanced",
    estimatedMinutes: 20,
    steps: [
      { id: "bg-1", title: "Get BadgeService", instruction: "Get BadgeService with GetService. Print its Name.", hint: "game:GetService(\"BadgeService\")", starterCode: "-- Get BadgeService\n", expectedOutput: "BadgeService", validation: { type: "output", expected: "BadgeService" } },
      { id: "bg-2", title: "Award a badge", instruction: "Write `awardBadge(player, badgeId)` that calls BadgeService:AwardBadge(). Print \"Badge awarded!\".", hint: "BadgeService:AwardBadge(player.UserId, badgeId)", starterCode: "-- Award badge function\n", expectedOutput: "Badge awarded!", validation: { type: "contains_all", keywords: ["BadgeService", "AwardBadge", "function"] } }
    ]
  },
  {
    id: "pathfinding",
    title: "Pathfinding",
    module: "Game Systems",
    moduleIndex: 7,
    description: "Create NPCs that navigate around obstacles using PathfindingService.",
    difficulty: "advanced",
    estimatedMinutes: 25,
    steps: [
      { id: "pf-1", title: "Get PathfindingService", instruction: "Get PathfindingService. Print \"Pathfinding ready!\".", hint: "game:GetService(\"PathfindingService\")", starterCode: "-- Get PathfindingService\n", expectedOutput: "Pathfinding ready!", validation: { type: "contains_all", keywords: ["PathfindingService"] } },
      { id: "pf-2", title: "Create a path", instruction: "Create a path using PathfindingService:CreatePath(). Print \"Path created!\".", hint: "PathfindingService:CreatePath({AgentRadius=2})", starterCode: "-- Create a pathfinding path\n", expectedOutput: "Path created!", validation: { type: "contains_all", keywords: ["CreatePath", "print"] } }
    ]
  },
  {
    id: "marketplace",
    title: "MarketplaceService",
    module: "Game Systems",
    moduleIndex: 7,
    description: "Sell game passes and developer products using MarketplaceService.",
    difficulty: "advanced",
    estimatedMinutes: 20,
    steps: [
      { id: "mp-1", title: "Get MarketplaceService", instruction: "Get MarketplaceService. Print its Name.", hint: "game:GetService(\"MarketplaceService\")", starterCode: "-- Get MarketplaceService\n", expectedOutput: "MarketplaceService", validation: { type: "output", expected: "MarketplaceService" } },
      { id: "mp-2", title: "Prompt purchase", instruction: "Write code to prompt a game pass purchase for a player. Print \"Prompted purchase!\".", hint: "MarketplaceService:PromptGamePassPurchase(player, passId)", starterCode: "-- Prompt a game pass\n", expectedOutput: "Prompted purchase!", validation: { type: "contains_all", keywords: ["MarketplaceService", "PromptGamePassPurchase", "print"] } }
    ]
  },

  // ─────────────── BONUS ADVANCED LESSONS ───────────────
  {
    id: "pcall-error-handling",
    title: "Error Handling with pcall",
    module: "Advanced Lua",
    moduleIndex: 8,
    description: "Handle errors gracefully using pcall and xpcall.",
    difficulty: "advanced",
    estimatedMinutes: 20,
    steps: [
      { id: "pc-1", title: "Basic pcall", instruction: "Wrap a function that causes an error in pcall. Print \"Error caught!\" if it fails.", hint: "local ok, err = pcall(function() error('oops') end)", starterCode: "-- Use pcall to catch an error\n", expectedOutput: "Error caught!", validation: { type: "output", expected: "Error caught!" } },
      { id: "pc-2", title: "pcall success", instruction: "Use pcall on a function that returns 42. Print the returned value.", hint: "local ok, val = pcall(function() return 42 end)", starterCode: "-- pcall with success\n", expectedOutput: "42", validation: { type: "output", expected: "42" } },
      { id: "pc-3", title: "xpcall with traceback", instruction: "Use xpcall with a message handler that returns \"Error: \" .. msg. Print the handler result.", hint: "xpcall(fn, function(msg) return 'Error: ' .. msg end)", starterCode: "-- xpcall with error handler\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["xpcall", "function"] } }
    ]
  },
  {
    id: "coroutines",
    title: "Coroutines",
    module: "Advanced Lua",
    moduleIndex: 8,
    description: "Write concurrent code using Lua coroutines.",
    difficulty: "advanced",
    estimatedMinutes: 25,
    steps: [
      { id: "co-1", title: "Create a coroutine", instruction: "Create a coroutine that prints \"Hello from coroutine!\". Resume it.", hint: "local co = coroutine.create(function() print(...) end)  coroutine.resume(co)", starterCode: "-- Create and run a coroutine\n", expectedOutput: "Hello from coroutine!", validation: { type: "output", expected: "Hello from coroutine!" } },
      { id: "co-2", title: "coroutine.yield", instruction: "Create a coroutine that prints 1, yields, then prints 2. Resume it twice.", hint: "coroutine.yield() pauses execution", starterCode: "-- Coroutine with yield\n", expectedOutput: "1\n2", validation: { type: "output", expected: "1\n2" } },
      { id: "co-3", title: "coroutine.wrap", instruction: "Use coroutine.wrap to create a generator that yields 'a', 'b', 'c'. Call it 3 times and print.", hint: "local gen = coroutine.wrap(function() ... end)", starterCode: "-- Coroutine wrap generator\n", expectedOutput: "a\nb\nc", validation: { type: "output", expected: "a\nb\nc" } }
    ]
  },
  {
    id: "bitwise-ops",
    title: "Bitwise Operations",
    module: "Advanced Lua",
    moduleIndex: 8,
    description: "Perform low-level bitwise operations for flags and optimizations.",
    difficulty: "advanced",
    estimatedMinutes: 20,
    steps: [
      { id: "bw-1", title: "bit.band", instruction: "Use bit.band to AND 12 and 10. Print the result (should be 8).", hint: "bit.band(12, 10)", starterCode: "-- Bitwise AND\n", expectedOutput: "8", validation: { type: "output", expected: "8" } },
      { id: "bw-2", title: "bit.bor", instruction: "Use bit.bor to OR 5 and 3. Print the result (should be 7).", hint: "bit.bor(5, 3)", starterCode: "-- Bitwise OR\n", expectedOutput: "7", validation: { type: "output", expected: "7" } },
      { id: "bw-3", title: "Bit flags", instruction: "Create flag constants: READ=1, WRITE=2, EXEC=4. Combine READ and WRITE. Check if WRITE is set using band. Print true.", hint: "local flags = bit.bor(READ, WRITE)  bit.band(flags, WRITE) ~= 0", starterCode: "-- Permission bit flags\n", expectedOutput: "true", validation: { type: "output", expected: "true" } }
    ]
  },
  {
    id: "environment-manipulation",
    title: "Environments & _G",
    module: "Advanced Lua",
    moduleIndex: 8,
    description: "Explore Lua's global environment table and environment manipulation.",
    difficulty: "advanced",
    estimatedMinutes: 20,
    steps: [
      { id: "env-1", title: "Global variable via _G", instruction: "Set `_G.myGlobal = 42`. Access it from a separate function and print it.", hint: "_G.myGlobal = 42", starterCode: "-- Use _G for globals\n", expectedOutput: "42", validation: { type: "output", expected: "42" } },
      { id: "env-2", title: "List globals", instruction: "Loop over _G with pairs and print the type of each entry. Count how many are 'function'.", hint: "for k, v in pairs(_G) do if type(v) == 'function' then count = count + 1 end end", starterCode: "-- Count functions in _G\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["_G", "pairs", "function"] } }
    ]
  },
  {
    id: "string-patterns",
    title: "Lua String Patterns",
    module: "Advanced Lua",
    moduleIndex: 8,
    description: "Use Lua's pattern-matching engine for powerful string parsing.",
    difficulty: "advanced",
    estimatedMinutes: 25,
    steps: [
      { id: "pat-1", title: "Match digits", instruction: "Extract all digits from \"abc123def456\" using string.gmatch with pattern '%d+'.", hint: "for num in string.gmatch(str, '%d+') do print(num) end", starterCode: "local str = \"abc123def456\"\n-- Extract digits\n", expectedOutput: "123\n456", validation: { type: "output", expected: "123\n456" } },
      { id: "pat-2", title: "Match words", instruction: "Extract all words from \"Hello World Lua\" using pattern '%a+'.", hint: "for word in string.gmatch(str, '%a+') do print(word) end", starterCode: "local str = \"Hello World Lua\"\n-- Extract words\n", expectedOutput: "Hello\nWorld\nLua", validation: { type: "output", expected: "Hello\nWorld\nLua" } },
      { id: "pat-3", title: "Validate username", instruction: "Check if \"Player_123\" matches pattern '^[%a%d_]+$'. Print true or false.", hint: "string.match(username, '^[%a%d_]+$') ~= nil", starterCode: "local username = \"Player_123\"\n-- Validate username\n", expectedOutput: "true", validation: { type: "output", expected: "true" } }
    ]
  },
  {
    id: "debug-library",
    title: "Debugging Techniques",
    module: "Advanced Lua",
    moduleIndex: 8,
    description: "Use Lua's debug tools and best practices for finding bugs.",
    difficulty: "advanced",
    estimatedMinutes: 20,
    steps: [
      { id: "dbg-1", title: "Print debugging", instruction: "Write a function with a bug (divides by zero). Add print statements to trace the issue. Use pcall to catch the error and print a helpful message.", hint: "pcall catches runtime errors", starterCode: "-- Debug a buggy function\nlocal function buggy(x)\n  return x / 0\nend\n", expectedOutput: null, validation: { type: "contains_all", keywords: ["pcall", "print"] } },
      { id: "dbg-2", title: "assert()", instruction: "Write a function `safeDivide(a, b)` that asserts b ~= 0 before dividing. Call safeDivide(10, 2) and print the result.", hint: "assert(b ~= 0, 'Cannot divide by zero')", starterCode: "-- Assert-based validation\n", expectedOutput: "5.0", validation: { type: "output", expected: "5.0" } }
    ]
  }
];

const MODULES = [
  { index: 0, name: "Foundations", color: "primary", icon: "Code2" },
  { index: 1, name: "Control Flow", color: "secondary", icon: "GitBranch" },
  { index: 2, name: "Functions", color: "accent", icon: "FunctionSquare" },
  { index: 3, name: "Tables & Data", color: "primary", icon: "Database" },
  { index: 4, name: "Strings & Math", color: "secondary", icon: "Calculator" },
  { index: 5, name: "OOP & Metatables", color: "accent", icon: "Boxes" },
  { index: 6, name: "Roblox Studio", color: "primary", icon: "Gamepad2" },
  { index: 7, name: "Game Systems", color: "secondary", icon: "Trophy" },
  { index: 8, name: "Advanced Lua", color: "accent", icon: "Zap" }
];

export { LESSONS, MODULES };