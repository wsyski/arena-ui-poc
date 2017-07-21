<%@ include file="./init.jsp" %>

<app-<%= portletDisplay.getPortletName().replaceAll("[_\\.]","-") %> id="<portlet:namespace/>">Loading...</app-<%= portletDisplay.getPortletName().replaceAll("[_\\.]","-") %>>

<script type="text/javascript">
  AxBootstrap.scriptLoader.loadAll(["<%=request.getContextPath()%>/shim.js", "<%=request.getContextPath()%>/zone.js",  "<%=request.getContextPath()%>/ng-runtime-dll.js", "<%=request.getContextPath()%>/main.js"], function () {
    var translationsUrl = '<portlet:resourceURL id="/arena-ui/translations"><portlet:param name="locale" value="<%=request.getLocale().toLanguageTag()%>"/></portlet:resourceURL>';
    var preferencesUrl = '<portlet:resourceURL id="/arena-ui/preferences"/>';
    var bundleSymbolicName = '<%= org.osgi.framework.FrameworkUtil.getBundle(com.axiell.arena_ui_poc.AbstractArenaUIPortlet.class).getSymbolicName()%>';
    var portletName = '<%= portletDisplay.getPortletName()%>';
    var portletNamespace = '<portlet:namespace/>';
    var runPortlet = window["AxMain_" + bundleSymbolicName.replace(/[-\.]/g, '_')].runPortlet;

    switch (document.readyState) {
      case 'loading':
        document.addEventListener('DOMContentLoaded', domReadyHandler, false);
        break;
      case 'interactive':
      case 'complete':
      default:
        runPortlet(portletName, portletNamespace,translationsUrl,preferencesUrl);
    }

    function domReadyHandler() {
      document.removeEventListener('DOMContentLoaded', domReadyHandler, false);
      runPortlet(portletName, portletNamespace);
    }
  });
</script>