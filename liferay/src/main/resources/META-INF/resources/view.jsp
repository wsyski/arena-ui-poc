<%@ page import="com.axiell.arena_ui_poc.AbstractPortlet" %>
<%@ include file="./init.jsp" %>

<app-<%= portletDisplay.getPortletName().replaceAll("[_\\.]", "-") %> id="<portlet:namespace/>">Loading...
</app-<%= portletDisplay.getPortletName().replaceAll("[_\\.]","-") %>>

<script type="text/javascript">
  AxBootstrap.scriptLoader.loadAll(["<%=request.getContextPath()%>/shim.js", "<%=request.getContextPath()%>/zone.js",
    "<%=request.getContextPath()%>/ng-runtime-dll.js", "<%=request.getContextPath()%>/main.js"], function () {
    var configurationUrl = '<portlet:resourceURL id="/portlet-configuration"/>';
    var translationsUrl = '<portlet:resourceURL id="/translations"><portlet:param name="locale" value="<%=request.getLocale().toLanguageTag()%>"/></portlet:resourceURL>';
    var bundleSymbolicName = '<%= org.osgi.framework.FrameworkUtil.getBundle(AbstractPortlet.class).getSymbolicName()%>';
    var portletName = '<%= portletDisplay.getPortletName()%>';
    var portletNamespace = '<portlet:namespace/>';
    var runMain = function() {
      window["AxMain_" + bundleSymbolicName.replace(/[-\.]/g, '_')].run(portletName, portletNamespace, configurationUrl, translationsUrl);
    };
    var runPortlet=function() {
      if (window.gapi) {
        window.gapi.load('client', runMain);
      }
      else {
        runMain();
      }
    };

    switch (document.readyState) {
      case 'loading':
        document.addEventListener('DOMContentLoaded', domReadyHandler, false);
        break;
      case 'interactive':
      case 'complete':
      default:
        runPortlet();
    }

    function domReadyHandler() {
      document.removeEventListener('DOMContentLoaded', domReadyHandler, false);
      runPortlet();
    }
  });
</script>