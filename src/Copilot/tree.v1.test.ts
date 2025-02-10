import { Tree } from './tree';

describe('Copilot Tree V1', () => {
    let tree: Tree<number>;

    beforeEach(() => {
        tree = new Tree<number>();
    });

    test('should insert nodes correctly', () => {
        tree.insertNode(1);
        tree.insertNode(2, 1);
        tree.insertNode(3, 1);
        tree.insertNode(4, 2);

        expect(tree.root).not.toBeNull();
        expect(tree.root?.value).toBe(1);
        expect(tree.root?.children).toHaveLength(2);
        expect(tree.root?.children[0].value).toBe(2);
        expect(tree.root?.children[1].value).toBe(3);
        expect(tree.root?.children[0].children[0].value).toBe(4);
    });

    test('should remove nodes correctly', () => {
        tree.insertNode(1);
        tree.insertNode(2, 1);
        tree.insertNode(3, 1);
        tree.insertNode(4, 2);

        tree.removeNode(2);

        expect(tree.findNode(2)).toBeNull();
        expect(tree.root?.children).toHaveLength(1);
        expect(tree.root?.children[0].value).toBe(3);
    });

    test('should get all parents of a node', () => {
        tree.insertNode(1);
        tree.insertNode(2, 1);
        tree.insertNode(3, 1);
        tree.insertNode(4, 2);

        const parents = tree.getAllParents(4);

        expect(parents).toEqual([2, 1]);
    });

    test('should find nodes correctly', () => {
        tree.insertNode(1);
        tree.insertNode(2, 1);
        tree.insertNode(3, 1);
        tree.insertNode(4, 2);

        const node = tree.findNode(3);

        expect(node).not.toBeNull();
        expect(node?.value).toBe(3);
    });

    test('should return null when finding non-existent nodes', () => {
        tree.insertNode(1);
        tree.insertNode(2, 1);
        tree.insertNode(3, 1);

        const node = tree.findNode(4);

        expect(node).toBeNull();
    });
});