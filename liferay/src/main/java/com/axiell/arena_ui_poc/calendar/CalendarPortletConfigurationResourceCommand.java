package com.axiell.arena_ui_poc.calendar;

import com.axiell.arena_ui_poc.AbstractPortletConfigurationResourceCommand;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCResourceCommand;
import org.osgi.service.component.annotations.Component;

@Component(
        property = {
                "javax.portlet.name=" + ArenaUIPortletKeys.CALENDAR_PORTLET_NAME,
                "mvc.command.name=/portlet-configuration"
        },
        service = MVCResourceCommand.class
)
public class CalendarPortletConfigurationResourceCommand extends AbstractPortletConfigurationResourceCommand<CalendarPortletConfiguration> {

    @Override
    protected Class<CalendarPortletConfiguration> getConfigurationClass() {
        return CalendarPortletConfiguration.class;
    }
}