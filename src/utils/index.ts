import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: any) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: Function) => {
  useEffect(() => {
    callback();
  }, []);
};

// 节流
export const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      func();
    }, delay);
  };
};

export const useDebounce = (value: Object, delay: number) => {
  // 每次在 value 变化以后，设置一个定时器
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个 useEffect 处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
