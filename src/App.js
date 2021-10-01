import { useState } from 'react';
import store from 'store';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { TREE_STORE_KEY } from './utils/constants';
import { addNode } from './utils/treeFuncs';

function App() {

  const [tree, setTree] = useState(store.get(TREE_STORE_KEY) || {})

  const collectNodeData = (parentId) => {
    let _tree = {...tree};
    const nodeName = prompt("Enter name of node");
    if(!nodeName) { return }

    const node = {
      id: uuidv4(),
      name: nodeName,
      descendants: []
    }

    if(parentId) {
      const _tree = {...tree}
      addNode(_tree, node, parentId)
    } else {
      _tree = node
    }

    store.set(TREE_STORE_KEY, _tree)
    setTree(_tree)
  }

  const printNodes = (node, level = 0) => {
    let domEls = [(<div style={{padding: '5px', marginLeft: `${level}px`}}>{node.name} <button onClick={() => collectNodeData(node.id)}>Add Child Item</button></div>)]
    if (node.descendants.length === 0) {
      return domEls
    } else {
      const nodeDescendants = node.descendants;
      for(let i = 0; i < nodeDescendants.length; i++) {
        domEls.push(printNodes(node.descendants[i], level + 20))
      }
      return domEls;
    }
  }

  console.log(tree)

  return (
    <div className="App">
      <h4>Tree App</h4>
      
      {Object.keys(tree).length === 0 &&
        <button onClick={() => collectNodeData(null)}>Add Root Item</button>
      }

      {Object.keys(tree).length > 0 &&
        printNodes(tree)
      }
    </div>
  );
}

export default App;
