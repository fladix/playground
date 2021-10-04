import { useRef, useEffect } from 'react';

function usePrevious(value) {
  const ref = useRef(null);
  /**
   * We must remember `useEffect` runs only after rendering,
   * so it is always one value behind
   */
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
