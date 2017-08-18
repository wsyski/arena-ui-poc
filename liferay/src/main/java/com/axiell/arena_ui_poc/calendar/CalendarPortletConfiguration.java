package com.axiell.arena_ui_poc.calendar;

import aQute.bnd.annotation.metatype.Meta;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;

@Meta.OCD(
        id = ArenaUIPortletKeys.CALENDAR_PORTLET_CONFIGURATION,
        localization = "content/Language",
        name = ArenaUIPortletKeys.CALENDAR_PORTLET_CONFIGURATION+"-configuration-name"
)
public interface CalendarPortletConfiguration {

    @Meta.AD(deflt = "green", required = false)
    public String fontColor();

    @Meta.AD(deflt = "Verdana", required = false)
    public String fontFamily();

    @Meta.AD(deflt = "20", required = false)
    public int fontSize();

}