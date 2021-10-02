import React, { useState } from 'react';
import Item from './F_Hooks_Events';

const initList = [
  { name: 'Tomato', kcals: 20 },
  { name: 'Orange', kcals: 80 },
  { name: 'Candy', kcals: 150 },
];

function AppHooksEvents() {
  const [list, setList] = useState(initList);

  function removeUnhealthyHandle() {
    const filteredList = list.filter((item) => item.kcals < 100);
    setList(filteredList);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Grocery List</h1>
        {list.map((item, i) => {
          let key = `${i}${item.name}${item.kcal}`;
          return <Item key={key} item={item}></Item>;
        })}
        <button className="button-remove" onClick={removeUnhealthyHandle}>
          Remove Unhealthy
        </button>
      </header>
    </div>
  );
}

export default AppHooksEvents;
