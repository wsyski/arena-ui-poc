<%@ include file="/init.jsp" %>

<app-todo id="<portlet:namespace/>">Loading...</app-todo>

<script type="text/javascript">
  AxUtil.scriptLoader.loadAll(["/o/@@portletName/shim.js", "/o/@@portletName/zone.js", "/o/@@portletName/ng-runtime.dll.js", "/o/@@portletName/main.js"],function () {
    Main.RunApplication("<portlet:namespace/>");
  });
</script>
