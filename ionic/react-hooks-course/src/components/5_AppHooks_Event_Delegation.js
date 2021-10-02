import React, { useState } from 'react';
import Item from './G_Hooks_Events_Delegation';

const initList = [
  { name: 'Tomato', kcals: 20 },
  { name: 'Orange', kcals: 80 },
  { name: 'Candy', kcals: 150 },
];

function AppHooksEventsDelegation() {
  const [list, setList] = useState(initList);
  const [editable, setEditable] = useState(false);

  function removeItemHandle(e) {
    /**
     * The onClick event on the button inside the Item component
     * will call removeItemHandle and inject a SyntheticBase Event (e).
     *
     * The handle passed as props to the child component will
     * have access to list and setList because of javascript closures.
     *
     * When we filter out the item from the list, we are actually altering
     * the component state. This forces React to update the component.
     * The App code will re-run and the Virtual DOM will be updated
     * accordingly (only affected elements) and the respective Item
     * component will be removed.That's why by removing the item from
     * the list, removes also the respective component from the screen.
     */
    //console.dir(e.target.name);
    const filteredList = list.filter((item) => item.name !== e.target.name);
    setList(filteredList);
  }

  function makeEditableHandle() {
    setEditable(true);
  }

  function saveItemHandle(e, i) {
    //console.dir(e.key);
    if (e.key === 'Enter') {
      setEditable(!editable);
      /**
       * In the course video the instructor uses the following code,
       *    const copyList = [...list];
       * and even though it does not use setList it works. That's
       * is because the spread operator makes a shallow copy meaning
       * it is a copy by reference. This is wrong since with it we
       * are actually MUTATING STATE. That's why it works without
       * setList. However we should not do this. See the right
       * implementation below.
       */
      setList(
        list.map((item, k) =>
          k === i ? { ...item, name: e.target.value } : item,
        ),
      );
    }
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

export default AppHooksEventsDelegation;
