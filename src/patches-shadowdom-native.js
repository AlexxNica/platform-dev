/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */
(function(scope) {

  // so we can call wrap/unwrap without testing for ShadowDOMPolyfill
  window.wrap = window.unwrap = function(n){
    return n;
  }

  addEventListener('DOMContentLoaded', function() {
    if (CustomElements.useNative === false) {
      var originalCreateShadowRoot = Element.prototype.createShadowRoot;
      Element.prototype.createShadowRoot = function() {
        var root = originalCreateShadowRoot.call(this);
        CustomElements.watchShadow(this);
        return root;
      };
    }
  });

  Platform.templateContent = function(inTemplate) {
    // if MDV exists, it may need to boostrap this template to reveal content
    if (window.HTMLTemplateElement && HTMLTemplateElement.bootstrap) {
      HTMLTemplateElement.bootstrap(inTemplate);
    }
    // fallback when there is no Shadow DOM polyfill, no MDV polyfill, and no
    // native template support
    if (!inTemplate.content && !inTemplate._content) {
      var frag = document.createDocumentFragment();
      while (inTemplate.firstChild) {
        frag.appendChild(inTemplate.firstChild);
      }
      inTemplate._content = frag;
    }
    return inTemplate.content || inTemplate._content;
  };

})(window.Platform);
