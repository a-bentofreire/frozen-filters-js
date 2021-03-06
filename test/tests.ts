"use strict";
// uuid: ea794d69-624f-4681-a0c5-2aca86d93aa1

// ------------------------------------------------------------------------
// Copyright (c) 2018 Alexandre Bento Freire. All rights reserved.
// Licensed under the MIT License+uuid License. See License.txt for details
// ------------------------------------------------------------------------

import * as sysFs from "fs";
import { assert } from "chai";

// import * as frozenTags from "../frozen-filters-js";

const Liquid = require("liquidjs");
const frozenFilters = require("../frozen-filters-js").filters;

function tests() {

  const engine = Liquid();

  frozenFilters.registerFilters(engine);

  const cfg = JSON.parse(sysFs.readFileSync('./test/config.json', { encoding: 'utf-8' }));

  const vars = cfg.vars;

  Object.keys(cfg.tests).forEach(groupName => {
    // tslint:disable-next-line:only-arrow-functions
    describe(groupName, function() {
      const group = cfg.tests[groupName];

      Object.keys(group).forEach(testName => {
        const test = group[testName];
        // tslint:disable-next-line:only-arrow-functions
        describe(testName, function() {
          test.forEach(caseObj => {
            if (caseObj.enabled !== false) {
              // tslint:disable-next-line:only-arrow-functions
              it(`${caseObj.src}=${caseObj.result}`, function(done) {
                engine
                  .parseAndRender(caseObj.src, vars)
                  .then((result) => {
                    // console.log(result);
                    assert.equal(result, caseObj.result);
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
