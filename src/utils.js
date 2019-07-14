export const newItem = (name, position = null) => ({
  name,
  position,
  id: (new Date().getTime()).toString(),
  subItems: null
});

export const settingPositionById = (items, id, to, subKey = "subItems") => {
  for(let i = 0; i <= items.length; i = i + 1) {
    if (items[i]) {
      if (items[i].id === id) {
        const tmp = items[i].position;
        if (to === "up") {
          items[i].position = items[i-1].position;
          items[i-1].position = tmp;
        } else {
          items[i].position = items[i+1].position;
          items[i+1].position = tmp;
        }
      } else {
        if (items[i][subKey]) {
          items[i][subKey] = settingPositionById(items[i][subKey], id, to, subKey)
        }
      }
    }
  }

  return items;
};

export const updateArrayRecordById = (items, id, attrs = {}, subKey = "subItems") => (
  items.map(item => {
    if (item.id === id) {
      return {
        ...item,
        ...attrs
      };
    } else {
      if (item[subKey]) {
        item[subKey] = updateArrayRecordById(item[subKey], id, attrs, subKey);
      }
      return item;
    }
  })
);

export const removeRecordById = (items, id, subKey = "subItems") => (
  items.filter(item => {
    if (item.id === id) {
      return false;
    } else {
      if (item[subKey]) {
        item[subKey] = removeRecordById(item[subKey], id, subKey);
      }
      return true;
    }
  })
);

export const addRecordById = (items, id, record, subKey = "subItems") => {
  for(let i = 0; i <= items.length; i = i + 1) {
    if (items[i] && items[i][subKey]) {
      if (items[i].id === id) {
        record.position = items[i][subKey].length;
        items[i][subKey].push(record);
      } else {
        items[i][subKey] = addRecordById(items[i][subKey], id, record, subKey)
      }
    }
  }

  return items;
};
