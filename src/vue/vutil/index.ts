export let debounce = (func: Function, wait: number, immediate: boolean) => {
  let timeout;
  return (...args) => {
    let later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait as any);
    if (callNow) func.apply(this, args);
  };
}