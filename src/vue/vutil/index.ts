/**
 * 
 * @param func Function to debounce
 * @param wait Minimum duration before calling the function, after the last source call
 * @param immediate Whether to call the function immediately if not currently debouncing
 */
export let debounce = (func: Function, wait: number, immediate: boolean = false) => {
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