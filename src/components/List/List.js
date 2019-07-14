import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import ListItem from "../ListItem";

const sorting = (a, b) => a.position - b.position;

const List = ({ id, items, onAction }) => {
  const [name, setName] = useState("");

  const handleChangeName = useCallback(({ target: { value } }) => {
    setName(value);
  }, [setName]);

  const handleAdd = useCallback(() => {
    if (!name) {
      return;
    }
    onAction(id ? "ADD_ITEM" : "ADD_ROOT_ITEM", { id, name });
    setName("");
  }, [id, name, onAction, setName]);

  const lastIndex = items.length - 1;

  return (
    <ul>
      {items.sort(sorting).map(({ id, position, name, subItems }, index) => (
        <ListItem
          key={id}
          id={id}
          position={position}
          first={index === 0}
          last={lastIndex === index}
          name={name}
          items={subItems}
          onAction={onAction}
        />
      ))}

      <li>
        <input value={name} onChange={handleChangeName} />
        <button onClick={handleAdd}>Add</button>
      </li>
    </ul>
  );
};

List.propTypes = {
  id: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  onAction: PropTypes.func.isRequired
};

List.defaultProps = {
  id: null
};

export default List;
