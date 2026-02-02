#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ITERATIONS_DIR = path.join(process.cwd(), 'iterations');
const PROMPT_FILE = 'prompt.md';

function getIterationFiles() {
  if (!fs.existsSync(ITERATIONS_DIR)) {
    return [];
  }
  return fs.readdirSync(ITERATIONS_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const filePath = path.join(ITERATIONS_DIR, file);
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return { file, filePath, content };
      } catch (e) {
        console.error(`Error parsing ${file}: ${e.message}`);
        return null;
      }
    })
    .filter(item => item !== null)
    .sort((a, b) => (a.content.iteration || 0) - (b.content.iteration || 0));
}

function validate() {
  const items = getIterationFiles();
  if (items.length === 0) {
    console.log('No iteration files found to validate.');
    return;
  }

  let allValid = true;
  items.forEach(({ file, content }) => {
    const requiredFields = ['iteration', 'goal', 'completed', 'approved_by_user', 'tasks', 'successCriteria'];
    const missing = requiredFields.filter(field => content[field] === undefined);
    
    if (missing.length > 0) {
      console.error(`Validation failed for ${file}: Missing fields: ${missing.join(', ')}`);
      allValid = false;
    }

    if (content.tasks && !Array.isArray(content.tasks)) {
      console.error(`Validation failed for ${file}: 'tasks' must be an array`);
      allValid = false;
    } else if (content.tasks) {
      content.tasks.forEach((task, index) => {
        const taskFields = ['id', 'category', 'description', 'steps', 'done'];
        const missingTaskFields = taskFields.filter(field => task[field] === undefined);
        if (missingTaskFields.length > 0) {
          console.error(`Validation failed for ${file}, task at index ${index}: Missing fields: ${missingTaskFields.join(', ')}`);
          allValid = false;
        }
      });
    }

    if (content.successCriteria && !Array.isArray(content.successCriteria)) {
      console.error(`Validation failed for ${file}: 'successCriteria' must be an array`);
      allValid = false;
    }
  });

  if (allValid) {
    console.log('All iteration files are valid.');
  } else {
    process.exit(1);
  }
}

function runDefault() {
  const items = getIterationFiles();
  
  if (items.length === 0) {
    console.log('No iterations folder or files found.');
    return;
  }

  // If some iteration has "completed": true, "approved_by_user": false, then skip and do nothing
  const pendingReview = items.find(item => item.content.completed === true && item.content.approved_by_user === false);
  if (pendingReview) {
    console.log(`Iteration ${pendingReview.content.iteration} is completed but not yet approved. Skipping.`);
    return;
  }

  // otherwise find iteration with smallest id that has "completed": false, "approved_by_user": false
  const nextIteration = items.find(item => item.content.completed === false && item.content.approved_by_user === false);
  
  if (nextIteration) {
    const iterationId = nextIteration.content.iteration;
    const command = `gemini " @${PROMPT_FILE} iteration${iterationId}"`;
    console.log(`Running: ${command}`);
    try {
      execSync(command, { stdio: 'inherit' });
    } catch (e) {
      console.error(`Error running gemini: ${e.message}`);
      process.exit(1);
    }
  } else {
    console.log('No pending iterations found.');
  }
}

const args = process.argv.slice(2);
if (args.includes('--validate')) {
  validate();
} else {
  runDefault();
}
