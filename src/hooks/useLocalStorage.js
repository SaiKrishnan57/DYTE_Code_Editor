// hook to store and access JSON data from localStorage

import { useEffect, useState } from "react";

// Declare prefix
const PREFIX = "DYTE-APP";
export default function useLocalStorage(key, initialValue) {
  // create a key with a prefix
  const prefixedKey = PREFIX + key;
  // Get JSON from localStorage
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });
  // Update localStorage
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value), [
      prefixedKey,
      value,
    ]);
  });
  return [value, setValue];
}
