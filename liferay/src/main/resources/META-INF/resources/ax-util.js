(function (exports) {
  'use strict';


  function ScriptLoader() {
    var loadingScripts = [];

    function getHeadElement() {
      return document.getElementsByTagName('head')[0];
    }

    function isInDom(src) {
      var nodes = document.querySelectorAll("script[src='" + src + "']");
      return nodes && nodes.length > 0;
    }

    function getLoadingScriptIndex(src) {
      var idx = -1;
      loadingScripts.forEach(function (loadingScript, index) {
        if (loadingScript.src === src) {
          idx = index;
        }
      });
      return idx;
    }

    function onScriptLoaded(src) {
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
          head.appendChild(script);
          var loadingScript = {
            src: src,
            callbacks: []
          };
          loadingScripts.push(loadingScript);
          idx = loadingScripts.length - 1;
          script.onreadystatechange = script.onload = function () {
            onScriptLoaded(src);
          }
        } else {
          console.log("Script src: " + src + " already loading");
        }
        if (callback) {
          loadingScripts[idx].callbacks.push(callback);
        }
      }
    }

    function loadAll(srcs,callback) {
      if (srcs.length > 0) {
        var src = srcs.shift();
        load(src, function () {
          loadAll(srcs,callback);
        });
      }
      else if (callback) {
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

}(window.AxUtil = window.AxUtil || {}));

