package com.axiell.arena_ui_poc.github;

import com.axiell.arena_ui_poc.AbstractPortletSettingsResourceCommand;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCResourceCommand;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;

import java.util.Map;

@Component(
        property = {
                "javax.portlet.name=" + ArenaUIPortletKeys.GITHUB_PORTLET_NAME,
                "mvc.command.name=/portlet-settings"
        },
        service = MVCResourceCommand.class
)
public class GithubPortletSettingsResourceCommand extends AbstractPortletSettingsResourceCommand<GithubPortletConfiguration> {

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