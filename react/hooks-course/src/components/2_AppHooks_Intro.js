import React, { useState } from 'react';

function AppHooksIntro() {
  const [age, setAge] = useState(50);
  const ageUpHandle = () => {
    setAge(age + 1);
  };
  const ageDownHandle = () => {
    setAge(age - 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Use State Hook</h1>
        <h2>Age: {age}</h2>
        <button onClick={ageUpHandle}>Increment</button>
        <button onClick={ageDownHandle}>Decrement</button>
      </header>
    </div>
  );
}

export default AppHooksIntro;
