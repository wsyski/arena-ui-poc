package com.axiell.arena_ui_poc.github;

import aQute.bnd.annotation.metatype.Meta;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;

@Meta.OCD(
	id = ArenaUIPortletKeys.GITHUB_PORTLET_CONFIGURATION
)
public interface GithubPortletConfiguration {

	@Meta.AD(deflt = "voilet", required = false)
	public String fontColor();

	@Meta.AD(deflt = "Arial", required = false)
	public String fontFamily();

	@Meta.AD(deflt = "10", required = false)
	public int fontSize();

}