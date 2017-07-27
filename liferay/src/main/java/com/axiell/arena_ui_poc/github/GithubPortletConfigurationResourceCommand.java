package com.axiell.arena_ui_poc.github;

import com.axiell.arena_ui_poc.AbstractPortletConfigurationResourceCommand;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCResourceCommand;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;

import java.util.Map;

@Component(
        property = {
                "javax.portlet.name=" + ArenaUIPortletKeys.GITHUB_PORTLET_NAME,
                "mvc.command.name=/portlet-configuration"
        },
        service = MVCResourceCommand.class
)
public class GithubPortletConfigurationResourceCommand extends AbstractPortletConfigurationResourceCommand<GithubPortletConfiguration> {

    @Override
    protected Class<GithubPortletConfiguration> getConfigurationClass() {
        return GithubPortletConfiguration.class;
    }
}