package com.axiell.arena_ui_poc.todo;

import aQute.bnd.annotation.metatype.Meta;

@Meta.OCD(
	id = "com.axiell.arena_ui_poc.todo.TodoPortletConfiguration"
)
public interface TodoPortletConfiguration {

	@Meta.AD(required = false)
	public String fontColor();

	@Meta.AD(required = false)
	public String fontFamily();

	@Meta.AD(required = false)
	public int fontSize();

}