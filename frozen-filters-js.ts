"use strict";
// ------------------------------------------------------------------------
// Copyright (c) 2018-2024 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License.
// ------------------------------------------------------------------------

export namespace filters {

  const extractPath = (input: string): string =>
    input.match(/^(\w+):/)
      ? input.replace(/^\w+:[^\/]*\/\/[^\/]+(\/[^\?]+)(?:\?.*)?$/, '$1')
      : input.replace(/(?:\?.*)$/, '');


  interface Filters { [key: string]: (input, p?) => string; }

  const urlFilters: Filters = {

    // Removes the extension part of an url.
    // e.g. `http://www.example.com/first/second/index?param1=value1&param2=value2`.
    remove_ext: (input) => input.replace(/\.[^\.\?]+(\?[^\?]*)?$/, '$1'),

    // Removes the query string part of an url. e.g. `http://www.example.com/first/second/index.html`.
    remove_qs: (input) => input.replace(/\?[^\?]+$/, ''),

    // Returns the basename of an url. e.g. `index.html`.
    extract_basename: (input) => input.replace(/^.*\/([^\/\?]+).*$/, '$1'),

    // Returns the dirname of an url. e.g. `/first/second`.
    extract_dirname: (input) => extractPath(input).replace(/\/[^\/]+$/, '') || '/',

    // Returns the path of an url. e.g. `first/second/index.html`.
    extract_path: (input) => extractPath(input),

    // Returns the protocol. e.g. `http`.
    extract_protocol: (input) => {
      const matches = input.match(/^(\w+):/);
      return matches ? matches[1] : '';
    },

    // Returns the query string part. e.g. `param1=value1&param2=value2`.
    extract_qs: (input) => input.replace(/^[^\?]*\??/, ''),
  };


  const arrayFilters: Filters = {

    // Returns the first N elements of an array.
    // e.g. `{{ ["first","second","third"] | array_head: 2 }}` =~ `["first","second"]`.
    // If the number of parameters is negative it returns an empty array.
    // The the input isn't an array it returns the untouched input.
    array_head: (input, p) =>
      Array.isArray(input) ? (input as any[]).slice(0, Math.max(parseInt(p), 0)) : input,

    // Returns the last N elements of an array.
    // e.g. `{{ ["first","second","third"] | array_tail: 2 }}` =~ `["second","third"]`.
    // If the number of parameters is negative it returns an empty array.
    // The the input isn't an array it returns the untouched input.
    array_tail: (input, p) => Array.isArray(input)
      ? (input as any[]).slice(Math.max(input.length - Math.max(parseInt(p), 0), 0))
      : input,

    // Transforms an array into an enclose html tag list separated by newline.
    // e.g. `{{ ["first","second" | array_to_taglist: "li" }}` =~
    // ```html
    // <li>first</li>
    // <li>second</li>
    // ```
    // The the input isn't an array it returns the untouched input.
    array_to_taglist: (input, p) => Array.isArray(input)
      ? (input as any[]).map(item => `<${p}>${item}</${p}>`).join('\n')
      : input,
  };


  export function registerFilters(engine): any {
    function addFilters(_filters: Filters): void {
      Object.keys(_filters).forEach(filter => engine.registerFilter(filter, _filters[filter]));
    }
    addFilters(urlFilters);
    addFilters(arrayFilters);
    return engine;
  }
}
