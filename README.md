# Automata Frontend Exercise

## Rock, Paper, Scissors, Lizard, Spock

## Overview

This is a modern take on the classic "Rock, Paper, Scissors" game, with two additional choices: **Lizard** and **Spock**.
The extended rules create more possible outcomes, adding depth and strategy to the game.

## Purpose

The purpose of this exercise is to provide you the opportunity to demonstrate how you solve problems and express code. We know that
in person code exercises are highly pressured and artificial, hence why we asked you to perform this exercise at home. The expectation
is that you will use the tools you are comfortable with (stackoverflow, ChatGPT, etc), but you are able to explain and extend the code
(as if this was your job). We don't expect you to be able to remember every method of every class, but we would like to have a
conversation regarding your code.

## Basic Rules

The game is played between two players. Each player chooses one of the five options:

- **Rock**
- **Paper**
- **Scissors**
- **Lizard**
- **Spock**

The winner is determined by the following rules:

| **Choice**   | **Wins Against** | **Reason**                       |
| ------------ | ---------------- | -------------------------------- |
| **Scissors** | Paper, Lizard    | Cuts Paper, Decapitates Lizard   |
| **Paper**    | Rock, Spock      | Covers Rock, Disproves Spock     |
| **Rock**     | Scissors, Lizard | Crushes Scissors, Crushes Lizard |
| **Lizard**   | Paper, Spock     | Eats Paper, Poisons Spock        |
| **Spock**    | Scissors, Rock   | Smashes Scissors, Vaporizes Rock |

If both players choose the same option, the game results in a **tie**.

## Features

- **Interactive Gameplay**: Players can select their choice, and the winner is determined based on the rules.
- **Responsive Design**: The game works seamlessly on desktop and mobile devices.
- **Clear Visual Feedback**: Winning and losing outcomes are displayed in an engaging and intuitive way.
- **Scoreboard**: Tracks the points of the user and the computer across multiple rounds.
- **Data Persistence**: Retains the game state and scoreboard within the same browser session.
- **Custom Username**: Allows the user to set a username, which is displayed during the game and on the scoreboard.
- **Restart**: Allows the user to restart the game, clearing the scoreboard and resetting the game state.

## Suggestions

When working on this project, we encourage you to treat the code as if it is intended for a real production environment. Here are some tips to guide you:

- **Code Quality**: Write clean, readable, and maintainable code.
- **Scalability**: Structure your code to allow for easy feature additions or modifications in the future.
- **Version Control**: Use meaningful commit messages that explain the purpose of each change.

---

## Getting Started

### Installation

```bash
pnpm install
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```
