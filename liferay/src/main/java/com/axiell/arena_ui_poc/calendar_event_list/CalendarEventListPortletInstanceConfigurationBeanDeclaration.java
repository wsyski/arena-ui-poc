package com.axiell.arena_ui_poc.calendar_event_list;

import com.liferay.portal.kernel.settings.definition.ConfigurationBeanDeclaration;
import org.osgi.service.component.annotations.Component;

@Component
public class CalendarEventListPortletInstanceConfigurationBeanDeclaration implements ConfigurationBeanDeclaration {

    @Override
    public Class getConfigurationBeanClass() {
        return CalendarEventListPortletConfiguration.class;
    }

}