const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    // break case 
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: []
      })
      return tree
    }
    let latestNode = []
    latestNode = tree.items.map((ob) => {
      // recursively call insert node
      return insertNode(ob, folderId, item, isFolder)
    })
    return { ...tree, items: latestNode }
  }
  return { insertNode }
}
export default useTraverseTree