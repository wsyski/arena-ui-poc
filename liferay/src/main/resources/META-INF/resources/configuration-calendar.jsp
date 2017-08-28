<%@ page import="com.axiell.arena_ui_poc.calendar.CalendarPortletConfiguration" %>

<%@ include file="./init.jsp" %>

<%@page import="com.liferay.portal.kernel.util.Constants" %>

<%
    CalendarPortletConfiguration portletConfiguration =
            (CalendarPortletConfiguration) renderRequest.getAttribute(CalendarPortletConfiguration.class.getName());

    String keyGoogleApi = StringPool.BLANK;
    String calendarId = StringPool.BLANK;
    String pageSize = StringPool.BLANK;

    if (Validator.isNotNull(portletConfiguration)) {
        keyGoogleApi = portletPreferences.getValue("keyGoogleApi", portletConfiguration.keyGoogleApi());
        calendarId = portletPreferences.getValue("calendarId", portletConfiguration.calendarId());
        pageSize = portletPreferences.getValue("pageSize", String.valueOf(portletConfiguration.pageSize()));
    }
%>

<liferay-portlet:actionURL portletConfiguration="<%= true %>"
                           var="configurationActionURL"
/>

<liferay-portlet:renderURL portletConfiguration="<%= true %>"
                           var="configurationRenderURL"
/>

<aui:form action="<%= configurationActionURL %>" method="post" name="fm">
    <aui:input name="<%= Constants.CMD %>" type="hidden"
               value="<%= Constants.UPDATE %>"
    />

    <aui:input name="redirect" type="hidden"
               value="<%= configurationRenderURL %>"
    />

    <aui:fieldset>
        <aui:input name="keyGoogleApi" label="Google Key API" value="<%= keyGoogleApi %>" required="true"></aui:input>


        <aui:input name="calendarId" label="Calendar Id" value="<%= calendarId %>" required="true"></aui:input>


        <aui:select name="pageSize" label="Page Size" value="<%= pageSize %>">
            <aui:option value="5">10</aui:option>
            <aui:option value="10">10</aui:option>
            <aui:option value="15">15</aui:option>
            <aui:option value="20">20</aui:option>
            <aui:option value="25">25</aui:option>
            <aui:option value="30">30</aui:option>
        </aui:select>
    </aui:fieldset>

    <aui:button-row>
        <aui:button type="submit"></aui:button>
    </aui:button-row>
</aui:form>