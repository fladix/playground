import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

const users = [
  { id: 1, name: 'Joseph Jojo' },
  { id: 2, name: 'Mary Mama' },
  { id: 3, name: 'Jesus Jeje' },
  { id: 4, name: 'John Jojo' },
  { id: 5, name: 'Paul Papa' },
];

const StyledList = styled.ul`
  list-style: none;
  padding: 0px 20px;
`;

const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
`;

const List = ({ list }) => {
  return (
    <StyledList>
      {list.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </StyledList>
  );
};

const Button = styled.button`
  height: 30px;
  width: 90px;
  margin-left: 2rem;
`;

const Input = styled.input`
  height: 25px;
  width: 200px;
`;

const ListItem = ({ item }) => {
  return <StyledListItem>{item.name}</StyledListItem>;
};

const Container = styled.div`
  width: 600px;
  margin: 30px auto;
  font-size: 20px;
  color: darkblue;
`;

/**
 * Example of a React application which renders a list of users and
 * allows us to filter the users by their name.
 * The catch: The filter happens only when a user explicitly clicks a button;
 * not already when the user types into the input field
 *
 * Even though the filteredUsers don't change when someone types into the input field,
 * because they change only when clicking the button via the search state,
 * the filter's callback function runs again and again (if we do not `useMemo`)
 * for every keystroke in the input field.
 *
 * We use `useMemo` to solve this problem
 */
function AppHooksUseMemo() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleSearch = () => {
    setSearch(text);
  };

  /**
   * Without useMemo:
   *
   *      const filteredUsers = users.filter((user) => {
   *        console.log('Filter function is running ...');
   *        return user.name.toLowerCase().includes(search.toLowerCase());
   *      });
   *
   */

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        console.log('Filter function is running ...');
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search],
  );

  return (
    <Container>
      <Input type="text" value={text} onChange={handleText} />
      <Button type="Button" onClick={handleSearch}>
        Search
      </Button>
      <List list={filteredUsers} />
    </Container>
  );
}

export default AppHooksUseMemo;
