package com.axiell.arena_ui_poc;

import com.axiell.arena_ui_poc.todo.TodoPortletConfiguration;
import com.liferay.portal.configuration.metatype.bnd.util.ConfigurableUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.DefaultConfigurationAction;

import javax.portlet.PortletConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public abstract class AbstractPortletConfigurationAction<C> extends DefaultConfigurationAction {

    @Override
    public void include(final PortletConfig portletConfig, final HttpServletRequest httpServletRequest, final HttpServletResponse httpServletResponse)
            throws Exception {

        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("include: " + this.getPortletName());
        }

        httpServletRequest.setAttribute(TodoPortletConfiguration.class.getName(), portletConfiguration);
        super.include(portletConfig, httpServletRequest, httpServletResponse);
    }

    protected void activate(final Map<Object, Object> properties) {
        portletConfiguration = ConfigurableUtil.createConfigurable(getConfigurationClass(), properties);
    }

    public static final Log LOGGER = LogFactoryUtil.getLog(AbstractPortletConfigurationAction.class);

    private volatile C portletConfiguration;

    protected abstract Class<C> getConfigurationClass();
}