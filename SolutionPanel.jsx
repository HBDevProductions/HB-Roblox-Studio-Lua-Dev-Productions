import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, BookOpen, ChevronDown, ChevronUp, Lightbulb, Copy, Check, Eye, EyeOff } from "lucide-react";

// Build a full solution + line-by-line explanation purely from step data — no AI, no API calls
function buildSolution(step) {
  const solutionCode = buildCorrectCode(step);

  // Build line-by-line explanations from all non-blank, non-pure-comment lines
  const codeLines = solutionCode
    .split("\n")
    .filter(l => l.trim() && !l.trim().startsWith("--"));

  const lines = codeLines.map(l => ({
    code: l,
    explanation: explainLine(l.trim(), step),
    whyItWorks: whyItWorks(l.trim()),
    concept: detectConcept(l.trim()),
  }));

  return { solutionCode, summary: buildSummary(step), lines };
}

// Generate a complete, runnable, passable solution for every step
function buildCorrectCode(step) {
  const { id, hint, starterCode, expectedOutput, validation } = step;

  // --- EXPLICIT SOLUTIONS for every lesson step ID ---
  const solutions = {
    // Foundations: Hello World
    "hw-1": `print("Hello, World!")`,
    "hw-2": `print("Alex")`,
    "hw-3": `print("I am learning Lua")\nprint("This is awesome!")`,
    // Variables
    "var-1": `local playerName = "YourName"\nprint(playerName)`,
    "var-2": `local health = 100\nlocal speed = 16\nprint(health)\nprint(speed)`,
    "var-3": `local firstName = "John"\nlocal lastName = "Doe"\nprint(firstName .. " " .. lastName)`,
    "var-4": `local isAlive = true\nprint(isAlive)`,
    // Comments
    "cmt-1": `-- This prints a greeting\nprint("Hello!")`,
    "cmt-2": `--[[\n  This is a\n  multi-line comment\n]]\nprint("Done!")`,
    "cmt-3": `print("First")\n-- print("Second")`,
    // Math
    "math-1": `local a = 10\nlocal b = 5\nprint(a + b)`,
    "math-2": `print(7 * 8)`,
    "math-3": `print(10 / 4)\nprint(10 % 3)`,
    "math-4": `print(2 ^ 10)`,
    // Strings
    "str-1": `local word = "Roblox"\nprint(#word)`,
    "str-2": `print(string.upper("hello"))`,
    "str-3": `print(string.lower("ROBLOX"))`,
    "str-4": `print(string.rep("ha", 3))`,
    // Type conversion
    "tc-1": `print(type(tostring(42)))`,
    "tc-2": `print(tonumber("99") + 1)`,
    "tc-3": `print(type(42))\nprint(type("hello"))\nprint(type(true))\nprint(type(nil))`,
    // Nil
    "nil-1": `local x\nprint(x)`,
    "nil-2": `local item = nil\nif item == nil then\n  print("Item is empty!")\nend`,
    // Control Flow: Conditionals
    "if-1": `local score = 85\nif score >= 50 then\n  print("You passed!")\nend`,
    "if-2": `local score = 30\nif score >= 50 then\n  print("You passed!")\nelse\n  print("Try again!")\nend`,
    "if-3": `local score = 75\nif score >= 90 then\n  print("A")\nelseif score >= 80 then\n  print("B")\nelseif score >= 70 then\n  print("C")\nelse\n  print("F")\nend`,
    // Logical operators
    "lo-1": `local health = 80\nlocal armor = 50\nif health > 0 and armor > 0 then\n  print("Player is alive!")\nend`,
    "lo-2": `local hasKey = false\nlocal hasPickaxe = true\nif hasKey or hasPickaxe then\n  print("Can open the door!")\nend`,
    "lo-3": `local isDead = false\nif not isDead then\n  print("Still fighting!")\nend`,
    // For loops
    "loop-1": `for i = 1, 5 do\n  print(i)\nend`,
    "loop-2": `for i = 0, 10, 2 do\n  print(i)\nend`,
    "loop-3": `for i = 5, 1, -1 do\n  print(i)\nend`,
    // While loops
    "wl-1": `local count = 1\nwhile count <= 3 do\n  print(count)\n  count = count + 1\nend`,
    "wl-2": `local count = 1\nrepeat\n  print(count)\n  count = count + 1\nuntil count > 3`,
    "wl-3": `for i = 1, 10 do\n  if i == 4 then break end\n  print(i)\nend`,
    // Nested loops
    "nl-1": `for r = 1, 2 do\n  for c = 1, 3 do\n    print("Row " .. r .. " Col " .. c)\n  end\nend`,
    "nl-2": `for i = 1, 5 do\n  print(3 * i)\nend`,
    // Continue pattern
    "cp-1": `for i = 1, 6 do\n  if i % 2 ~= 0 then\n    print(i)\n  end\nend`,
    "cp-2": `local nums = {3, 7, 2, 9, 1}\nfor _, val in ipairs(nums) do\n  if val > 5 then\n    print(val)\n    break\n  end\nend`,
    // Functions
    "fn-1": `local function greet()\n  print("Welcome to Roblox!")\nend\ngreet()`,
    "fn-2": `local function greetPlayer(name)\n  print("Hello, " .. name)\nend\ngreetPlayer("Steve")`,
    "fn-3": `local function add(a, b)\n  return a + b\nend\nprint(add(10, 25))`,
    "fn-4": `local function calculateDamage(base, mult)\n  return base * mult\nend\nprint(calculateDamage(25, 1.5))`,
    // Multiple returns
    "mr-1": `local function getStats()\n  return 100, 50\nend\nlocal h, m = getStats()\nprint(h)\nprint(m)`,
    "mr-2": `local function swap(a, b)\n  return b, a\nend\nlocal x, y = swap(1, 2)\nprint(x)\nprint(y)`,
    // Variadic
    "vf-1": `local function sum(...)\n  local args = {...}\n  local total = 0\n  for _, v in ipairs(args) do\n    total = total + v\n  end\n  return total\nend\nprint(sum(1,2,3,4,5))`,
    "vf-2": `local function countArgs(...)\n  return select('#', ...)\nend\nprint(countArgs(10,20,30))`,
    // Closures
    "cl-1": `local function makeCounter()\n  local count = 0\n  return function()\n    count = count + 1\n    print(count)\n  end\nend\nlocal counter = makeCounter()\ncounter()\ncounter()`,
    "cl-2": `local function makeAdder(n)\n  return function(x) return n + x end\nend\nprint(makeAdder(5)(10))`,
    // Recursion
    "rec-1": `local function factorial(n)\n  if n <= 1 then return 1 end\n  return n * factorial(n - 1)\nend\nprint(factorial(5))`,
    "rec-2": `local function fib(n)\n  if n <= 1 then return n end\n  return fib(n-1) + fib(n-2)\nend\nprint(fib(7))`,
    // Higher order
    "ho-1": `local function double(n) return n * 2 end\nlocal function applyTwice(f, x) return f(f(x)) end\nprint(applyTwice(double, 3))`,
    "ho-2": `local function map(t, f)\n  local result = {}\n  for i, v in ipairs(t) do result[i] = f(v) end\n  return result\nend\nlocal r = map({1,2,3,4}, function(x) return x * 2 end)\nfor _, v in ipairs(r) do print(v) end`,
    // Tables
    "tbl-1": `local fruits = {"Apple", "Banana", "Cherry"}\nprint(fruits[1])`,
    "tbl-2": `local fruits = {"Apple", "Banana", "Cherry"}\nfor index, fruit in ipairs(fruits) do\n  print(fruit)\nend`,
    "tbl-3": `local player = {name="Hero", health=100, level=5}\nprint(player.name)`,
    // Table manipulation
    "tm-1": `local items = {}\ntable.insert(items, "Sword")\ntable.insert(items, "Shield")\ntable.insert(items, "Potion")\nfor _, v in ipairs(items) do print(v) end`,
    "tm-2": `local t = {"A", "B", "C", "D"}\ntable.remove(t, 2)\nfor _, v in ipairs(t) do print(v) end`,
    "tm-3": `local t = {1, 2, 3, 4, 5}\nprint(#t)`,
    "tm-4": `local words = {"Hello", "World", "Lua"}\nprint(table.concat(words, " "))`,
    // Table sorting
    "ts-1": `local nums = {5, 3, 9, 1, 7}\ntable.sort(nums)\nfor _, v in ipairs(nums) do print(v) end`,
    "ts-2": `local nums = {5, 3, 9, 1, 7}\ntable.sort(nums, function(a, b) return a > b end)\nfor _, v in ipairs(nums) do print(v) end`,
    // Nested tables
    "nt-1": `local players = {{name="Alice",score=100},{name="Bob",score=200}}\nfor _, p in ipairs(players) do print(p.name) end`,
    "nt-2": `local players = {{name="Alice",score=100},{name="Bob",score=200}}\nprint(players[2].score)`,
    // pairs vs ipairs
    "pi-1": `local t = {"a", "b", "c"}\nfor i, v in ipairs(t) do\n  print(v)\nend`,
    "pi-2": `local stats = {hp=100, mp=50, atk=30}\nfor k, v in pairs(stats) do\n  print(v)\nend`,
    // String formatting
    "sf-1": `local score = 42\nprint(string.format("Score: %d", score))`,
    "sf-2": `local pi = 3.14159\nprint(string.format("%.2f", pi))`,
    "sf-3": `local name = "Alex"\nlocal level = 5\nlocal hp = 100\nprint(string.format("Player: %s | Level: %d | HP: %d", name, level, hp))`,
    // String find/sub
    "ss-1": `local s, e = string.find("Hello World", "World")\nprint(s)`,
    "ss-2": `local str = "I love Roblox!"\nprint(string.sub(str, 8, 13))`,
    "ss-3": `local str = "Roblox is cool"\nlocal result = string.gsub(str, "o", "0")\nprint(result)`,
    // Math library
    "ml-1": `print(math.floor(4.7))\nprint(math.ceil(4.2))`,
    "ml-2": `print(math.max(10, 25, 7))\nprint(math.min(10, 25, 7))`,
    "ml-3": `print(math.abs(-42))`,
    "ml-4": `print(math.sqrt(144))`,
    // Random
    "rn-1": `math.randomseed(42)\nprint(math.random(1, 6))`,
    "rn-2": `math.randomseed(42)\nlocal loot = {"Sword", "Shield", "Potion", "Gold"}\nprint(loot[math.random(1, #loot)])`,
    // Metatables
    "mt-1": `local t = {}\nsetmetatable(t, {__index = function() return 0 end})\nprint(t.missing)`,
    "mt-2": `local point = {x=3, y=4}\nsetmetatable(point, {__tostring = function(p) return "(" .. p.x .. ", " .. p.y .. ")" end})\nprint(tostring(point))`,
    "mt-3": `local mt = {__add = function(a, b) return {x=a.x+b.x, y=a.y+b.y} end}\nlocal v1 = setmetatable({x=1,y=2}, mt)\nlocal v2 = setmetatable({x=3,y=4}, mt)\nlocal v3 = v1 + v2\nprint(v3.x .. ", " .. v3.y)`,
    // OOP
    "oop-1": `local Animal = {}\nAnimal.__index = Animal\nfunction Animal.new(name)\n  return setmetatable({name=name}, Animal)\nend\nfunction Animal:speak()\n  print(self.name)\nend\nlocal a = Animal.new("Dog")\na:speak()`,
    "oop-2": `local Animal = {}\nAnimal.__index = Animal\nfunction Animal.new(name)\n  return setmetatable({name=name}, Animal)\nend\nlocal Dog = setmetatable({}, {__index = Animal})\nDog.__index = Dog\nfunction Dog:speak()\n  print(self.name .. " says: Woof!")\nend\nfunction Dog.new(name)\n  return setmetatable({name=name}, Dog)\nend\nlocal d = Dog.new("Rex")\nd:speak()`,
    // Module
    "mod-1": `local MathUtils = {}\nfunction MathUtils.add(a, b) return a + b end\nprint(MathUtils.add(3, 7))`,
    "mod-2": `local M = {}\nlocal count = 0\nfunction M.increment() count = count + 1 end\nfunction M.getCount() return count end\nM.increment()\nM.increment()\nM.increment()\nprint(M.getCount())`,
    // Roblox instances
    "inst-1": `local part = Instance.new("Part")\npart.Parent = workspace\nprint("Part created!")`,
    "inst-2": `local part = Instance.new("Part")\npart.Name = "MyBlock"\npart.BrickColor = BrickColor.new("Bright red")\npart.Size = Vector3.new(4, 1, 2)\nprint(part.Name)`,
    "inst-3": `local part = Instance.new("Part")\npart.Position = Vector3.new(0, 10, 0)\npart.Anchored = true\nprint("Floating block ready!")`,
    // Services
    "svc-1": `local Players = game:GetService("Players")\nprint(Players.Name)`,
    "svc-2": `local Workspace = game:GetService("Workspace")\nprint(Workspace.Name)`,
    "svc-3": `local Players = game:GetService("Players")\nlocal Lighting = game:GetService("Lighting")\nlocal ReplicatedStorage = game:GetService("ReplicatedStorage")\nprint(Players.Name)\nprint(Lighting.Name)\nprint(ReplicatedStorage.Name)`,
    // Events
    "evt-1": `local part = Instance.new("Part")\npart.Touched:Connect(function()\n  print("Part was touched!")\nend)`,
    "evt-2": `local Players = game:GetService("Players")\nPlayers.PlayerAdded:Connect(function(player)\n  print(player.Name)\nend)`,
    "evt-3": `local Players = game:GetService("Players")\nlocal function onPlayerJoin(player)\n  print("Welcome, " .. player.Name)\nend\nPlayers.PlayerAdded:Connect(onPlayerJoin)`,
    // Remote events
    "re-1": `local ReplicatedStorage = game:GetService("ReplicatedStorage")\nlocal e = Instance.new("RemoteEvent")\ne.Name = "DamageEvent"\ne.Parent = ReplicatedStorage\nprint(e.Name)`,
    "re-2": `local ReplicatedStorage = game:GetService("ReplicatedStorage")\nlocal remoteEvent = Instance.new("RemoteEvent")\nremoteEvent.Parent = ReplicatedStorage\nremoteEvent:FireAllClients("Game Start!")`,
    "re-3": `local ReplicatedStorage = game:GetService("ReplicatedStorage")\nlocal remoteEvent = Instance.new("RemoteEvent")\nremoteEvent.Parent = ReplicatedStorage\nremoteEvent.OnServerEvent:Connect(function(player, msg)\n  print(msg)\nend)`,
    // GUI
    "gui-1": `local StarterGui = game:GetService("StarterGui")\nlocal gui = Instance.new("ScreenGui")\ngui.Parent = StarterGui\nprint(gui.Name)`,
    "gui-2": `local StarterGui = game:GetService("StarterGui")\nlocal gui = Instance.new("ScreenGui")\ngui.Parent = StarterGui\nlocal label = Instance.new("TextLabel")\nlabel.Text = "Hello UI!"\nlabel.Parent = gui\nprint(label.Text)`,
    "gui-3": `local button = Instance.new("TextButton")\nbutton.Text = "Click Me!"\nbutton.MouseButton1Click:Connect(function()\n  print("Clicked!")\nend)`,
    // TweenService
    "tw-1": `local TweenService = game:GetService("TweenService")\nprint(TweenService.Name)`,
    "tw-2": `local TweenService = game:GetService("TweenService")\nlocal info = TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)\nprint("Tween ready!")`,
    "tw-3": `local TweenService = game:GetService("TweenService")\nlocal part = Instance.new("Part")\npart.Parent = workspace\nlocal tween = TweenService:Create(part, TweenInfo.new(1), {Position = Vector3.new(0, 20, 0)})\ntween:Play()\nprint("Playing!")`,
    // DataStore
    "ds-1": `local DataStoreService = game:GetService("DataStoreService")\nlocal store = DataStoreService:GetDataStore("PlayerData")\nprint("DataStore ready!")`,
    "ds-2": `local DataStoreService = game:GetService("DataStoreService")\nlocal store = DataStoreService:GetDataStore("PlayerData")\nstore:SetAsync("Player_1_score", 500)\nprint("Saved!")`,
    "ds-3": `local DataStoreService = game:GetService("DataStoreService")\nlocal store = DataStoreService:GetDataStore("PlayerData")\nlocal score = store:GetAsync("Player_1_score")\nprint(score)`,
    // Character
    "ch-1": `local player = game.Players.LocalPlayer\nlocal character = player.Character\nprint(character.Name)`,
    "ch-2": `local character = game.Players.LocalPlayer.Character\nlocal humanoid = character:FindFirstChildOfClass("Humanoid")\nprint(humanoid.Health)`,
    "ch-3": `local character = game.Players.LocalPlayer.Character\nlocal humanoid = character:FindFirstChildOfClass("Humanoid")\nhumanoid.WalkSpeed = 32\nprint("Speed doubled!")`,
    // Collision
    "col-1": `local part = Instance.new("Part")\npart.CanCollide = false\nprint("Ghost mode!")`,
    "col-2": `local part1 = Instance.new("Part")\npart1.Anchored = true\nlocal part2 = Instance.new("Part")\npart2.Anchored = false\nprint("Static")\nprint("Dynamic")`,
    "col-3": `local part = Instance.new("Part")\npart.CustomPhysicalProperties = PhysicalProperties.new(2, 0.3, 0.5)\nprint("Heavy part!")`,
    // Sound
    "snd-1": `local sound = Instance.new("Sound")\nsound.SoundId = "rbxassetid://0"\nsound.Parent = workspace\nprint(sound.Name)`,
    "snd-2": `local sound = Instance.new("Sound")\nsound.Parent = workspace\nsound:Play()\nprint("Playing sound!")`,
    // Lighting
    "lt-1": `local Lighting = game:GetService("Lighting")\nprint(Lighting.Brightness)`,
    "lt-2": `local Lighting = game:GetService("Lighting")\nLighting.Ambient = Color3.fromRGB(50, 50, 100)\nprint("Night mode!")`,
    // Leaderstats
    "ls-1": `local Players = game:GetService("Players")\nPlayers.PlayerAdded:Connect(function(player)\n  local leaderstats = Instance.new("Folder")\n  leaderstats.Name = "leaderstats"\n  leaderstats.Parent = player\n  print("Leaderboard created!")\nend)`,
    "ls-2": `local Players = game:GetService("Players")\nPlayers.PlayerAdded:Connect(function(player)\n  local leaderstats = Instance.new("Folder")\n  leaderstats.Name = "leaderstats"\n  leaderstats.Parent = player\n  local coins = Instance.new("IntValue")\n  coins.Name = "Coins"\n  coins.Value = 0\n  coins.Parent = leaderstats\n  print("Coins stat added!")\nend)`,
    "ls-3": `local function awardCoins(player, amount)\n  player.leaderstats.Coins.Value = player.leaderstats.Coins.Value + amount\n  print(player.leaderstats.Coins.Value)\nend`,
    // Round system
    "rs-1": `print("LOBBY")\nprint("INTERMISSION")\nprint("ROUND")\nprint("ENDING")`,
    "rs-2": `local function countdown(seconds)\n  for t = seconds, 1, -1 do\n    print(t)\n  end\nend\ncountdown(3)`,
    "rs-3": `local function countdown(seconds)\n  for t = seconds, 1, -1 do\n    print(t)\n  end\nend\nprint("Round starting!")\ncountdown(3)\nprint("Round over!")`,
    // Inventory
    "inv-1": `local Inventory = {}\nfunction Inventory.new() return {items={}} end\nprint("Inventory ready!")`,
    "inv-2": `local inv = {items={}}\ntable.insert(inv.items, "Sword")\ntable.insert(inv.items, "Potion")\nprint(#inv.items)`,
    "inv-3": `local inv = {items = {"Sword", "Potion"}}\nlocal function hasItem(inv, name)\n  for _, v in ipairs(inv.items) do\n    if v == name then return true end\n  end\n  return false\nend\nprint(hasItem(inv, "Sword"))`,
    // Combat
    "cb-1": `local player = {name="Hero", hp=100, atk=15, def=5}\nprint(player.name)\nprint(player.hp)\nprint(player.atk)\nprint(player.def)`,
    "cb-2": `local function calculateDamage(attacker, defender)\n  return math.max(0, attacker.atk - defender.def)\nend\nprint(calculateDamage({atk=20}, {def=5}))`,
    "cb-3": `local function attack(attacker, defender)\n  local damage = math.max(0, attacker.atk - defender.def)\n  defender.hp = defender.hp - damage\n  print(attacker.name .. " hit " .. defender.name .. " for " .. damage .. " damage!")\nend`,
    // Spawn
    "sp-1": `local spawn = Instance.new("SpawnLocation")\nspawn.Anchored = true\nspawn.AllowTeamChangeOnTouch = false\nprint("Spawn set!")`,
    "sp-2": `local function respawnPlayer(player)\n  player:LoadCharacter()\n  print("Respawning player!")\nend`,
    // Teams
    "tm-1": `local Teams = game:GetService("Teams")\nlocal red = Instance.new("Team")\nred.Name = "Red"\nred.TeamColor = BrickColor.new("Bright red")\nred.Parent = Teams\nlocal blue = Instance.new("Team")\nblue.Name = "Blue"\nblue.TeamColor = BrickColor.new("Bright blue")\nblue.Parent = Teams\nprint("Teams created!")`,
    "tm-2": `local function assignTeam(player, team)\n  player.Team = team\nend`,
    // Badge
    "bg-1": `local BadgeService = game:GetService("BadgeService")\nprint(BadgeService.Name)`,
    "bg-2": `local BadgeService = game:GetService("BadgeService")\nlocal function awardBadge(player, badgeId)\n  BadgeService:AwardBadge(player.UserId, badgeId)\n  print("Badge awarded!")\nend`,
    // Pathfinding
    "pf-1": `local PathfindingService = game:GetService("PathfindingService")\nprint("Pathfinding ready!")`,
    "pf-2": `local PathfindingService = game:GetService("PathfindingService")\nlocal path = PathfindingService:CreatePath({AgentRadius=2})\nprint("Path created!")`,
    // Marketplace
    "mp-1": `local MarketplaceService = game:GetService("MarketplaceService")\nprint(MarketplaceService.Name)`,
    "mp-2": `local MarketplaceService = game:GetService("MarketplaceService")\nlocal function promptPurchase(player, passId)\n  MarketplaceService:PromptGamePassPurchase(player, passId)\n  print("Prompted purchase!")\nend`,
    // pcall
    "pc-1": `local ok, err = pcall(function() error("oops") end)\nif not ok then print("Error caught!") end`,
    "pc-2": `local ok, val = pcall(function() return 42 end)\nprint(val)`,
    "pc-3": `xpcall(function() error("bad") end, function(msg) print("Error: " .. msg) end)`,
    // Coroutines
    "co-1": `local co = coroutine.create(function()\n  print("Hello from coroutine!")\nend)\ncoroutine.resume(co)`,
    "co-2": `local co = coroutine.create(function()\n  print(1)\n  coroutine.yield()\n  print(2)\nend)\ncoroutine.resume(co)\ncoroutine.resume(co)`,
    "co-3": `local gen = coroutine.wrap(function()\n  coroutine.yield("a")\n  coroutine.yield("b")\n  coroutine.yield("c")\nend)\nprint(gen())\nprint(gen())\nprint(gen())`,
    // Bitwise
    "bw-1": `print(bit.band(12, 10))`,
    "bw-2": `print(bit.bor(5, 3))`,
    "bw-3": `local READ=1\nlocal WRITE=2\nlocal EXEC=4\nlocal flags = bit.bor(READ, WRITE)\nprint(bit.band(flags, WRITE) ~= 0)`,
    // Environment
    "env-1": `_G.myGlobal = 42\nlocal function readIt() print(_G.myGlobal) end\nreadIt()`,
    "env-2": `local count = 0\nfor k, v in pairs(_G) do\n  if type(v) == "function" then count = count + 1 end\nend\nprint(count)`,
    // String patterns
    "pat-1": `local str = "abc123def456"\nfor num in string.gmatch(str, "%d+") do\n  print(num)\nend`,
    "pat-2": `local str = "Hello World Lua"\nfor word in string.gmatch(str, "%a+") do\n  print(word)\nend`,
    "pat-3": `local username = "Player_123"\nprint(string.match(username, "^[%a%d_]+$") ~= nil)`,
    // Debug
    "dbg-1": `local function buggy(x)\n  return x / 0\nend\nlocal ok, err = pcall(buggy, 5)\nif not ok then\n  print("Division error caught: " .. err)\nend`,
    "dbg-2": `local function safeDivide(a, b)\n  assert(b ~= 0, "Cannot divide by zero")\n  return a / b\nend\nprint(safeDivide(10, 2))`,
  };

  if (solutions[id]) return solutions[id];

  // Fallback: combine starterCode + hint as best-effort
  const starter = (starterCode || "").split("\n").filter(l => !l.trim().startsWith("--") || l.trim() === "").join("\n").trim();
  if (hint) return (starter ? starter + "\n" : "") + hint;
  return starter || "-- Complete the task as described above";
}

