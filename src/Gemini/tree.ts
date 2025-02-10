class TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
  parent: TreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.children = [];
    this.parent = null;
  }
}

export class Tree<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  insert(value: T, parentValue: T | null = null): TreeNode<T> | null {
    const newNode = new TreeNode<T>(value);

    if (!this.root) {
      this.root = newNode;
      return newNode;
    }

    if (parentValue === null && this.root) {
        console.warn("Cannot insert node without a parent when the tree already has a root.  Provide a parent value.");
        return null; // Or throw an error, depending on desired behavior.
    }


    const parentNode = this.find(parentValue);

    if (parentNode) {
      newNode.parent = parentNode;
      parentNode.children.push(newNode);
      return newNode;
    }

    return null; // Parent not found
  }


  remove(value: T): boolean {
    if (!this.root) {
      return false;
    }

    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      return false;
    }

    if (nodeToRemove === this.root) {
        if (nodeToRemove.children.length > 0) {
            console.warn("Cannot remove the root node if it has children. Remove the children first or reassign the root.");
            return false;
        }
        this.root = null;
        return true;
    }

    if (nodeToRemove.parent) {
      nodeToRemove.parent.children = nodeToRemove.parent.children.filter(child => child !== nodeToRemove);
      return true;
    }

    return false;
  }


  getAllParents(value: T): T[] {
    const parents: T[] = [];
    let currentNode = this.find(value);

    while (currentNode && currentNode.parent) {
      parents.push(currentNode.parent.value);
      currentNode = currentNode.parent;
    }

    return parents;
  }

  find(value: T, currentNode: TreeNode<T> | null = null): TreeNode<T> | null {
    currentNode = currentNode || this.root;

    if (!currentNode) {
        return null;
    }

    if (currentNode.value === value) {
      return currentNode;
    }

    for (const child of currentNode.children) {
      const foundNode = this.find(value, child);
      if (foundNode) {
        return foundNode;
      }
    }

    return null;
  }

    printTree(node: TreeNode<T> | null = this.root, level: number = 0): void {
        if (!node) {
            return;
        }

        const indent = "  ".repeat(level);
        console.log(`${indent}${node.value}`);

        for (const child of node.children) {
            this.printTree(child, level + 1);
        }
    }
}

// Example usage:
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
