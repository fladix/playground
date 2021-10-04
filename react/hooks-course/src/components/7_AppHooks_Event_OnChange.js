import React, { useState } from 'react';

function AppHooksOnChange() {
  const [name, setName] = useState('Batman');
  const [income, setIncome] = useState('high');

  const updateNameHandle = (e) => setName(e.target.value);
  const updateIncomeHandle = (e) => setIncome(e.target.value);
  const submitFormHandle = () =>
    console.log(`name: ${name}, income: ${income}`);

  return (
    <div className="App">
      <header className="App-header">
        <h1>OnChange Event in Forms</h1>
        <form onSubmit={submitFormHandle}>
          <div className="elem-onchange">
            <span>Name</span>
            <input type="text" value={name} onChange={updateNameHandle}></input>
          </div>
          <div className="elem-onchange">
            <span>Income</span>
            <select value={income} onChange={updateIncomeHandle}>
              <option value="high">High</option>
              <option value="mid">Mid</option>
              <option value="low">Low</option>
            </select>
            <input type="submit" value="submit"></input>
          </div>
        </form>
      </header>
    </div>
  );
}

export default AppHooksOnChange;
