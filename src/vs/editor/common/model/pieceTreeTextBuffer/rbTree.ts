
enum Color {
  Black,
  Red
}
class TreeNode {
  left: TreeNode | null
  right: TreeNode | null
  parent: TreeNode | null
  color: 0 | 1
  value: any
  constructor(val:any) {
    this.value = val
    this.left = null
    this.right = null
    this.parent = null
    this.color = Color.Red
  }
}
class RBTree {
  root: any
  size: number
  constructor(str: string) {
    this.root = null // the root node
    this.size = 0 // the number of nodes in the tree
    this.buildTree(str) // build the tree from the string
  }

  // A helper method to build the tree from a string
  buildTree(str: string) {
    for (let char of str) {
      this.insert(char) // insert each character into the tree
    }
  }

  insert(value: string) {
    let newNode = new TreeNode(value) // create a new node
    if (this.root === null) {
      this.root = newNode // if the tree is empty, the new node is the root
      newNode.color = Color.Black // the root must be black
    } else {
      let current = this.root
      let parent: TreeNode | null = null
      while (current !== null) {
        // loop until we reach a null leaf
        parent = current // update the parent node
        if (newNode.value < current.value) {
          // if the value is smaller than the current node, go left
          current = current.left
        } else {
          // otherwise, go right
          current = current.right
        }
      }
      // after the loop, we have found the parent node for the new node
      newNode.parent = parent
      if (newNode.value < parent!.value) {
        // if the new node is smaller than the parent, it is the left child
        parent!.left = newNode
      } else {
        // otherwise, it is the right child
        parent!.right = newNode
      }
    }
    this.size++
    this.fixInsert(newNode) // fix the tree to maintain the red-black properties
  }

  fixInsert(node: TreeNode) {
    while(node !== this.root && node.parent?.color === Color.Red) {
      // loop until we reach the root or until we have a black parent node
      if (node.parent === node.parent.parent?.left) {

        // if the parent is a left child of its parent
        let uncle = node.parent.parent?.right // get the uncle node
        if (uncle?.color === Color.Red) {
          // if the uncle is red, we can recolor
          node.parent.color = Color.Black
          uncle.color = Color.Black
          node.parent.parent!.color = Color.Red
          node = node.parent.parent!
        } else {
          // otherwise, we need to rotate
          if (node === node.parent.right) {
            // if the node is a right child, we need to rotate left
            node = node.parent
            this.leftRotate(node)
          }
          // after the rotation, we can recolor and rotate right
          node.parent!.color = Color.Black // make the parent black
          node.parent!.parent!.color = Color.Red // make the grandparent red
          this.rightRotate(node.parent!.parent!) // rotate right around the grandparent
        }
      } else {
        // if the parent is a right child of its parent
        let uncle = node.parent.parent?.left // get the uncle node
        if (uncle?.color === Color.Red) {
          // if the uncle is red, we can recolor
          node.parent.color = Color.Black
          uncle.color = Color.Black
          node.parent.parent!.color = Color.Red
          node = node.parent.parent!
        } else {
          // otherwise, we need to rotate
          if (node === node.parent.left) {
            // if the node is a left child, we need to rotate right
            node = node.parent
            this.rightRotate(node)
          }
          // after the rotation, we can recolor and rotate left
          node.parent!.color = Color.Black // make the parent black
          node.parent!.parent!.color = Color.Red // make the grandparent red
          this.leftRotate(node.parent!.parent!) // rotate left around the grandparent
        }
      }
    }
    this.root.color = Color.Black // make sure the root is always black
  }

  leftRotate(node: TreeNode) {
    let rightChild = node.right // store the right child
    node.right = rightChild!.left // make the right child the left child of the parent
    if (rightChild!.left !== null) {
      rightChild!.left.parent = node // update the parent of the left child
    }
    rightChild!.parent = node.parent // update the parent of the parent
    if (node.parent === null) {
      this.root = rightChild // if the node is the root, make the right child the root
    } else if (node === node.parent.left) {
      node.parent.left = rightChild // if the node is a left child, make the right child the left child
    } else {
      node.parent.right = rightChild // otherwise, make the right child the right child
    }
    rightChild!.left = node // make the node the left child of the right child
    node.parent = rightChild
  }

  rightRotate(node: TreeNode) {
    let leftChild = node.left // store the left child
    node.left = leftChild!.right // make the left child the right child of the parent
    if (leftChild!.right !== null) {
      leftChild!.right.parent = node // update the parent of the right child
    }
    leftChild!.parent = node.parent // update the parent of the left child the new parent of the node
    if (node.parent === null) {
      this.root = leftChild // if the node is the root, make the left child the root
    } else if (node === node.parent.right) {
      node.parent.right = leftChild // if the node is a right child, make the left child the right child
    } else {
      node.parent.left = leftChild // otherwise, make the left child the left child
    }
    leftChild!.right = node // make the node the right child of the left child
    node.parent = leftChild
  }

