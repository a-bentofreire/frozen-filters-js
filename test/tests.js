"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ------------------------------------------------------------------------
// Copyright (c) 2018-2024 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License.
// ------------------------------------------------------------------------
var sysFs = require("fs");
var chai_1 = require("chai");
// import * as frozenTags from "../frozen-filters-js";
var Liquid = require("liquidjs");
var frozenFilters = require("../frozen-filters-js").filters;
function tests() {
    var engine = Liquid();
    frozenFilters.registerFilters(engine);
    var cfg = JSON.parse(sysFs.readFileSync('./test/config.json', { encoding: 'utf-8' }));
    var vars = cfg.vars;
    Object.keys(cfg.tests).forEach(function (groupName) {
        // tslint:disable-next-line:only-arrow-functions
        describe(groupName, function () {
            var group = cfg.tests[groupName];
            Object.keys(group).forEach(function (testName) {
                var test = group[testName];
                // tslint:disable-next-line:only-arrow-functions
                describe(testName, function () {
                    test.forEach(function (caseObj) {
                        if (caseObj.enabled !== false) {
                            // tslint:disable-next-line:only-arrow-functions
                            it(caseObj.src + "=" + caseObj.result, function (done) {
                                engine
                                    .parseAndRender(caseObj.src, vars)
                                    .then(function (result) {
                                    // console.log(result);
                                    chai_1.assert.equal(result, caseObj.result);
                                    done();
                                });
                            });
                        }
                    });
                });
            });
        });
    });
}
tests();
//# sourceMappingURL=tests.js.map