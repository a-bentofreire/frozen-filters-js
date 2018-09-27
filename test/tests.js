"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// uuid: ea794d69-624f-4681-a0c5-2aca86d93aa1
// ------------------------------------------------------------------------
// Copyright (c) 2018 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License+uuid License. See License.txt for details
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
                            it(caseObj.src + "=" + caseObj.result, function () {
                                engine
                                    .parseAndRender(caseObj.src, vars)
                                    .then(function (result) {
                                    console.log(result);
                                    chai_1.assert.equal(result, caseObj.result);
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