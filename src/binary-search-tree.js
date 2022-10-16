const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootD = null;
  }

  root() {
    return this.rootD;
  }

  add(data) {
    this.rootD = addWithin(this.rootD, data);

    function addWithin(node, data) {
      if (!node)
        return new Node(data);

      if (data === node.data)
        return node;

      if (data < node.data)
        node.left = addWithin(node.left, data);
      else
        node.right = addWithin(node.right, data);

      return node;
    }
  }

  has(data) {
    return searchWithin(this.rootD, data);

    function searchWithin(node, data) {
      if (!node)
        return false;

      if (data === node.data)
        return true;

      if (data < node.data)
        return searchWithin(node.left, data);
      else
        return searchWithin(node.right, data);
    }
  }

  find(data) {
    return findWithin(this.rootD, data);

    function findWithin(node, data) {
      if (!node)
        return null;

      if (data === node.data)
        return node;

      if (data < node.data)
        return findWithin(node.left, data);
      else
        return findWithin(node.right, data);
    }
  }

  remove(data) {
    this.rootD = removeNode(this.rootD, data);

    function removeNode(node, data) {
      if (!node)
        return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      }
      else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      }
      else {
        // если является листом, то есть не имеет потомков.
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          // теперь вместо удаляемого элемента будет его правый потомок.
          node = node.right;
          return node;
        }

        if (!node.right) {
          // теперь вместо удаляемого элемента будет его левый потомок.
          node = node.left;
          return node;
        }

        /*
        если выполнение программы дошло до этой строки кода,
        то удаляемый элемент имеет левого и правого потомка.
        в данном случай вместо удаляемого элемента можно поставить 
        либо одного из левых потомков с максимальным значением, 
        либо одного из правых потомков с минимальный значением
        */
        let minFromRight = node.right;
        while(minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.root)
      return;

    return minWithin(this.rootD);

    function minWithin(node) {
      if (node.left == null)
        return node.data;

      return minWithin(node.left);
    }
  }

  max() {
    if (!this.root)
      return;

    return maxWithin(this.rootD);

    function maxWithin(node) {
      if (node.right == null)
        return node.data;

      return maxWithin(node.right);
    }
  }
}

module.exports = {
  BinarySearchTree
};