  delete(value: TreeNode) {
    let node = this.search(value) // search for the node
    if (node === null) {
      return // if the node is not in the tree, return
    }
    let y = node // store the node to be deleted
    let yOriginalColor = y.color // store the original color of the node
    let x: TreeNode | null = null // store the node to be fixed
    if (node.left === null) {
      // if the node only has a right child
      x = node.right // set x to the right child
      this.transplant(node, node.right) // transplant the node with its right child
    } else if (node.right === null) {
      // if the node only has a left child
      x = node.left // set x to the left child
      this.transplant(node, node.left) // transplant the node with its left child
    } else {
      // if the node has two children
      y = this.minimum(node.right) // find the minimum node in the right subtree
      yOriginalColor = y.color // store the original color of the minimum node
      x = y.right // set x to the right child of the minimum node
      if (y.parent === node) {
        // if the minimum node is the right child of the node
        x!.parent = y // update the parent of x
      } else {
        // otherwise, transplant the minimum node with its right child
        this.transplant(y, y.right)
        y.right = node.right // make the right child of the node the right child of the minimum node
        y.right!.parent = y // update the parent of the right child
      }
      this.transplant(node, y) // transplant the node with the minimum node
      y.left = node.left // make the left child of the node the left child of the minimum node
      y.left!.parent = y // update the parent of the left child
      y.color = node.color // make the color of the minimum node the same as the node
    }
    if (yOriginalColor === Color.Black) {
      // if the original color of the minimum node was black, we need to fix the tree
      this.fixDelete(x)
    }
  }

  transplant(u: TreeNode, v: TreeNode | null) {
    if (u.parent === null) {
      // if the node is the root, make v the root
      this.root = v
    } else if (u === u.parent.left) {
      // if the node is a left child, make v the left child
      u.parent.left = v
    } else {
      // otherwise, make v the right child
      u.parent.right = v
    }
    if (v !== null) {
      // update the parent of v
      v.parent = u.parent
    }
  }

  minimum(node: TreeNode): TreeNode {
    // find the minimum node in the subtree
    while (node?.left !== null) {
      node = node.left
    }
    return node!
  }

  fixDelete(node: TreeNode | null) {
    while (node !== this.root && node?.color === Color.Black) {
      // while the node is not the root and is black
      if (node === node?.parent?.left) {
        // if the node is a left child
        let sibling = node.parent?.right // get the sibling node
        if (sibling?.color === Color.Red) {
          // if the sibling is red, we can recolor
          sibling.color = Color.Black
          node.parent!.color = Color.Red
          this.leftRotate(node.parent!)
          sibling = node.parent?.right
        }
        if (
          sibling?.left?.color === Color.Black &&
          sibling?.right?.color === Color.Black
        ) {
          // if the sibling's children are black, we can recolor
          sibling.color = Color.Red
          node = node.parent!
        } else {
          // otherwise, we need to rotate
          if (sibling?.right?.color === Color.Black) {
            // if the sibling's right child is black, we need to rotate left
            sibling.left!.color = Color.Black
            sibling.color = Color.Red
            this.rightRotate(sibling)
            sibling = node.parent?.right
          }
          // after the rotation, we can recolor and rotate right
          sibling!.color = node.parent!.color // make the sibling the same color as the parent
          node.parent!.color = Color.Black // make the parent black
          sibling!.right!.color = Color.Black // make the sibling's right child black
          this.leftRotate(node.parent!) // rotate left around the parent
          node = this.root // set the node to the root
        }
      } else {
        // if the node is a right child
        let sibling = node.parent?.left // get the sibling node
        if (sibling?.color === Color.Red) {
          // if the sibling is red, we can recolor
          sibling.color = Color.Black
          node.parent!.color = Color.Red
          this.rightRotate(node.parent!)
          sibling = node.parent?.left
        }
        if (
          sibling?.left?.color === Color.Black &&
          sibling?.right?.color === Color.Black
        ) {
          // if the sibling's children are black, we can recolor
          sibling.color = Color.Red
          node = node.parent!
        } else {
          // otherwise, we need
          if (sibling?.left?.color === Color.Black) {
            // if the sibling's left child is black, we need to rotate right
            sibling.right!.color = Color.Black
            sibling.color = Color.Red
            this.leftRotate(sibling)
            sibling = node.parent?.left
          }
          // after the rotation, we can recolor and rotate left
          sibling!.color = node.parent!.color // make the sibling the same color as the parent
          node.parent!.color = Color.Black // make the parent black
          sibling!.left!.color = Color.Black // make the sibling's left child black
          this.rightRotate(node.parent!) // rotate right around the parent
          node = this.root // set the node to the root
        }
      }
    }
    node!.color = Color.Black // make the node black
  }

  search(value: TreeNode): TreeNode | null {
    let node = this.root // start at the root
    while (node !== null && value !== node) {
      // while the node is not null and the value is not the node
      if (value < node) {
        // if the value is less than the node, go left
        node = node.left
      } else {
        // otherwise, go right
        node = node.right
      }
    }
    return node
  }
}


