# Consistent Hashing Visualizer

A web-based tool to demonstrate and visualize the principles of consistent hashing.

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the Application](#running-the-application)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)
-   [Acknowledgments](#acknowledgments)

## Introduction

Consistent hashing is a distributed hashing scheme that allows for the dynamic addition and removal of nodes without significant reorganization. This visualizer provides an interactive way to understand how consistent hashing distributes keys across nodes.

## Features

-   **Interactive Visualization**: Add or remove nodes and see how keys are redistributed.
-   **Real-time Updates**: Observe how the system adapts to changes in the node structure.
-   **Customizable Parameters**: Adjust hashing functions and replication factors to see their effects.

## Technologies Used

-   **React**: For building the user interface.
-   **Vite**: As the build tool and development server.
-   **ESLint**: For maintaining code quality and consistency.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/en/download/) (v18 or later)
-   [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

### Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/Rico1102/Consistent-Hashing-Visualizer.git
    ```

2. **Navigate to the Project Directory**:

    ```bash
    cd Consistent-Hashing-Visualizer
    ```

3. **Install Dependencies**:

    ```bash
    npm install
    ```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and go to `http://localhost:5173` to view the application.

## Usage

1. **Adding Nodes**: Click on the "Add Node" button to introduce a new node into the system.
2. **Removing Nodes**: Click on a node to remove it and observe how the keys are redistributed.
3. **Adding Keys**: Input a key value and see which node it gets assigned to.
4. **Adjusting Parameters**: Use the settings panel to change hashing functions or replication factors and observe the effects. (WIP)

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## Acknowledgments

-   [Vite](https://vitejs.dev/)
-   [React](https://reactjs.org/)
