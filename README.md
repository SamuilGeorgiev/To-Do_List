# Simple React Todo App with Dark Mode

Live Demo - https://to-do-list-9.netlify.app

This project is a basic todo application built with React. It allows users to add, toggle the completion status of, and delete tasks. It also features a dark mode toggle for a more comfortable viewing experience in different lighting conditions. Tasks and the dark mode preference are persisted in the browser's local storage.

## Features

* **Add Tasks:** Easily add new tasks to your todo list.
* **Toggle Completion:** Mark tasks as complete or incomplete with a simple checkbox. Completed tasks are displayed with a strikethrough.
* **Delete Tasks:** Remove tasks from your list.
* **Dark Mode:** Switch between a light and a dark theme for better readability.
* **Local Storage:** Tasks and dark mode preference are saved in your browser's local storage, so your data persists across sessions.

## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **JSX:** A syntax extension to JavaScript that allows you to write HTML-like structures within your JavaScript code.
* **Hooks:** Introduced in React 16.8, hooks let you use state and other React features without writing classes. This project utilizes `useState` for managing component state and `useEffect` for handling side effects like saving to and loading from local storage.
* **CSS:** For styling the application. A basic `App.css` is included for general styling, and classes are used to apply different styles in dark mode.

## Getting Started

To run this application locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
    (Replace `<repository-url>` with the actual URL of your GitHub repository)

2.  **Navigate to the project directory:**
    ```bash
    cd <project-directory>
    ```
    (Replace `<project-directory>` with the name of the cloned directory)

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn add
    ```

4.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```

    This will start the React development server, and the application should open in your default web browser (usually at `http://localhost:3000`).

## Project Structure

The main components of this project are:

* `src/App.js`: Contains the main application logic, including state management for tasks and dark mode, and the rendering of the todo list.
* `src/App.css`: Contains the basic CSS styles for the application, including specific styles for dark mode.

## Usage

1.  **Adding a Task:** Type your new task into the input field located at the top right and click the "ADD" button.
2.  **Toggling Completion:** Click the checkbox next to a task to mark it as complete or incomplete. Completed tasks will have a strikethrough.
3.  **Deleting a Task:** Click the "❌" button next to a task to remove it from the list.
4.  **Toggling Dark Mode:** Click the "Toggle dark mode" button at the top left to switch between the light and dark themes.

## Local Storage

The application utilizes the browser's `localStorage` to persist data:

* `tasks`: Stores an array of task objects, where each object has `text` and `completed` properties.
* `darkMode`: Stores a boolean value (`'true'` or `'false'`) indicating whether dark mode is currently enabled.

## Further Improvements

This is a basic implementation and can be extended with more features, such as:

* **Task Editing:** Allow users to edit existing tasks.
* **Filtering/Sorting:** Add options to filter tasks (e.g., show only active or completed) or sort them.
* **More Styling:** Enhance the visual appearance with more detailed styling.
* **Error Handling:** Implement error handling for local storage operations.
* **More Robust Dark Mode:** Refine the dark mode implementation with a more comprehensive color palette.

