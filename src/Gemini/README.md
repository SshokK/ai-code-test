# TypeScript Tree Implementation

This project provides a TypeScript implementation of a tree data structure.  It includes methods for inserting, removing, finding, and retrieving parent nodes.

## Features

*   **Generics:** Supports any data type for node values using generics.
*   **Parent Pointers:** Each node maintains a reference to its parent, facilitating tree traversal.
*   **Root Handling:** Correctly handles insertion and removal of the root node.
*   **Error Handling:** Includes basic error handling (returning `null` or `false` and console warnings) for invalid operations.
*   **Comprehensive Tests:** Comes with a full suite of Jest tests to ensure code correctness.
*   **Tree Visualization:** Includes a `printTree` method for easy visualization of the tree structure in the console.

## Installation

```bash
npm install your-package-name  # If you package and publish this
# OR if you are just using the files directly
# (no installation needed if just copying the files)
```

## Usage

```
import { Tree } from './your-tree-file'; // Replace with the correct path

const myTree = new Tree<string>();

myTree.insert("A");  // Root
myTree.insert("B", "A");
myTree.insert("C", "A");
myTree.insert("D", "B");
myTree.insert("E", "B");
myTree.insert("F", "C");

myTree.printTree(); // Visualize the tree

console.log("Parents of D:", myTree.getAllParents("D")); // Output: ["B", "A"]
console.log("Found node C:", myTree.find("C")?.value);   // Output: C
console.log("Removing B:", myTree.remove("B"));         // Output: true
myTree.printTree();
console.log("Removing A:", myTree.remove("A")); //Cannot remove the root node if it has children.
myTree.printTree();
console.log("Removing F:", myTree.remove("F"));
myTree.printTree();
console.log("Removing A:", myTree.remove("A")); //Now it can be removed.
myTree.printTree();


// Example with numbers:
const numberTree = new Tree<number>();
numberTree.insert(10);
numberTree.insert(20, 10);
numberTree.insert(30, 10);
numberTree.printTree();
```