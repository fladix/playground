import React, { useRef, useEffect } from 'react';

function AppHooksUseRef() {
  const refFirstName = useRef(null);
  const refLastName = useRef(null);
  useEffect(() => refFirstName.current.focus(), []);

  const style = {
    border: '1px solid gray',
    padding: '20px',
    background: 'darkcyan',
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>useRef</h1>
        <p style={style}>
          useRefs is primarily used as a way to access the DOM. If you pass a
          ref object to React with &lt;div ref={'{myRef}'} /&gt;, React will set
          its .current property to the corresponding DOM node whenever that node
          changes.
        </p>
        <div className="elem-useref">
          <span>First name</span>
          <input ref={refFirstName} type="text"></input>
        </div>
        <div className="elem-useref">
          <span>Last name</span>
          <input ref={refLastName} type="text"></input>
        </div>
      </header>
    </div>
  );
}

export default AppHooksUseRef;
