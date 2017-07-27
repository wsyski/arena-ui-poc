package com.axiell.arena_ui_poc;

import com.liferay.portal.configuration.metatype.bnd.util.ConfigurableUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import java.io.IOException;
import java.util.Map;


public abstract class AbstractPortlet<C> extends MVCPortlet {

    @Override
    public void doView(final RenderRequest renderRequest, final RenderResponse renderResponse) throws IOException, PortletException {

        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("doView: " + this.getPortletName());
        }
        renderRequest.setAttribute(getConfigurationClass().getName(), portletConfiguration);
        super.doView(renderRequest, renderResponse);
    }

    protected void activate(final Map<Object, Object> properties) {
        portletConfiguration = ConfigurableUtil.createConfigurable(getConfigurationClass(), properties);
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("portletConfiguration: "+ ReflectionToStringBuilder.toString(portletConfiguration));
        }
    }

    protected static final Log LOGGER = LogFactoryUtil.getLog(AbstractPortlet.class);

    protected volatile C portletConfiguration;

    protected abstract Class<C> getConfigurationClass();

}