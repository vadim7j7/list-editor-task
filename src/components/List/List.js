import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import ListItem from "../ListItem";

const sorting = (a, b) => a.position - b.position;

const List = ({ items }) => {
  const [name, setName] = useState("");

  const handleChangeName = useCallback(({ target: { value } }) => {
    setName(value);
  }, [setName]);

  const lastIndex = items.length - 1;

  return (
    <ul>
      {items.sort(sorting).map(({ id, name, subItems }, index) => (
        <ListItem
          key={id}
          first={index === 0}
          last={lastIndex === index}
          name={name}
          items={subItems}
        />
      ))}

      <li>
        <input value={name} onChange={handleChangeName} />
        <button>Add</button>
      </li>
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default List;
