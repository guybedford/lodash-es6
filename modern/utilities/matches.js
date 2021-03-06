/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="es6" -o ./modern/`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
import baseIsEqual from '../internals/baseIsEqual';
import isObject from '../objects/isObject';
import keys from '../objects/keys';

/** Used for native method references */
var objectProto = Object.prototype;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a "_.where" style function, which performs a deep comparison
 * between a given object and the `source` object, returning `true` if the
 * given object has equivalent property values, else `false`.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var characters = [
 *   { 'name': 'fred',   'age': 40 },
 *   { 'name': 'barney', 'age': 36 }
 * ];
 *
 * var matchesAge = _.matches({ 'age': 36 });
 *
 * _.filter(characters, matchesAge);
 * // => [{ 'name': 'barney', 'age': 36 }]
 *
 * _.find(characters, matchesAge);
 * // => { 'name': 'barney', 'age': 36 }
 */
function matches(source) {
  source || (source = {});

  var props = keys(source),
      key = props[0],
      a = source[key];

  // fast path the common case of providing an object with a single
  // property containing a primitive value
  if (props.length == 1 && a === a && !isObject(a)) {
    return function(object) {
      if (!hasOwnProperty.call(object, key)) {
        return false;
      }
      // treat `-0` vs. `+0` as not equal
      var b = object[key];
      return a === b && (a !== 0 || (1 / a == 1 / b));
    };
  }
  return function(object) {
    var length = props.length,
        result = false;

    while (length--) {
      var key = props[length];
      if (!(result = hasOwnProperty.call(object, key) &&
            baseIsEqual(object[key], source[key], null, true))) {
        break;
      }
    }
    return result;
  };
}

export default matches;
