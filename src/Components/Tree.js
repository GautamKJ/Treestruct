
import React, { useState } from 'react';
// import './TreeStructureApp.css'; // Add a CSS file for any styles you might need

// Function to convert the input text to a tree structure object
const parseInput = (input) => {
    console.log("parseInput", input);
  const parts = input.split('/');
 // Initialize the root object
 const root = {};
 
 let current = root;

 
 for (const part of parts) {
 
     if (!current[part]) {
        console.log("current ",current[part]);
         current[part] = {}; 
     }

     console.log("current outside",current[part]);

     
     current = current[part];
 }

 return root;
};

// Function to merge new paths into the existing tree
const mergeTree = (existingTree, newTree) => {
  for (const key in newTree) {
    // If the key doesn't exist in the existing tree, add it
    if (!(key in existingTree)) {
      existingTree[key] = {};
    }
    // Merge the sub-tree recursively
    mergeTree(existingTree[key], newTree[key]);
  }
};

// Function to render the tree structure recursively
const renderTree = (node, key = '') => {
  const children = Object.keys(node);
  if (children.length === 0) {
    return null;
  }

  return (
    <ul key={key}>
      {children.map((child) => (
        <li key={child} style={{width:'10px' }}>
          {child}
          <div style={{ marginLeft: '5px' }}>
            {renderTree(node[child], key + child)}
          </div>
        </li>
      ))}
    </ul>
  );
};

const TreeStructureApp = () => {
  const [input, setInput] = useState('');
  const [tree, setTree] = useState({});

  // Handle user input
  const handleInputChange = (event) => {
    const newInput = event.target.value;
    setInput(newInput);
    
  
  };
  const onClick = () => {
      // Parse the new input into a tree structure
      const newTree = parseInput(input);
      
      // console.log("newTree", newTree);
    
      // Merge the new tree structure with the existing tree state
      const mergedTree = { ...tree };
      mergeTree(mergedTree, newTree);
      
      // Update the tree state with the merged tree structure
      setTree(mergedTree);
  }

  return (
    <div className="tree-structure-app">
      <h1>Tree Structure App</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type a path (e.g. a/b/c)"
      />
      <button onClick={onClick}>Train</button>
      <div className="tree">
        {renderTree(tree)}
      </div>
    </div>
  );
};

export default TreeStructureApp;
