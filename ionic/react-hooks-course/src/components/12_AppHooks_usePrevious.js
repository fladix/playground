import React, { useState } from 'react';
import usePrevious from '../hooks/usePrevious';
import styled from 'styled-components';

const Button = styled.button`
  height: 60px;
  width: 120;
  font-size: 22px;
`;

function AppHooksUsePrevious() {
  const [age, setAge] = useState(21);
  const previousAge = usePrevious(age);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Current age: {age}</h2>
        <h2>Previous age: {previousAge}</h2>
        <Button onClick={() => setAge(age - 1)}>Make me younger!</Button>
      </header>
    </div>
  );
}

export default AppHooksUsePrevious;
