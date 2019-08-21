import { useState, useRef, useEffect, useMemo } from 'react';

function arraysEqual(one, two) {
  if (one.length !== two.length) {
    return false;
  }
  for (let i = 0; i < one.length; i++) {
    if (one[i] !== two[i]) {
      return false;
    }
  }
  return true;
}

function useKeySequence(seq = [], timeout = 1000) {
  if (
    typeof window === `undefined` ||
    seq.length === 0 ||
    !Array.isArray(seq)
  ) {
    return false;
  }
  const compareSequence = useMemo(() => seq.map(s => s.toLowerCase()), [seq]);
  const currentSequence = useRef([]);
  const timeoutRef = useRef(0);
  const [state, set] = useState(false);

  const resetCurrentSequence = () => {
    currentSequence.current = [];
    set(false);
  };

  const handleKeydown = e => {
    const str = String.fromCharCode(e.which).toLowerCase();
    currentSequence.current.push(str);
    if (arraysEqual(currentSequence.current, compareSequence)) {
      set(true);
    }
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(resetCurrentSequence, timeout);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      clearTimeout(timeoutRef.current);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return state;
}

export default useKeySequence;
