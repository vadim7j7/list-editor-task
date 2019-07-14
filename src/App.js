import React, { useReducer } from "react";

import List from "./components/List";

const initialList = [
  {
    id: "1",
    position: 0,
    name: "Coffee",
    subItems: []
  },
  {
    id: "2",
    position: 1,
    name: "Tea",
    subItems: [
      { id: "2:1", position: 0, name: "Black tea", subItems: [] },
      { id: "2:2", position: 1, name: "Green tea", subItems: [] }
    ]
  },
  {
    id: "3",
    position: 2,
    name: "Milk",
    subItems: []
  }
];

const listReducer = (state, action) => {
};

const App = () => {
  const [lists, dispatch] = useReducer(listReducer, initialList);

  return (
    <div>
      <h2>A Nested List Editor</h2>

      <List
        items={lists}
      />
    </div>
  );
};

export default App;
