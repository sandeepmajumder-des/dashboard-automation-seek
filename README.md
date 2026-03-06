# Seek - Task Automation Dashboard

A modern task automation dashboard system for creating, configuring, and deploying automated tasks.

## Features

- **Task Creation**: Create automated tasks with a visual interface
- **URL Capture**: Preview target applications in an embedded browser frame
- **Step Builder**: Define task steps with drag-and-drop functionality
- **Trigger Configuration**: Set up URL-based, element-based, event-based, or manual triggers
- **Guardrails**: Configure safety measures for reliable task execution
- **Preview & Deploy**: Review and deploy tasks with a deployment checklist

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Sidebar/          # Navigation sidebar
│   └── TaskCreator/      # Task creation wizard
│       └── tabs/         # Individual tab components
├── context/              # React context for state management
├── pages/                # Page components
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Lucide Icons
