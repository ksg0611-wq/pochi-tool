import { useState, useEffect } from 'react';

export function useAutoSave<T>(key: string, initialValue: T, queryParamKey?: string) {
  // SSR mismatch 방지를 위해 초기 렌더링 시에는 initialValue 사용
  const [value, setValue] = useState<T>(initialValue);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let resolvedValue: T | undefined = undefined;

    // 1. URL 파라미터 확인 (우선순위 높음)
    if (queryParamKey) {
      const params = new URLSearchParams(window.location.search);
      const queryValue = params.get(queryParamKey);
      if (queryValue !== null) {
        if (typeof initialValue === 'boolean') {
          resolvedValue = (queryValue === 'true') as unknown as T;
        } else if (typeof initialValue === 'number') {
          resolvedValue = Number(queryValue) as unknown as T;
        } else {
          resolvedValue = queryValue as unknown as T;
        }
      }
    }

    // 2. localStorage 확인 (우선순위 낮음)
    if (resolvedValue === undefined) {
      try {
        const saved = localStorage.getItem(key);
        if (saved) {
          resolvedValue = JSON.parse(saved);
        }
      } catch (e) {
        console.error(`Failed to load ${key} from localStorage`, e);
      }
    }

    if (resolvedValue !== undefined) {
      setValue(resolvedValue);
    }
  }, [key, queryParamKey, initialValue]);

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
