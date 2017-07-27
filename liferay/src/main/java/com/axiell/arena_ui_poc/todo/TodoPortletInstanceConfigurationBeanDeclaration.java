package com.axiell.arena_ui_poc.todo;

import com.liferay.portal.kernel.settings.definition.ConfigurationBeanDeclaration;
import org.osgi.service.component.annotations.Component;

@Component
public class TodoPortletInstanceConfigurationBeanDeclaration  implements ConfigurationBeanDeclaration {

    @Override
    public Class getConfigurationBeanClass() {
        return TodoPortletConfiguration.class;
    }

}