/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize underscore exports="es6" -o ./underscore/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
import baseEach from '../internals/baseEach';
import slice from '../arrays/slice';

/**
 * Invokes the method named by `methodName` on each element in the `collection`
 * returning an array of the results of each invoked method. Additional arguments
 * will be provided to each invoked method. If `methodName` is a function it
 * will be invoked for, and `this` bound to, each element in the `collection`.
 *
 * @static
 * @memberOf _
 * @category Collections
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|string} methodName The name of the method to invoke or
 *  the function invoked per iteration.
 * @param {...*} [args] Arguments to invoke the method with.
 * @returns {Array} Returns a new array of the results of each invoked method.
 * @example
 *
 * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
 * // => [[1, 5, 7], [1, 2, 3]]
 *
 * _.invoke([123, 456], String.prototype.split, '');
 * // => [['1', '2', '3'], ['4', '5', '6']]
 */
function invoke(collection, methodName) {
  var index = -1,
      isFunc = typeof methodName == 'function',
      length = collection ? collection.length : 0,
      result = Array(typeof length == 'number' ? length : 0);

  var args = slice(arguments, 2);
  baseEach(collection, function(value) {
    result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
  });

  return result;
}

export default invoke;
