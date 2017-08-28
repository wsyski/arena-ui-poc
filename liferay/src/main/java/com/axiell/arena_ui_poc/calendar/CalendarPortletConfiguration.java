package com.axiell.arena_ui_poc.calendar;

import aQute.bnd.annotation.metatype.Meta;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;

@Meta.OCD(
        id = ArenaUIPortletKeys.CALENDAR_PORTLET_CONFIGURATION,
        localization = "content/Language",
        name = ArenaUIPortletKeys.CALENDAR_PORTLET_CONFIGURATION+"-configuration-name"
)
public interface CalendarPortletConfiguration {

    @Meta.AD(deflt = "", required = true)
    public String keyGoogleApi();

    @Meta.AD(deflt = "", required = true)
    public String calendarId();

    @Meta.AD(deflt = "10", required = true)
    public int pageSize();

}