function buildSummary(step) {
  return `${step.instruction} ${step.hint ? `The key is: ${step.hint}.` : ""} ${step.expectedOutput ? `Your code should output: "${step.expectedOutput}".` : ""}`.trim();
}

function explainLine(line, step) {
  // Match common Lua patterns and give plain-English explanations
  if (/^local\s+(\w+)\s*=/.test(line)) {
    const [, name] = line.match(/^local\s+(\w+)\s*=\s*(.+)/) || [];
    const val = line.split("=").slice(1).join("=").trim();
    return `This creates a new variable called "${name}" and stores the value ${val} inside it. Think of a variable like a labeled box — you put something in it and can look it up later by name. The word "local" means this box only exists in this part of the code, not everywhere.`;
  }
  if (/^(\w+)\s*=\s*/.test(line) && !/^(if|for|while|repeat|local|function|return|end|do|then|else)/.test(line)) {
    const name = line.split("=")[0].trim();
    return `This sets the variable "${name}" to a new value. Unlike "local", this updates a variable that was already created earlier in the code.`;
  }
  if (/^print\s*\(/.test(line)) {
    const inner = line.replace(/^print\s*\(/, "").replace(/\)\s*$/, "");
    return `This tells Lua to display ${inner} in the Output window. Whenever you want to see a value or message while your code runs, wrap it in print(). It's the most useful debugging tool you have!`;
  }
  if (/^for\s+\w+\s*=/.test(line)) {
    const match = line.match(/for\s+(\w+)\s*=\s*(.+?),\s*(.+?)(?:,\s*(.+?))?\s*do/);
    if (match) {
      const [, v, start, stop, step2] = match;
      return `This starts a "for loop" — a way to repeat code automatically. The variable "${v}" starts at ${start} and counts up to ${stop}${step2 ? ` by ${step2} each time` : ", going up by 1 each time"}. Everything between "do" and "end" runs once per count.`;
    }
    return `This starts a for loop that repeats code a set number of times, counting with a variable.`;
  }
  if (/^for\s+\w+,\s*\w+\s+in\s+(ipairs|pairs)/.test(line)) {
    const isPairs = line.includes("pairs(");
    return isPairs
      ? `This loops through a dictionary-style table (one with named keys like "name", "score"). Each loop gives you the key (the name) and the value stored at that key.`
      : `This loops through a list-style table (like an array). Each loop gives you the index number (position) and the actual value at that position.`;
  }
  if (/^while\s+/.test(line)) {
    return `This starts a "while loop" — it keeps repeating the code inside as long as its condition is true. Be careful: if the condition never becomes false, the loop runs forever!`;
  }
  if (/^repeat$/.test(line)) {
    return `This starts a "repeat...until" loop. It runs the code inside at least once, then checks the condition at the bottom. If the condition is true, it stops; otherwise it loops again.`;
  }
  if (/^until\s+/.test(line)) {
    return `This is the exit condition for a repeat loop. When this condition becomes true, the loop stops. It's checked after each run, so the loop always runs at least one time.`;
  }
  if (/^if\s+/.test(line)) {
    const cond = line.replace(/^if\s+/, "").replace(/\s+then$/, "");
    return `This is an "if statement" — it checks whether the condition "${cond}" is true. If it is, Lua runs the code below it. If not, it skips to "else" or "end". Think of it like a gate: only open if the condition is met.`;
  }
  if (/^elseif\s+/.test(line)) {
    return `This checks a second condition if the previous "if" was false. You can chain as many "elseif" blocks as you need to cover different cases.`;
  }
  if (/^else$/.test(line)) {
    return `This is the fallback — if none of the "if" or "elseif" conditions were true, the code in this "else" block runs instead. Think of it as "in all other cases, do this".`;
  }
  if (/^end$/.test(line)) {
    return `This marks the end of a block (like an if statement, loop, or function). In Lua, every "if", "for", "while", "repeat", and "function" needs a matching "end" to close it.`;
  }
  if (/^(local\s+)?function\s+/.test(line)) {
    const match = line.match(/function\s+(\w+)\s*\(([^)]*)\)/);
    if (match) {
      const [, name, params] = match;
      return `This creates a reusable function called "${name}"${params ? ` that takes ${params} as input` : " with no inputs"}. A function is like a recipe — you write it once, and you can "call" it (use it) as many times as you want without rewriting the code.`;
    }
    return `This defines a function — a reusable block of code you can call by name whenever you need it.`;
  }
  if (/^return\s+/.test(line)) {
    const val = line.replace(/^return\s+/, "");
    return `This sends back the value "${val}" to wherever the function was called from. When you call a function and want it to give you an answer back, "return" is how it hands that answer to you.`;
  }
  if (/^table\.insert/.test(line)) {
    return `This adds a new item to the end of a table (Lua's version of a list). Think of it like pushing a new item onto a stack.`;
  }
  if (/^table\.remove/.test(line)) {
    return `This removes an item from a table. Specify the index (position number) of the item to remove. All items after it shift down by one.`;
  }
  if (/^table\.sort/.test(line)) {
    return `This sorts the table in-place. By default it sorts numbers low-to-high or strings alphabetically. You can pass a custom function to change the sort order.`;
  }
  if (/^table\.concat/.test(line)) {
    return `This joins all items in a table together into one string. You can specify a separator (like a space or comma) to put between each item.`;
  }
  if (/setmetatable/.test(line)) {
    return `This attaches special behaviour to a table using a "metatable". It lets you define what happens when Lua does things like add two tables together, convert one to a string, or access a missing key.`;
  }
  if (/Instance\.new/.test(line)) {
    return `This creates a new Roblox object (called an "Instance"). You pass in the type as a string (like "Part" or "Folder") and Roblox creates that object in memory for you to configure.`;
  }
  if (/game:GetService/.test(line)) {
    return `This retrieves a Roblox "service" — a built-in system that handles things like players, lighting, data saving, etc. You always get services this way rather than accessing them directly, because it's safer and more reliable.`;
  }
  if (/:Connect\(/.test(line)) {
    return `This connects a function to an event. Whenever the event fires (like a player touching a part), your function runs automatically. It's Lua's way of saying "when X happens, do Y".`;
  }
  if (/\.Touched/.test(line)) {
    return `"Touched" is an event that fires whenever another object physically touches this part in the game world. You connect a function to it to react to collisions.`;
  }
  if (/pcall/.test(line)) {
    return `"pcall" stands for "protected call". It runs a function safely — if the function crashes with an error, pcall catches it and tells you what went wrong instead of crashing your whole script. It returns two values: true/false (did it succeed?) and the result or error message.`;
  }
  if (/coroutine\./.test(line)) {
    return `Coroutines let you run multiple "mini-threads" in one script. This line controls a coroutine — either creating it, starting it, or pausing it. Coroutines are great for tasks that need to wait or run in parallel.`;
  }
  if (/math\.\w+/.test(line)) {
    const fn = (line.match(/math\.(\w+)/) || [])[1];
    const mathDescs = {
      floor: "rounds a number DOWN to the nearest whole number",
      ceil: "rounds a number UP to the nearest whole number",
      random: "generates a random number — great for loot drops and dice rolls",
      randomseed: "sets the starting point for random number generation so results are predictable",
      max: "finds the largest value from a list of numbers",
      min: "finds the smallest value from a list of numbers",
      abs: "returns the absolute (positive) version of a number",
      sqrt: "calculates the square root of a number",
    };
    return fn && mathDescs[fn]
      ? `math.${fn} ${mathDescs[fn]}.`
      : `This calls a built-in math function from Lua's "math" library, which contains useful tools for number calculations.`;
  }
  if (/string\.\w+/.test(line)) {
    const fn = (line.match(/string\.(\w+)/) || [])[1];
    const strDescs = {
      upper: "converts all letters in a string to UPPERCASE",
      lower: "converts all letters to lowercase",
      rep: "repeats a string a given number of times",
      format: "creates a formatted string — like filling in blanks in a template",
      find: "searches for a pattern inside a string and tells you where it starts",
      sub: "extracts a slice of a string between two positions",
      gsub: "finds and replaces all occurrences of a pattern in a string",
      gmatch: "loops through all matches of a pattern inside a string",
      len: "returns the number of characters in a string (same as # operator)",
    };
    return fn && strDescs[fn]
      ? `string.${fn} ${strDescs[fn]}.`
      : `This calls a built-in string function from Lua's "string" library for text manipulation.`;
  }
  if (/^break$/.test(line)) {
    return `"break" immediately exits the current loop. The code jumps to whatever comes after the loop's "end". Use it when you've found what you're looking for and don't need to keep looping.`;
  }
  if (/\.\.\s*/.test(line) || /\s*\.\./.test(line)) {
    return `The ".." operator joins (concatenates) two strings together into one. For example, "Hello" .. " " .. "World" becomes "Hello World".`;
  }
  if (/#\w+/.test(line)) {
    return `The "#" operator returns the length of a string or table. For a string it counts characters; for a table it counts how many items are in it.`;
  }
  if (/tostring\(/.test(line)) {
    return `tostring() converts any value (like a number or boolean) into a string so you can print it or join it with other text using "..".`;
  }
  if (/tonumber\(/.test(line)) {
    return `tonumber() converts a string like "42" into an actual number 42 so you can do math with it. If the string isn't a valid number, it returns nil.`;
  }
  if (/type\(/.test(line)) {
    return `type() tells you what kind of value something is — "number", "string", "boolean", "table", "function", or "nil". Useful for checking inputs before using them.`;
  }

  // Generic fallback
  return `This line executes a Lua statement. Read it carefully — it's doing exactly what it says based on the lesson instruction. Try to match it with the hint: "${step.hint || "no hint provided"}".`;
}

function whyItWorks(line) {
  if (/^local\s+\w+\s*=/.test(line)) return "Using 'local' keeps your variable scoped to its block, preventing accidental name collisions and making your scripts faster and safer.";
  if (/^print\s*\(/.test(line)) return "print() is free — use it liberally while learning! Every time you're unsure what a value is, print it.";
  if (/^for\s+\w+\s*=/.test(line)) return "The numeric for loop is the most efficient way to iterate a fixed number of times. Lua automatically increments the counter variable for you each cycle.";
  if (/^for\s+\w+,\s*\w+\s+in\s+ipairs/.test(line)) return "ipairs stops at the first nil (gap), making it safe and predictable for sequential arrays. It's the right tool whenever your table is a list.";
  if (/^for\s+\w+,\s*\w+\s+in\s+pairs/.test(line)) return "pairs iterates every key including non-integer ones, so it's perfect for dictionaries. Order is not guaranteed — that's fine for most lookups.";
  if (/^while\s+/.test(line)) return "while is ideal when you don't know in advance how many iterations you'll need — it keeps going as long as the condition holds.";
  if (/^if\s+/.test(line)) return "Conditionals are the backbone of any program. This lets your code make decisions at runtime based on data rather than always following the same path.";
  if (/^(local\s+)?function\s+/.test(line)) return "Wrapping logic in a function means you write it once and reuse it everywhere. It also makes your code easier to read, test, and fix.";
  if (/^return\s+/.test(line)) return "Return passes the computed value back to the caller so they can use it in expressions, store it, or pass it on — functions without return can only have side effects.";
  if (/table\.insert/.test(line)) return "table.insert handles all the index bookkeeping for you. It appends to the end by default, or inserts at any position if you specify an index.";
  if (/table\.remove/.test(line)) return "table.remove shifts remaining elements so there are no gaps, keeping your array compact and ipairs-safe.";
  if (/table\.sort/.test(line)) return "Sorting in-place is memory efficient. The custom comparator gives you full control — sort by any field, any direction.";
  if (/setmetatable/.test(line)) return "Metatables are how Lua implements operator overloading and OOP without baking them into the language — very powerful and entirely optional.";
  if (/Instance\.new/.test(line)) return "Every object in a Roblox game is an Instance. Creating them from scripts instead of Studio lets you spawn dynamic content at runtime.";
  if (/game:GetService/.test(line)) return "GetService caches the service on first call and always returns the same object, so it's safe to call repeatedly without worrying about performance.";
  if (/:Connect\(/.test(line)) return "Connect returns a connection object you can :Disconnect() later to stop listening — always important for cleanup to avoid memory leaks.";
  if (/pcall/.test(line)) return "Without pcall, a single runtime error crashes the entire script. pcall creates a safety net, letting you handle failures gracefully.";
  if (/math\.random/.test(line)) return "math.random with two args returns an integer in [a, b], inclusive. Always set a seed with math.randomseed() if you need reproducible sequences.";
  if (/string\.format/.test(line)) return "string.format is far faster than repeated concatenation with .. and gives you precise control over number formatting, padding, and alignment.";
  if (/break/.test(line)) return "break avoids wasted iterations once you have what you need — a small but meaningful performance gain in large loops.";
  if (/\.\./.test(line)) return ".. is Lua's only string joining operator. For many concatenations in a loop, consider using table.concat instead — it's significantly faster.";
  if (/tostring\(/.test(line)) return "Lua doesn't auto-convert numbers to strings (unlike JavaScript), so tostring() is required any time you want to join a number into a string.";
  if (/tonumber\(/.test(line)) return "String arithmetic would silently give nil or error. tonumber() makes the conversion explicit and returns nil (not a crash) if the string isn't a valid number.";
  if (/coroutine/.test(line)) return "Coroutines give you cooperative multitasking — multiple tasks share one thread by voluntarily yielding control. No OS threads, no race conditions.";
  return null;
}

function detectConcept(line) {
  if (/^local\s+\w+\s*=/.test(line)) return "variables";
  if (/^print\s*\(/.test(line)) return "output";
  if (/^for\s+/.test(line)) return "loops";
  if (/^while\s+/.test(line)) return "loops";
  if (/^repeat/.test(line)) return "loops";
  if (/^if\s+/.test(line)) return "conditionals";
  if (/^(local\s+)?function\s+/.test(line)) return "functions";
  if (/^return\s+/.test(line)) return "return values";
  if (/^end$/.test(line)) return "block end";
  if (/^else/.test(line)) return "conditionals";
  if (/^break$/.test(line)) return "loop control";
  if (/table\./.test(line)) return "tables";
  if (/setmetatable/.test(line)) return "metatables";
  if (/Instance\.new/.test(line)) return "roblox instances";
  if (/GetService/.test(line)) return "roblox services";
  if (/:Connect\(/.test(line)) return "events";
  if (/pcall/.test(line)) return "error handling";
  if (/coroutine/.test(line)) return "coroutines";
  if (/math\./.test(line)) return "math library";
  if (/string\./.test(line)) return "string library";
  if (/\.\./.test(line)) return "concatenation";
  if (/#\w+/.test(line)) return "length operator";
  if (/tostring|tonumber|type\(/.test(line)) return "type conversion";
  return null;
}

export default function SolutionPanel({ step, visible, onUseCode }) {
  const [copied, setCopied] = useState(false);
  const [pasted, setPasted] = useState(false);
  const [expandedLine, setExpandedLine] = useState(null);
  const [showRaw, setShowRaw] = useState(false);

  if (!visible) return null;

  const { solutionCode, summary, lines } = buildSolution(step);

  function copyCode() {
    navigator.clipboard.writeText(solutionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function pasteIntoEditor() {
    if (onUseCode) {
      onUseCode(solutionCode);
      setPasted(true);
      setTimeout(() => setPasted(false), 2000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-3 overflow-hidden"
    >
      <div className="rounded-lg border border-secondary/20 bg-secondary/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-secondary/10 bg-secondary/10">
          <BookOpen className="w-3 h-3 text-secondary" />
          <span className="font-mono text-[10px] text-secondary uppercase tracking-wider">Solution & Explanation</span>
          <span className="ml-auto font-mono text-[9px] text-muted-foreground bg-muted/30 px-1.5 py-0.5 rounded">instant · no AI</span>
        </div>

        <div className="p-3 space-y-4">

          {/* Summary */}
          <div className="p-2.5 rounded-md bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-1.5 mb-1">
              <Lightbulb className="w-3 h-3 text-primary" />
              <span className="font-mono text-[10px] text-primary uppercase tracking-wider">What you need to do</span>
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed">{summary}</p>
          </div>

          {/* Expected output */}
          {step.expectedOutput && (
            <div>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">Expected Output</span>
              <pre className="text-xs text-accent font-mono bg-muted/30 rounded p-2 whitespace-pre-wrap">{step.expectedOutput}</pre>
            </div>
          )}

          {/* Required keywords */}
          {step.validation?.keywords?.length > 0 && (
            <div>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5">Your code must include</span>
              <div className="flex flex-wrap gap-1">
                {step.validation.keywords.map(kw => (
                  <span key={kw} className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">{kw}</span>
                ))}
              </div>
            </div>
          )}

          {/* Solution code */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Full Solution</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRaw(!showRaw)}
                  className="flex items-center gap-1 text-[10px] font-mono text-secondary/70 hover:text-secondary transition-colors"
                >
                  {showRaw ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {showRaw ? "Hide code" : "Show code"}
                </button>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <AnimatePresence>
              {showRaw && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <pre className="text-xs font-mono bg-[#05070A] border border-secondary/30 rounded p-3 text-foreground/85 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                    {solutionCode}
                  </pre>
                  {/* Paste into editor button — shown below the code block */}
                  <button
                    onClick={pasteIntoEditor}
                    className="mt-2 w-full flex items-center justify-center gap-2 py-2 rounded-md bg-secondary/20 hover:bg-secondary/40 border border-secondary/30 text-secondary text-xs font-mono transition-all"
                  >
                    {pasted ? <Check className="w-3.5 h-3.5 text-accent" /> : <Code2 className="w-3.5 h-3.5" />}
                    {pasted ? "✓ Pasted into editor!" : "→ Use this code in editor"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Line-by-line breakdown */}
          {lines.length > 0 && (
            <div>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block mb-2">Line-by-Line Breakdown</span>
              <div className="space-y-1.5">
                {lines.map((line, i) => (
                  <div key={i} className="rounded-md border border-border/20 overflow-hidden">
                    <button
                      onClick={() => setExpandedLine(expandedLine === i ? null : i)}
                      className="w-full flex items-center gap-2 px-3 py-2 bg-muted/20 hover:bg-muted/40 transition-colors text-left"
                    >
                      <Code2 className="w-3 h-3 text-primary/50 flex-shrink-0" />
                      <code className="font-mono text-[11px] text-primary/90 flex-1 truncate">{line.code}</code>
                      {line.concept && (
                        <span className="font-mono text-[9px] text-secondary/60 bg-secondary/10 px-1.5 py-0.5 rounded flex-shrink-0 hidden sm:block">
                          {line.concept}
                        </span>
                      )}
                      {expandedLine === i
                        ? <ChevronUp className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        : <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      }
                    </button>
                    <AnimatePresence>
                      {expandedLine === i && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 py-2.5 border-t border-border/20 space-y-2">
                            <p className="text-xs text-foreground/80 leading-relaxed">
                              {line.explanation}
                            </p>
                            {line.whyItWorks && (
                              <div className="flex gap-1.5 pt-1">
                                <span className="font-mono text-[9px] text-accent/70 uppercase tracking-wider flex-shrink-0 mt-0.5">Why →</span>
                                <p className="text-[11px] text-accent/70 leading-relaxed italic">{line.whyItWorks}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-1 border-t border-secondary/10">
            <p className="font-mono text-[10px] text-secondary/50">
              💡 Study the solution, then close this and try to write it from memory!
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}