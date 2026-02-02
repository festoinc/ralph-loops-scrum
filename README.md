# Ralf Wiggum Scrum 🏎️💨

> **"Iteration beats perfection, but guided iteration beats everything."**

While the classic Ralph loop is a "waterfall" approach where you feed the AI a backlog and wait for completion, **Ralf Wiggum Scrum** introduces an **iteration-based review cycle** that brings stability, feedback, and course correction to autonomous development.

## 🧠 The Philosophy

### Classic Ralf (Waterfall)
You give the AI a PRD and a checklist. It runs in a continuous loop until the checklist is done.
*   **Risk:** If the AI makes a mistake in iteration 2, it will spend iterations 3 through 10 building on top of that mistake.
*   **Outcome:** You might end up with a project that is "finished" but fundamentally flawed.

### Ralf Wiggum Scrum (Agile)
You break the project into small, testable iterations. The AI pauses after every iteration for a human review.
*   **Benefit:** You catch mistakes immediately. If iteration 2 is wrong, you fix it before iteration 3 starts.
*   **Outcome:** A significantly more stable codebase and a project that actually matches your vision.

## 🛠️ Included Tools

This repository contains the core logic to enable this workflow in any AI CLI (Claude Code, Gemini, Qwen, etc.):

*   **`.claude/create_prd.md`**: The initialization engine. Run this first to define your project and iteration plan.
*   **`PROMPT.md`**: The system prompt template for your autonomous agent.
*   **Interactive Review**: Logic for the `/review-iteration` command (generated during setup).

## 🚀 Getting Started

1.  **Initialize your project:**
    Call the `create_prd` skill to start the discovery phase:
    ```bash
    # Example (in Claude Code)
    /create_prd
    ```
    
2.  **Plan your iterations:**
    The agent will generate:
    *   `prd.md`: High-level requirements.
    *   `iterations/`: JSON-based task lists for each milestone.
    *   `activity.md`: The single source of truth for progress.

3.  **Run the loop:**
    Run your autonomous agent (e.g., `ralph.sh` or a shell loop) pointing to `PROMPT.md`.

4.  **Review and Pivot:**
    After each iteration, the agent will **STOP**. Run `/review-iteration` to give feedback and adjust future plans before continuing.

## 📈 Why Scrum?

*   **Stability:** Early detection of "hallucination debt."
*   **Flexibility:** Change your mind about a feature after seeing it in action.
*   **Transparency:** Always know exactly what was built and how to test it via `activity.md`.
*   **Universal:** Simple `.md` and `.json` files that fit any workflow.


