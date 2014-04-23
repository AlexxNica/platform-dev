/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

// poor man's adapter for template.content on various platform scenarios
(function(scope) {
  scope.templateContent = scope.templateContent || function(inTemplate) {
    return inTemplate.content;
  };
})(window.Platform);
