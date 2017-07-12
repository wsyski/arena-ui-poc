<%@ include file="/init.jsp" %>

<app-<%= portletDisplay.getPortletName().replaceAll("[_\\.]","-") %> id="<portlet:namespace/>">Loading...</app-<%= portletDisplay.getPortletName().replaceAll("[_\\.]","-") %>>

<script type="text/javascript">
  AxUtil.scriptLoader.loadAll(["/o/@@bundlePath/shim.js", "/o/@@bundlePath/zone.js",  "/o/@@bundlePath/ng-runtime-dll.js", "/o/@@bundlePath/main.js"], function () {
    window["AxMain_" + "@@bundleSymbolicName".replace(/[-\.]/g, '_')].RunApp_<%= portletDisplay.getPortletName().replaceAll("[-\\.]","_") %>("<portlet:namespace/>");
  });
</script>
