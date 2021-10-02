import React, { useState } from 'react';
import styled from 'styled-components';
import Reddit from './I_Hooks_UseEffect';

/**
 * A functional React component uses props and/or state to calculate the output.
 * If the functional component makes calculations that don’t target the output value,
 * then these calculations are named side-effects.Examples of side-effects are
 * fetch requests, manipulating DOM directly, using timer functions
 * like setTimeout(), and more.
 * The component rendering and side-effect logic are independent.
 * So it would be a mistake to perform side-effects directly in the body of the component.
 * How often the component renders isn’t something you can control — if React
 * wants to render the component, you cannot stop it.
 *
 *  ###############################################################################
 *  # React remember all useEffect Hooks defined and run then after the component #
 *  # has rendered in the DOM/screen                                              #
 *  ###############################################################################
 */
const Container = styled.div`
  width: 600px;
  margin: 30px auto;
  font-size: 20px;
  color: darkblue;
`;

function AppHooksUseEffect() {
  const [inputValue, setInputValue] = useState('reactjs');
  const [subreddit, setSubreddit] = useState(inputValue);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page reloading by the browser
    setSubreddit(inputValue);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      <Reddit subreddit={subreddit} />
    </Container>
  );
}

export default AppHooksUseEffect;
