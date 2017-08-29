package com.axiell.arena_ui_poc.calendar;

import aQute.bnd.annotation.metatype.Meta;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;

@Meta.OCD(
        id = ArenaUIPortletKeys.CALENDAR_PORTLET_CONFIGURATION,
        localization = "content/Language",
        name = ArenaUIPortletKeys.CALENDAR_PORTLET_CONFIGURATION + "-configuration-name"
)
public interface CalendarPortletConfiguration {
    public static final String KEY_GOOGLE_API_KEY = "googleApiKey";
    public static final String KEY_CALENDAR_ID = "calendarId";
    public static final String KEY_PAGE_SIZE = "pageSize";

    @Meta.AD(deflt = "", required = false)
    public String googleApiKey();

    @Meta.AD(deflt = "", required = false)
    public String calendarId();

    @Meta.AD(deflt = "10", required = false)
    public int pageSize();

}