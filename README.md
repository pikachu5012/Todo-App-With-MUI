# Todo Application with MUI

A fully functional Todo application built with React and Material-UI (MUI) components.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Dark and Light theme toggle
- ✅ MUI Grid system for responsive layout
- ✅ Context API for state management (replacing useState)
- ✅ MUI Checkbox for task completion
- ✅ Notification badge showing pending tasks count
- ✅ Form validation for all operations
- ✅ No HTML tags or custom CSS - uses only MUI components and sx prop
- ✅ Date/Time picker for due dates
- ✅ Expandable task items with edit functionality

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

## Technologies Used

- React 18
- Material-UI (MUI) v5
- MUI X Date Pickers
- Day.js for date handling
- Context API for state management

## Project Structure

```
src/
├── contexts/
│   ├── ThemeContext.js    # Theme management (dark/light)
│   └── TodoContext.js     # Todo state management
├── components/
│   ├── TodoForm.js        # Form for adding new todos
│   ├── TodoItem.js        # Individual todo item component
│   └── TodoList.js        # List of todos (pending/completed)
└── App.js                 # Main application component
```

## Validation

All CRUD operations include validation:
- **Create**: Title is required
- **Update**: Title is required, ID must exist
- **Delete**: ID must exist
- **Toggle Complete**: ID must exist

## Theme

The application supports both dark and light themes with a toggle button at the top of the page.

