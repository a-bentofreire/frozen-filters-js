"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// uuid: 8c18aaee-1437-4faf-8122-cdf04abef102
// ------------------------------------------------------------------------
// Copyright (c) 2018 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License+uuid License. See License.txt for details
// ------------------------------------------------------------------------
var frozenTags;
(function (frozenTags) {
    var urlFilters = {
        // Removes the extension part of an url.
        // e.g. `http://www.example.com/first/second/index?param1=value1&param2=value2`.
        remove_ext: function (input) { return input.replace(/\.[^\.\?]+(\?[^\?]*)?$/, '$1'); },
        // Removes the query string part of an url. e.g. `http://www.example.com/first/second/index.html`.
        remove_qs: function (input) { return input.replace(/\?[^\?]+$/, ''); },
        // Returns the basename of an url. e.g. `index.html`.
        extract_basename: function (input) { return input.replace(/^.*\/([^\/\?]+).*$/, '$1'); },
        // Returns the dirname of an url. e.g. `first/second`.
        extract_dirname: function (input) {
            return input.match(/^(\w+):/)
                ? input.replace(/^\w+:[^\/]*\/\/[^\/]+(\/[^\?]+)\/.*$/, '$1')
                : input.replace(/\/[^\/]+$/, '');
        },
        // Returns the protocol. e.g. `http`.
        extract_protocol: function (input) {
            var matches = input.match(/^(\w+):/);
            return matches ? matches[1] : '';
        },
    };
    function registerFilters(engine) {
        function addFilters(filters) {
            Object.keys(filters).forEach(function (filter) { return engine.registerFilter(filter, filters[filter]); });
        }
        addFilters(urlFilters);
        return engine;
    }
    frozenTags.registerFilters = registerFilters;
})(frozenTags = exports.frozenTags || (exports.frozenTags = {}));
//# sourceMappingURL=frozen-filters-js.js.map