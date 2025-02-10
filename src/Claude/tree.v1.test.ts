import { Tree } from './tree'; // Assuming the tree implementation is in tree.ts

describe('Claude tree V1', () => {
    let tree: Tree<string>;

    beforeEach(() => {
        tree = new Tree<string>();
    });

    describe('insert', () => {
        it('should insert root node when tree is empty', () => {
            expect(tree.insert('root')).toBe(true);
            expect(tree.findNode('root')).not.toBeNull();
        });

        it('should insert child node under specified parent', () => {
            tree.insert('root');
            expect(tree.insert('child', 'root')).toBe(true);

            const child = tree.findNode('child');
            expect(child).not.toBeNull();
            expect(child?.parent?.value).toBe('root');
        });

        it('should return false when parent node does not exist', () => {
            tree.insert('root');
            expect(tree.insert('child', 'nonexistent')).toBe(false);
        });

        it('should insert multiple children under same parent', () => {
            tree.insert('root');
            tree.insert('child1', 'root');
            tree.insert('child2', 'root');

            const root = tree.findNode('root');
            expect(root?.children.length).toBe(2);
            expect(root?.children.map(child => child.value)).toContain('child1');
            expect(root?.children.map(child => child.value)).toContain('child2');
        });
    });

    describe('remove', () => {
        beforeEach(() => {
            tree.insert('root');
            tree.insert('child1', 'root');
            tree.insert('child2', 'root');
            tree.insert('grandchild', 'child1');
        });

        it('should remove leaf node', () => {
            expect(tree.remove('grandchild')).toBe(true);
            expect(tree.findNode('grandchild')).toBeNull();
            expect(tree.findNode('child1')?.children.length).toBe(0);
        });

        it('should remove node with children', () => {
            expect(tree.remove('child1')).toBe(true);
            expect(tree.findNode('child1')).toBeNull();
            expect(tree.findNode('grandchild')).toBeNull();
        });

        it('should remove root node and clear tree', () => {
            expect(tree.remove('root')).toBe(true);
            expect(tree.findNode('root')).toBeNull();
            expect(tree.findNode('child1')).toBeNull();
            expect(tree.findNode('child2')).toBeNull();
            expect(tree.findNode('grandchild')).toBeNull();
        });

        it('should return false when node does not exist', () => {
            expect(tree.remove('nonexistent')).toBe(false);
        });
    });

    describe('getAllParents', () => {
        beforeEach(() => {
            tree.insert('root');
            tree.insert('child1', 'root');
            tree.insert('child2', 'root');
            tree.insert('grandchild1', 'child1');
            tree.insert('great-grandchild', 'grandchild1');
        });

        it('should return all parents in order from immediate parent to root', () => {
            const parents = tree.getAllParents('great-grandchild');
            const parentValues = parents.map(node => node.value);
            expect(parentValues).toEqual(['grandchild1', 'child1', 'root']);
        });

        it('should return empty array for root node', () => {
            const parents = tree.getAllParents('root');
            expect(parents).toEqual([]);
        });

        it('should return empty array for non-existent node', () => {
            const parents = tree.getAllParents('nonexistent');
            expect(parents).toEqual([]);
        });

        it('should return single parent for direct child of root', () => {
            const parents = tree.getAllParents('child2');
            const parentValues = parents.map(node => node.value);
            expect(parentValues).toEqual(['root']);
        });
    });

    describe('findNode', () => {
        beforeEach(() => {
            tree.insert('root');
            tree.insert('child1', 'root');
            tree.insert('child2', 'root');
            tree.insert('grandchild', 'child1');
        });

        it('should find root node', () => {
            const node = tree.findNode('root');
            expect(node?.value).toBe('root');
            expect(node?.parent).toBeNull();
        });

        it('should find child node', () => {
            const node = tree.findNode('child1');
            expect(node?.value).toBe('child1');
            expect(node?.parent?.value).toBe('root');
        });

        it('should find deeply nested node', () => {
            const node = tree.findNode('grandchild');
            expect(node?.value).toBe('grandchild');
            expect(node?.parent?.value).toBe('child1');
        });

        it('should return null for non-existent node', () => {
            expect(tree.findNode('nonexistent')).toBeNull();
        });
    });

    describe('edge cases', () => {
        it('should handle empty tree operations', () => {
            expect(tree.remove('any')).toBe(false);
            expect(tree.getAllParents('any')).toEqual([]);
            expect(tree.findNode('any')).toBeNull();
        });

        it('should handle inserting duplicate values', () => {
            tree.insert('root');
            tree.insert('child', 'root');
            tree.insert('child', 'root');

            const root = tree.findNode('root');
            expect(root?.children.length).toBe(2);
            expect(root?.children.filter(child => child.value === 'child').length).toBe(2);
        });
    });
});