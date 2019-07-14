import React, { useCallback } from "react";
import PropTypes from "prop-types";

import List from "../List";

const ListItem = ({ id, position, first, last, name, items, onAction }) => {
  const moveUp = useCallback(() => {
    onAction("MOVE_UP", { id });
  }, [id, onAction]);

  const moveDown = useCallback(() => {
    onAction("MOVE_DOWN", { id });
  }, [id, onAction]);

  const addSubItem = useCallback(() => {
    onAction("ADD_SUB_ITEM", { id });
  }, [id, onAction]);

  const removeSubItem = useCallback(() => {
    onAction("REMOVE_SUB_ITEM", { id });
  }, [id, onAction]);

  const removeItem = useCallback(() => {
    onAction("REMOVE_ITEM", { id });
  }, [id, onAction]);

  return (
    <li>
      <span>{name}</span>
      {first ? null : <button onClick={moveUp}>↑</button>}
      {last ? null : <button onClick={moveDown}>↓</button>}
      {items ? null : <button onClick={addSubItem}>Add Sublist</button>}
      {items ? <button onClick={removeSubItem}>Remove Sublist</button> : null}
      <button onClick={removeItem}>Remove</button>

      {items ? (
        <List id={id} items={items} onAction={onAction} />
      ) : null}
    </li>
  );
};

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  first: PropTypes.bool,
  last: PropTypes.bool,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.any),
  onAction: PropTypes.func.isRequired
};

ListItem.defaultProps = {
  first: false,
  last: false,
  items: null
};

export default ListItem;
