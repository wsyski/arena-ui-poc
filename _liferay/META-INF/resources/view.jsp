<%@ include file="/init.jsp" %>

<app-<%= portletDisplay.getPortletName().replace('_','-') %> id="<portlet:namespace/>">Loading...</app-<%= portletDisplay.getPortletName().replace('_','-') %>>

<script type="text/javascript">
  AxUtil.scriptLoader.loadAll(["/o/@@bundlePath/shim.js", "/o/@@bundlePath/zone.js", "/o/@@bundlePath/ng-runtime-dll.js", "/o/@@bundlePath/main.js"],function () {
    Main.RunApp_<%= portletDisplay.getPortletName().replace('.','_') %>("<portlet:namespace/>");
  });
</script>
