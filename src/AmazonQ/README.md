# TypeScript Tree Implementation

A robust and type-safe implementation of a tree data structure in TypeScript. This implementation provides basic tree operations with parent-child relationship tracking.

## Features

- Generic tree implementation supporting any data type
- Parent-child relationship tracking
- Basic tree operations (insert, remove, search)
- Type-safe implementation
- Comprehensive error handling

## Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install
```

## Example

```typescript
const familyTree = new Tree<string>();

// Creating a family tree
familyTree.insert("John"); // Root
familyTree.insert("Bob", "John");
familyTree.insert("Alice", "John");
familyTree.insert("Charlie", "Bob");

// Get all parents of Charlie
console.log(familyTree.getAllParents("Charlie")); // ["Bob", "John"]

// Remove Bob and his subtree
familyTree.remove("Bob"); // Removes Bob and Charlie
```

### Basic Operations

#### Inserting Nodes

```typescript
// Insert root (no parent specified)
const root = tree.insert("Root"); // Returns TreeNode

// Insert child (specify parent value)
const child = tree.insert("Child", "Root"); // Returns TreeNode or null if parent not found
```

#### Removing Nodes

```typescript
// Remove a node and its subtree
tree.remove("Child"); // Returns boolean
```

#### Finding Nodes

```typescript
// Find a specific node
const node = tree.findNode("Child"); // Returns TreeNode or nullfound
```

#### Finding Nodes

```typescript
// Get all parents of a node
const parents = tree.getAllParents("Grandchild"); // Returns array of parent values

```

## Error Handling
The implementation includes comprehensive error handling:

* Returns null when attempting to insert with non-existent parent

* Returns false when attempting to remove non-existent node

* Returns empty array when getting parents of non-existent node

* Handles edge cases for empty trees


## TypeScript Support
This implementation is fully typed and provides type safety. You can create trees with any data type:


```typescript
// String tree
const stringTree = new Tree<string>();

// Number tree
const numberTree = new Tree<number>();

// Custom type tree
interface Person {
    name: string;
    age: number;
}
const personTree = new Tree<Person>();
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

```text
This README provides comprehensive documentation of the tree implementation, including:
- Feature overview
- Installation instructions
- Usage examples
- API reference
- Error handling details
- TypeScript support
- Contributing guidelines

The documentation is structured to help both new users get started quickly and experienced developers understand the full capabilities of the implementation.
```