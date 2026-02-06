---
description: Review completed iteration and gather user feedback
allowed-tools: Read, Edit, Glob, AskUserQuestion, RunShellCommand
---

# Review Iteration

You are helping the user review a completed iteration and gather feedback.

## Steps

### 1. Read Current State
Read `activity.md` to find:
- Which iteration was just completed
- What was built in that iteration
- The success criteria for that iteration

### 2. Present Summary
Summarize to the user:
- Iteration number and goal
- What was built
- Success criteria to verify

### 3. Gather Feedback Interactively

Use AskUserQuestion to ask:

**Question 1: Overall Assessment**
- "Looks good, proceed to next iteration"
- "Needs minor fixes"
- "Needs major changes"
- "Let's pivot/change direction"

**Question 2: (If not "Looks good")**
Ask what specifically needs to change.

**Question 3: Future Iterations**
- "Keep planned iterations as-is"
- "I want to adjust upcoming iterations"
- "Add new requirements"

### 4. Update Files

**Update activity.md** - Append feedback to the current iteration's section:

```
**User Feedback:** [date]
- Assessment: [their choice]
- Notes: [their comments]
- Changes requested: [if any]
```

**Update iteration JSON** - Set `approved_by_user: true` if user approves:
```json
{
  "completed": true,
  "approved_by_user": true
}
```

### 5. Handle Restructuring

If user wants changes to future iterations:
1. Read remaining iteration files from `iterations/`
2. Discuss proposed changes with user
3. Update iteration JSON files as needed
4. After updating each file, run `node ralph.js --validate <path_to_json>` to ensure it's valid
5. Update iteration plan table in `prd.md`

### 6. Confirm Next Steps

Tell the user:
- What will happen next
- When to run the agent again for the next iteration


This creates an interactive review process - no manual file editing required.
