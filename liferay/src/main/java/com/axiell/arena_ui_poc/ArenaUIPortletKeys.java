package com.axiell.arena_ui_poc;

public class ArenaUIPortletKeys {
    public static final String DISPLAY_CATEGORY = "category.arena_ui_poc";
    public static final String RESOURCE_BUNDLE = "content.Language";
    public static final String VIEW_TEMPLATE = "/view.jsp";
    public static final String CALENDAR_EVENT_LIST_PORTLET_NAME = "calendar_event_list";
    public static final String CALENDAR_EVENT_LIST_PORTLET_DISPLAY_NAME = "Calendar Event List Portlet";
    public static final String CALENDAR_EVENT_LIST_PORTLET_CONFIGURATION = "com.axiell.arena_ui_poc.calendar.CalendarPortletConfiguration";
    public static final String CALENDAR_EVENT_LIST_DEFAULT_PORTLET_CONFIGURATION = "classpath:/META-INF/portlet-preferences/calendar-event-list-default-portlet-preferences.xml";
    public static final String CALENDAR_EVENT_LIST_PORTLET_CONFIG_TEMPLATE = "/configuration-calendar-event-list.jsp";
    public static final String GITHUB_PORTLET_NAME = "github";
    public static final String GITHUB_PORTLET_DISPLAY_NAME = "Github Portlet";
    public static final String GITHUB_PORTLET_CONFIGURATION = "com.axiell.arena_ui_poc.github.GithubPortletConfiguration";
    public static final String GITHUB_DEFAULT_PORTLET_CONFIGURATION = "classpath:/META-INF/portlet-preferences/github-default-portlet-preferences.xml";
    public static final String GITHUB_PORTLET_CONFIG_TEMPLATE = "/configuration-github.jsp";
    public static final String TODO_PORTLET_NAME = "todo";
    public static final String TODO_PORTLET_DISPLAY_NAME = "Todo Portlet";
    public static final String TODO_PORTLET_CONFIGURATION = "com.axiell.arena_ui_poc.todo.TodoPortletConfiguration";
    public static final String TODO_DEFAULT_PORTLET_CONFIGURATION = "classpath:/META-INF/portlet-preferences/todo-default-portlet-preferences.xml";
    public static final String TODO_PORTLET_CONFIG_TEMPLATE = "/configuration-todo.jsp";

    public static String toTagName(final String value) {
       return value==null ? null : value.replaceAll("[_\\.]", "-");
    }

    public static String toSymbolName(final String value) {
        return value==null ? null : value.replaceAll("[-\\.]", "_");
    }
}