import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  // Read from localStorage only once when the component first loads.
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);
    try {
      return savedValue ? JSON.parse(savedValue) : initialValue;
    } catch (error) {
      console.error("Error parsing localStorage value:", error);
      alert(
        "There was an error loading your data. Starting with default values.",
      );
      return initialValue;
    }
  });

  // Whenever the state changes, save the latest value back to the browser.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
