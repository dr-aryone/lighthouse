/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * @fileoverview Diagnostic audit that lists all JavaScript libraries detected on the page
 */

'use strict';

const Audit = require('../audit.js');
const i18n = require('../../lib/i18n/i18n.js');

const UIStrings = {
  title: 'Detected JavaScript libraries',
  description: 'All front-end JavaScript libraries detected on the page.',
  columnName: 'Name',
  columnVersion: 'Version',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

class JsLibrariesAudit extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'js-libraries',
      title: str_(UIStrings.title),
      description: str_(UIStrings.description),
      requiredArtifacts: ['Stacks'],
    };
  }

  /**
   * @param {LH.Artifacts} artifacts
   * @return {LH.Audit.Product}
   */
  static audit(artifacts) {
    const libDetails = artifacts.Stacks
      .filter(stack => stack.detector === 'js')
      .map(stack => ({
        name: stack.name,
        version: stack.version,
        npm: stack.npm,
      }));

    /** @type {LH.Audit.Details.Table['headings']} */
    const headings = [
      {key: 'name', itemType: 'text', text: str_(UIStrings.columnName)},
      {key: 'version', itemType: 'text', text: str_(UIStrings.columnVersion)},
    ];
    const details = Audit.makeTableDetails(headings, libDetails, {});

    return {
      score: 1, // Always pass for now.
      details,
    };
  }
}

module.exports = JsLibrariesAudit;
module.exports.UIStrings = UIStrings;
