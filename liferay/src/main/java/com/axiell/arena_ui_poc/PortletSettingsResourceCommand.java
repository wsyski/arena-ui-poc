package com.axiell.arena_ui_poc;

import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONSerializer;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.JSONPortletResponseUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.BaseMVCResourceCommand;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCResourceCommand;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.ParamUtil;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.osgi.service.component.annotations.Component;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;
import java.io.IOException;
import java.util.*;

@Component(
        property = {
                "javax.portlet.name=" + ArenaUIPortletKeys.HEROES_PORTLET_NAME,
                "javax.portlet.name=" + ArenaUIPortletKeys.GITHUB_PORTLET_NAME,
                "javax.portlet.name=" + ArenaUIPortletKeys.TODO_PORTLET_NAME,
                "mvc.command.name=/portlet-settings"
        },
        service = MVCResourceCommand.class
)
public class PortletSettingsResourceCommand extends BaseMVCResourceCommand {

    @Override
    protected void doServeResource(final ResourceRequest resourceRequest, final ResourceResponse resourceResponse) throws IOException {
        PortletSettings portletSettings=getPortletSettings(resourceRequest);
        LOGGER.debug("portletSettings: "+portletSettings);
        JSONSerializer jsonSerializer = JSONFactoryUtil.createJSONSerializer();
        JSONPortletResponseUtil.writeJSON(resourceRequest, resourceResponse, jsonSerializer.serializeDeep(portletSettings));
    }

    private PortletSettings getPortletSettings(final ResourceRequest resourceRequest) {
        Map<String, String[]> preferences = resourceRequest.getPreferences().getMap();
        String localeAsString = ParamUtil.getString(resourceRequest, "locale");
        Locale locale;
        if (localeAsString == null || localeAsString.isEmpty()) {
            locale = LocaleUtil.getDefault();
        } else {
            locale = Locale.forLanguageTag(localeAsString.replace('_', '-'));
        }
        ResourceBundle resourceBundle = getPortletConfig(resourceRequest).getResourceBundle(locale);
        Map<String, String> translations = toMap(resourceBundle);
        return new PortletSettings(preferences, translations);
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

    private static final class PortletSettings {
        final Map<String, String[]> preferences;
        final Map<String, String> translations;

        public PortletSettings(final Map<String, String[]> preferences, final Map<String, String> translations) {
            this.preferences = preferences;
            this.translations = translations;
        }

        public Map<String, String[]> getPreferences() {
            return preferences;
        }

        public Map<String, String> getTranslations() {
            return translations;
        }

        @Override
        public String toString() {
            return ReflectionToStringBuilder.toString(this);
        }
    }

    public static final Log LOGGER = LogFactoryUtil.getLog(AbstractArenaUIPortlet.class);
}