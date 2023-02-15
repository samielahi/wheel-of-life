import { useState, useEffect } from "react";

export default function useLocalStorage(key: string, defaultValue: any) {
  const [value, setValue] = useState<any>(() => {
    let currentValue = null;

    try {
      currentValue = JSON.parse(localStorage.getItem(key) || String(defaultValue));
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
