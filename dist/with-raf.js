(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.withRaf = factory());
}(this, (function () { 'use strict';

  /**
   * Higher order function for request animation frame-based throttling.
   * @param {function} fn - Function to be throttled
   * @param {function} callback - Callback function, which is triggered with the
   *   return value of `fn`.
   * @param {function} raf - Request animation frame polyfill. Defaults to
   *   `window.requestAnimationFrame`.
   * @return {function} Throttled function `fn`.
   */
  var withRaf = function (fn, callback, raf) {
    if ( raf === void 0 ) raf = window.requestAnimationFrame;

    var isRequesting = false;
    return function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (isRequesting) {
        return undefined;
      }
      return raf(function () {
        var resp = fn.apply(void 0, args);
        if (callback) { callback(resp); }
        isRequesting = false;
      });
    };
  };

  return withRaf;

})));
