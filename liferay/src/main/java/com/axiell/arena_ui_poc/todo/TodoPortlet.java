package com.axiell.arena_ui_poc.todo;

import com.axiell.arena_ui_poc.AbstractArenaUIPortlet;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import org.osgi.service.component.annotations.Component;

import javax.portlet.Portlet;

@Component(
        configurationPid = "com.axiell.arena_ui_poc.todo.TodoPortletConfiguration",
        immediate = true,
        property = {
                "com.liferay.portlet.display-category=category.arena_ui_poc",
                "com.liferay.portlet.instanceable=true",
                "javax.portlet.display-name=Todo Portlet",
                "javax.portlet.init-param.config-template=/configuration-todo.jsp",
                "javax.portlet.init-param.template-path=/",
                "javax.portlet.init-param.view-template=/view.jsp",
                "javax.portlet.name=" + ArenaUIPortletKeys.TODO_PORTLET,
                "javax.portlet.resource-bundle=content.Language",
                "javax.portlet.security-role-ref=power-user,user"
        },
        service = Portlet.class
)
public class TodoPortlet extends AbstractArenaUIPortlet<TodoPortletConfiguration> {

    @Override
    protected Class<TodoPortletConfiguration> getConfigurationClass() {
        return TodoPortletConfiguration.class;
    }
}