export const addNode = (tree, node, parentId = null) => {
  if(parentId === null) {
    tree = node
    return node
  }

  const parentNode = findNode(parentId, tree)
  if(parentNode) {
    parentNode.descendants.push(node);
    return node
  }

  return null
}

export const findNode = (id, node) => {
  if(node.id === id) {
    return node
  } else {
    const nodeDescendants = node.descendants;
    let foundNode = null
    for(let i = 0; foundNode == null && i < nodeDescendants.length; i++) {
      foundNode = findNode(id, nodeDescendants[i])
    }
    return foundNode;
  }
}