import React from "react";
import PropTypes from "prop-types";

import List from "../List";

const ListItem = ({ first, last, name, items }) => {
  const len = items.length;

  return (
    <li>
      <span>{name}</span>
      {first ? null : <button>↑</button>}
      {last ? null : <button>↓</button>}
      {len ? null : <button>Add Sublist</button>}
      {len ? <button>Remove Sublist</button> : null}
      <button>Remove</button>

      {len ? (
        <List items={items} />
      ) : null}
    </li>
  );
};

ListItem.propTypes = {
  first: PropTypes.bool,
  last: PropTypes.bool,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired
};

ListItem.defaultProps = {
  first: false,
  last: false
};

export default ListItem;
