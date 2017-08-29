package com.axiell.arena_ui_poc.calendar;

import com.axiell.arena_ui_poc.AbstractPortletConfigurationAction;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import com.liferay.portal.kernel.portlet.ConfigurationAction;
import com.liferay.portal.kernel.util.ParamUtil;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Modified;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.PortletConfig;
import java.util.Map;

@Component(
        configurationPid = ArenaUIPortletKeys.CALENDAR_PORTLET_CONFIGURATION,
        configurationPolicy = ConfigurationPolicy.OPTIONAL, immediate = true,
        property = {
                "javax.portlet.name=" + ArenaUIPortletKeys.CALENDAR_PORTLET_NAME
        },
        service = ConfigurationAction.class
)
public class CalendarPortletConfigurationAction extends AbstractPortletConfigurationAction<CalendarPortletConfiguration> {

    @Override
    public void processAction(final PortletConfig portletConfig, final ActionRequest actionRequest, final ActionResponse actionResponse) throws Exception {
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("processAction: " + this.getPortletName());
        }

        String googleApiKey = ParamUtil.getString(actionRequest, CalendarPortletConfiguration.KEY_GOOGLE_API_KEY);
        String calendarId = ParamUtil.getString(actionRequest, CalendarPortletConfiguration.KEY_CALENDAR_ID);
        String pageSize = ParamUtil.getString(actionRequest, CalendarPortletConfiguration.KEY_PAGE_SIZE);

        setPreference(actionRequest, CalendarPortletConfiguration.KEY_GOOGLE_API_KEY, googleApiKey);
        setPreference(actionRequest, CalendarPortletConfiguration.KEY_CALENDAR_ID, calendarId);
        setPreference(actionRequest, CalendarPortletConfiguration.KEY_PAGE_SIZE, pageSize);

        super.processAction(portletConfig, actionRequest, actionResponse);
    }

    @Activate
    @Modified
    protected void activate(final Map<Object, Object> properties) {
        super.activate(properties);
    }

    @Override
    protected Class<CalendarPortletConfiguration> getConfigurationClass() {
        return CalendarPortletConfiguration.class;
    }
}