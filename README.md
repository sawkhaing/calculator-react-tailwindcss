# ITCS525 Lecture 7: Calculator with React & Tailwind CSS

An iOS-inspired dark theme calculator built using **React** and **Tailwind CSS v4** as part of the ITCS525 Software Development curriculum.

## Features

- **iOS-Inspired UI**: Dark theme chassis (`bg-black`), rounded pill corners, sleek drop shadow, and clean responsive layout.
- **Color Coded Keypad**:
  - Top function buttons (`⌫`, `AC`, `%`, `÷`): Slate gray
  - Number keys and decimal (`0–9`, `.`, `±`): Dark neutral gray
  - Operations (`×`, `-`, `+`, `=`): Vibrant orange
- **Utility-First Styling**: Styled entirely with modern **Tailwind CSS v4** (`@tailwindcss/vite`).
- **Interactive Logic**:
  - Basic arithmetic operations (`+`, `-`, `×`, `÷`)
  - Percentage calculations (`%`)
  - Positive/negative sign toggle (`±`)
  - Single-digit backspace (`⌫`) and clear all (`AC`)
  - Error handling for invalid syntax

## Tech Stack

- **React 19**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```
