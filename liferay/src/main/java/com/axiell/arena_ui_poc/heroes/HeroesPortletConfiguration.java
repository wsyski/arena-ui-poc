package com.axiell.arena_ui_poc.heroes;

import aQute.bnd.annotation.metatype.Meta;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;

@Meta.OCD(
	id = ArenaUIPortletKeys.HEROES_PORTLET_CONFIGURATION
)
public interface HeroesPortletConfiguration {

	@Meta.AD(deflt = "voilet", required = false)
	public String fontColor();

	@Meta.AD(deflt = "Arial", required = false)
	public String fontFamily();

	@Meta.AD(deflt = "10", required = false)
	public int fontSize();

}