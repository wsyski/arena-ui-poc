<%@ page import="com.axiell.arena_ui_poc.calendar_event_list.CalendarEventListPortletConfiguration" %>

<%@ include file="./init.jsp" %>

<%@page import="com.liferay.portal.kernel.util.Constants" %>

<%
    com.axiell.arena_ui_poc.calendar_event_list.CalendarEventListPortletConfiguration portletConfiguration =
            (com.axiell.arena_ui_poc.calendar_event_list.CalendarEventListPortletConfiguration) renderRequest.getAttribute(com.axiell.arena_ui_poc.calendar_event_list.CalendarEventListPortletConfiguration.class.getName());

    String googleApiKey = StringPool.BLANK;
    String calendarId = StringPool.BLANK;
    String pageSize = StringPool.BLANK;

    if (Validator.isNotNull(portletConfiguration)) {
        googleApiKey = portletPreferences.getValue(com.axiell.arena_ui_poc.calendar_event_list.CalendarEventListPortletConfiguration.KEY_GOOGLE_API_KEY, portletConfiguration.googleApiKey());
        calendarId = portletPreferences.getValue(com.axiell.arena_ui_poc.calendar_event_list.CalendarEventListPortletConfiguration.KEY_CALENDAR_ID, portletConfiguration.calendarId());
        pageSize = portletPreferences.getValue(com.axiell.arena_ui_poc.calendar_event_list.CalendarEventListPortletConfiguration.KEY_PAGE_SIZE, String.valueOf(portletConfiguration.pageSize()));
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
        <aui:input name="<%=com.axiell.arena_ui_poc.calendar_event_list.CalendarEventListPortletConfiguration.KEY_GOOGLE_API_KEY%>" label="Google Key API"
                   value="<%= googleApiKey %>" required="true"></aui:input>


        <aui:input name="<%=com.axiell.arena_ui_poc.calendar_event_list.CalendarEventListPortletConfiguration.KEY_CALENDAR_ID%>" label="Calendar Id"
                   value="<%= calendarId %>" required="true"></aui:input>


        <aui:select name="<%=com.axiell.arena_ui_poc.calendar_event_list.CalendarEventListPortletConfiguration.KEY_PAGE_SIZE%>" label="Page Size" value="<%= pageSize %>"
                    required="true">
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