import { useCallback } from "react";

const useDebounce = (fn, delay) => {

  const debouncedFunction = useCallback((...args) => {
    let timer;
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  },[fn, delay]);

  return debouncedFunction;
}

export default useDebounce;