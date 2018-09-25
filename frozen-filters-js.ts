"use strict";
// uuid: 8c18aaee-1437-4faf-8122-cdf04abef102

// ------------------------------------------------------------------------
// Copyright (c) 2018 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License+uuid License. See License.txt for details
// ------------------------------------------------------------------------

export namespace frozenTags {

  interface Filters { [key: string]: (input) => string; }

  const urlFilters: Filters = {

    // Removes the extension part of an url.
    // e.g. `http://www.example.com/first/second/index?param1=value1&param2=value2`.
    remove_ext: (input) => input.replace(/\.[^\.\?]+(\?[^\?]*)?$/, '$1'),

    // Removes the query string part of an url. e.g. `http://www.example.com/first/second/index.html`.
    remove_qs: (input) => input.replace(/\?[^\?]+$/, ''),

    // Returns the basename of an url. e.g. `index.html`.
    extract_basename: (input) => input.replace(/^.*\/([^\/\?]+).*$/, '$1'),

    // Returns the dirname of an url. e.g. `first/second`.
    extract_dirname: (input) =>
      input.match(/^(\w+):/)
        ? input.replace(/^\w+:[^\/]*\/\/[^\/]+(\/[^\?]+)\/.*$/, '$1')
        : input.replace(/\/[^\/]+$/, ''),

    // Returns the protocol. e.g. `http`.
    extract_protocol: (input) => {
      const matches = input.match(/^(\w+):/);
      return matches ? matches[1] : '';
    },
  };

  export function registerFilters(engine): any {
    function addFilters(filters: Filters): void {
      Object.keys(filters).forEach(filter => engine.registerFilter(filter, filters[filter]));
    }
    addFilters(urlFilters);
    return engine;
  }
}
