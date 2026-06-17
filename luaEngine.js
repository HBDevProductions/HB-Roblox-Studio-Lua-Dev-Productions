// Minimal Lua interpreter for common learning patterns
// Handles: print, variables, if/else, for/while loops, functions, tables, string concat

function executeLua(code) {
  const output = [];
  const errors = [];
  const warnings = [];
  
  try {
    // Basic syntax checks
    const syntaxErrors = checkSyntax(code);
    if (syntaxErrors.length > 0) {
      return { output: [], errors: syntaxErrors, warnings: [], success: false };
    }
    
    // Execute with our mini interpreter
    const result = interpret(code, output, errors, warnings);
    
    return {
      output,
      errors,
      warnings,
      success: errors.length === 0
    };
  } catch (e) {
    errors.push({ line: 0, message: e.message, type: "runtime" });
    return { output, errors, warnings, success: false };
  }
}

function checkSyntax(code) {
  const errors = [];
  const lines = code.split("\n");
  
  let openBlocks = 0;
  const blockOpeners = /\b(function|if|for|while|repeat|do)\b/;
  const blockClosers = /\bend\b/;
  const repeatCloser = /\buntil\b/;
  
  let inMultiLineComment = false;
  
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    
    // Handle multi-line comments
    if (trimmed.includes("--[[")) inMultiLineComment = true;
    if (trimmed.includes("]]")) { inMultiLineComment = false; return; }
    if (inMultiLineComment) return;
    
    // Skip single-line comments
    const codePart = trimmed.split("--")[0].trim();
    if (!codePart) return;
    
    // Count block depth
    const opens = (codePart.match(blockOpeners) || []).length;
    const closes = (codePart.match(blockClosers) || []).length;
    const repeatCloses = (codePart.match(repeatCloser) || []).length;
    
    // Handle "then" on same line as "if" — don't double count
    if (codePart.match(/\bif\b/) && codePart.match(/\bthen\b/) && codePart.match(/\bend\b/)) {
      // Single line if-then-end, balanced
    } else {
      openBlocks += opens - closes - repeatCloses;
    }
    
    // Check for common mistakes
    if (codePart.match(/\bif\b/) && !codePart.match(/\bthen\b/) && !codePart.match(/\belseif\b.*then/)) {
      // Check if then appears on next line
      const nextLine = lines[i + 1]?.trim().split("--")[0].trim();
      if (nextLine !== "then" && !codePart.includes("then")) {
        errors.push({ line: i + 1, message: "'if' statement missing 'then'", type: "syntax" });
      }
    }
    
    // Detect = vs == in conditions
    if (codePart.match(/\bif\b.*[^=!<>]=[^=].*\bthen\b/)) {
      errors.push({ line: i + 1, message: "Use '==' for comparison, not '=' (assignment)", type: "warning" });
    }
    
    // Check for unclosed strings
    const singleQuotes = (codePart.match(/'/g) || []).length;
    const doubleQuotes = (codePart.match(/"/g) || []).length;
    if (singleQuotes % 2 !== 0) {
      errors.push({ line: i + 1, message: "Unclosed string (missing closing quote ')", type: "syntax" });
    }
    if (doubleQuotes % 2 !== 0) {
      errors.push({ line: i + 1, message: "Unclosed string (missing closing quote \")", type: "syntax" });
    }
  });
  
  if (openBlocks > 0) {
    errors.push({ line: lines.length, message: `Missing ${openBlocks} 'end' statement(s)`, type: "syntax" });
  } else if (openBlocks < 0) {
    errors.push({ line: lines.length, message: `Extra 'end' statement(s) found`, type: "syntax" });
  }
  
  return errors;
}

function interpret(code, output, errors, warnings) {
  const env = {
    _variables: {},
    _functions: {}
  };
  
  // Strip comments and normalize
  const lines = code.split("\n").map(l => {
    const commentIdx = l.indexOf("--");
    if (commentIdx === -1) return l;
    // Check if -- is inside a string
    const before = l.substring(0, commentIdx);
    const singleQ = (before.match(/'/g) || []).length;
    const doubleQ = (before.match(/"/g) || []).length;
    if (singleQ % 2 !== 0 || doubleQ % 2 !== 0) return l;
    return l.substring(0, commentIdx);
  });
  
  const fullCode = lines.join("\n");
  
  // Process the code block by block
  executeBlock(fullCode, env, output, errors, 0);
}

function executeBlock(code, env, output, errors, depth) {
  if (depth > 50) {
    errors.push({ line: 0, message: "Maximum execution depth exceeded (possible infinite loop)", type: "runtime" });
    return;
  }
  
  const lines = code.split("\n");
  let i = 0;
  let iterations = 0;
  const MAX_ITERATIONS = 10000;
  
  while (i < lines.length) {
    iterations++;
    if (iterations > MAX_ITERATIONS) {
      errors.push({ line: 0, message: "Execution limit reached — possible infinite loop", type: "runtime" });
      return;
    }
    
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    
    // Handle function definition
    const funcMatch = line.match(/^(?:local\s+)?function\s+(\w+)\s*\((.*?)\)/);
    if (funcMatch) {
      const [_, name, params] = funcMatch;
      const body = extractBlock(lines, i);
      env._functions[name] = { params: params.split(",").map(p => p.trim()).filter(Boolean), body: body.code };
      i = body.endLine + 1;
      continue;
    }
    
    // Handle for loop
    const forMatch = line.match(/^for\s+(\w+)\s*=\s*(.+?)\s*,\s*(.+?)(?:\s*,\s*(.+?))?\s+do$/);
    if (forMatch) {
      const [_, varName, startExpr, endExpr, stepExpr] = forMatch;
      const start = evaluateExpr(startExpr, env);
      const end = evaluateExpr(endExpr, env);
      const step = stepExpr ? evaluateExpr(stepExpr, env) : 1;
      const body = extractBlock(lines, i);
      
      for (let v = start; step > 0 ? v <= end : v >= end; v += step) {
        iterations++;
        if (iterations > MAX_ITERATIONS) {
          errors.push({ line: 0, message: "Loop iteration limit reached", type: "runtime" });
          return;
        }
        const loopEnv = { ...env, _variables: { ...env._variables, [varName]: v }, _functions: { ...env._functions } };
        executeBlock(body.code, loopEnv, output, errors, depth + 1);
        if (errors.length > 0) return;
      }
      i = body.endLine + 1;
      continue;
    }
    
    // Handle for-in ipairs/pairs
    const forInMatch = line.match(/^for\s+(\w+)\s*,\s*(\w+)\s+in\s+(ipairs|pairs)\s*\((\w+)\)\s+do$/);
    if (forInMatch) {
      const [_, indexVar, valueVar, iterType, tableName] = forInMatch;
      const table = env._variables[tableName];
      const body = extractBlock(lines, i);
      
      if (table && typeof table === "object") {
        if (Array.isArray(table)) {
          table.forEach((val, idx) => {
            const loopEnv = { ...env, _variables: { ...env._variables, [indexVar]: idx + 1, [valueVar]: val }, _functions: { ...env._functions } };
            executeBlock(body.code, loopEnv, output, errors, depth + 1);
          });
        } else {
          Object.entries(table).forEach(([key, val]) => {
            const loopEnv = { ...env, _variables: { ...env._variables, [indexVar]: key, [valueVar]: val }, _functions: { ...env._functions } };
            executeBlock(body.code, loopEnv, output, errors, depth + 1);
          });
        }
      }
      i = body.endLine + 1;
      continue;
    }
    
    // Handle while loop
    const whileMatch = line.match(/^while\s+(.+)\s+do$/);
    if (whileMatch) {
      const condition = whileMatch[1];
      const body = extractBlock(lines, i);
      let loopCount = 0;
      
      while (evaluateCondition(condition, env)) {
        loopCount++;
        if (loopCount > 1000) {
          errors.push({ line: i + 1, message: "While loop exceeded 1000 iterations", type: "runtime" });
          return;
        }
        executeBlock(body.code, env, output, errors, depth + 1);
        if (errors.length > 0) return;
      }
      i = body.endLine + 1;
      continue;
    }
    
    // Handle if statement
    const ifMatch = line.match(/^if\s+(.+)\s+then$/);
    if (ifMatch) {
      const result = executeIfBlock(lines, i, env, output, errors, depth);
      i = result.endLine + 1;
      continue;
    }
    
    // Handle local variable
    const localMatch = line.match(/^local\s+(\w+)\s*=\s*(.+)$/);
    if (localMatch) {
      const [_, name, expr] = localMatch;
      env._variables[name] = evaluateExpr(expr.trim(), env);
      i++;
      continue;
    }
    
    // Handle variable assignment
    const assignMatch = line.match(/^(\w+)\s*=\s*(.+)$/);
    if (assignMatch) {
      const [_, name, expr] = assignMatch;
      env._variables[name] = evaluateExpr(expr.trim(), env);
      i++;
      continue;
    }
    
    // Handle table property assignment
    const propMatch = line.match(/^(\w+)\.(\w+)\s*=\s*(.+)$/);
    if (propMatch) {
      // Simulate — just skip (Roblox API call)
      i++;
      continue;
    }
    
    // Handle print
    const printMatch = line.match(/^print\s*\((.+)\)$/);
    if (printMatch) {
      const val = evaluateExpr(printMatch[1].trim(), env);
      output.push(String(val));
      i++;
      continue;
    }
    
    // Handle function call
    const callMatch = line.match(/^(\w+)\s*\((.*)\)$/);
    if (callMatch) {
      const [_, name, argsStr] = callMatch;
      callFunction(name, argsStr, env, output, errors, depth);
      i++;
      continue;
    }
    
    // Handle method-style calls (ignore for simulation)
    if (line.includes(":Connect") || line.includes(":GetService") || line.includes("Instance.new")) {
      i++;
      continue;
    }
    
    i++;
  }
}

function extractBlock(lines, startLine) {
  let depth = 1;
  let i = startLine + 1;
  const bodyLines = [];
  
  while (i < lines.length && depth > 0) {
    const trimmed = lines[i].trim();
    if (trimmed.match(/\b(function|if|for|while|do)\b/) && !trimmed.match(/\bend\b/)) {
      depth++;
    }
    if (trimmed === "end") {
      depth--;
      if (depth === 0) break;
    }
    if (trimmed.match(/^end$/)) {
      depth--;
      if (depth === 0) break;
    }
    bodyLines.push(lines[i]);
    i++;
  }
  
  return { code: bodyLines.join("\n"), endLine: i };
}

function executeIfBlock(lines, startLine, env, output, errors, depth) {
  const firstLine = lines[startLine].trim();
  const condition = firstLine.match(/^if\s+(.+)\s+then$/)[1];
  
  let i = startLine + 1;
  let currentBlockLines = [];
  let branches = [{ condition, lines: [] }];
  let elseLines = null;
  let blockDepth = 1;
  
  while (i < lines.length) {
    const trimmed = lines[i].trim();
    
    if (trimmed.match(/\b(function|if|for|while)\b.*\b(then|do)\s*$/) && !trimmed.match(/\bend\b/)) {
      blockDepth++;
      branches[branches.length - 1].lines.push(lines[i]);
      i++;
      continue;
    }
    
    if (blockDepth === 1 && trimmed.match(/^elseif\s+(.+)\s+then$/)) {
      const cond = trimmed.match(/^elseif\s+(.+)\s+then$/)[1];
      branches.push({ condition: cond, lines: [] });
      i++;
      continue;
    }
    
    if (blockDepth === 1 && trimmed === "else") {
      elseLines = [];
      i++;
      continue;
    }
    
    if (trimmed === "end") {
      blockDepth--;
      if (blockDepth === 0) break;
    }
    
    if (elseLines !== null) {
      elseLines.push(lines[i]);
    } else {
      branches[branches.length - 1].lines.push(lines[i]);
    }
    i++;
  }
  
  // Evaluate branches
  let executed = false;
  for (const branch of branches) {
    if (evaluateCondition(branch.condition, env)) {
      executeBlock(branch.lines.join("\n"), env, output, errors, depth + 1);
      executed = true;
      break;
    }
  }
  
  if (!executed && elseLines) {
    executeBlock(elseLines.join("\n"), env, output, errors, depth + 1);
  }
  
  return { endLine: i };
}

function evaluateCondition(condition, env) {
  condition = condition.trim();
  
  // Handle and/or
  if (condition.includes(" and ")) {
    const parts = condition.split(" and ");
    return parts.every(p => evaluateCondition(p.trim(), env));
  }
  if (condition.includes(" or ")) {
    const parts = condition.split(" or ");
    return parts.some(p => evaluateCondition(p.trim(), env));
  }
  
  // Handle not
  if (condition.startsWith("not ")) {
    return !evaluateCondition(condition.substring(4), env);
  }
  
  // Comparison operators
  const ops = [">=", "<=", "~=", "==", ">", "<"];
  for (const op of ops) {
    const idx = condition.indexOf(op);
    if (idx !== -1) {
      const left = evaluateExpr(condition.substring(0, idx).trim(), env);
      const right = evaluateExpr(condition.substring(idx + op.length).trim(), env);
      switch (op) {
        case ">=": return left >= right;
        case "<=": return left <= right;
        case "~=": return left !== right;
        case "==": return left === right;
        case ">": return left > right;
        case "<": return left < right;
      }
    }
  }
  
  // Boolean evaluation
  const val = evaluateExpr(condition, env);
  return val !== false && val !== null && val !== undefined;
}

function evaluateExpr(expr, env) {
  expr = expr.trim();
  
  // String literal
  if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
    return expr.slice(1, -1);
  }
  
  // Number
  if (!isNaN(expr) && expr !== "") {
    return Number(expr);
  }
  
  // Boolean
  if (expr === "true") return true;
  if (expr === "false") return false;
  if (expr === "nil") return null;
  
  // Table constructor (array)
  if (expr.startsWith("{") && expr.endsWith("}")) {
    const inner = expr.slice(1, -1).trim();
    if (!inner) return [];
    
    // Check if it's key-value pairs
    if (inner.includes("=") && !inner.match(/[=!<>]=/) ) {
      const obj = {};
      const pairs = splitTopLevel(inner, ",");
      pairs.forEach(pair => {
        const eqIdx = pair.indexOf("=");
        if (eqIdx !== -1) {
          const key = pair.substring(0, eqIdx).trim();
          const val = pair.substring(eqIdx + 1).trim();
          obj[key] = evaluateExpr(val, env);
        }
      });
      return obj;
    }
    
    // Array
    const items = splitTopLevel(inner, ",");
    return items.map(item => evaluateExpr(item.trim(), env));
  }
  
  // String concatenation with ..
  if (expr.includes("..")) {
    const parts = expr.split("..").map(p => evaluateExpr(p.trim(), env));
    return parts.join("");
  }
  
  // Arithmetic
  if (expr.includes("+") || expr.includes("-") || expr.includes("*") || expr.includes("/") || expr.includes("%")) {
    return evaluateArithmetic(expr, env);
  }
  
  // Table access: table[index] or table.key
  const bracketMatch = expr.match(/^(\w+)\[(.+)\]$/);
  if (bracketMatch) {
    const table = env._variables[bracketMatch[1]];
    const key = evaluateExpr(bracketMatch[2], env);
    if (table && typeof table === "object") {
      if (Array.isArray(table)) return table[key - 1]; // Lua is 1-indexed
      return table[key];
    }
    return null;
  }
  
  const dotMatch = expr.match(/^(\w+)\.(\w+)$/);
  if (dotMatch) {
    const table = env._variables[dotMatch[1]];
    if (table && typeof table === "object") {
      return table[dotMatch[2]];
    }
    return null;
  }
  
  // # length operator
  if (expr.startsWith("#")) {
    const tbl = env._variables[expr.substring(1)];
    if (Array.isArray(tbl)) return tbl.length;
    if (typeof tbl === "string") return tbl.length;
    return 0;
  }
  
  // Function call in expression
  const callMatch = expr.match(/^(\w+)\s*\((.*)\)$/);
  if (callMatch) {
    const [_, name, argsStr] = callMatch;
    const funcOutput = [];
    const funcErrors = [];
    const result = callFunction(name, argsStr, env, funcOutput, funcErrors, 0);
    if (funcOutput.length > 0 && result === undefined) return funcOutput[0];
    return result;
  }
  
  // Variable lookup
  if (env._variables.hasOwnProperty(expr)) {
    return env._variables[expr];
  }
  
  // Roblox API simulation strings
  if (expr.includes("Instance.new") || expr.includes("Vector3.new") || expr.includes("BrickColor.new") || expr.includes("GetService")) {
    return `[Roblox: ${expr}]`;
  }
  
  return expr;
}

function evaluateArithmetic(expr, env) {
  // Simple arithmetic: handle +, -, *, /, %
  // Split by lowest precedence first
  const ops = [["+", "-"], ["*", "/", "%"]];
  
  for (const opGroup of ops) {
    for (let i = expr.length - 1; i >= 0; i--) {
      if (opGroup.includes(expr[i])) {
        // Make sure it's not inside parens
        let parenDepth = 0;
        for (let j = 0; j < i; j++) {
          if (expr[j] === "(") parenDepth++;
          if (expr[j] === ")") parenDepth--;
        }
        if (parenDepth !== 0) continue;
        
        // Avoid treating negative numbers as subtraction
        if (expr[i] === "-" && i === 0) continue;
        
        const left = evaluateExpr(expr.substring(0, i).trim(), env);
        const right = evaluateExpr(expr.substring(i + 1).trim(), env);
        const l = Number(left);
        const r = Number(right);
        
        if (isNaN(l) || isNaN(r)) return `${left}${expr[i]}${right}`;
        
        switch (expr[i]) {
          case "+": return l + r;
          case "-": return l - r;
          case "*": return l * r;
          case "/": return r === 0 ? Infinity : l / r;
          case "%": return l % r;
        }
      }
    }
  }
  
  // Parentheses
  if (expr.startsWith("(") && expr.endsWith(")")) {
    return evaluateExpr(expr.slice(1, -1), env);
  }
  
  return evaluateExpr(expr, env);
}

function callFunction(name, argsStr, env, output, errors, depth) {
  if (name === "print") {
    const val = evaluateExpr(argsStr, env);
    output.push(String(val));
    return;
  }
  
  if (name === "tostring") return String(evaluateExpr(argsStr, env));
  if (name === "tonumber") return Number(evaluateExpr(argsStr, env));
  if (name === "type") {
    const val = evaluateExpr(argsStr, env);
    if (typeof val === "number") return "number";
    if (typeof val === "string") return "string";
    if (typeof val === "boolean") return "boolean";
    if (val === null) return "nil";
    if (typeof val === "object") return "table";
    return "string";
  }
  
  if (env._functions[name]) {
    const func = env._functions[name];
    const args = argsStr ? splitTopLevel(argsStr, ",").map(a => evaluateExpr(a.trim(), env)) : [];
    const localEnv = { 
      _variables: { ...env._variables }, 
      _functions: { ...env._functions } 
    };
    func.params.forEach((p, idx) => {
      localEnv._variables[p] = args[idx] !== undefined ? args[idx] : null;
    });
    
    // Check for return statement
    const bodyLines = func.body.split("\n");
    const funcOutput = [];
    
    for (let i = 0; i < bodyLines.length; i++) {
      const trimmed = bodyLines[i].trim();
      const returnMatch = trimmed.match(/^return\s+(.+)$/);
      if (returnMatch) {
        // Execute everything before return
        if (i > 0) {
          executeBlock(bodyLines.slice(0, i).join("\n"), localEnv, output, errors, depth + 1);
        }
        return evaluateExpr(returnMatch[1], localEnv);
      }
    }
    
    executeBlock(func.body, localEnv, output, errors, depth + 1);
    return undefined;
  }
  
  return undefined;
}

function splitTopLevel(str, delimiter) {
  const result = [];
  let current = "";
  let depth = 0;
  let inString = false;
  let stringChar = "";
  
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    
    if (inString) {
      current += c;
      if (c === stringChar) inString = false;
      continue;
    }
    
    if (c === '"' || c === "'") {
      inString = true;
      stringChar = c;
      current += c;
      continue;
    }
    
    if (c === "(" || c === "{" || c === "[") depth++;
    if (c === ")" || c === "}" || c === "]") depth--;
    
    if (c === delimiter && depth === 0) {
      result.push(current);
      current = "";
    } else {
      current += c;
    }
  }
  if (current.trim()) result.push(current);
  
  return result;
}

function validateCode(code, validation) {
  if (!validation) return { passed: true, message: "Code looks good!" };
  
  const result = executeLua(code);
  
  switch (validation.type) {
    case "output": {
      const actualOutput = result.output.join("\n").trim();
      const expected = validation.expected.trim();
      if (actualOutput === expected) {
        return { passed: true, message: "Output matches — excellent work!" };
      }
      return { 
        passed: false, 
        message: `Expected output: "${expected}"\nYour output: "${actualOutput || '(nothing)'}"` 
      };
    }
    case "contains_function": {
      if (code.includes(validation.func)) {
        if (result.errors.length === 0) {
          return { passed: true, message: "Function used correctly!" };
        }
        return { passed: false, message: result.errors[0].message };
      }
      return { passed: false, message: `Use the ${validation.func}() function in your code` };
    }
    case "contains_keyword": {
      if (code.includes(validation.keyword)) {
        if (result.errors.length === 0) {
          return { passed: true, message: "Great use of the concept!" };
        }
        return { passed: false, message: result.errors[0].message };
      }
      return { passed: false, message: `Your code should include: ${validation.keyword}` };
    }
    case "contains_all": {
      const missing = validation.keywords.filter(k => !code.includes(k));
      if (missing.length === 0) {
        if (result.errors.length === 0) {
          return { passed: true, message: "All required elements present — well done!" };
        }
        return { passed: false, message: result.errors[0].message };
      }
      return { passed: false, message: `Missing: ${missing.join(", ")}` };
    }
    default:
      return { passed: true, message: "Code accepted!" };
  }
}

export { executeLua, validateCode, checkSyntax };