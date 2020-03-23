export const toCamel = s => s.replace(/([-_][a-z])/gi, $1 => $1
  .toUpperCase()
  .replace('-', '')
  .replace('_', ''));

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
