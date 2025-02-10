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
    private root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    // Insert a node as a child of the specified parent node
    insert(value: T, parentValue?: T): boolean {
        const newNode = new TreeNode(value);

        // If tree is empty, set as root
        if (!this.root) {
            this.root = newNode;
            return true;
        }

        // If parent value is not specified, insert as root's child
        if (!parentValue) {
            newNode.parent = this.root;
            this.root.children.push(newNode);
            return true;
        }

        // Find parent node
        const parentNode = this.findNode(parentValue);
        if (!parentNode) {
            return false;
        }

        // Set parent-child relationship
        newNode.parent = parentNode;
        parentNode.children.push(newNode);
        return true;
    }

    // Remove a node and its subtree
    remove(value: T): boolean {
        if (!this.root) {
            return false;
        }

        // If root needs to be removed
        if (this.root.value === value) {
            this.root = null;
            return true;
        }

        const nodeToRemove = this.findNode(value);
        if (!nodeToRemove || !nodeToRemove.parent) {
            return false;
        }

        // Remove node from parent's children
        const parent = nodeToRemove.parent;
        parent.children = parent.children.filter(child => child !== nodeToRemove);
        return true;
    }

    // Get all parent nodes from the specified node up to the root
    getAllParents(value: T): TreeNode<T>[] {
        const node = this.findNode(value);
        if (!node) {
            return [];
        }

        const parents: TreeNode<T>[] = [];
        let currentNode = node.parent;

        while (currentNode) {
            parents.push(currentNode);
            currentNode = currentNode.parent;
        }

        return parents;
    }

    // Find a node by value using DFS
    findNode(value: T, node: TreeNode<T> | null = this.root): TreeNode<T> | null {
        if (!node) {
            return null;
        }

        if (node.value === value) {
            return node;
        }

        for (const child of node.children) {
            const found = this.findNode(value, child);
            if (found) {
                return found;
            }
        }

        return null;
    }

    // Helper method to print tree structure
    print(): void {
        const printNode = (node: TreeNode<T> | null, level: number = 0): void => {
            if (!node) return;

            console.log(`${'  '.repeat(level)}${node.value}`);
            node.children.forEach(child => printNode(child, level + 1));
        };

        printNode(this.root);
    }
}

const tree = new Tree<string>();

tree.insert('root');
tree.insert('child1', 'root');
tree.insert('child2', 'root');
tree.insert('grandchild1', 'child1');

tree.print();
// Output:
// root
//   child1
//     grandchild1
//   child2

const parents = tree.getAllParents('grandchild1');
// Returns nodes: [child1, root]