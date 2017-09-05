package com.axiell.arena_ui_poc.calendar_event_list;

import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import org.osgi.service.component.annotations.Component;

import javax.portlet.PortletPreferences;
import javax.portlet.PreferencesValidator;
import javax.portlet.ValidatorException;
import java.util.ArrayList;
import java.util.List;

@Component(
	immediate = true,
	property = {
		"javax.portlet.name=" + ArenaUIPortletKeys.CALENDAR_EVENT_LIST_PORTLET_NAME
	}
)
public class CalendarEventListPreferencesValidator implements PreferencesValidator {

	@Override
	public void validate(PortletPreferences portletPreferences) throws ValidatorException {

		List<String> invalidPageSizes = new ArrayList<>();

		String[] pageSizes = portletPreferences.getValues(
			"pageSize", new String[0]);

		for (String pageSize : pageSizes) {
			if (pageSize!=null) {
				int pageSizeAsInt=Integer.parseInt(pageSize);
				if (pageSizeAsInt<0) {
					invalidPageSizes.add(pageSize);
				}
			}

		}

		if (!invalidPageSizes.isEmpty()) {
			throw new ValidatorException(
				"Invalid page size", invalidPageSizes);
		}
	}

}