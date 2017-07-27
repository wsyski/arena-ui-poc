package com.axiell.arena_ui_poc;

import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONSerializer;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.module.configuration.ConfigurationException;
import com.liferay.portal.kernel.module.configuration.ConfigurationProviderUtil;
import com.liferay.portal.kernel.portlet.JSONPortletResponseUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.BaseMVCResourceCommand;
import com.liferay.portal.kernel.settings.PortletInstanceSettingsLocator;
import com.liferay.portal.kernel.theme.PortletDisplay;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.WebKeys;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public abstract class AbstractPortletConfigurationResourceCommand<C> extends BaseMVCResourceCommand {

    @Override
    protected void doServeResource(final ResourceRequest resourceRequest, final ResourceResponse resourceResponse) throws IOException, ConfigurationException {
        ThemeDisplay themeDisplay = (ThemeDisplay) resourceRequest.getAttribute(WebKeys.THEME_DISPLAY);
        PortletDisplay portletDisplay = themeDisplay.getPortletDisplay();
        C portletConfiguration = ConfigurationProviderUtil.getConfiguration(getConfigurationClass(), new PortletInstanceSettingsLocator(themeDisplay.getLayout(), portletDisplay.getId()));
        JSONSerializer jsonSerializer = JSONFactoryUtil.createJSONSerializer();
        JSONPortletResponseUtil.writeJSON(resourceRequest, resourceResponse, jsonSerializer.serializeDeep(toMap(portletConfiguration)));
    }

    private Map<String, Object> toMap(C portletConfiguration) {
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

    protected static final Log LOGGER = LogFactoryUtil.getLog(AbstractPortletConfigurationResourceCommand.class);

    protected abstract Class<C> getConfigurationClass();
}