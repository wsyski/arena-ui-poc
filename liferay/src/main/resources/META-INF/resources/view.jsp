<%@ page import="com.axiell.arena_ui_poc.AbstractPortlet" %>
<%@ page import="com.axiell.arena_ui_poc.ArenaUIPortletKeys" %>
<%@ include file="./init.jsp" %>

<app-<%= ArenaUIPortletKeys.toTagName(portletDisplay.getPortletName()) %> id="<portlet:namespace/>">Loading...
</app-<%= ArenaUIPortletKeys.toTagName(portletDisplay.getPortletName()) %>>

<script type="text/javascript">
  AxBootstrap.scriptLoader.loadAll(["<%=request.getContextPath()%>/shim.js", "<%=request.getContextPath()%>/zone.js",
    "<%=request.getContextPath()%>/ng-runtime-dll.js", "<%=request.getContextPath()%>/main.js"], function () {
    var configurationUrl = '<portlet:resourceURL id="/portlet-configuration"/>';
    var translationsUrl = '<portlet:resourceURL id="/translations"><portlet:param name="locale" value="<%=request.getLocale().toLanguageTag()%>"/></portlet:resourceURL>';
    var bundleSymbolicName = '<%= org.osgi.framework.FrameworkUtil.getBundle(AbstractPortlet.class).getSymbolicName()%>';
    var portletName = '<%= portletDisplay.getPortletName()%>';
    var portletNamespace = '<portlet:namespace/>';
    var runMain = function() {
      window["AxMain_" + AxBootstrap.scriptLoader.toSymbolName(bundleSymbolicName)].run(portletName, portletNamespace, configurationUrl, translationsUrl);
    };

    switch (document.readyState) {
      case 'loading':
        document.addEventListener('DOMContentLoaded', domReadyHandler, false);
        break;
      case 'interactive':
      case 'complete':
      default:
        runMain();
    }

    function domReadyHandler() {
      document.removeEventListener('DOMContentLoaded', domReadyHandler, false);
      runMain();
    }
  });
</script>