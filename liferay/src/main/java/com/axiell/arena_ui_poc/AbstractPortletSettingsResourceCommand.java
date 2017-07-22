package com.axiell.arena_ui_poc;

import com.liferay.portal.configuration.metatype.bnd.util.ConfigurableUtil;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONSerializer;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.module.configuration.ConfigurationException;
import com.liferay.portal.kernel.portlet.JSONPortletResponseUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.BaseMVCResourceCommand;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.ParamUtil;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Modified;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;

public abstract class AbstractPortletSettingsResourceCommand<C> extends BaseMVCResourceCommand {

    @Override
    protected void doServeResource(final ResourceRequest resourceRequest, final ResourceResponse resourceResponse) throws IOException, ConfigurationException {
        PortletSettings portletSettings = getPortletSettings(resourceRequest);
        LOGGER.debug("portletSettings: " + portletSettings);
        JSONSerializer jsonSerializer = JSONFactoryUtil.createJSONSerializer();
        JSONPortletResponseUtil.writeJSON(resourceRequest, resourceResponse, jsonSerializer.serializeDeep(portletSettings));
    }

    private PortletSettings getPortletSettings(final ResourceRequest resourceRequest) throws ConfigurationException {
        String localeAsString = ParamUtil.getString(resourceRequest, "locale");
        Locale locale;
        if (localeAsString == null || localeAsString.isEmpty()) {
            locale = LocaleUtil.getDefault();
        } else {
            locale = Locale.forLanguageTag(localeAsString.replace('_', '-'));
        }
        ResourceBundle resourceBundle = getPortletConfig(resourceRequest).getResourceBundle(locale);
        Map<String, String> translations = toMap(resourceBundle);
        return new PortletSettings<C>(portletConfiguration, translations);
    }

    private static Map<String, String> toMap(final ResourceBundle resourceBundle) {
        Map<String, String> map = new HashMap<>();

        Enumeration<String> keys = resourceBundle.getKeys();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            map.put(key, resourceBundle.getString(key));
        }
        return map;
    }

    private final class PortletSettings<C> {
        final Map<String, Object> portletConfiguration = new HashMap<>();
        final Map<String, String> translations;

        private PortletSettings(final C portletConfiguration, final Map<String, String> translations) {
            Method[] methods = getConfigurationClass().getDeclaredMethods();
            for (Method method : methods) {
                try {
                    Object o = method.invoke(portletConfiguration);
                    if (o != null) {
                        this.portletConfiguration.put(method.getName(), o);
                    }
                } catch (IllegalAccessException | InvocationTargetException ex) {
                    LOGGER.error(ex.getMessage(), ex);
                }
            }
            this.translations = translations;
        }

        public Map<String, Object> getPortletConfiguration() {
            return portletConfiguration;
        }

        public Map<String, String> getTranslations() {
            return translations;
        }

        @Override
        public String toString() {
            return ReflectionToStringBuilder.toString(this);
        }
    }

    protected void activate(final Map<Object, Object> properties) {
        portletConfiguration = ConfigurableUtil.createConfigurable(getConfigurationClass(), properties);
    }

    public static final Log LOGGER = LogFactoryUtil.getLog(AbstractPortletConfigurationAction.class);

    private volatile C portletConfiguration;

    protected abstract Class<C> getConfigurationClass();
}