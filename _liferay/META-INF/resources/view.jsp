<%@ include file="/init.jsp" %>

<aui:script use="Liferay.SPA">
    //Force disable SPA from here
    Liferay.SPA.excludedPaths.push("/");
</aui:script>

<jsp:include page="index.html" />
