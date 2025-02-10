class TreeNode<T> {
    value: T;
    parent: TreeNode<T> | null;
    children: TreeNode<T>[];

    constructor(value: T) {
        this.value = value;
        this.parent = null;
        this.children = [];
    }
}

export class Tree<T> {
    private root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    // Insert a node under a specified parent
    insert(value: T, parentValue?: T): TreeNode<T> | null {
        const newNode = new TreeNode(value);

        // If tree is empty and no parent specified, set as root
        if (!this.root && parentValue === undefined) {
            this.root = newNode;
            return newNode;
        }

        // If parent value is specified but tree is empty, return null
        if (!this.root && parentValue !== undefined) {
            return null;
        }

        // If no parent specified but tree has root, return null
        if (parentValue === undefined && this.root) {
            return null;
        }

        // Find parent node
        const parentNode = this.findNode(parentValue!);

        if (!parentNode) {
            return null; // Parent not found
        }

        // Set parent-child relationship
        newNode.parent = parentNode;
        parentNode.children.push(newNode);

        return newNode;
    }

    // Remove a node and its subtree
    remove(value: T): boolean {
        const nodeToRemove = this.findNode(value);

        if (!nodeToRemove) {
            return false;
        }

        // If node is root
        if (!nodeToRemove.parent) {
            this.root = null;
            return true;
        }

        // Remove node from parent's children
        const parent = nodeToRemove.parent;
        parent.children = parent.children.filter(child => child.value !== value);

        return true;
    }

    // Get all parents of a node
    getAllParents(value: T): T[] {
        const node = this.findNode(value);
        const parents: T[] = [];

        if (!node) {
            return parents;
        }

        let currentNode = node.parent;

        while (currentNode) {
            parents.push(currentNode.value);
            currentNode = currentNode.parent;
        }

        return parents;
    }

    // Find a node by value
    findNode(value: T): TreeNode<T> | null {
        if (!this.root) {
            return null;
        }

        // Helper function for recursive search
        const search = (node: TreeNode<T>): TreeNode<T> | null => {
            if (node.value === value) {
                return node;
            }

            for (const child of node.children) {
                const result = search(child);

                if (result) {
                    return result;
                }
            }

            return null;
        };

        return search(this.root);
    }

    // Get the root node (for testing purposes)
    getRoot(): TreeNode<T> | null {
        return this.root;
    }
}