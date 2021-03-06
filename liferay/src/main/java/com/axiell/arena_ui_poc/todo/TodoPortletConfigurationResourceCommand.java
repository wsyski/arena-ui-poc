package com.axiell.arena_ui_poc.todo;

import com.axiell.arena_ui_poc.AbstractPortletConfigurationResourceCommand;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCResourceCommand;
import org.osgi.service.component.annotations.Component;

@Component(
        property = {
                "javax.portlet.name=" + ArenaUIPortletKeys.TODO_PORTLET_NAME,
                "mvc.command.name=/portlet-configuration"
        },
        service = MVCResourceCommand.class
)
public class TodoPortletConfigurationResourceCommand extends AbstractPortletConfigurationResourceCommand<TodoPortletConfiguration> {

    @Override
    protected Class<TodoPortletConfiguration> getConfigurationClass() {
        return TodoPortletConfiguration.class;
    }
}