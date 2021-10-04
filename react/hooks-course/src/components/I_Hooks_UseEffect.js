import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0px 20px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 3px solid lightgray;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  border-top: 1px solid lightcyan;
  :first-of-type {
    border-top: none;
  }
`;

function Reddit({ subreddit }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    /**
     * Asyncronously fetch data over the network
     */
    async function fetchData() {
      const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
      const json = await res.json();
      setPosts(json.data.children.map((c) => c.data));
    }
    fetchData();
    /**
     * Re-run this effect when `subreddit` changes. We need to include all dependencies,
     * including the `setPosts` function
     */
  }, [subreddit, setPosts]);

  return (
    <List>
      {posts.map((post, index) => (
        <ListItem key={post.id}>
          {index + 1}. {post.title}
        </ListItem>
      ))}
    </List>
  );
}

export default Reddit;
