import { useState, useEffect } from 'react';

export function useAutoSave<T>(key: string, initialValue: T) {
  // SSR mismatch 방지를 위해 초기 렌더링 시에는 initialValue 사용
  const [value, setValue] = useState<T>(initialValue);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        setValue(JSON.parse(saved));
      }
    } catch (e) {
      console.error(`Failed to load ${key} from localStorage`, e);
    }
  }, [key]);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error(`Failed to save ${key} to localStorage`, e);
      }
    }
  }, [key, value, isMounted]);

  return [value, setValue] as const;
}
