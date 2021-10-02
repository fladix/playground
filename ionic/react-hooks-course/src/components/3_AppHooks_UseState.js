import React, { useState } from 'react';
import NameTag from './A_Props_Attributes';

const initNames = [
  { firstName: 'John', lastName: 'Johnson' },
  { firstName: 'Mark', lastName: 'Markson' },
  { firstName: 'Lea', lastName: 'Leason' },
];

function AppHooksUseState() {
  const [names, setNames] = useState(initNames);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Use Effect Hook</h1>
        {names.map((name, i) => {
          let key = `${i}${name.firstName}${name.lastName}`;
          return (
            <NameTag
              key={key}
              firstName={name.firstName}
              lastName={name.lastName}
            ></NameTag>
          );
        })}
      </header>
    </div>
  );
}

export default AppHooksUseState;
