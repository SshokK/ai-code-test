

// First, let's move the Tree and TreeNode classes to a separate file (Tree.ts)

// And import them here:

import { Tree } from './tree.v2';

describe('AmazonQ Tree V2', () => {
    let tree: Tree<string>;

    beforeEach(() => {
        tree = new Tree<string>();
    });

    describe('insert', () => {
        test('should insert root node when tree is empty', () => {
            const node = tree.insert('Root');

            expect(node?.value).toBe('Root');
            expect(node?.parent).toBeNull();
        });

        test('should insert child node under parent', () => {
            tree.insert('Root');

            const childNode = tree.insert('Child', 'Root');

            expect(childNode?.value).toBe('Child');
            expect(childNode?.parent?.value).toBe('Root');
        });

        test('should return null when parent node not found', () => {
            const result = tree.insert('Child', 'NonExistentParent');

            expect(result).toBeNull();
        });

        test('should correctly maintain multiple children', () => {
            tree.insert('Root');
            tree.insert('Child1', 'Root');
            tree.insert('Child2', 'Root');

            const rootNode = tree.findNode('Root');

            expect(rootNode?.children.length).toBe(2);
        });
    });

    describe('remove', () => {
        beforeEach(() => {
            tree.insert('Root');
            tree.insert('Child1', 'Root');
            tree.insert('Child2', 'Root');
            tree.insert('Grandchild', 'Child1');
        });

        test('should remove leaf node', () => {
            expect(tree.remove('Grandchild')).toBe(true);
            expect(tree.findNode('Grandchild')).toBeNull();
        });

        test('should remove node and its subtree', () => {
            expect(tree.remove('Child1')).toBe(true);
            expect(tree.findNode('Child1')).toBeNull();
            expect(tree.findNode('Grandchild')).toBeNull();
        });

        test('should remove root and clear tree', () => {
            expect(tree.remove('Root')).toBe(true);
            expect(tree.findNode('Root')).toBeNull();

            expect(tree.findNode('Child1')).toBeNull();

            expect(tree.findNode('Child2')).toBeNull();

        });



        test('should return false when removing non-existent node', () => {

            expect(tree.remove('NonExistent')).toBe(false);

        });

    });



    describe('getAllParents', () => {

        beforeEach(() => {

            tree.insert('Root');

            tree.insert('Child1', 'Root');

            tree.insert('Child2', 'Root');

            tree.insert('Grandchild1', 'Child1');

            tree.insert('GreatGrandchild', 'Grandchild1');

        });



        test('should return empty array for root node', () => {

            const parents = tree.getAllParents('Root');

            expect(parents).toEqual([]);

        });



        test('should return all parents in order from immediate to root', () => {

            const parents = tree.getAllParents('GreatGrandchild');

            expect(parents).toEqual(['Grandchild1', 'Child1', 'Root']);

        });



        test('should return empty array for non-existent node', () => {

            const parents = tree.getAllParents('NonExistent');

            expect(parents).toEqual([]);

        });



        test('should return correct parents for middle node', () => {

            const parents = tree.getAllParents('Child1');

            expect(parents).toEqual(['Root']);

        });

    });



    describe('findNode', () => {

        beforeEach(() => {

            tree.insert('Root');

            tree.insert('Child1', 'Root');

            tree.insert('Child2', 'Root');

            tree.insert('Grandchild', 'Child1');

        });



        test('should find root node', () => {

            const node = tree.findNode('Root');

            expect(node?.value).toBe('Root');

            expect(node?.parent).toBeNull();

        });



        test('should find child node', () => {

            const node = tree.findNode('Child1');

            expect(node?.value).toBe('Child1');

            expect(node?.parent?.value).toBe('Root');

        });



        test('should find leaf node', () => {

            const node = tree.findNode('Grandchild');

            expect(node?.value).toBe('Grandchild');

            expect(node?.parent?.value).toBe('Child1');

        });



        test('should return null for non-existent node', () => {

            const node = tree.findNode('NonExistent');

            expect(node).toBeNull();

        });

    });



    describe('complex scenarios', () => {

        test('should handle deep nested structure', () => {

            tree.insert('Root');

            tree.insert('Child1', 'Root');

            tree.insert('Child2', 'Root');

            tree.insert('Grandchild1', 'Child1');

            tree.insert('Grandchild2', 'Child1');

            tree.insert('GreatGrandchild1', 'Grandchild1');

            tree.insert('GreatGrandchild2', 'Grandchild2');



            expect(tree.getAllParents('GreatGrandchild1'))

                .toEqual(['Grandchild1', 'Child1', 'Root']);



            // Remove middle node

            tree.remove('Child1');

            expect(tree.findNode('GreatGrandchild1')).toBeNull();

            expect(tree.findNode('Child2')).not.toBeNull();

        });



        test('should handle different data types', () => {

            const numberTree = new Tree<number>();

            numberTree.insert(1);

            numberTree.insert(2, 1);

            numberTree.insert(3, 1);



            expect(numberTree.findNode(2)?.value).toBe(2);

            expect(numberTree.getAllParents(2)).toEqual([1]);

        });

    });



    describe('edge cases', () => {

        test('should handle empty tree operations', () => {

            expect(tree.findNode('anything')).toBeNull();

            expect(tree.remove('anything')).toBe(false);

            expect(tree.getAllParents('anything')).toEqual([]);

        });



        test('should handle repeated values', () => {

            tree.insert('Root');

            tree.insert('Child', 'Root');

            tree.insert('Child', 'Root'); // Same value again



            const rootNode = tree.findNode('Root');

            expect(rootNode?.children.length).toBe(2);

        });



        test('should handle undefined and null values in generic tree', () => {

            const nullableTree = new Tree<string | null | undefined>();

            nullableTree.insert(null);

            nullableTree.insert(undefined, null);



            expect(nullableTree.findNode(null)).not.toBeNull();

            expect(nullableTree.findNode(undefined)).not.toBeNull();

        });

    });

});