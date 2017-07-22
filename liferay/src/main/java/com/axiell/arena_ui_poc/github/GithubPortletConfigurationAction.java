package com.axiell.arena_ui_poc.github;

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
        configurationPid = ArenaUIPortletKeys.GITHUB_PORTLET_CONFIGURATION,
        configurationPolicy = ConfigurationPolicy.OPTIONAL, immediate = true,
        property = {
                "javax.portlet.name=" + ArenaUIPortletKeys.GITHUB_PORTLET_NAME
        },
        service = ConfigurationAction.class
)
public class GithubPortletConfigurationAction extends AbstractPortletConfigurationAction<GithubPortletConfiguration> {

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

    @Activate
    @Modified
    protected void activate(final Map<Object, Object> properties) {
        super.activate(properties);
    }

    @Override
    protected Class<GithubPortletConfiguration> getConfigurationClass() {
        return GithubPortletConfiguration.class;
    }
}