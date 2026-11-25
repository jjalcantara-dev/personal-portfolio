import { useEffect, useRef } from 'react';

// Calls onSolve once each time the puzzle goes from unsolved to solved.
export function useOnSolve(isSolved: boolean, onSolve?: () => void) {
  const notified = useRef(false);

  useEffect(() => {
    if (isSolved && !notified.current) {
      notified.current = true;
      onSolve?.();
    } else if (!isSolved) {
      notified.current = false;
    }
  }, [isSolved, onSolve]);
}
