package com.axiell.arena_ui_poc.todo;

import aQute.bnd.annotation.metatype.Meta;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import com.liferay.portal.kernel.json.JSON;

@Meta.OCD(
	id = ArenaUIPortletKeys.TODO_PORTLET_CONFIGURATION
)
public interface TodoPortletConfiguration {

	@Meta.AD(deflt = "voilet", required = false)
	public String fontColor();

	@Meta.AD(deflt = "Arial", required = false)
	public String fontFamily();

	@Meta.AD(deflt = "10", required = false)
	public int fontSize();
}