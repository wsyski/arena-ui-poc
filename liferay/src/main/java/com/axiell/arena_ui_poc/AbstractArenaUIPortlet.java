package com.axiell.arena_ui_poc;

import com.axiell.arena_ui_poc.todo.TodoPortletConfiguration;
import com.liferay.portal.configuration.metatype.bnd.util.ConfigurableUtil;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Modified;

import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import java.io.IOException;
import java.util.Map;


public abstract class AbstractArenaUIPortlet<C> extends MVCPortlet {

    @Override
    public void doView(final RenderRequest renderRequest, final RenderResponse renderResponse) throws IOException, PortletException {

        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("doView: " + this.getPortletName());
        }
        renderRequest.setAttribute(TodoPortletConfiguration.class.getName(), portletConfiguration);
        super.doView(renderRequest, renderResponse);
    }

    @Activate
    @Modified
    protected void activate(final Map<Object, Object> properties) {
        portletConfiguration = ConfigurableUtil.createConfigurable(getConfigurationClass(), properties);
    }

    public static final Log LOGGER = LogFactoryUtil.getLog(AbstractArenaUIPortlet.class);

    protected volatile C portletConfiguration;

    protected abstract Class<C> getConfigurationClass();

}