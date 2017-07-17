<%@ include file="./init.jsp" %>

<app-<%= portletDisplay.getPortletName().replaceAll("[_\\.]","-") %> id="<portlet:namespace/>">Loading...</app-<%= portletDisplay.getPortletName().replaceAll("[_\\.]","-") %>>

<script type="text/javascript">
  AxUtil.scriptLoader.loadAll(["/o/@@bundlePath/shim.js", "/o/@@bundlePath/zone.js",  "/o/@@bundlePath/ng-runtime-dll.js", "/o/@@bundlePath/main.js"], function () {
    var bundleSymbolicName = "@@bundleSymbolicName";
    var portletName = "<%= portletDisplay.getPortletName()%>";
    var portletNamespace = "<portlet:namespace/>";
    var runPortlet = window["AxMain_" + bundleSymbolicName.replace(/[-\.]/g, '_')].runPortlet;

    switch (document.readyState) {
      case 'loading':
        document.addEventListener('DOMContentLoaded', domReadyHandler, false);
        break;
      case 'interactive':
      case 'complete':
      default:
        runPortlet(portletName, portletNamespace);
    }

    function domReadyHandler() {
      document.removeEventListener('DOMContentLoaded', domReadyHandler, false);
      runPortlet(portletName, portletNamespace);
    }
  });
</script>