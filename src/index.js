/**
 * Higher order function for request animation frame-based throttling.
 * @param {function} fn - Function to be throttled
 * @param {function} callback - Callback function, which is triggered with the
 *   return value of `fn`.
 * @param {function} raf - Request animation frame polyfill. Defaults to
 *   `window.requestAnimationFrame`.
 * @return {function} Throttled function `fn`.
 */
const withRaf = (fn, callback, raf = window.requestAnimationFrame) => {
  let isRequesting = false;
  return (...args) => {
    if (isRequesting) {
      return undefined;
    }
    return raf(() => {
      const resp = fn(...args);
      if (callback) callback(resp);
      isRequesting = false;
    });
  };
};

export default withRaf;
