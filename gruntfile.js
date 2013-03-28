/*
 * Copyright 2013 The Toolkitchen Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */
module.exports = function(grunt) {
  ShadowDOM = [
    'sidetable.js',
    'wrappers.js',
    'wrappers/EventTarget.js',
    'wrappers/NodeList.js',
    'wrappers/Node.js',
    'wrappers/node-interfaces.js',
    'wrappers/CharacterData.js',
    'wrappers/Element.js',
    'wrappers/HTMLElement.js',
    'wrappers/HTMLContentElement.js',
    'wrappers/HTMLShadowElement.js',
    'wrappers/HTMLTemplateElement.js',
    'wrappers/HTMLUnknownElement.js',
    'wrappers/generic.js',
    'wrappers/ShadowRoot.js',
    'ShadowRenderer.js',
    'wrappers/Document.js',
    'wrappers/override-constructors.js'
  ];
  ShadowDOM = ShadowDOM.map(function(p) {
    return 'ShadowDOM/src/' + p;
  });
  ShadowDOM.push(
    'lib/querySelector.js'
  );

  Patches = [
    'lib/lang.js',
    'lib/dom_token_list.js',
    'lib/patches.js',
    'lib/inspector.js'
  ];
 
  var MDV = [
    '../third_party/ChangeSummary/planner.js',
    '../third_party/ChangeSummary/change_summary.js',
    'compat.js',
    'side_table.js',
    'model.js',
    'node_bindings.js',
    'template_element.js'
  ];
  MDV = MDV.map(function(p) {
    return 'MDV/src/' + p;
  });
  MDV.push(
    'lib/dirty-check.js'
  );
    
  PointerEvents = [
    'touch-action.js',
    'PointerEvent.js',
    'pointermap.js',
    'sidetable.js',
    'dispatcher.js',
    'installer.js',
    'findTarget.js',
    'platform-events.js',
    'capture.js',
  ];
  PointerEvents = PointerEvents.map(function(p) {
    return 'PointerGestures/src/PointerEvents/src/' + p;
  });

  PointerGestures = [
    'PointerGestureEvent.js',
    'initialize.js',
    'sidetable.js',
    'pointermap.js',
    'dispatcher.js',
    'hold.js',
    'track.js',
    'flick.js',
    'tap.js'
  ];
  PointerGestures = PointerGestures.map(function(p) {
    return 'PointerGestures/src' + p;
  });

  WebComponents = [
    'WebComponents/src/WebComponents.js'
  ];
  
  CustomElements = [
    'CustomElements/src/CustomElements.js',
    'CustomElements/src/HTMLElementElement.js',
    'CustomElements/src/Parser.js'
  ];

  Platform = [].concat(
    Patches,
    MDV,
    WebComponents, 
    CustomElements,
    PointerEvents,
    PointerGestures
  );
    
  PlatformPoly = [].concat(
    ShadowDOM,
    Patches,
    MDV,
    WebComponents, 
    CustomElements,
    PointerEvents,
    PointerGestures
  );

  grunt.initConfig({
    uglify: {
      Platform: {
        options: {
          //compress: false, mangle: false, beautify: true        
        },
        files: {
          'platform.min.js': Platform
        }
      },
      PlatformPoly: {
        options: {
          compress: false, mangle: false, xbeautify: true        
        },
        files: {
          'platform.poly.min.js': PlatformPoly
        }
      }
    },
    
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          exclude: 'third_party',
          paths: '.',
          outdir: 'docs',
          linkNatives: 'true',
          tabtospace: 2,
          themedir: '../docs/doc_themes/simple'
        }
      }
    },
    pkg: grunt.file.readJSON('package.json')
  });

  // plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  // tasks
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('minify', ['uglify']);
  grunt.registerTask('docs', ['yuidoc']);
};

