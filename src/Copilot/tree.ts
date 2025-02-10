class TreeNode<T> {
    value: T;
    children: TreeNode<T>[];

    constructor(value: T) {
        this.value = value;
        this.children = [];
    }
}

export class Tree<T> {
    root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    insertNode(value: T, parentValue: T | null = null): void {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            const parentNode = this.findNode(parentValue);
            if (parentNode) {
                parentNode.children.push(newNode);
            } else {
                throw new Error('Parent node not found');
            }
        }
    }

    removeNode(value: T): void {
        if (this.root === null) return;

        if (this.root.value === value) {
            this.root = null;
            return;
        }

        const parentNode = this.findParentNode(value);
        if (parentNode) {
            parentNode.children = parentNode.children.filter(child => child.value !== value);
        } else {
            throw new Error('Node not found');
        }
    }

    getAllParents(value: T): T[] {
        const parents: T[] = [];
        this.findParentsRecursive(this.root, value, parents);
        return parents;
    }

    private findParentsRecursive(node: TreeNode<T> | null, value: T, parents: T[]): boolean {
        if (node === null) return false;

        if (node.value === value) return true;

        for (const child of node.children) {
            if (this.findParentsRecursive(child, value, parents)) {
                parents.push(node.value);
                return true;
            }
        }

        return false;
    }

    findNode(value: T | null): TreeNode<T> | null {
        return this.findNodeRecursive(this.root, value);
    }

    private findNodeRecursive(node: TreeNode<T> | null, value: T | null): TreeNode<T> | null {
        if (node === null) return null;

        if (node.value === value) return node;

        for (const child of node.children) {
            const result = this.findNodeRecursive(child, value);
            if (result) return result;
        }

        return null;
    }

    private findParentNode(value: T): TreeNode<T> | null {
        return this.findParentNodeRecursive(this.root, value);
    }

    private findParentNodeRecursive(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (node === null) return null;

        for (const child of node.children) {
            if (child.value === value) return node;
            const result = this.findParentNodeRecursive(child, value);
            if (result) return result;
        }

        return null;
    }
}

// Example usage:
const tree = new Tree<number>();
tree.insertNode(1); // Root node
tree.insertNode(2, 1); // Child of root
tree.insertNode(3, 1); // Child of root
tree.insertNode(4, 2); // Child of node with value 2

console.log(tree.findNode(3)); // TreeNode { value: 3, children: [] }
console.log(tree.getAllParents(4)); // [2, 1]
tree.removeNode(2);
console.log(tree.findNode(2)); // null