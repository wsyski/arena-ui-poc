<%@ include file="/init.jsp" %>

<aui:script use="Liferay.SPA">
    //Force disable SPA from here
    Liferay.SPA.excludedPaths.push("/");
</aui:script>

<app-todo id="<portlet:namespace/>">Loading...</app-todo>

<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded");
    Main.RunApplication("<portlet:namespace/>");
  }, false);
</script>
