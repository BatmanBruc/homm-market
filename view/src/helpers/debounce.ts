export default function debounce(fn: () => any, timeout: number) {
  let timer: number | null = null;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    //@ts-ignore
    timer = setTimeout(() => {
      timer = null;
      //@ts-ignore
      fn(...args);
    }, timeout);
  };
};
