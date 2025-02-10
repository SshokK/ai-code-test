import { Tree } from './tree'; // Replace './your-tree-file' with the actual path

describe('Gemini Tree v1', () => {
  let tree: Tree<string>;

  beforeEach(() => {
    tree = new Tree<string>();
  });

  describe('insert', () => {
    it('should insert the root node when the tree is empty', () => {
      const newNode = tree.insert('A');
      expect(newNode).not.toBeNull();
      expect(tree.root).toBe(newNode);
    });

    it('should insert a child node when a parent exists', () => {
      tree.insert('A');
      const newNode = tree.insert('B', 'A');
      expect(newNode).not.toBeNull();
      expect(newNode?.parent?.value).toBe('A');
      expect(tree.find('A')?.children).toContain(newNode);
    });

    /**
     *
     *
     * Invalid test. Was fixed in V2
     *
     *
     */
    // it('should return null if the parent does not exist', () => {
    //   const newNode = tree.insert('B', 'NonExistentParent');
    //   console.log(tree)
    //   expect(newNode).toBeNull();
    // });

    it('should not allow inserting a node without a parent when the tree already has a root', () => {
        tree.insert('A');
        const newNode = tree.insert('B'); // No parent provided.
        expect(newNode).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove the root node if it has no children', () => {
      tree.insert('A');
      expect(tree.remove('A')).toBe(true);
      expect(tree.root).toBeNull();
    });

    it('should remove a child node', () => {
      tree.insert('A');
      tree.insert('B', 'A');
      expect(tree.remove('B')).toBe(true);
      expect(tree.find('A')?.children.length).toBe(0);
    });

      it('should not remove the root node if it has children', () => {
          tree.insert('A');
          tree.insert('B', 'A');
          expect(tree.remove('A')).toBe(false);
          expect(tree.root?.value).toBe('A'); // Root should still be 'A'
      });


    it('should return false if the node to remove does not exist', () => {
      expect(tree.remove('NonExistentNode')).toBe(false);
    });
  });

  describe('getAllParents', () => {
    it('should return an empty array if the node has no parents', () => {
      tree.insert('A');
      expect(tree.getAllParents('A')).toEqual([]);
    });

    it('should return all parents of a node', () => {
      tree.insert('A');
      tree.insert('B', 'A');
      tree.insert('C', 'B');
      expect(tree.getAllParents('C')).toEqual(['B', 'A']);
    });
  });

  describe('find', () => {
    it('should return null if the node is not found', () => {
      expect(tree.find('NonExistentNode')).toBeNull();
    });

    it('should return the node if it is found', () => {
      tree.insert('A');
      const foundNode = tree.find('A');
      expect(foundNode).not.toBeNull();
      expect(foundNode?.value).toBe('A');
    });
  });
});