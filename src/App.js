import React, { useReducer, useCallback } from "react";

import List from "./components/List";
import {
  newItem,
  settingPositionById,
  updateArrayRecordById,
  addRecordById,
  removeRecordById
} from "./utils";

const initialList = {
  records: [
    {
      id: "1",
      position: 0,
      name: "Coffee",
      subItems: null
    },
    {
      id: "2",
      position: 1,
      name: "Tea",
      subItems: [
        { id: "2:1", position: 0, name: "Black tea", subItems: null },
        { id: "2:2", position: 1, name: "Green tea", subItems: null },
        { id: "2:3", position: 2, name: "Apply tea", subItems: null }
      ]
    },
    {
      id: "3",
      position: 2,
      name: "Milk",
      subItems: null
    }
  ]
};

const listReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROOT_ITEM":
      return {
        ...state,
        records: [
          ...state.records,
          newItem(action.name, state.records.length)
        ]
      };
    case "ADD_ITEM":
      return {
        ...state,
        records: addRecordById(
          [ ...state.records ],
          action.id,
          newItem(action.name)
        )
      };
    case "MOVE_UP":
      settingPositionById(
        [ ...state.records ],
        action.id,
        "up"
      );
      return {
        ...state
      };
    case "MOVE_DOWN":
      settingPositionById(
        [ ...state.records ],
        action.id,
        "down"
      );
      return {
        ...state
      };
    case "ADD_SUB_ITEM":
      return {
        ...state,
        records: updateArrayRecordById([ ...state.records ], action.id, { subItems: [] })
      };
    case "REMOVE_SUB_ITEM":
      return {
        ...state,
        records: updateArrayRecordById([ ...state.records ], action.id, { subItems: null })
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        records: removeRecordById([ ...state.records ], action.id)
      };
    default:
      return state;
  }
};

const App = () => {
  const [list, dispatch] = useReducer(listReducer, initialList);

  const handlerAction = useCallback((type, payload) => {
    dispatch({ type, ...payload });
  }, [dispatch]);

  return (
    <div>
      <h2>A Nested List Editor</h2>

      <List
        items={list.records}
        onAction={handlerAction}
      />
    </div>
  );
};

export default App;
