package com.axiell.arena_ui_poc.github;

import com.liferay.portal.kernel.settings.definition.ConfigurationBeanDeclaration;
import org.osgi.service.component.annotations.Component;

@Component
public class GithubPortletInstanceConfigurationBeanDeclaration implements ConfigurationBeanDeclaration {

    @Override
    public Class getConfigurationBeanClass() {
        return GithubPortletConfiguration.class;
    }

}