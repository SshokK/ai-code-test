# Tree Data Structure in TypeScript

This project provides a simple implementation of a Tree data structure in TypeScript. The Tree class supports the following operations:
- Insert a node
- Remove a node
- Get all parents of a node
- Find a node

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Contributing](#contributing)

## Installation

To use this project, you need to have Node.js and npm installed.

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/tree-data-structure.git
    ```

2. Navigate to the project directory:
    ```bash
    cd tree-data-structure
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

Here is an example of how to use the Tree class:

```typescript
import { Tree } from './Tree';

// Create a new Tree instance
const tree = new Tree<number>();

// Insert nodes
tree.insertNode(1); // Root node
tree.insertNode(2, 1); // Child of root
tree.insertNode(3, 1); // Child of root
tree.insertNode(4, 2); // Child of node with value 2

// Find a node
console.log(tree.findNode(3)); // TreeNode { value: 3, children: [] }

// Get all parents of a node
console.log(tree.getAllParents(4)); // [2, 1]

// Remove a node
tree.removeNode(2);
console.log(tree.findNode(2)); // null
```

## Running Tests

This project uses Jest for testing. To run the tests, use the following command:

```bash
npm test
```

The tests cover the basic operations of the Tree class, ensuring that nodes can be inserted, removed, and found correctly.


## Contributing
Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your branch to your forked repository.
5. Create a pull request.
6. Please ensure that your code follows the project's coding standards and that all tests pass.

