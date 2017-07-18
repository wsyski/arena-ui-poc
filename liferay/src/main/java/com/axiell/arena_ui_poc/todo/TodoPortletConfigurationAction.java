package com.axiell.arena_ui_poc.todo;

import com.axiell.arena_ui_poc.AbstractArenaUIPortletConfigurationAction;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import com.liferay.portal.kernel.portlet.ConfigurationAction;
import com.liferay.portal.kernel.util.ParamUtil;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.PortletConfig;

@Component(
        configurationPid = ArenaUIPortletKeys.TODO_PORTLET_CONFIGURATION,
        configurationPolicy = ConfigurationPolicy.OPTIONAL, immediate = true,
        property = {
                "javax.portlet.name=" + ArenaUIPortletKeys.TODO_PORTLET_NAME
        },
        service = ConfigurationAction.class
)
public class TodoPortletConfigurationAction extends AbstractArenaUIPortletConfigurationAction<TodoPortletConfiguration> {

    @Override
    public void processAction(final PortletConfig portletConfig, final ActionRequest actionRequest, final ActionResponse actionResponse) throws Exception {
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("processAction: " + this.getPortletName());
        }

        String fontColor = ParamUtil.getString(actionRequest, "fontColor");
        String fontFamily = ParamUtil.getString(actionRequest, "fontFamily");
        String fontSize = ParamUtil.getString(actionRequest, "fontSize");

        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("Message Display Configuration: Font Family:" + fontFamily);
            LOGGER.debug("Message Display Configuration: Font Size:" + fontSize);
            LOGGER.debug("Message Display Configuration: Font Color:" + fontColor);
        }

        setPreference(actionRequest, "fontColor", fontColor);
        setPreference(actionRequest, "fontFamily", fontFamily);
        setPreference(actionRequest, "fontSize", fontSize);

        super.processAction(portletConfig, actionRequest, actionResponse);
    }

    @Override
    protected Class<TodoPortletConfiguration> getConfigurationClass() {
        return TodoPortletConfiguration.class;
    }
}