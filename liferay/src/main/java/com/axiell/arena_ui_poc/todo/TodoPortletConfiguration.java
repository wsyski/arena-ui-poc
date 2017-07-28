package com.axiell.arena_ui_poc.todo;

import aQute.bnd.annotation.metatype.Meta;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;

@Meta.OCD(
        id = ArenaUIPortletKeys.TODO_PORTLET_CONFIGURATION,
        localization = "content/Language",
        name = ArenaUIPortletKeys.TODO_PORTLET_CONFIGURATION+"-configuration-name"
)
public interface TodoPortletConfiguration {

    @Meta.AD(deflt = "blue", required = false)
    public String fontColor();

    @Meta.AD(deflt = "Arial", required = false)
    public String fontFamily();

    @Meta.AD(deflt = "20", required = false)
    public int fontSize();
}