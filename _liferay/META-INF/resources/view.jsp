<%@ include file="/init.jsp" %>

<app-todo id="<portlet:namespace/>">Loading...</app-todo>

<script type="text/javascript">
  AxUtil.scriptLoader.loadAll(["/o/@@portletPath/shim.js", "/o/@@portletPath/zone.js", "/o/@@portletPath/ng-runtime-dll.js", "/o/@@portletPath/main.js"],function () {
    Main.RunApplication("<portlet:namespace/>");
  });
</script>
