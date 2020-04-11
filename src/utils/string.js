export const toCamel = s => s.replace(/([-_]\w)/gi, $1 => $1.toUpperCase().replace('-', '').replace('_', ''));

export const isArray = a => Array.isArray(a);

export const isObject = o => o === Object(o) && !isArray(o) && typeof o !== 'function';

export const keysToCamel = o => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(k => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  }
  if (isArray(o)) {
    return o.map(i => keysToCamel(i));
  }

  return o;
};

export const camelCaseKeysToUnderscore = obj => {
  if (typeof obj !== 'object') {
    return obj;
  }

  const obj2 = { ...obj };

  Object.keys(obj2).forEach(oldName => {
    // Camel to underscore
    const newName = oldName.replace(/([A-Z])/g, $1 => `_${$1.toLowerCase()}`);

    // Only process if names are different
    if (newName !== oldName) {
      // Check for the old property name to avoid a ReferenceError in strict mode.
      if (Object.prototype.hasOwnProperty.call(obj2, oldName)) {
        obj2[newName] = obj2[oldName];
        delete obj2[oldName];
      }
    }

    // Recursion
    if (typeof obj2[newName] === 'object') {
      obj2[newName] = camelCaseKeysToUnderscore(obj2[newName]);
    }
  });
  return obj2;
};

export const urlencode = s => {
  const symbols = {
    '@': '%40',
    '&amp;': '%26',
    '*': '%2A',
    '+': '%2B',
    '/': '%2F',
    '&lt;': '%3C',
    '&gt;': '%3E',
  };
  return s.replace(/([@*+/]|&(amp|lt|gt);)/g, m => symbols[m]);
};

export const getInitials = s => s
  .split(' ')
  .map(x => x.charAt(0))
  .join('')
  .substr(0, 2)
  .toUpperCase();
