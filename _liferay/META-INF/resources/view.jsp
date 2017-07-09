<%@ include file="/init.jsp" %>

<app-todo id="<portlet:namespace/>">Loading...</app-todo>

<script type="text/javascript">
  AxUtil.scriptLoader.loadAll(["/o/@@bundlePath/shim.js", "/o/@@bundlePath/zone.js", "/o/@@bundlePath/ng-runtime-dll.js", "/o/@@bundlePath/main.js"],function () {
    Main.RunAppTodo("<portlet:namespace/>");
  });
</script>
