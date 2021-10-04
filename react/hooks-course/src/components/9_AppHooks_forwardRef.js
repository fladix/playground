import React, { useRef, useEffect } from 'react';
import InputField from './H_Hooks_ForwardRef';

function AppHooksForwardRef() {
  const refFirstName = useRef(null);
  const refLastName = useRef(null);
  useEffect(() => refFirstName.current.focus(), []);

  const style = {
    border: '1px solid gray',
    padding: '20px',
    background: 'darkcyan',
  };

  const buttonStyle = {
    fontSize: '18px',
    backgroundColor: 'hotpink',
    width: '200px',
    padding: '10px',
    margin: '10px',
  };

  const moveNextHandle = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); /* Prevents undesirable Submit */
      switch (e.target.id) {
        case 'first':
          refLastName.current.focus();
          break;
        case 'last':
          refFirstName.current.focus();
          break;
        default:
          console.log(e.target.id);
      }
    }
  };

  const submitFormHandle = (e) => {
    console.log(`${refFirstName.current.value} ${refLastName.current.value}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>forwardRef</h1>
        <p style={style}>
          Ref forwarding is an opt-in feature that lets some components take a
          ref they receive, and pass it further down (in other words, “forward”
          it) to a child.
        </p>
        <form onSubmit={submitFormHandle}>
          <InputField
            id="first"
            label="First Name"
            ref={refFirstName}
            onKeyPress={moveNextHandle}
          ></InputField>
          <InputField
            id="last"
            label="Last Name"
            ref={refLastName}
            onKeyPress={moveNextHandle}
          ></InputField>
          <input style={buttonStyle} type="submit" value="Submit"></input>
        </form>
      </header>
    </div>
  );
}

export default AppHooksForwardRef;
