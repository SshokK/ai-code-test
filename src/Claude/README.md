# TypeScript Tree Implementation

A flexible and efficient TypeScript implementation of a tree data structure that supports basic tree operations including insertion, removal, parent retrieval, and node searching.

## Features

- Generic type support - can store any data type
- Parent-child relationship tracking
- Depth-first search implementation
- Complete parent chain retrieval
- Tree visualization helper

## Installation

```bash
npm install typescript-tree
```

## Usage

### Creating a Tree

```typescript
import { Tree } from './tree';

// Create a tree of strings
const tree = new Tree<string>();

// Create a tree of numbers
const numTree = new Tree<number>();

// Create a tree of custom objects
interface CustomNode {
    id: number;
    name: string;
}
const customTree = new Tree<CustomNode>();
```

### Basic Operations

#### Inserting Nodes

```typescript
// Insert root node
tree.insert('root');

// Insert children
tree.insert('child1', 'root');
tree.insert('child2', 'root');

// Insert deeper nodes
tree.insert('grandchild1', 'child1');
```

#### Removing Nodes

```typescript
// Remove a leaf node
tree.remove('grandchild1');

// Remove a node and its subtree
tree.remove('child1'); // This will also remove all children under 'child1'
```

#### Finding Nodes

```typescript
// Find a specific node
const node = tree.findNode('child1');
if (node) {
    console.log('Node found:', node.value);
}
```

#### Getting Parent Chain

```typescript
// Get all parents of a node
const parents = tree.getAllParents('grandchild1');
const parentValues = parents.map(node => node.value);
// parentValues will contain ['child1', 'root']
```

#### Visualizing the Tree

```typescript
// Print the tree structure
tree.print();

/* Output:
root
  child1
    grandchild1
  child2
*/
```

## API Reference

### Tree<T>

#### Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `insert` | `value: T, parentValue?: T` | `boolean` | Inserts a new node. If parentValue is not provided, inserts as root. Returns true if successful. |
| `remove` | `value: T` | `boolean` | Removes the node and its subtree. Returns true if successful. |
| `getAllParents` | `value: T` | `TreeNode<T>[]` | Returns array of all parent nodes from immediate parent to root. |
| `findNode` | `value: T` | `TreeNode<T> \| null` | Finds and returns the node with the given value, or null if not found. |
| `print` | none | `void` | Prints the tree structure to console. |

### TreeNode<T>

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `value` | `T` | The value stored in the node |
| `children` | `TreeNode<T>[]` | Array of child nodes |
| `parent` | `TreeNode<T> \| null` | Reference to parent node, null for root |

## Performance

- Insert: O(1) when inserting as root's child, O(n) when searching for parent
- Remove: O(n) where n is the number of nodes in the tree
- Find: O(n) using depth-first search
- Get Parents: O(h) where h is the height of the tree

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
