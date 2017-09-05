package com.axiell.arena_ui_poc.calendar_event_list;

import com.axiell.arena_ui_poc.AbstractPortletConfigurationResourceCommand;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCResourceCommand;
import org.osgi.service.component.annotations.Component;

@Component(
        property = {
                "javax.portlet.name=" + ArenaUIPortletKeys.CALENDAR_EVENT_LIST_PORTLET_NAME,
                "mvc.command.name=/portlet-configuration"
        },
        service = MVCResourceCommand.class
)
public class CalendarEventListPortletConfigurationResourceCommand extends AbstractPortletConfigurationResourceCommand<CalendarEventListPortletConfiguration> {

    @Override
    protected Class<CalendarEventListPortletConfiguration> getConfigurationClass() {
        return CalendarEventListPortletConfiguration.class;
    }
}