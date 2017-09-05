package com.axiell.arena_ui_poc.calendar_event_list;

import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import com.axiell.arena_ui_poc.AbstractPortlet;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;

import javax.portlet.Portlet;
import java.util.Map;

@Component(
        configurationPid = ArenaUIPortletKeys.CALENDAR_EVENT_LIST_PORTLET_CONFIGURATION,
        immediate = true,
        property = {
                "com.liferay.portlet.display-category=" + ArenaUIPortletKeys.DISPLAY_CATEGORY,
                "com.liferay.portlet.instanceable=true",
                "com.liferay.portlet.header-portlet-javascript=https://apis.google.com/js/api.js",
                "com.liferay.portlet.header-portlet-javascript=/ax-bootstrap.js",
                "com.liferay.portlet.single-page-application=false",
                "javax.portlet.display-name=" + ArenaUIPortletKeys.CALENDAR_EVENT_LIST_PORTLET_DISPLAY_NAME,
                "javax.portlet.init-param.config-template=" + ArenaUIPortletKeys.CALENDAR_EVENT_LIST_PORTLET_CONFIG_TEMPLATE,
                "javax.portlet.init-param.view-template=" + ArenaUIPortletKeys.VIEW_TEMPLATE,
                "javax.portlet.init-param.template-path=/",
                "javax.portlet.name=" + ArenaUIPortletKeys.CALENDAR_EVENT_LIST_PORTLET_NAME,
                "javax.portlet.resource-bundle=" + ArenaUIPortletKeys.RESOURCE_BUNDLE,
                "javax.portlet.preferences=" + ArenaUIPortletKeys.CALENDAR_EVENT_LIST_DEFAULT_PORTLET_CONFIGURATION,
                "javax.portlet.security-role-ref=power-user,user"
        },
        service = Portlet.class
)
public class CalendarEventListPortlet extends AbstractPortlet<CalendarEventListPortletConfiguration> {

    @Activate
    @Modified
    protected void activate(Map<Object, Object> properties) {
        super.activate(properties);
    }

    @Override
    protected Class<CalendarEventListPortletConfiguration> getConfigurationClass() {
        return CalendarEventListPortletConfiguration.class;
    }
}