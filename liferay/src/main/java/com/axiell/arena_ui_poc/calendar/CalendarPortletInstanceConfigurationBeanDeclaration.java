package com.axiell.arena_ui_poc.calendar;

import com.liferay.portal.kernel.settings.definition.ConfigurationBeanDeclaration;
import org.osgi.service.component.annotations.Component;

@Component
public class CalendarPortletInstanceConfigurationBeanDeclaration implements ConfigurationBeanDeclaration {

    @Override
    public Class getConfigurationBeanClass() {
        return CalendarPortletConfiguration.class;
    }

}