import { useState } from 'react';

function useList(init) {
  const [list, setList] = useState(init);
  return [
    list,
    function saveItem(index, name) {
      setList(
        list.map((item, k) => (k === index ? { ...item, name: name } : item)),
      );
    },
    function removeItem(name) {
      const filteredList = list.filter((item) => item.name !== name);
      setList(filteredList);
    },
  ];
}

export default useList;
