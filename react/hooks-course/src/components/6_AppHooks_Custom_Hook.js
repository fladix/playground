import React, { useState } from 'react';
import Item from './G_Hooks_Events_Delegation';
import useList from '../hooks/useList';

const initList = [
  { name: 'Tomato', kcals: 20 },
  { name: 'Orange', kcals: 80 },
  { name: 'Candy', kcals: 150 },
];

function AppHooksCustomHook() {
  const [list, saveItem, removeItem] = useList(initList);
  const [editable, setEditable] = useState(false);

  function removeItemHandle(e) {
    removeItem(e.target.name);
  }

  function saveItemHandle(e, i) {
    if (e.key === 'Enter') {
      setEditable(!editable);
      saveItem(i, e.target.value);
    }
  }

  function makeEditableHandle() {
    setEditable(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Grocery List</h1>
        {list.map((item, i) => {
          let key = `${i}${item.name}${item.kcal}`;
          return (
            <Item
              key={key}
              editable={editable}
              item={item}
              onClick={removeItemHandle}
              onDoubleClick={makeEditableHandle}
              onKeyPress={saveItemHandle}
              index={i}
            ></Item>
          );
        })}
      </header>
    </div>
  );
}

export default AppHooksCustomHook;
