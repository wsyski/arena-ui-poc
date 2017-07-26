package com.axiell.arena_ui_poc;

import com.liferay.portal.configuration.metatype.bnd.util.ConfigurableUtil;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONSerializer;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.JSONPortletResponseUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.BaseMVCResourceCommand;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public abstract class AbstractPortletConfigurationResourceCommand<C> extends BaseMVCResourceCommand {

    @Override
    protected void doServeResource(final ResourceRequest resourceRequest, final ResourceResponse resourceResponse) throws IOException {
        JSONSerializer jsonSerializer = JSONFactoryUtil.createJSONSerializer();
        JSONPortletResponseUtil.writeJSON(resourceRequest, resourceResponse, jsonSerializer.serializeDeep(toMap()));
    }

    private Map<String, Object> toMap() {
        Map<String, Object> configuration = new HashMap<>();

        Method[] methods = getConfigurationClass().getDeclaredMethods();
        for (Method method : methods) {
            try {
                Object o = method.invoke(portletConfiguration);
                if (o != null) {
                    configuration.put(method.getName(), o);
                }
            } catch (IllegalAccessException | InvocationTargetException ex) {
                LOGGER.error(ex.getMessage(), ex);
            }
        }
        return configuration;
    }

    protected void activate(final Map<Object, Object> properties) {
        portletConfiguration = ConfigurableUtil.createConfigurable(getConfigurationClass(), properties);
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("portletConfiguration: "+ ReflectionToStringBuilder.toString(portletConfiguration));
        }
    }

    public static final Log LOGGER = LogFactoryUtil.getLog(AbstractPortletConfigurationResourceCommand.class);

    private volatile C portletConfiguration;

    protected abstract Class<C> getConfigurationClass();
}