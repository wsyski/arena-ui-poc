package com.axiell.arena_ui_poc.heroes;

import com.axiell.arena_ui_poc.AbstractArenaUIPortlet;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import org.osgi.service.component.annotations.Component;

import javax.portlet.Portlet;

@Component(
        configurationPid = ArenaUIPortletKeys.HEROES_PORTLET_CONFIGURATION,
        immediate = true,
        property = {
                "com.liferay.portlet.display-category=" + ArenaUIPortletKeys.DISPLAY_CATEGORY,
                "com.liferay.portlet.instanceable=true",
                "com.liferay.portlet.header-portlet-javascript=/ax-util.js",
                "com.liferay.portlet.single-page-application=false",
                "javax.portlet.display-name=" + ArenaUIPortletKeys.HEROES_PORTLET_DISPLAY_NAME,
                "javax.portlet.init-param.config-template=" + ArenaUIPortletKeys.HEROES_PORTLET_CONFIG_TEMPLATE,
                "javax.portlet.init-param.view-template=" + ArenaUIPortletKeys.VIEW_TEMPLATE,
                "javax.portlet.init-param.template-path=/",
                "javax.portlet.name=" + ArenaUIPortletKeys.HEROES_PORTLET_NAME,
                "javax.portlet.resource-bundle=" + ArenaUIPortletKeys.RESOURCE_BUNDLE,
                "javax.portlet.security-role-ref=power-user,user"
        },
        service = Portlet.class
)
public class HeroesPortlet extends AbstractArenaUIPortlet<HeroesPortletConfiguration> {

    @Override
    protected Class<HeroesPortletConfiguration> getConfigurationClass() {
        return HeroesPortletConfiguration.class;
    }
}