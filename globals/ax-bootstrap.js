(function (exports) {
  'use strict';


  function ScriptLoader() {
    var loadingScripts = [];
    var globalScripts = ['ng-runtime-dll.js', 'shim.js', 'zone.js',];

    function getHeadElement() {
      return document.getElementsByTagName('head')[0];
    }

    function isInDom(src) {
      var nodes = document.querySelectorAll("script[src]");
      for (var i = 0; i < nodes.length; i++) {
        var nodeSrc = nodes[i].src;
        if (isSrcEqual(nodeSrc, src)) {
          return true;
        }
      }
      return false;
    }

    function isSrcEqual(src1, src2) {
      var fileName1 = getFileName(src1);
      var fileName2 = getFileName(src2);
      if (fileName1 === fileName2 && isGlobalFileName(fileName1)) {
        return true;
      }
      return src1 === src2;
    }

    function getFileName(src) {
      return src.substring(src.lastIndexOf('/') + 1);
    }

    function isGlobalFileName(fileName) {
      return globalScripts.some(function (globalFileName) {
        return fileName === globalFileName;
      });
    }

    function getLoadingScriptIndex(src) {
      var idx = -1;
      loadingScripts.forEach(function (loadingScript, index) {
        if (isSrcEqual(loadingScript.src, src)) {
          idx = index;
        }
      });
      return idx;
    }

    function onScriptLoaded(src) {
      console.log("Loaded script src: " + src);
      var idx = getLoadingScriptIndex(src);
      if (idx >= 0) {
        loadingScripts[idx].callbacks.forEach(function (callback) {
          console.log("Executing callback for script src: " + src);
          callback(src);
        });
        loadingScripts.splice(idx, 1);
      } else {
        console.error("Missing callback for script src: " + src);
      }
    }

    function load(src, callback) {
      var idx = getLoadingScriptIndex(src);
      if (idx === -1 && isInDom(src)) {
        console.log("Script src: " + src + " already in DOM");
        if (callback) {
          callback(src);
        }
      } else {
        if (idx === -1) {
          console.log("Loading script src: " + src);
          var head = getHeadElement();
          var script = document.createElement("script");
          script.setAttribute("type", "text/javascript");
          script.setAttribute("src", src);
          // script.setAttribute("defer", "defer");
          head.appendChild(script);
          var loadingScript = {
            src: src,
            callbacks: []
          };
          loadingScripts.push(loadingScript);
          idx = loadingScripts.length - 1;
          script.onload = function () {
            onScriptLoaded(src);
          };
          script.onreadystatechange = function() {
            if (this.readyState === 'complete') this.onload();
          }
        } else {
          console.log("Script src: " + src + " already loading");
        }
        if (callback) {
          loadingScripts[idx].callbacks.push(callback);
        }
      }
    }

    function loadAll(srcs, callback) {
      if (srcs.length > 0) {
        var src = srcs.shift();
        load(src, function () {
          loadAll(srcs, callback);
        });
      } else if (callback) {
        callback();
      }
    }

    // ScriptLoader API
    return {
      load: load,
      loadAll: loadAll
    };
  }

  exports.scriptLoader = exports.scriptLoader || new ScriptLoader();

}(window.AxBootstrap = window.AxBootstrap || {}));

