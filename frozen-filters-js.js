"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// uuid: 8c18aaee-1437-4faf-8122-cdf04abef102
// ------------------------------------------------------------------------
// Copyright (c) 2018 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License+uuid License. See License.txt for details
// ------------------------------------------------------------------------
var filters;
(function (filters) {
    var extractPath = function (input) {
        return input.match(/^(\w+):/)
            ? input.replace(/^\w+:[^\/]*\/\/[^\/]+(\/[^\?]+)(?:\?.*)?$/, '$1')
            : input.replace(/(?:\?.*)$/, '');
    };
    var urlFilters = {
        // Removes the extension part of an url.
        // e.g. `http://www.example.com/first/second/index?param1=value1&param2=value2`.
        remove_ext: function (input) { return input.replace(/\.[^\.\?]+(\?[^\?]*)?$/, '$1'); },
        // Removes the query string part of an url. e.g. `http://www.example.com/first/second/index.html`.
        remove_qs: function (input) { return input.replace(/\?[^\?]+$/, ''); },
        // Returns the basename of an url. e.g. `index.html`.
        extract_basename: function (input) { return input.replace(/^.*\/([^\/\?]+).*$/, '$1'); },
        // Returns the dirname of an url. e.g. `/first/second`.
        extract_dirname: function (input) { return extractPath(input).replace(/\/[^\/]+$/, '') || '/'; },
        // Returns the path of an url. e.g. `first/second/index.html`.
        extract_path: function (input) { return extractPath(input); },
        // Returns the protocol. e.g. `http`.
        extract_protocol: function (input) {
            var matches = input.match(/^(\w+):/);
            return matches ? matches[1] : '';
        },
        // Returns the query string part. e.g. `param1=value1&param2=value2`.
        extract_qs: function (input) { return input.replace(/^[^\?]*\??/, ''); },
    };
    function registerFilters(engine) {
        function addFilters(_filters) {
            Object.keys(_filters).forEach(function (filter) { return engine.registerFilter(filter, _filters[filter]); });
        }
        addFilters(urlFilters);
        return engine;
    }
    filters.registerFilters = registerFilters;
})(filters = exports.filters || (exports.filters = {}));
//# sourceMappingURL=frozen-filters-js.js.map